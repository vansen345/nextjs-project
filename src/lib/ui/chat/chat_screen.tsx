"use client";

import { useChatController } from "@/features/chat/chat_controller";
import { formatDateWithType } from "@/lib/util";
import { Avatar, Input } from "antd";
import { useEffect } from "react";
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

const ellipsisStyle: React.CSSProperties = {
  fontSize: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: "600",
};

function ChatScreen() {
  useEffect(() => {
    document.body.classList.add("hydrated");
  }, []);
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
    setSelectedUserId,
    selectedUserId,
    // selectedConversationId,
    setSelectedConversationId,
  } = useChatController();
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
              const isSelected = conversation._id === selectedUserId?._id;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 cursor-pointer p-2.5 rounded-[10px] ${isSelected ? "bg-[#f2f2f6]" : "hover:bg-gray-200"}`}
                  onClick={() => {
                    setSelectedUserId(conversation);
                    setSelectedConversationId(conversation.conversationId);
                  }}
                >
                  <Avatar src={conversation.NV126} size={52} />
                  <div>
                    <p className="text-[14px] font-semibold">
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
        <div className="chat-list flex-1 overflow-y-auto p-4" ref={chatListRef}>
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
                    className={`px-4 py-2 rounded-2xl max-w-xs wrap-break-word flex items-baseline font-medium ${
                      isMyMessage
                        ? "bg-[#fff0f2] text-black rounded-br-sm"
                        : "bg-gray-100 text-black rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-[12px] font-medium text-[#686868] pl-1.5">
                      {formatDateWithType(msg.createdAt, "hh:mm")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
        {selectedUserId?._id && (
          <div className="input-chat p-4 flex gap-2 shrink-0">
            <Input
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              classNames={{
                root: "flex-1 !bg-[#f4f4f4] !border-none !rounded-lg",
                input: "!bg-[#f4f4f4]",
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              className="bg-[#f3495b] text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Gửi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatScreen;
