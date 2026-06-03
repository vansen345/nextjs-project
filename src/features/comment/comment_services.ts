import { IComment } from "@/model/comment_type";
import { BaseResponseObject } from "@/model/reponse_type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from '../../lib/baseQuery';

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery,
    tagTypes: ["Comment"],
    endpoints: (builder) => ({
        insertComment: builder.mutation<BaseResponseObject<IComment>, IComment>({
            query: (body) => ({
                url: "comment",
                method: "POST",
                body,
            })
        }),
        getListComment: builder.query<BaseResponseObject<IComment[]>, { PP300: number, limit?: number, offset?: number }>({
            query: ({ PP300, limit, offset }) => ({
                url: `comment?PP300=${PP300}`,
                method: "GET",
                params: { limit, offset },
            })  
        }),
    })
})
export const {
    useInsertCommentMutation,
    useGetListCommentQuery,
    useLazyGetListCommentQuery
} = commentApi