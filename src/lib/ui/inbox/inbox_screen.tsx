"use client";

import { useInboxController } from "@/features/inbox/inbox_controller";
import { formatDateWithType } from "@/lib/util";
import { Avatar, Image, Input, Popover } from "antd";
import EmojiPicker from "emoji-picker-react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import './chat_style.css';
type InboxScreenProps = {
  conversationId: number;
};
const ellipsisStyle: React.CSSProperties = {
  fontSize: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: "600",
};

function InboxScreen({ conversationId }: InboxScreenProps) {
  const router = useRouter();

  const users = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "David", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eve", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Frank", avatar: "https://i.pravatar.cc/150?img=6" },
    { id: 7, name: "Grace", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 8, name: "Heidi", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 9, name: "Ivan", avatar: "https://i.pravatar.cc/150?img=9" },
    { id: 10, name: "Judy", avatar: "https://i.pravatar.cc/150?img=10" },
  ];

  const {
    inputMessage,
    allMessages,
    setInputMessage,
    handleSend,
    bottomRef,
    chatListRef,
    session,
    listConversation,
    selectedConversationId,
    selectedUserRef,
    // setSelectedUserId,
    // selectedUserId,
    // selectedConversationId,
    handleOpenMedia,
    handleMediaChange,
    removeImage,
    images,
    inputRef,
  } = useInboxController(conversationId);

  return (
    <div className="chat-page bg-[#f2f2f6] relative z-10 flex gap-5 w-full h-[calc(100vh-80px)] overflow-hidden p-5 ">
      <div className="list-coversation shadow-[0_4px_16px_rgba(0,0,0,0.15)] bg-white w-95 h-full p-2.5 rounded-lg flex flex-col">
        <div className="header-chat shrink-0 z-10 bg-white">
          <div className="search-chat pb-3.5">
            <Input
              placeholder="Tìm kiếm"
              classNames={{
                root: "!bg-[#f4f4f4] !border-none !rounded-lg !h-[35px]",
                input: "!bg-[#f4f4f4] !text-sm",
              }}
            />
          </div>

          <div className="list-user-chat">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={5}
              direction="horizontal"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {users.map((user) => (
                <SwiperSlide key={user.id}>
                  <div className="flex flex-col items-center gap-2 max-w-14">
                    <Avatar src={user.avatar} size={52} />
                    <span style={{ ...ellipsisStyle, maxWidth: 60 }}>
                      {user.name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="list-user-conversation flex-1 overflow-y-auto">
          <div className="content-chat-conversation flex flex-col  gap-1.5 pt-3.5 pl-1.5 ">
            {listConversation.map((conversation, index) => {
              const isSelected =
                conversation.conversationId === selectedConversationId;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 cursor-pointer p-2.5 rounded-[10px] ${isSelected ? "bg-[#f2f2f6]" : "hover:bg-gray-200"}`}
                  onClick={() => {
                    selectedUserRef.current = conversation;
                    router.replace(
                      `/inbox?conversationId=${conversation.conversationId}`,
                    );
                    // setSelectedUserId(conversation);
                    // //   setSelectedConversationId(conversation.conversationId);
                  }}
                >
                  <div className="relative shrink-0">
                    <Avatar src={conversation.NV126} size={52} />
                    {conversation.isUnread && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold pb-1.5">
                      {conversation.NV106}
                    </p>
                    <p className="text-[12px] overflow-hidden text-ellipsis whitespace-nowrap text-[#888] font-semibold">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="detail-coversation shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex-1 h-full bg-white rounded-lg flex flex-col">
        <div
          className="chat-list flex-1 overflow-y-auto overflow-x-hidden p-4"
          ref={chatListRef}
        >
          {allMessages.map((msg) => {
            const isMyMessage = msg.senderId === session?.user?.id;

            return (
              <div key={msg._id} className="flex flex-col">
                {msg.isShowDateTitle && (
                  <div className="flex items-center justify-center my-3">
                    <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-semibold">
                      {msg.timeHead}
                    </span>
                  </div>
                )}
                <div
                  className={`flex mb-3 ${isMyMessage ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl wrap-break-word inline-flex items-baseline font-medium ${
                      isMyMessage
                        ? "bg-[#fff0f2] text-black rounded-br-sm"
                        : "bg-gray-100 text-black rounded-bl-sm"
                    }`}
                  >
                    {msg.type === "image" ? (
                      <div className="flex flex-col gap-1">
                        <p className="text-[12px] font-medium text-[#686868] pl-0.5">
                          {formatDateWithType(msg.createdAt, "hh:mm")}
                        </p>
                        {msg.media?.image?.length === 1 ? (
                          <Image
                            src={
                              msg.media.image[0].THUMB ||
                              msg.media.image[0].IMG ||
                              ""
                            }
                            alt=""
                            loading="lazy"
                            preview={false}
                            className="rounded-lg"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "nowrap",
                              gap: "8px",
                            }}
                          >
                            {msg.media?.image?.map((img, index) => (
                              <div
                                key={index}
                                className="w-30 h-30 overflow-hidden rounded-lg shrink-0"
                              >
                                <Image
                                  src={img.THUMB || img.IMG || ""}
                                  alt=""
                                  loading="lazy"
                                  preview={false}
                                  className="rounded-lg"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <p>{msg.message}</p>
                        <p className="text-[12px] font-medium text-[#686868] pl-1.5">
                          {formatDateWithType(msg.createdAt, "hh:mm")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
        {selectedConversationId && (
          <div className="input-chat p-4 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleMediaChange}
            />
            <div className="relative flex-1 flex items-center bg-[#f4f4f4] rounded-lg px-3">
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onPressEnter={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                classNames={{
                  root: "!bg-transparent !border-none flex-1 !shadow-none !outline-none",
                  input:
                    "!bg-transparent !outline-none !shadow-none !border-none focus:!outline-none focus:!shadow-none !p-0",
                }}
              />

              <Popover
                content={
                  <EmojiPicker
                    onEmojiClick={(emojiObject) => {
                      setInputMessage((prev) => prev + emojiObject.emoji);
                    }}
                  />
                }
                trigger="click"
                placement="topRight"
              >
                <span className="chat-btn-icon pr-2.5 fpme-emoji cursor-pointer shrink-0 text-[20px] text-[#8d8989] hover:text-[25px] transition-all duration-200" />
              </Popover>
              <span
                onClick={handleOpenMedia}
                className="chat-btn-icon btn-image fpme-images cursor-pointer shrink-0 text-[20px] text-[#8d8989] hover:text-[25px] transition-all duration-200"
              ></span>
            </div>

            <div className="media-chat absolute bottom-22.75">
              <div className="select-img-chat  flex gap-2.5 ">
                {images.map((item, index) => (
                  <div key={index} className="w-30 h-30 relative">
                    <Image
                      src={item.IMG}
                      alt={item.DES}
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: "cover",
                        opacity: item.loading ? 0.4 : 1,
                        transition: "opacity 0.3s",
                      }}
                      preview={false}
                      loading="lazy"
                    />
                    {item.loading && (
                      <div className="absolute inset-0 flex flex-col justify-end p-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-200"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {!item.loading && (
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSend()}
              className="bg-[#f3495b] text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Gửi
            </button>
          </div>
        )}
      </div>
      <div className="right-chat h-full bg-white rounded-lg"></div>
    </div>
  );
}

export default InboxScreen;
