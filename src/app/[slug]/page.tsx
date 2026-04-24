"use client";

import HomePageScreen from "@/lib/ui/home/home_page_screen";
import { useEffect } from "react";

export default function SlugPage() {
  useEffect(() => {
    window.history.replaceState(null, "", "/");
  }, []);

  return <HomePageScreen />;
}