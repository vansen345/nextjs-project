"use client";

import { useHomePageController } from "@/features/home/home_controller";
import { useDocumentTitle } from "@/lib/hook/useDocumentTitle";
import DetailScreen from "@/lib/ui/detail/detail_screen";
import { getTimeText } from "@/lib/util";
import { getDecryptedTitle } from "@/model/home_type";
import { RootState } from "@/store";
import { Avatar, Divider, Image, Masonry } from "antd";
import { useSelector } from "react-redux";
// import "./home_style.css";

function HomePageScreen() {
  useDocumentTitle("APP");
  const isModalOpen = useSelector(
    (state: RootState) => state.detail.isModalOpen,
  );
  const { list, handleItemClick, handleLike, bottomRef } =
    useHomePageController();

  return (
    <section className="relative z-10 pb-7.5 w-full min-h-screen">
      <div className="max-w-270.5 w-full box-border mx-auto mt-12.5">
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          gutter={20}
          items={list.map((item) => ({
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
                  // <img
                  //   src={data.PV307}
                  //   alt=""
                  //   loading="lazy"
                  //   className="rounded-t-[10px]"
                  // />
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
      {isModalOpen && <DetailScreen />}
    </section>
  );
}

export default HomePageScreen;
