import { detailApi } from "@/features/detail/detail_api";
import detailReducer from "@/features/detail/detail_redux_slice";
import headerReducer from "@/features/header/header_redux_slice";
import { homeApi } from "@/features/home/home_api";
import authReducer from "@/features/login/authen_slice";
import { loginApi } from "@/features/login/login_services";
import { registerApi } from "@/features/register/register_services";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
    [detailApi.reducerPath]: detailApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    detail: detailReducer,
    header: headerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(detailApi.middleware)
      .concat(registerApi.middleware)
      .concat(loginApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;