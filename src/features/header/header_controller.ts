"use client";

import { RootState } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../login/authen_slice";
import { useGetInfoLoginMutation } from "../login/login_services";
import { setIsModalOpenLogin, setIsModalOpenRegiser } from "./header_redux_slice";

export const useHeaderController = () => {
  const disPatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const avatar = useSelector((state: RootState) => state.auth.avatar);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const handleClick = (path: string) => {
    if (pathname === `/${path}`) {
      router.push("/");
    } else {
      router.push(`/${path}`);
    }
  };
  const [getInfoLogin] = useGetInfoLoginMutation();

  useEffect(() => {
    const checkSesstion = async () => {
      try {
        const response = await getInfoLogin().unwrap();
        if (response.status === "true" && response.elements) {
          disPatch(setUser({ 
            email: response.elements.email,
            avatar: response.elements.avatar, 
          }));
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }
    checkSesstion();
  }, [disPatch, getInfoLogin]);

  const getColor2 = (path: string): string => {
    if (path === "/") return pathname === "/" ? "button-active" : "button-inactive";
    return pathname === `/${path}` ? "button-active" : "button-inactive";
  };

  const onOpenRegister = () => {
    disPatch(setIsModalOpenRegiser(true))
  }

  const onOpenLogin = () => {
    disPatch(setIsModalOpenLogin(true));
  }
  const onCloseRegister = () => { disPatch(setIsModalOpenRegiser(false)) }
  // setIsModalOpen(false);

  return { handleClick, getColor2, onOpenRegister, onCloseRegister, onOpenLogin, avatar, isLoggedIn };
};