import { useCommentController } from "@/features/comment/comment_controller";
import { useDetailPageController } from "@/features/detail/detail_controller";
import {
  setEditPostData,
  setIsEditMode,
} from "@/features/detail/detail_redux_slice";
import {
  setIsModalCreatePiep,
  setIsModalOpenLogin,
} from "@/features/header/header_redux_slice";
import i18n from "@/i18n";
import { useAuth } from "@/lib/hook/useAuth";
import "@/lib/ui/detail/detail.css";
import { getTimeText } from "@/lib/util";
import { getDecryptedContent, getDecryptedTitle } from "@/model/home_type";
import { Avatar, Dropdown, Image, MenuProps, Modal } from "antd";
import { useTranslation } from "react-i18next";
import InputComment from "../comment/input_comment";
import ListComment from "../comment/list_comment";

function DetailScreen() {
  const { t } = useTranslation(undefined, { i18n });
  const {
    detail,
    handleCancel,
    handleLike,
    isModalOpen,
    dropdownOpen,
    dispatch,
    setDropdownOpen,
    onDeletePostUser,
    onOpenProfile,
  } = useDetailPageController();
  const { isLoggedIn, FO100 } = useAuth();

  const {
    listComment,
    inputComment,
    setInputComment,
    handleInsertComment,
    onActionReply,
    isLoading,
    hasMore,
    replyComment,
    setReplyComment,
    comment,
    setComment,
    onDeleteComment,
  } = useCommentController();

  const dataMedia = [
    ...(detail?.PO322?.video || []).map((item) => ({
      ...item,
      TYPE: "video",
    })),
    ...(detail?.PO322?.image || []).map((item) => ({
      ...item,
      TYPE: "image",
    })),
  ].sort((a, b) => a.index - b.index);

  const items: MenuProps["items"] =
    detail?.FO100 === FO100
      ? [
          {
            key: "1",
            label: (
              <span
                onClick={() => {
                  dispatch(setIsModalCreatePiep(true));
                  dispatch(setIsEditMode(true));
                  dispatch(setEditPostData(detail)); // truyền data post hiện tại
                }}
              >
                Chỉnh sửa
              </span>
            ),
          },
          {
            key: "2",
            label: <span onClick={onDeletePostUser}>Xoá</span>,
          },
        ]
      : [
          {
            key: "1",
            label: <span>Báo cáo</span>,
          },
        ];
  return (
    <div>
      <Modal
        width={680}
        closeIcon={false}
        open={isModalOpen}
        onCancel={handleCancel}
        mask={{ closable: !dropdownOpen }}
        keyboard={!dropdownOpen}
        footer={null}
        style={{ outline: "none" }}
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "80vh",
            paddingRight: "12px",
            paddingBottom: "60px",
          },
          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <div className="info-user-piep w-full absolute -top-11 left-0 flex items-center justify-between">
          <div className="info cursor-pointer" onClick={onOpenProfile}>
            <Avatar
              size="large"
              shape="circle"
              style={{ cursor: "pointer" }}
              src={detail?.NV126 || null}
            />
            <span className="name-user text-[16px] text-[#ddd] font-semibold">
              {detail?.NV106 || ""}
            </span>
          </div>
          <div className="action-piep">
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              trigger={["click"]}
              arrow
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
            >
              <span className="text-[16px] w-7 h-7 inline-flex items-center justify-center rounded-full cursor-pointer bg-[#4a4a4a] text-white cursor: pointer">
                <i
                  data-v-ca289eba=""
                  className="_sub-more fpme-ellipsis-v-2 el-icon--right"
                ></i>
              </span>
            </Dropdown>
          </div>
        </div>
        <div className="detail-body">
          <div className="detail-title">
            <h1 className="text-title whitespace-pre-wrap">
              {getDecryptedTitle(detail?.PV301)}
            </h1>
          </div>
          <div className="text-base font-normal text-black leading-[1.56] mb-5 whitespace-pre-wrap">
            {getDecryptedContent(detail?.PV305)}
          </div>
          {dataMedia?.map((media, index) => (
            <div
              key={index}
              style={{ aspectRatio: `1/${media.RATIO}` }}
              className="mb-3 overflow-hidden"
            >
              <div className="media-player bg-black relative w-full h-full">
                {media.SRC ? (
                  <video
                    src={media.SRC}
                    controls
                    className="absolute top-0 left-0 w-full h-full"
                  />
                ) : (
                  <Image
                    src={media.IMG}
                    alt={media.DES}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                    preview={false}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
          <div className="time-post text-sm font-medium text-[#686868]">
            {"Đăng vào: " + getTimeText(detail?.PD308 || "")}
          </div>
          <div className="list-comment bg-[#f4f4f4] p-2.5 rounded-lg mt-8">
            <div className="total-comment mb-3">
              <span className="text-[18px] font-bold mr-2">Bình luận</span>
              <span className="text-[16px] font-medium text-[#686868]">
                {detail?.TOTALCOMMENTS || 0}
              </span>
            </div>
            {listComment.length > 0 && (
              <div>
               {listComment.length>15 && (
                <div className="load-more-comment">
                  <span className="text-load-more">Xem thêm</span>
                </div>
               )}
                <ListComment
                  onDeleteComment={(idComment) => onDeleteComment(idComment)}
                  textReply={replyComment}
                  setTextReply={setReplyComment}
                  setValueComment={setComment}
                  valueComment={comment}
                  listComment={listComment}
                  onReply={(comment) => onActionReply(comment)}
                  onActionSendReply={(replyText) =>
                    handleInsertComment(replyText)
                  }
                  onCloseReply = {()=>{
                    setReplyComment('');
                    setComment(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="action-pieper grid gap-5 absolute top-0 -right-17.25">
          <div className="close flex flex-col items-center cursor-pointer">
            <button
              onClick={handleCancel}
              className="w-12 h-12 bg-white text-white rounded-full text-[10px] cursor-pointer outline-none focus:outline-none"
            >
              <i className="fpme-close"></i>
            </button>
          </div>

          <div className="like flex flex-col items-center">
            <button
              className="w-12 h-12 bg-white rounded-[15px] text-[20px] mb-2.5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!isLoggedIn) {
                  dispatch(setIsModalOpenLogin(true));
                  return;
                }
                handleLike();
              }}
            >
              {detail?.ISLIKED ? (
                <Image
                  src="https://piepme.com/_nuxt/liked.png"
                  alt=""
                  width={20}
                  height={20}
                  preview={false}
                />
              ) : (
                <span>
                  <i className="fpme-heart-line" />
                </span>
              )}
            </button>
            <span className="text-white">{detail?.TOTALLIKES || 0}</span>
          </div>
          <div className="share flex flex-col items-center">
            <button className="w-12 h-12 bg-white rounded-[15px] text-[20px] mb-2.5 cursor-pointer">
              <span>
                <i className="fpme-share"></i>
              </span>
            </button>
            <span className="text-white">Chia sẻ</span>
          </div>
        </div>

        {isLoggedIn && (
          <div>
            <InputComment
              inputComment={inputComment}
              setInputComment={setInputComment}
              handleInsertComment={() => handleInsertComment(inputComment)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DetailScreen;
