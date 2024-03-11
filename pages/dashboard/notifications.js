import styles from "../../styles/Dashboard/dashboard.module.css";
import style from "../../styles/Dashboard/Notification.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import Notification from "../../comps/Dashboard/Notification";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAdminNotifications,
  getNotifications,
} from "../../store/slices/notificationSlice";
import jwt_decode from "jwt-decode";
import LoadingPage from "../../comps/LoadingPage";

export const notification_types = {
  notification_create_invoice: {
    href: "/dashboard/invoices",
    icon: <DescriptionIcon sx={{ width: "20px" }} />,
  },
  notification_invoice_paid: {
    href: "/dashboard/invoices",
    icon: <DescriptionIcon sx={{ width: "20px" }} />,
  },
  notification_create_batch_invoice: {
    href: "/dashboard/invoices",
    icon: <DescriptionIcon sx={{ width: "20px" }} />,
  },
  notification_create_recurring_invoice: {
    href: "/dashboard/invoices",
    icon: <DescriptionIcon sx={{ width: "20px" }} />,
  },
  notification_create_shipping_invoice: {
    href: "/dashboard/invoices",
    icon: <DescriptionIcon sx={{ width: "20px" }} />,
  },
  notification_notifications_serviceRequest: {
    href: "notification_notifications_serviceRequest",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_new_order: {
    href: "/dashboard/products/productsOrdered",
    exact: true,
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_deposit: {
    href: "/dashboard/wallet",
    exact: true,
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_refund_transfered: {
    href: "/dashboard/refunds",
    exact: true,
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_notifications_hourly_deposit_rejected: {
    href: "/dashboard/wallet",
    exact: true,
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  notification_approve_vendor_account: {
    href: "/dashboard/editProfile",
    exact: true,
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },

  // admin
  profiles: {
    href: "/dashboard/admin/profile",
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
  wallet: {
    href: "/dashboard/admin/wallet",
    exact: true,
    icon: <AddShoppingCartIcon sx={{ width: "20px" }} />,
  },
};

export default function Notifications() {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { notifications, isLoading } = useSelector(
    (state) => state.notification
  );
  const reversed_notifications = notifications?.length
    ? [...notifications].reverse()
    : [];
  const dispatch = useDispatch();
  const {
    myData,
    statistics: { wallet_profile },
    token,
  } = useSelector((state) => state.auth);
  let decoded = jwt_decode(token);
  const role = decoded?.role_type;

  useEffect(() => {
    if (role && role == "admin") {
      dispatch(getAdminNotifications());
    } else if (role && role !== "admin") {
      dispatch(getNotifications());
    }
  }, [dispatch, role]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        <ul
          className={`${language == "en" ? "w-50" : "w-75 float-end"} ${
            style.ul
          }`}
          dir={language == "ar" ? "rtl" : "ltr"}
        >
          {reversed_notifications.length > 0 ? (
            reversed_notifications.map(
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
                <Notification
                  key={index}
                  is_new={is_new ? true : false}
                  icon={notification_types[notificationType || type]?.icon}
                  title={text || message}
                  date={date}
                  href={`${
                    notification_types[notificationType || type]?.href
                  }/${
                    type_id &&
                    !notification_types[notificationType || type]?.exact
                      ? type_id
                      : ""
                  }`}
                />
              )
            )
          ) : isLoading ? (
            <LoadingPage />
          ) : (
            <p>There is no notifications yet!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
