import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Dashboard/Notification.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import PusherConnection from "../../lib/user_pusher";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Notification = ({ icon, title, date, href, is_new }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div
      className={`${styles.list} border-bottom`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <Link
        href={href}
        className={`dropdown-item p-2 safqa-text-secondary2-dashboard ${
          is_new && "bg-new-notification"
        }`}
      >
        <div className="d-flex align-items-center">
          <span
            className={`p-2 rounded-2 ${
              theme == "dark" ? styles.dark_icon : styles.icon
            }`}
          >
            {icon ? icon : <AddShoppingCartIcon sx={{ width: "20px" }} />}
          </span>
          <div className={language == "en" ? "ms-3 " : "me-3"}>
            <div
              className={`title mt-1 ${
                theme == "dark" ? "text-white" : "text-dark"
              }`}
            >
              {title}
            </div>
            <div className={`time ${language == "ar" && "d-flex"}`}>{date}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Notification;
