"use client";

import { Avatar, Input } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ellipsisStyle: React.CSSProperties = {
  fontSize: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function ChatScreen() {
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
  return (
    <div className="chat-page relative z-10 flex gap-5 w-full h-[calc(100vh-80px)] overflow-hidden p-5 ">
      <div className="list-coversation bg-white w-95 h-full p-2.5 rounded-lg flex flex-col">
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
          <div className="content-chat-conversation flex items-center gap-1.5 pt-3.5 ">
            <Avatar src={"https://i.pravatar.cc/150?img=10"} size={52} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 500 }}>Judy</p>
              <p style={{ ...ellipsisStyle, maxWidth: 200, color: "#888" }}>
                Tin nhắn mới
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-coversation flex-1 h-full overflow-y-auto bg-white rounded-lg">
        <div>asdcsacascsadsdc</div>
      </div>
    </div>
  );
}

export default ChatScreen;
