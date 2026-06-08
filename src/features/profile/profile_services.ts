import { baseQuery } from "@/lib/baseQuery";
import { HomeItem } from "@/model/home_type";
import { BaseResponseObject } from "@/model/reponse_type";
import { UserType } from "@/model/user_type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        getInfoProfile: builder.mutation<BaseResponseObject<UserType>, { FO100: number }>({
            query: (body) => ({
                url: "getInfoProfile",
                method: "POST",
                body,
            })
        }),
        getListPostByUser: builder.query<BaseResponseObject<HomeItem[]>, { FO100: number, limit?: number, offset?: number }>({
            query: (body) => ({
                url: "listPostByUserProfile",
                method: "POST",
                body,
            })
        }),
    })
})

export const {
    useGetInfoProfileMutation,
    useGetListPostByUserQuery,
    useLazyGetListPostByUserQuery,
} = profileApi