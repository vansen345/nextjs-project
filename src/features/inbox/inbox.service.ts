import { IMessage } from "@/model/message_type";
import { BaseResponse, BaseResponseObject } from "@/model/reponse_type";
import { ConversationType } from "@/model/user_type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from '../../lib/baseQuery';

export const inboxApi = createApi({
    reducerPath: "inboxApi",
    baseQuery,
    tagTypes: ["Inbox"],
    endpoints: (builder) => ({
        getMessages: builder.query<BaseResponse<IMessage[]>, { conversationId: number, limit: number, offset: number, FO100: number }>({
            query: (params) => ({
                url: `/chat?conversationId=${params.conversationId}`,
                method: "GET",
                params: { limit: params.limit, offset: params.offset, FO100: params.FO100 }
            }),
            // providesTags: ["Chat"],
        }),
        saveMessage: builder.mutation<BaseResponseObject<IMessage>, Omit<IMessage, "_id" | "createdAt">>({
            query: (body) => ({
                url: "chat",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Inbox"],
        }),
        getListCoversation: builder.query<BaseResponse<ConversationType[]>, { limit: number; offset: number, email: string, FO100: number }>({
            query: (params) => ({
                url: `/chat/listConversation?limit=${params.limit}&offset=${params.offset}&FO100=${params.FO100}`,
                method: "GET",
                headers: {
                    "x-user-email": params.email || ""
                }
            }),
            // providesTags: ["Chat"],
        }),
        checkReadMess: builder.mutation<BaseResponse<number>, { conversationId: number, FO100: number }>({
            query: ({ conversationId, FO100 }) => ({
                url: "chat/check_read_mess",
                method: "POST",
                body: { conversationId, FO100 }
            })
        })

    })
});
export const {
    useGetMessagesQuery,
    useLazyGetMessagesQuery,
    useSaveMessageMutation,
    useGetListCoversationQuery,
    useLazyGetListCoversationQuery,
    useCheckReadMessMutation
} = inboxApi;