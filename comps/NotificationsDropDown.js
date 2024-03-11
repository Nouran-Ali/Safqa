import styles from "../styles/Dashboard/NavbarDashboard.module.css";
import Link from "next/link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from "./Dashboard/Notification";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { notification_types } from "../pages/dashboard/notifications";
import { Dropdown, Menu } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect } from "react";
import PusherConnection from "../lib/user_pusher";

const NotificationsDropDown = () => {
  const { theme, setTheme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language, changeLanguage } = i18n;

  const { myData, token } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const reversed_notifications = notifications?.length
    ? [...notifications].reverse()
    : [];
  const new_notifications = notifications.filter((n) => n.is_new);

  const dispatch = useDispatch();

  const menu = (
    <Menu
    // className={`dropdown-menu profile-dropdown-menu py-3 z-index-10
    //     ${styles.dropdown}
    //     ${language == "ar" && styles.dropdownAR}`}
    >
      {notifications.length > 0 ? (
        <>
          {reversed_notifications
            .slice(0, 5)
            .map(
              (
                {
                  notificationType,
                  type,
                  text,
                  message,
                  date,
                  type_id,
                  is_new,
                },
                index
              ) => (
                <Menu.Item key={index}>
                  <Notification
                    key={index}
                    is_new={is_new ? true : false}
                    icon={notification_types[notificationType || type]?.icon}
                    title={text || message}
                    date={date}
                    href={`${
                      notification_types[notificationType || type]?.href
                    }/${type_id && !notification_types[notificationType || type]?.exact ? type_id : ""}`}
                  />
                </Menu.Item>
              )
            )}
          <Menu.Item className="text-center">
            <Link
              href="/dashboard/notifications"
              className="text-decoration-underline safqa-text-info-dashboard "
            >
              {t("dashboard.see_all_notifications")}
            </Link>
            {/* <p className="text-center safqa-text-danger mt-3">There is no notifications yet!</p> */}
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key={"no-notifications"}>
          <p className="text-center safqa-text-danger mt-3">
            There is no notifications yet!
          </p>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div
      // className={`${language == "ar" && styles.dropdownAR}`}

      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <Dropdown
        overlay={menu}
        placement={language == "ar" ? "bottomLeft" : "bottomRight"}
      >
        <Link
          href="#"
          className={`position-relative nav-link btn me-2 border-0 safqa-white-color safqa-bg-primary-dashboard-gradient ${styles.notification}`}
        >
          <NotificationsIcon />
          {new_notifications.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {new_notifications.length}+
              {/* <span class="visually-hidden">unread messages</span> */}
            </span>
          )}
          {/* <img
                        src={role == 'admin' ||
                            !profile_business?.logo ?
                            theme == 'dark' ?
                                "/dark-logo.png" :
                                "/logo.png" :
                            profile_business.logo}
                        width={theme == 'dark' ? "60px" : "60px"} /> */}
        </Link>
      </Dropdown>
    </div>
  );
};

export default NotificationsDropDown;
