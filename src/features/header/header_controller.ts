"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const useHeaderController = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onOpenRegister = () => {
    setIsModalOpen(true);
  }
  const onCloseRegister = () =>
    setIsModalOpen(false);

  return { handleClick, getColor2, onOpenRegister,onCloseRegister, isModalOpen };
};