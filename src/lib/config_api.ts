export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || "https://react-web-backend.onrender.com/api",

  ENDPOINTS: {
    HOME: "/home/getListHome",
    DETAIL: "/home/getDetail",
    SENDMAIL:"/email/send",
    SENTOTP:"/email/sendOtp",
    VERIFYTOTP:"/email/verifyOtp",
    REGISTER:"/register/registerUser"
  },
};