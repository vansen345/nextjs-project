"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsModalOpenLogin, setIsModalOpenRegiser } from "./header_redux_slice";

export const useHeaderController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const avatar = session?.user?.avatar;
  const isLoggedIn = !!session;

  const handleClick = (path: string) => {
    if (pathname === `/${path}`) {
      router.push("/");
    } else {
      router.push(`/${path}`);
    }
  };

  const getColor2 = (path: string): string => {
    if (path === "/") return pathname === "/" ? "button-active" : "button-inactive";
    return pathname === `/${path}` ? "button-active" : "button-inactive";
  };

  const onOpenRegister = () => dispatch(setIsModalOpenRegiser(true));
  const onOpenLogin = () => dispatch(setIsModalOpenLogin(true));
  const onCloseRegister = () => dispatch(setIsModalOpenRegiser(false));
  const onLogout = () => signOut({ redirect: false });

  return { handleClick, getColor2, onOpenRegister, onCloseRegister, onOpenLogin, onLogout, avatar, isLoggedIn };
};