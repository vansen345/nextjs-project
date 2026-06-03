"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  Input,
  Tooltip,
  type ConfigProviderProps,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useHeaderController } from "@/features/header/header_controller";
import { useLazyGetHomeListQuery } from "@/features/home/home_api";
import i18n from "@/i18n";
import { useAuth } from "@/lib/hook/useAuth";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import CreatePiepScreen from "../create_piep/create_piep";
import LoginScreen from "../login/login_screen";
import RegisterScreen from "../register/register_screen";
import "./header_style.css";

type SizeType = ConfigProviderProps["componentSize"];

function Header() {
  const { t } = useTranslation(undefined, { i18n });
  const currentLang = i18n.language;
  const [size] = useState<SizeType>("large");
  const {
    handleClick,
    getColor2,
    onOpenRegister,
    onOpenLogin,
    onLogout,
    onOpenCreatePiep,
    NV126,
    isLoggedIn,
  } = useHeaderController();
  
  const { FO100 } = useAuth();
  const router = useRouter();
  const [fetchHome] = useLazyGetHomeListQuery();

  useEffect(() => {
    document.body.classList.add("hydrated");
  }, []);

  const handleLogoClick = () => {
    router.push("/");
    fetchHome({ limit: 10, offset: 0,FO100: FO100 || 0 });
  };

  return (
    <>
      {/* <div className="loading-home">
        <Image
          src="https://res.cloudinary.com/dcu47l2uc/image/upload/v1780042212/loading-home_u6wy8n.gif"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "hue-rotate(30deg)",
          }}
        />
      </div> */}
      <Flex align="center" className="header shadow-md">
        <div className="header-content">
          <div className="logo-search">
            <span className="shrink-0">
              <Image
                src="https://res.cloudinary.com/dcu47l2uc/image/upload/v1776244870/logo-piepme-header_wiho0z.png"
                alt="Logo"
                height={22}
                preview={false}
                className="cursor-pointer"
                onClick={handleLogoClick}
              />
            </span>
            <div className="search-header">
              <Input placeholder="Tìm kiếm" className="input-header" />
            </div>
          </div>
          <div style={{ flex: 1 }}></div>

          <div className="menu-text hidden md:flex gap-4 mr-8 shrink-0">
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
              onClick={onOpenCreatePiep}
            >
              {t("create_piep")}
            </Button>

            <Tooltip>
              {isLoggedIn && (
                <Button
                  shape="circle"
                  icon={<span className="fpme-piep-and-call"></span>}
                  onClick={() => handleClick("/chat")}
                  className={`button-chat hidden md:flex ${getColor2("chat")}`}
                />
              )}
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
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: isLoggedIn ? t("text_profile") : t("register"),
                      onClick: isLoggedIn ? () => {} : onOpenRegister,
                    },
                    {
                      key: "2",
                      label: isLoggedIn ? t("logout") : t("login"),
                      onClick: isLoggedIn ? onLogout : onOpenLogin,
                    },
                  ],
                }}
                trigger={["hover"]}
              >
                <Avatar
                  size="large"
                  style={{ cursor: "pointer" }}
                  src={isLoggedIn && NV126 ? NV126 : undefined}
                  icon={!isLoggedIn ? <UserOutlined /> : undefined}
                />
              </Dropdown>
            </Tooltip>
            <button
              className={`cursor-pointer font-semibold ${currentLang === "vi" ? "text-[#f3495b]" : "text-black"} `}
              onClick={() => i18n.changeLanguage("vi")}
            >
              VI
            </button>

            <button
              className={`cursor-pointer font-semibold ${currentLang === "en" ? "text-[#f3495b]" : "text-black"} `}
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </Flex>
      <RegisterScreen />
      <LoginScreen />
      <CreatePiepScreen />
    </>
  );
}

export default Header;
