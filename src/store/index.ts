import { commentApi } from "@/features/comment/comment_services";
import createReducer from "@/features/create_piep/create_piep_redux_slice";
import { creataPiepApi } from "@/features/create_piep/create_piep_services";
import { detailApi } from "@/features/detail/detail_api";
import detailReducer from "@/features/detail/detail_redux_slice";
import headerReducer from "@/features/header/header_redux_slice";
import { homeApi } from "@/features/home/home_api";
import { inboxApi } from "@/features/inbox/inbox.service";
import authReducer from "@/features/login/authen_slice";
import { loginApi } from "@/features/login/login_services";
import { profileApi } from "@/features/profile/profile_services";
import { registerApi } from "@/features/register/register_services";
import notificationMessageSlice from "@/lib/hook/notificationMessage";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
    [detailApi.reducerPath]: detailApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [creataPiepApi.reducerPath]: creataPiepApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [inboxApi.reducerPath]: inboxApi.reducer,
    detail: detailReducer,
    header: headerReducer,
    auth: authReducer,
    createPiep: createReducer,
    notificationMessage: notificationMessageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(detailApi.middleware)
      .concat(registerApi.middleware)
      .concat(loginApi.middleware)
      .concat(creataPiepApi.middleware)
      .concat(commentApi.middleware)
      .concat(profileApi.middleware)
      .concat(inboxApi.middleware)
  ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;