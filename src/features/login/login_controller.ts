"use client";

import { RootState } from "@/store";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpenLogin } from "../header/header_redux_slice";
import { useLoginUserMutation } from "./login_services";

export const useLoginController = () => {
    const dispatch = useDispatch();
    const isModalOpenLogin = useSelector((state: RootState) => state.header.isModalLogin);

    const [valueEmail, setValueEmail] = useState("");
    const [valueOtp, setValueOtp] = useState("");
    const [isOtpSent, setOtpSent] = useState(false);
    const [emailForOtp, setEmailForOtp] = useState("");
    const [triggerApi] = useLoginUserMutation();

    const onCloseLogin = () => {
        dispatch(setIsModalOpenLogin(false));
        setValueEmail("");
        setValueOtp("");
        setOtpSent(false);
        setEmailForOtp("");
    };

    const onChangeEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (isOtpSent) {
            setValueOtp(value);
        } else {
            setValueEmail(value);
        }
    };

    const onSendOtpLogin = async () => {
        if (!valueEmail) return;
        const rs = await triggerApi({ email: valueEmail }).unwrap();
        if (rs.elements != null && rs.status === "true") {
            setEmailForOtp(valueEmail);
            setOtpSent(true);
            setValueEmail("");
        }
    };

    const onverifyOtpLogin = async () => {
        if (!emailForOtp || !valueOtp) return;
        const result = await signIn("credentials", {
            email: emailForOtp,
            otp: valueOtp,
            redirect: false,
        });
        if (result?.ok) {
            onCloseLogin();
        }
    };

    return { valueEmail, isModalOpenLogin, isOtpSent, valueOtp, onCloseLogin, setValueEmail, onChangeEmail, onSendOtpLogin, onverifyOtpLogin };
};