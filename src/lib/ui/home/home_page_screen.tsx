"use client";

import { useHomePageController } from "@/features/home/home_controller";
import { useDocumentTitle } from "@/lib/hook/useDocumentTitle";
import DetailScreen from "@/lib/ui/detail/detail_screen";
import { Masonry } from "antd";
import { getDecryptedTitle } from "../../../model/home_type";
import "./home_style.css";

function HomePageScreen() {
  useDocumentTitle("APP");

  const {
    list,
    isLoading,
    handleItemClick,
    hasMore,
    bottomRef,
  } = useHomePageController();

  const isInitialLoading = isLoading && list.length === 0;
  if (isInitialLoading) return <div>Loading...</div>;

  return (
    <section id="home-page">
      <div className="home-page-container">
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          gutter={8}
          items={list.map((item) => ({
            key: item._id,
            data: item,
          }))}
          itemRender={({ data }) => (
            <div className="content-item" onClick={() => handleItemClick(data)}>
              <div className="content-item-img">
                {data.PV307 && <img src={data.PV307} alt="" loading="lazy" />}
              </div>
              <div className="title-content">
                <p className="title">{getDecryptedTitle(data.PV301)}</p>
                <p className="content">{data.PV305}</p>
              </div>
            </div>
          )}
        />
        <div ref={bottomRef} style={{ height: 20 }} />
        {isLoading && list.length > 0 && hasMore && (
          <div style={{ textAlign: "center", padding: 16 }}>
            Loading more...
          </div>
        )}
      </div>
      <DetailScreen />
    </section>
  );
}

export default HomePageScreen;