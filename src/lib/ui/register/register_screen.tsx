"use-client";

import { useRegisterController } from "@/features/register/register_controller";
import { Button, ConfigProviderProps, Input, Modal } from "antd";
import { useState } from "react";

type SizeType = ConfigProviderProps["componentSize"];

function RegisterScreen() {
  const {
    contextHolder,
    valueUserName,
    valueEmail,
    onChangeEmail,
    onChangeUserName,
    onRegister,
    onCloseRegister,
    isModalOpenRegister,
  } = useRegisterController();
  const [size] = useState<SizeType>("large");
  return (
    <>
      {contextHolder}
      <Modal
        open={isModalOpenRegister}
        onCancel={onCloseRegister}
        width={480}
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
        <div className="text-center text-[18px] font-bold mb-2.5">Đăng ký</div>
        <div className="search-header mb-3 ">
          <p>Email</p>
          <Input
            classNames={{ root: "!bg-[#f4f4f4] !border-none !h-9" }}
            placeholder="Nhập email"
            className="input-header"
            onChange={onChangeEmail}
            value={valueEmail}
          />
        </div>
        <div className="search-header mb-3 ">
          <p>UserName</p>

          <Input
            classNames={{ root: "!bg-[#f4f4f4] !border-none !h-9" }}
            placeholder="Nhập userName"
            className="input-header"
            onChange={onChangeUserName}
            value={valueUserName}
          />
        </div>
        <div className="text-center">
          <Button
            classNames={{
              root: "!bg-[rgba(243,73,91,0.1)] !text-[#f3495b] !border-none",
            }}
            size={size}
            onClick={onRegister}
          >
            Đăng ký
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default RegisterScreen;
