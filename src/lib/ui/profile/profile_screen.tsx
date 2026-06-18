"use client";

import { setIsModalOpenLogin } from "@/features/header/header_redux_slice";
import { useProfileController } from "@/features/profile/profile_controller";
import { getTimeText } from "@/lib/util";
import { getDecryptedTitle } from "@/model/home_type";
import { UserType } from "@/model/user_type";
import { Avatar, Divider, Dropdown, Image, Masonry } from "antd";
import { t } from "i18next";

function ProfileScreen({
  FO100,
  initialProfile,
}: {
  FO100: number;
  initialProfile: UserType | null;
}) {
  const {
    profile,
    myPost,
    listPost,
    isLoggedIn,
    bottomRef,
    handleItemClick,
    handleLike,
    dispatch,
    handleSendRequest,
    handleAcceptRequest,
    friendStatus,
    handleCancelRequest,
    handleRejectRequest,
    handleUnfriend,
  } = useProfileController(FO100, initialProfile);

  return (
    <div className="w-full h-full">
      <div className="max-w-215 min-h-[calc(100vh-70px)] shadow-[0_0_7px_0_rgba(0,0,0,0.15)] px-2.5 pt-2.5 pb-1.25 bg-white mt-3 mx-auto rounded-[15px]">
        <div className="profile-header relative">
          <div>
            <div className="profile-thumbnail">
              <Image
                src="https://cdn.piepme.com/1414/images/piep-hleMJRu916850847925131685084792513.jpeg"
                alt="Profile banner"
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
                preview={false}
                loading="lazy"
              />
            </div>
            <div className="profile-info flex items-end w-full absolute -bottom-15.75 px-19.5">
              <div className="div-name flex items-end w-full">
                <div className="profile-avatar rounded-[89px] border-8 border-white bg-[#ececec]">
                  <Avatar
                    size={142}
                    shape="circle"
                    src={profile?.NV126 || null}
                  />
                </div>
                <div className="profile-name">
                  <span className="text-[20px] font-bold text-black mb-2.5">
                    {profile?.NV106 || ""}
                  </span>
                </div>
              </div>

              {myPost && myPost === FO100 ? (
                <div className="btn-edit-profile flex items-center bg-[#f4f4f4] p-3 gap-2.5 rounded-xl h-9">
                  <i className="fpme-pen text-[12px]"></i>
                  <p className="text-[13px] font-semibold w-max">Chỉnh sửa</p>
                </div>
              ) : myPost && myPost !== FO100 ? (
                <div className="friend flex gap-2.5">
                  <div className="btn-edit-profile flex items-center bg-[#f4f4f4] p-3 gap-2.5 rounded-xl h-9">
                    <i className="fpme-plus text-[12px]"></i>
                    <p className="text-[13px] font-semibold w-max">Theo dõi</p>
                  </div>

                  <Dropdown
                    menu={{
                      items:
                        friendStatus !== "none"
                          ? [
                              {
                                key: "1",
                                label:
                                  friendStatus === "pending" &&
                                  profile?.FO100S === myPost
                                    ? t("Huỷ lời mời kết bạn")
                                    : friendStatus === "accepted"
                                      ? "Huỷ kết bạn"
                                      : "",
                                onClick: () => {
                                  if (
                                    friendStatus === "pending" &&
                                    profile?.FO100S === myPost
                                  ) {
                                    handleCancelRequest();
                                  } else if (friendStatus === "accepted") {
                                    handleUnfriend();
                                  }
                                },
                              },
                            ]
                          : [],
                    }}
                    trigger={["click"]}
                    disabled={friendStatus === "none" || (friendStatus === "pending" && profile?.FO100S !== myPost)}
                  >
                    <div
                      onClick={
                        friendStatus === "none"
                          ? handleSendRequest
                          : friendStatus === "pending" &&
                              profile?.FO100S !== myPost
                            ? handleAcceptRequest
                            : () => {}
                      }
                      className="cursor-pointer btn-edit-profile flex items-center bg-linear-to-r from-[#f3495b] to-[#f1874d] p-3 gap-2.5 rounded-xl text-white h-9"
                    >
                      <i
                        className={`text-[12px] ${
                          friendStatus === "none"
                            ? "fpme-person"
                            : friendStatus === "accepted"
                              ? "fpme-friended"
                              : friendStatus === "pending" &&
                                  profile?.FO100S === myPost
                                ? "fpme-sent-request"
                                : "fpme-check"
                        }`}
                      ></i>
                      <p className="text-[13px] font-semibold w-max">
                        {friendStatus === "none"
                          ? "Kết bạn"
                          : friendStatus === "accepted"
                            ? "Bạn bè"
                            : friendStatus === "pending" &&
                                profile?.FO100S === myPost
                              ? "Đã gửi lời mời"
                              : "Đồng ý"}
                      </p>
                    </div>
                  </Dropdown>
                  {friendStatus === "pending" && profile?.FO100S !== myPost && (
                    <div
                      onClick={handleRejectRequest}
                      className="cursor-pointer btn-edit-profile flex items-center bg-[#f4f4f4] p-3 gap-2.5 rounded-xl h-9"
                    >
                      <i className="text-[12px] fpme-unfriend"></i>
                      <p className="text-[13px] font-semibold w-max">Từ chối</p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="list-post py-22.25 px-12.5">
          <Masonry
            columns={{ xs: 0, sm: 0, md: 2 }}
            gutter={10}
            items={listPost.map((item) => ({
              key: item._id || "",
              data: item,
            }))}
            itemRender={({ data }) => (
              <div
                className="max-w-82.25 rounded-[10px] relative overflow-hidden transition-all duration-500 ease-in bg-white cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                onClick={() => handleItemClick(data)}
              >
                <div className="w-full min-h-50 max-h-75 flex relative">
                  {data.PV307 && (
                    <Image
                      src={data.PV307}
                      alt=""
                      loading="lazy"
                      preview={false}
                      className="rounded-t-[10px]"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {(data.PO322?.video?.length ?? 0) > 0 && (
                    <div className="">
                      <span
                        data-v-a4763824=""
                        className="absolute bottom-2.5 left-2.5 w-7.5 h-7.5 bg-[#ffffffe6] rounded-4xl inline-flex items-center justify-center text-[#f3495b]"
                      >
                        <i data-v-a4763824="" className="fpme-video"></i>
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-2.5 pb-2.5">
                  <p className="py-2.75 text-[18px] font-semibold text-[#333] leading-6.5">
                    {getDecryptedTitle(data.PV301)}
                  </p>
                  <p className="text-[16px] text-[#686868] leading-6.75 max-h-20.5 overflow-hidden whitespace-pre-line font-semibold">
                    {getDecryptedTitle(data.PV305)}
                  </p>
                  <div className="text-sm font-medium text-[#a9a9a9] mt-2.5">
                    {getTimeText(data?.PD308 || "")}
                  </div>
                  <div className="mt-3 flex gap-2.5 font-semibold text-[20px]">
                    <button
                      className="flex items-center mr-6 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isLoggedIn) {
                          dispatch(setIsModalOpenLogin(true));
                          return;
                        }
                        handleLike(data.PP300 || 0, data?.ISLIKED === 1);
                      }}
                    >
                      {data?.ISLIKED ? (
                        <Image
                          src="https://piepme.com/_nuxt/liked.png"
                          alt=""
                          width={20}
                          height={20}
                          preview={false}
                        />
                      ) : (
                        <span>
                          {" "}
                          <i className="fpme-heart-line" />
                        </span>
                      )}

                      <span className="text-[12px] ml-1">
                        {" "}
                        {data?.TOTALLIKES || 0}
                      </span>
                    </button>
                    <button className="flex items-center flex-1">
                      <span>
                        <i className="fpme-comment-line" />
                      </span>
                      <span className="text-[12px] ml-1">
                        {data?.TOTALCOMMENTS || 0}
                      </span>
                    </button>
                    <button className="flex items-center mr-4">
                      <span>
                        <i className="fpme-share" />
                      </span>
                    </button>
                  </div>
                  <Divider style={{ margin: "12px 0" }} />
                  <div className="flex items-center">
                    <Avatar
                      size="large"
                      style={{ cursor: "pointer" }}
                      src={data.NV126 || null}
                    />
                    <div className="text-[14px] text-[#686868] font-bold">
                      {data.NV106 || ""}
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
          <div ref={bottomRef} style={{ height: 20 }} />
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
