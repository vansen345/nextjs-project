import { BaseResponseObject } from "@/model/reponse_type";
import { UserType } from "@/model/user_type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from '../../lib/baseQuery';

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery,
  tagTypes: ["Login"],
  endpoints:(builder)=>({
    loginUser: builder.mutation<BaseResponseObject<string>,{email:string}>({
        query:({email})=>({
            url: "/authentication/login",
            method: "POST",
            body:{email}
        })
    }),
    verifyOtpLogin: builder.mutation<BaseResponseObject<number>,{email:string,otp:string}>({
       query:({email,otp})=>({
            url: "/authentication/verifyOtp",
            method: "POST",
            body:{email,otp}
        })
    }),
    getInfoLogin: builder.mutation<BaseResponseObject<UserType>,void>({
       query:()=>({
            url: "/authentication/getInfoLogin",
            method: "POST",
        })
    })
  })
})
export const {
    useLoginUserMutation,
    useVerifyOtpLoginMutation,
    useGetInfoLoginMutation,
} = loginApi;
