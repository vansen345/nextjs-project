import { useProfileController } from "@/features/profile/profile_controller";
import { UserType } from "@/model/user_type";
import { Avatar, Image, Input, Modal } from "antd";

function EditProfileScreen({
  FO100,
  initialProfile,
  onUpdateProfile,
}: {
  FO100: number;
  initialProfile: UserType | null;
  onUpdateProfile: (newProfile: UserType) => void;
}) {
  const {
    profile,
    isModalOpenEdit,
    inputRef,
    onChangeName,
    onEditProfile,
    handleChangeAvatar,
    handleOpenMedia,
    onCloseEdit,
    avatarUrl2,
  } = useProfileController(FO100, initialProfile, onUpdateProfile);

  return (
    <div>
      <Modal
        width={680}
        onCancel={onCloseEdit}
        closeIcon={false}
        open={isModalOpenEdit}
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
        <div className="w-full h-full">
          <div className="max-w-215 min-h-[calc(100vh-70px)] px-2.5 pt-2.5 pb-1.25 mt-3 mx-auto rounded-[15px]">
            <div className="edit-profile-header relative">
              <div className="edi-profile-thumbnail">
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
              <div className="flex items-center gap-2.5 -mt-18 px-14.5">
                <div
                  onClick={handleOpenMedia}
                  className="relative profile-avatar brightness-75 rounded-[89px] border-8 border-white bg-[#ececec]"
                >
                  <Avatar
                    size={142}
                    shape="circle"
                    src={avatarUrl2?.IMG || profile?.NV126}
                  />
                  {avatarUrl2?.loading && (
                    <div className="absolute inset-0 flex flex-col justify-end p-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-200"
                          style={{ width: `${avatarUrl2.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i
                      data-v-2f5d3363=""
                      className="fpme-camera text-[30px] text-white"
                    ></i>
                  </div>
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleChangeAvatar}
                />

                <div className="profile-name pt-10">
                  <span className="text-[20px] font-bold text-black">
                    {profile?.NV106 || ""}
                  </span>
                </div>
              </div>
              <div className="px-14.5 mt-4">
                <p className="text-[25px] text-[#f3495b] font-medium">
                  Chỉnh sửa
                </p>
                <div className="edit-name w-full mt-2 border-b-2 border-[#e8e8e8] pb-6">
                  <p className="text-[15px] text-black mb-1.5">Tên hiển thị</p>
                  <Input
                    defaultValue={profile?.NV106}
                    onChange={onChangeName}
                    classNames={{
                      root: "!bg-[#f4f4f4] !border-none !rounded-lg !h-[35px] !w-full",
                      input: "!bg-[#f4f4f4] !text-sm !w-full",
                    }}
                  />
                </div>
                <div className="info-user pt-2.5">
                  <p className="text-[25px] text-[#f3495b] font-medium">
                    Thông tin
                  </p>
                  <div className="info-phone flex items-center py-8">
                    <i className="icon fpme-phone flex items-center justify-center rounded-[25px] w-11.5 h-11.5 text-[#f3495b] bg-[rgba(243,73,91,.1)]"></i>
                    <span className="text-[18px] ml-1.5 font-semibold text-[#686868]">
                      0947696640
                    </span>
                  </div>
                  <div className="info-phone flex items-center ">
                    <i className="icon fpme-email flex items-center justify-center rounded-[25px] w-11.5 h-11.5 text-[#f3495b] bg-[rgba(243,73,91,.1)]"></i>
                    <span className="text-[18px] ml-1.5 font-semibold text-[#686868]">
                      senvan410@gmail.com
                    </span>
                  </div>
                </div>
                <div className="footer-edit flex justify-end pt-14">
                  <button
                    onClick={onCloseEdit}
                    className="bg-[#f4f4f4] w-13.75 h-10 rounded-[18px] text-[#f3495b] mr-2 cursor-pointer"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={onEditProfile}
                    className="bg-[linear-gradient(89deg,#f3495b_1%,#f1874d_101%)] w-13.75 h-10 rounded-[18px] text-white cursor-pointer"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfileScreen;
