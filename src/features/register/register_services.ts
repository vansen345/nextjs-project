import { baseQuery } from "@/lib/baseQuery";
import { BaseResponseObject } from "@/model/reponse_type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
    reducerPath:"registerApi",
    baseQuery,
    tagTypes:["Register"],
    endpoints:(builder)=>({
        registerUser: builder.mutation<BaseResponseObject<string>,{email:string}>({
            query:({email})=>({
                url:"/authentication/register",
                method:"POST",
                body:{email}
            })
        })
    })
})
export const {
    useRegisterUserMutation,
}= registerApi;

//useRegisterUserMutation