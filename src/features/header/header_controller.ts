"use client";

import { useAuth } from "@/lib/hook/useAuth";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsModalCreatePiep, setIsModalOpenLogin, setIsModalOpenRegiser } from "./header_redux_slice";


export const useHeaderController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, NV126 } = useAuth();

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
  const onLogout = () => signOut({ redirect: false });
  const onOpenCreatePiep = () => dispatch(setIsModalCreatePiep(true));

  return { handleClick, getColor2, onOpenRegister, onCloseRegister, onOpenLogin, onLogout, onOpenCreatePiep, NV126, isLoggedIn };
};