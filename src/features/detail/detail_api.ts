import { baseQuery } from "@/lib/baseQuery";
import { HomeItem } from "@/model/home_type";
import { BaseResponseObject } from "@/model/reponse_type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const detailApi = createApi({
    reducerPath: "detailApi",
    baseQuery,
    tagTypes: ["Detail"],
    endpoints: (builder) => ({
        detailPieper: builder.mutation<BaseResponseObject<HomeItem>, { PV325: string, PP300: number, FT300: number, FO100: number }>({
            query: ({ PV325, PP300, FT300, FO100 }) => ({
                url: "/detail",
                method: "POST",
                body: { PV325, PP300, FT300, FO100 }
            })
        }),
        deletePost: builder.mutation<BaseResponseObject<number>, { PP300: number, FT300: number, FO100: number }>({
            query: ({ PP300, FT300, FO100 }) => ({
                url: "deletePost",
                method: "POST",
                body: { PP300, FT300, FO100 }
            })
        }),

    })
});
export const {
    useDetailPieperMutation,
    useDeletePostMutation,
} = detailApi;