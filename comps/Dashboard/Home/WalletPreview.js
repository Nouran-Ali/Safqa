// import styles from "../../../styles/Dashboard/TotalBalanceaAndTransactions.module.css";
import buttonStyles from "../../../styles/Dashboard/TotalBalanceaAndTransactions.module.css";

import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";
import { useEffect } from "react";
import { formatNumber } from "../../../lib/validations/services";
import jwt_decode from "jwt-decode";
import { getAdminHomePage, getHomePage } from "../../../store/slices/authSlice";

const WalletPreview = () => {
  const { token, statistics } = useSelector((state) => state.auth);
  const { wallet_profile, wallet_safqa } = statistics;

  const { profile_business } = useSelector((state) => state.profileBusiness);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("monthly");
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();

  let decoded = jwt_decode(token);
  const role = decoded?.role_type;

  useEffect(() => {
    if (role && role == "admin") {
      dispatch(getAdminHomePage());
    } else if (role && role != "admin") {
      dispatch(getHomePage());
      dispatch(getProfilesBusiness());
    }
  }, [dispatch, role]);

  return (
    <div className={`w-100 mt-2`}>
      <div
        className="d-flex justify-content-between text-center g-10"
        dir={language == "ar" ? "rtl" : "ltr"}
      >
        <div className={`${buttonStyles.balance} rounded-2`}>
          <p className="m-0 text-white fw-bold mt-3 fs-5">
            {wallet_profile?.total_balance &&
              formatNumber(wallet_profile?.total_balance)}{" "}
            {profile_business?.country?.short_currency}
            {wallet_safqa?.total_balance &&
              `${formatNumber(wallet_safqa.total_balance)} $`}
          </p>
          <p className="text-white-50">{t("dashboard.total_balance")}</p>
        </div>
        <div
          className={`${buttonStyles.balance} ${buttonStyles.Transactions} rounded-2`}
        >
          <p className="m-0 text-white fw-bold mt-3 fs-5">
            {wallet_profile?.awating_transfer &&
              formatNumber(wallet_profile.awating_transfer)}{" "}
            {profile_business?.country?.short_currency}
            {wallet_safqa?.awating_transfer &&
              `${formatNumber(wallet_safqa.awating_transfer)} $`}
          </p>
          <p className=" text-white-50">
            {t("dashboard.awaiting_to_transfer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletPreview;
