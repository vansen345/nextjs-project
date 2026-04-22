"use client";

import { usePathname, useRouter } from "next/navigation";

export const useHeaderController = () => {
  const router = useRouter();
  const pathname = usePathname();

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

  return { handleClick, getColor2 };
};