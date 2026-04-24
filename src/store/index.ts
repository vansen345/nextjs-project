import { detailApi } from "@/features/detail/detail_api";
import detailReducer from "@/features/detail/detail_redux_slice";
import { homeApi } from "@/features/home/home_api";
import { registerApi } from "@/features/register/register_services";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
    [detailApi.reducerPath]: detailApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    detail: detailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(detailApi.middleware)
      .concat(registerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;