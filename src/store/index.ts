import { homeApi } from "@/features/home/home_api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;