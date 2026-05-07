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
          placeholder={isOtpSent ? "Nhập Otp" : "Nhập email"}
          className="input-header"
          onChange={onChangeEmail}
          value={isOtpSent ? valueOtp : valueEmail}
        />
      </div>
      <div>
        <Button
          style={{
            backgroundColor: "rgba(243, 73, 91, 0.1)",
            color: "#f3495b",
            border: "none",
          }}
          size={size}
          className="button-create hidden md:flex"
          onClick={isOtpSent ? onverifyOtpLogin : onSendOtpLogin}
        >
          {isOtpSent ? "Xác nhận" : "Gửi mã"}
        </Button>
      </div>
    </Modal>
  );
}

export default LoginScreen;
