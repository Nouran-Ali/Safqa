import React from "react";
import HomeNavbar from "./../HomeNavbar";
import Footer from "./../Footer";
import { setCookie } from 'cookies-next';
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

export default function HomeLayout({ children }) {
    const setLanguage = (lang) => {
        if (lang === "en") {
          setCookie("language", "en");
          window.location.reload();
        } else if (lang === "ar") {
          setCookie("language", "ar");
          window.location.reload();
        }
      };
  return (
    <>
      <HomeNavbar setLanguage={setLanguage} />
      {children}
      <BackTop>
        <div className="d-flex justify-content-center safqa-main-bg text-white rounded p-3 text-center">
          <ArrowUpOutlined />
        </div>
      </BackTop>
      <Footer />
    </>
  );
}
