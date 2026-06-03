import { useLoginController } from "@/features/login/login_controller";
import { Button, Input, Modal } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";

function LoginScreen() {
  const {
    valueEmail,
    isModalOpenLogin,
    isOtpSent,
    valueOtp,
    onCloseLogin,
    onSendOtpLogin,
    onChangeEmail,
    onverifyOtpLogin,
  } = useLoginController();
  const [size] = useState<SizeType>("large");
  return (
    <Modal
      open={isModalOpenLogin}
      onCancel={onCloseLogin}
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
      <div className="text-center text-[18px] font-bold mb-2.5" >Đăng nhập</div>
      <div className="search-header mb-3 ">
        <Input
          placeholder={isOtpSent ? "Nhập Otp" : "Nhập email"}
          classNames={{root:"!bg-[#f4f4f4] !border-none !h-9"}}
          onChange={onChangeEmail}
          value={isOtpSent ? valueOtp : valueEmail}
        />
      </div>
      <div className="text-center">
        <Button
          
          size={size}
          // className="button-create hidden md:flex"
          classNames={{root:"!bg-[rgba(243,73,91,0.1)] !text-[#f3495b] !border-none"}}
          onClick={isOtpSent ? onverifyOtpLogin : onSendOtpLogin}
        >
          {isOtpSent ? "Xác nhận" : "Gửi mã"}
        </Button>
      </div>
    </Modal>
  );
}

export default LoginScreen;
