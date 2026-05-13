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

  return { handleClick, getColor2, onOpenRegister, onCloseRegister, onOpenLogin, onLogout, avatar, isLoggedIn };
};