import { baseQuery } from "@/lib/baseQuery";
import { BaseResponseObject } from "@/model/reponse_type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery,
    tagTypes: ["Register"],
    endpoints: (builder) => ({
        registerUser: builder.mutation<BaseResponseObject<string>, { email: string, user_name: string }>({
            query: ({ email,user_name }) => ({
                url: "/authentication/register",
                method: "POST",
                body: { email, user_name }
            })
        })
    })
})
export const {
    useRegisterUserMutation,
} = registerApi;

//useRegisterUserMutation