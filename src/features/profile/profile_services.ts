import { baseQuery } from "@/lib/baseQuery";
import { HomeItem } from "@/model/home_type";
import { BaseResponseObject } from "@/model/reponse_type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        // getInfoProfile: builder.mutation<BaseResponseObject<UserType>, { FO100: number, myFO100:number }>({
        //     query: (body) => ({
        //         url: "getInfoProfile",
        //         method: "POST",
        //         body,
        //     })
        // }),
        getListPostByUser: builder.query<BaseResponseObject<HomeItem[]>, { FO100: number, limit?: number, offset?: number }>({
            query: (body) => ({
                url: "listPostByUserProfile",
                method: "POST",
                body,
            })
        }),
        sendRequest: builder.mutation<BaseResponseObject<number>, { FO100S: number, FO100R: number }>({
            query: ({ FO100S, FO100R }) => ({
                url: "friend/send_friend",
                method: "POST",
                body: { FO100S, FO100R }
            })
        }),
        acceptFriend: builder.mutation<BaseResponseObject<number>, { FO100S: number, FO100R: number }>({
            query: ({ FO100S, FO100R }) => ({
                url: "friend/accept_friend",
                method: "POST",
                body: { FO100S, FO100R }
            })
        }),
        cancelRequest: builder.mutation<BaseResponseObject<number>, { FO100S: number, FO100R: number }>({
            query: ({ FO100S, FO100R }) => ({
                url: "friend/cancel_request",
                method: "POST",
                body: { FO100S, FO100R }
            })
        }),
        rejectFriend: builder.mutation<BaseResponseObject<number>, { FO100S: number, FO100R: number }>({
            query: ({ FO100S, FO100R }) => ({
                url: "friend/reject_friend",
                method: "POST",
                body: { FO100S, FO100R }
            })
        }),
        unfriend: builder.mutation<BaseResponseObject<number>, { FO100S: number, FO100R: number }>({
            query: ({ FO100S, FO100R }) => ({
                url: 'friend/unfriend',
                method: "POST",
                body: { FO100S, FO100R }
            })
        })
    })
})

export const {
    // useGetInfoProfileMutation,
    useGetListPostByUserQuery,
    useLazyGetListPostByUserQuery,
    useAcceptFriendMutation,
    useSendRequestMutation,
    useCancelRequestMutation,
    useRejectFriendMutation,
    useUnfriendMutation
} = profileApi