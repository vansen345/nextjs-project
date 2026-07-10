import { useAuth } from "@/lib/hook/useAuth";
import { getTimeText } from "@/lib/util";
import { IComment } from "@/model/comment_type";
import { Avatar, Dropdown, MenuProps } from "antd";
import TextArea from "antd/es/input/TextArea";

export const ListComment = ({
  listComment,
  onReply,
  valueComment,
  setValueComment,
  textReply,
  setTextReply,
  onActionSendReply,
  onDeleteComment,
  onCloseReply
}: {
  listComment: IComment[];
  onReply: (comment: IComment) => void;
  valueComment: IComment | null;
  setValueComment: React.Dispatch<React.SetStateAction<IComment | null>>;
  textReply: string;
  setTextReply: React.Dispatch<React.SetStateAction<string>>;
  onActionSendReply: (replyText: string) => void;
  onDeleteComment: (commentId: string) => void;
  onCloseReply: () => void;
}) => {
  const { NV106, NV126 } = useAuth();

  return (
    <>
      {listComment
        .filter((comment) => comment.comment?.trim())
        .map((comment, index) => {
          const items: MenuProps["items"] = [
            {
              key: "1",
              label: (
                <span onClick={() => onDeleteComment(comment._id || "")}>
                  Xoá bình luận
                </span>
              ),
            },
          ];
          return (
            <div key={index} className="comment mb-3 mt-2.5">
              <div className="comment-body flex items-center gap-2.5">
                <div className="content-comment inline-flex bg-white rounded-lg mb-1 pt-2.5 pr-5 pb-2.5 pl-2.5">
                  <div className="mr-2 w-9.75 h-9.75 rounded-4xl bg-white p-0.5 shadow-[0_4px_10px_0_rgba(0,0,0,0.15)]">
                    <Avatar shape="circle" src={comment.NV126} size={35} />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold pb-1.5">
                      {comment.NV106 || ""}
                    </p>
                    <p className="text-[14px] whitespace-normal">
                      {comment.comment || ""}
                    </p>
                  </div>
                </div>
                <div>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomLeft"
                    trigger={["click"]}
                    arrow
                  >
                    <span className="text-black cursor: pointer text-[16px]">
                      <i className="_sub-more fpme-ellipsis-v-2 el-icon--right"></i>
                    </span>
                  </Dropdown>
                </div>
              </div>

              <div className="action-comment flex items-center gap-8 mt-2">
                <div className="like-comment flex items-center font-bold">
                  <span className="text-[17px]">
                    <i className="fpme-heart-line" />
                  </span>
                  <span className="text-[12px] ml-1">3</span>
                </div>
                <div
                  className="reply-comment cursor-pointer"
                  onClick={() => onReply(comment)}
                >
                  <p className="font-bold">Phản hồi</p>
                </div>
                <div className="text-[12px] font-medium">
                  {getTimeText(comment.createdAt || new Date())}
                </div>
              </div>

              {(comment.reply ?? []).length > 0 && (
                <div className="ml-10 mt-2 flex flex-col gap-2">
                  {comment.reply?.map((reply, i) => (
                    <div key={i}>
                      <div className="inline-flex bg-white rounded-lg mb-1 pt-2.5 pr-5 pb-2.5 pl-2.5">
                        <div className="mr-2 w-9.75 h-9.75 rounded-4xl bg-white p-0.5 shadow-[0_4px_10px_0_rgba(0,0,0,0.15)]">
                          <Avatar shape="circle" src={reply.NV126} size={35} />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold pb-1.5">
                            {reply.NV106 || ""}
                          </p>
                          <p className="text-[14px] whitespace-normal">
                            {reply.comment || ""}
                          </p>
                        </div>
                      </div>
                      <div className="action-comment flex items-center gap-8 mt-2">
                        <div className="like-comment flex items-center font-bold">
                          <span className="text-[17px]">
                            <i className="fpme-heart-line" />
                          </span>
                          <span className="text-[12px] ml-1">3</span>
                        </div>
                        <div
                          className="reply-comment cursor-pointer"
                          onClick={() => onReply(comment)}
                        >
                          <p className="font-bold">Phản hồi</p>
                        </div>
                        <div className="text-[12px] font-medium">
                          {getTimeText(reply.createdAt || new Date())}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* hiện TextArea reply */}
              {valueComment?._id === comment._id && (
                <div className="reply-comment gap-2 mt-2 flex-col border border-[#f1874d] p-2 rounded-[15px] bg-white">
                  <div className="content-rely flex gap-1.5">
                    <Avatar shape="circle" src={NV126} size={35} />
                    <div className="input-comment flex-1">
                      <div>{NV106}</div>
                      <div className="flex items-start gap-2">
                        <span className="text-[14px] font-semibold whitespace-nowrap">
                          {valueComment?.NV106}
                        </span>
                        <TextArea
                          value={textReply}
                          onChange={(e) => setTextReply(e.target.value)}
                          classNames={{
                            root: "flex-1 !border-none !shadow-none !pl-0",
                            textarea: "!text-[14px] !p-0",
                          }}
                          autoSize
                          style={{ resize: "none" }}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="action-reply flex justify-end gap-1">
                    <button onClick={onCloseReply} type="button" className="bg-black w-7.5 h-7.5 rounded-[15px] cursor-pointer flex items-center justify-center">
                      <i className="fpme-close text-white text-[9px]"></i>
                    </button>
                    <button
                      onClick={() => onActionSendReply(textReply)}
                      type="button"
                      disabled={textReply.trim() === ""}
                      className="bg-[linear-gradient(89deg,#f3495b_1%,#f1874d_101%)] w-7.5 h-7.5 rounded-[15px] cursor-pointer flex items-center justify-center disabled:bg-[#f4f4f4]! disabled:cursor-not-allowed"
                    >
                      <span>
                        <i className="text-white text-[12px] fpme-arrow-top"></i>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default ListComment;
