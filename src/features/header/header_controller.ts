"use client";

import { useAuth } from "@/lib/hook/useAuth";
import { RootState } from "@/store";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setShouldRefreshHome } from "../create_piep/create_piep_redux_slice";
import { setIsModalCreatePiep, setIsModalOpenLogin, setIsModalOpenRegiser } from "./header_redux_slice";


export const useHeaderController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, NV126 } = useAuth();
  const isModelCreatePiep = useSelector((state:RootState)=>state.header.isModelCreatePiep);
  const isModalLogin = useSelector((state:RootState)=>state.header.isModalLogin);
  const isModalRegister = useSelector((state:RootState)=>state.header.isModalRegister);

  // const avatar = session?.user?.NV126;
  // const isLoggedIn = !!session;

  const handleClick = (path: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (pathname === normalizedPath) {
      router.push("/");
    } else {
      router.push(normalizedPath);
    }
  };

  const getColor2 = (path: string): string => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (normalizedPath === "/") return pathname === "/" ? "button-active" : "button-inactive";
    return pathname === normalizedPath ? "button-active" : "button-inactive";
  };

  const onOpenRegister = () => dispatch(setIsModalOpenRegiser(true));
  const onOpenLogin = () => dispatch(setIsModalOpenLogin(true));
  const onCloseRegister = () => dispatch(setIsModalOpenRegiser(false));
  const onLogout = () => {
    dispatch(setShouldRefreshHome(true));
    signOut({ redirect: false });
  };
  const onOpenCreatePiep = () => dispatch(setIsModalCreatePiep(true));

  return { handleClick, getColor2, onOpenRegister, onCloseRegister, onOpenLogin, onLogout, onOpenCreatePiep,isModelCreatePiep,isModalLogin,isModalRegister, NV126, isLoggedIn };
};

