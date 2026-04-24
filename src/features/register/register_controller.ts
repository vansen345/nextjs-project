import { useState } from "react";
import { useRegisterUserMutation } from "./register_services";

export const useRegisterController = () => {

    const [triggerApi] = useRegisterUserMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [valueEmail, setValueEmail] = useState("");

    const onCloseRegister = () =>
        setIsModalOpen(false);

    const onChangeEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setValueEmail(value);
        console.log(value);
    };

    const onRegister = async () => {
        if (!valueEmail) return;
        const rs = await triggerApi({ email: valueEmail }).unwrap();
        if (rs.elements != null && rs.status==="success") {
            setIsModalOpen(false);
        }

    }

    return { isModalOpen, valueEmail, onChangeEmail, setValueEmail, setIsModalOpen, onCloseRegister, onRegister };
}