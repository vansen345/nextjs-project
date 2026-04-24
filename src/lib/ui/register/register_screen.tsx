"use-client";

import { useRegisterController } from "@/features/register/register_controller";
import { Button, ConfigProviderProps, Input, Modal } from "antd";
import { useState } from "react";

interface RegisterProp {
  isModalOpen: boolean;
  handleCancel: () => void;
}

type SizeType = ConfigProviderProps["componentSize"];

function RegisterScreen({ isModalOpen, handleCancel }: RegisterProp) {
  const {valueEmail,onChangeEmail,onRegister}= useRegisterController();
  const [size] = useState<SizeType>("large");
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      width={680}
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
      <div className="search-header mb-3 ">
        <Input
          style={{
            backgroundColor: "#f4f4f4",
            border: "none",
            width: "250px",
            height: "35px",
          }}
          placeholder="Tìm kiếm"
          className="input-header"
          onChange={onChangeEmail}
           value={valueEmail}
        />
      </div>
      <div>
        <Button
          style={{
            backgroundColor: "rgba(243, 73, 91, 0.1)",
            color: "#f3495b",
            border: "none",
          }}
          icon={<span className="fpme-plus"></span>}
          size={size}
          className="button-create hidden md:flex"
          onClick={onRegister}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
}
export default RegisterScreen;
