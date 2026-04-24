import { useDetailPageController } from "@/features/detail/detail_controller";
import { setIsModalOpen } from "@/features/detail/detail_redux_slice";
import "@/lib/ui/detail/detail.css";
import { formatTimeAgo } from "@/lib/util";
import { getDecryptedContent, getDecryptedTitle } from "@/model/home_type";
import { RootState } from "@/store";
import { Image, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

function DetailScreen() {
  const dispatch = useDispatch();
  const { detail } = useDetailPageController();
  const isModalOpen = useSelector(
    (state: RootState) => state.detail.isModalOpen,
  );
  const selectedItem = useSelector(
    (state: RootState) => state.detail.selectedItem,
  );
  const handleCancel = () => {
    dispatch(setIsModalOpen(false));
   window.history.pushState(null, "", "/");
  };
  return (
    <Modal
      width={680}
      closeIcon={false}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      style={{ outline: "none" }}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "80vh",
          paddingRight: "12px",
        },
      }}
    >
      <div className="detail-body">
        <div className="detail-title">
          <h1  className="text-title">{getDecryptedTitle(detail?.PV301)}</h1>
        </div>  
        <div className="text-base font-normal text-black leading-[1.56]">
          {getDecryptedContent(detail?.PV305)}
        </div>
        {detail?.PO322.image.map((img, index) => (
          <div key={index} style={{ aspectRatio: `1/${img.RATIO}` }}>
            <Image
              src={img.IMG}
              alt={img.DES}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              preview={false}
              loading="lazy"
            />
          </div>
        ))}
        <div className="time-post text-sm font-medium text-[#686868]">
          {"Đăng vào:" + formatTimeAgo(detail?.PD308 || "")}
        </div>
      </div>
    </Modal>
  );
}

export default DetailScreen;
