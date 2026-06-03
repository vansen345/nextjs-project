import { useCreatePiepController } from "@/features/create_piep/create_piep_controller";
import i18n from "@/i18n";
import { Avatar, Image, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";
function CreatePiepScreen() {
  const { t } = useTranslation(undefined, { i18n });

  const {
    NV126,
    NV106,
    inputRef,
    isLoading,
    isModelCreatePiep,
    PV301,
    PV305,
    setPV305,
    setPV301,
    onCloseCreate,
    images,
    handleImageChange,
    removeImage,
    onSubmitCreatePiep,
    handleOpenMedia,
    handleMediaChange,
  } = useCreatePiepController();
  return (
    <Modal
      width={680}
      closeIcon={false}
      onCancel={onCloseCreate}
      open={isModelCreatePiep}
      footer={null}
      styles={{
        body: {
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "9px",
        },
        mask: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <div className="user-create absolute -top-11 left-0">
        <Avatar
          size="large"
          style={{ cursor: "pointer" }}
          src={NV126 || null}
        />
        <span className="name-user text-[16px] text-[#ddd] font-semibold">
          {NV106 || ""}
        </span>
      </div>
      <div className="create-piep">
        <div className="create-piep-title">
          <label className="text-[18px] font-medium mb-2.5">
            {t("title_create")}
          </label>
          <TextArea
            value={PV301}
            onChange={(e) => setPV301(e.target.value)}
            classNames={{
              root: "text-[27px] !border-none !shadow-none !pl-0",
              textarea: "font-bold !text-[27px] !h-auto !min-h-0",
            }}
            autoSize={{ minRows: 4 }}
            style={{ resize: "none" }}
            placeholder="Nhập tiêu đề..."
          />
        </div>
        <div className="create-piep-content">
          <label className="text-[18px] font-medium mb-2.5">
            {t("content_create")}
          </label>
          <TextArea
            value={PV305}
            onChange={(e) => setPV305(e.target.value)}
            classNames={{
              root: "!border-none !shadow-none !pl-0",
              textarea:
                "placeholder:text-[16px] !outline-none !shadow-none !h-auto !min-h-0",
            }}
            autoSize={{ minRows: 4 }}
            style={{ resize: "none" }}
            placeholder="Nhập nội dung..."
          />
        </div>
        <div className="create-piep-images mt-4">
          <label className="text-[18px] font-medium mb-2.5">
            {t("upload_img_create")}
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative"
                style={{ aspectRatio: `1/${img.RATIO || 1}` }}
              >
                {img.SRC ? (
                  <video
                    src={img.SRC}
                    controls
                    className="w-full h-full object-cover"
                    style={{ opacity: img.loading ? 0.4 : 1 }}
                  />
                ) : (
                  <Image
                    src={img.IMG}
                    alt={img.DES}
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "cover",
                      opacity: img.loading ? 0.4 : 1,
                      transition: "opacity 0.3s",
                    }}
                    preview={false}
                    loading="lazy"
                  />
                )}
                {img.loading && (
                  <div className="absolute inset-0 flex flex-col justify-end p-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-200"
                        style={{ width: `${img.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {!img.loading && (
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <div
              className="upload-file flex justify-center items-center w-full h-108.75 bg-[#f4f4f4] rounded-[10px] cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onClick={handleOpenMedia}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 0) {
                  const fakeEvent = {
                    target: { files: e.dataTransfer.files },
                  } as React.ChangeEvent<HTMLInputElement>;
                  // handleImageChange(fakeEvent);
                  handleMediaChange(fakeEvent);
                }
              }}
            >
              <div className="icon-upload bg-white flex flex-col justify-center items-center w-35 h-[140] rounded-[100px]">
                <p>
                  <i className="fpme-image-video text-[56px]" />
                </p>
                <p>{t("upload_img_create")}</p>
              </div>
            </div>
            {/* <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            /> */}

            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleMediaChange}
            />
          </div>
        </div>
        <div className="footer pt-2.5 text-end cursor-pointer">
          <button
            onClick={onSubmitCreatePiep}
            className={`${isLoading ? "bg-[#f4f4f4]" : "bg-[#f3495b]"} ${isLoading ? "text-[#999]" : "text-white"} px-4 py-2 rounded-lg cursor-pointer`}
          >
            {t("submit_post_create")}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreatePiepScreen;
