import { RootState } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpenRegiser } from "../header/header_redux_slice";
import { useRegisterUserMutation } from "./register_services";

export const useRegisterController = () => {
    const dispatch = useDispatch();
    const [triggerApi] = useRegisterUserMutation();
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const isModalOpenRegister = useSelector(
        (state: RootState) => state.header.isModalRegister,
    );
    const [valueEmail, setValueEmail] = useState("");

    const onCloseRegister = () => {
        dispatch(setIsModalOpenRegiser(false))
    }


    const onChangeEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setValueEmail(value);
    };

    const onRegister = async () => {
        if (!valueEmail) return;
        const rs = await triggerApi({ email: valueEmail }).unwrap();
        if (rs.elements != null && rs.status === "true") {
            console.log('chajucsac');
            onCloseRegister()
        }

    }

    return { valueEmail, isModalOpenRegister, onChangeEmail, setValueEmail, onRegister,onCloseRegister };
}