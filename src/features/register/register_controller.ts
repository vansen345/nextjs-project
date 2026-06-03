import { RootState } from "@/store";
import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpenLogin, setIsModalOpenRegiser } from "../header/header_redux_slice";
import { useRegisterUserMutation } from "./register_services";

export const useRegisterController = () => {
    const dispatch = useDispatch();
    const [triggerApi] = useRegisterUserMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const isModalOpenRegister = useSelector(
        (state: RootState) => state.header.isModalRegister,
    );
    const [valueEmail, setValueEmail] = useState("");
    const [valueUserName, setValueUserName] = useState("");

    const onCloseRegister = () => {
        dispatch(setIsModalOpenRegiser(false))
    }


    const onChangeEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setValueEmail(value);
    };

    const onChangeUserName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setValueUserName(value);
    };
    const onRegister = async () => {
        if (!valueEmail) return;
        const rs = await triggerApi({ email: valueEmail, user_name: valueUserName }).unwrap();
        if (rs.elements != null && rs.status === "true") {
             messageApi.success("Đăng ký thành công");
            setValueEmail("");
            setValueUserName("");
            dispatch(setIsModalOpenRegiser(false));
            dispatch(setIsModalOpenLogin(true));
        }else{
             messageApi.error("Đăng ký thất bại");
        }

    }

    return { valueEmail, valueUserName,isModalOpenRegister,contextHolder, onChangeEmail, onChangeUserName, setValueEmail, onRegister, onCloseRegister };
}