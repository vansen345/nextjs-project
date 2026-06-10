export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || "https://react-web-backend.onrender.com/api",

  ENDPOINTS: {
    HOME: "/home/getListHome",
    DETAIL: "/detail/getDetail",
    SENDMAIL: "/email/send",
    SENTOTP: "/email/sendOtp",
    VERIFYTOTP: "/email/verifyOtp",
    REGISTER: "/register/registerUser",
    LOGIN: "/login/loginUser",
    GETINFOLOGIN: "/login/getInfoUserLogin",
    SAVE_MESSAGE: "/message/save",
    GET_MESSAGES: "/message/list",
    LIST_CHAT: "/message/listUserChat",
    GET_OR_CREATE_ROOM: "/message/room",
    POST_CREATE: "/home/createPost",
    UPLOAD_IMG: "/home/uploadImg",
    INSERTCOMMENT: "/comment/insertComment",
    GETLISTCOMMENT: "/comment/listComment",
    UPLOAD_MEDIA: "/media/uploadMedia",
    GETPROFILE: "/profile/getInforUser",
    GETLISTPOST: "/profile/listPostByUser",
    DELETEPOST: "/home/deletePost",
    UPDATEPOST: "/home/updatePostUser"
  },
};