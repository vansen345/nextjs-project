import { baseQuery } from "@/lib/baseQuery";
import { HomeItem } from "@/model/home_type";
import { BaseResponse } from "@/model/reponse_type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery,
    tagTypes: ["Home"],
    endpoints: (builder) => ({
        getHomeList: builder.query<
            BaseResponse<HomeItem[]>,
            { limit: number; offset: number, FO100: number }
        >({
            query: ({ limit, offset, FO100 }) => ({
                url: "/home",
                params: { limit, offset, FO100 },
            }),
            providesTags: ["Home"],
        }),
    }),
});

export const {
    useGetHomeListQuery,
    useLazyGetHomeListQuery,
} = homeApi;
