"use client";

import {
    Avatar,
    Button,
    Flex,
    Input,
    Tooltip,
    type ConfigProviderProps,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useHeaderController } from "@/features/header/header_controller";
import { useLazyGetHomeListQuery } from "@/features/home/home_api";
import "./header_style.css";

type SizeType = ConfigProviderProps["componentSize"];

function Header() {
  const [size] = useState<SizeType>("large");
  const { handleClick, getColor2 } = useHeaderController();
  const router = useRouter();
  const [fetchHome] = useLazyGetHomeListQuery();

  const handleLogoClick = () => {
    router.push("/");
    fetchHome({ limit: 10, offset: 0 });
  };

  return (
    <Flex align="center" className="header">
      <div className="header-content">
        <div className="logo-search">
          <span>
            <img
              src="https://res.cloudinary.com/dcu47l2uc/image/upload/v1776244870/logo-piepme-header_wiho0z.png"
              alt="Logo"
              style={{ height: 22 }}
              onClick={handleLogoClick}
            />
          </span>
          <div className="search-header">
            <Input placeholder="Tìm kiếm" className="input-header" />
          </div>
        </div>
        <div style={{ flex: 1 }}></div>

        <div className="menu-text hidden md:flex gap-4 mr-8">
          <p
            className={`text-header ${getColor2("/")}`}
            onClick={handleLogoClick}
          >
            Cộng đồng
          </p>
          <p
            className={`text-header ${getColor2("piepAudio")}`}
            onClick={() => handleClick("/piepAudio")}
          >
            PiepAUDIO
          </p>
          <p
            className={`text-header ${getColor2("vietnam")}`}
            onClick={() => handleClick("/vietnam")}
          >
            Việt Nam Bây Giờ
          </p>
        </div>

        <div className="button-icons-header">
          <Button
            icon={<span className="fpme-plus"></span>}
            size={size}
            className="button-create hidden md:flex"
          >
            Tạo bài Piep
          </Button>
          <Tooltip>
            <Button
              shape="circle"
              icon={<span className="fpme-piep-and-call"></span>}
              onClick={() => handleClick("/chat")}
              className={`button-chat hidden md:flex ${getColor2("chat")}`}
            />
          </Tooltip>
          <Tooltip>
            <Button
              shape="circle"
              icon={<span className="fpme-ring"></span>}
              onClick={() => handleClick("ring")}
              className={`button-notification hidden md:flex ${getColor2("ring")}`}
            />
          </Tooltip>
          <Tooltip>
            <Avatar
              src={
                <img
                  draggable={false}
                  src="https://piepme.s3.ap-southeast-1.amazonaws.com/23822/images/avartaoohhay"
                  alt="avatar"
                />
              }
            />
          </Tooltip>
        </div>
      </div>
    </Flex>
  );
}

export default Header;
