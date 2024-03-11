import styles from "../../../styles/Dashboard/dashboard.module.css";
import buttonStyles from "../../../styles/Dashboard/TotalBalanceaAndTransactions.module.css";

import NavProducts from "../../../comps/Dashboard/Products/NavProducts";
import SearchProducts from "../../../comps/Dashboard/Products/SearchProducts";
import Products from "../../../comps/Dashboard/Products/Products";
import { getProducts as getProductsThunk } from "../../../store/slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TotalBalanceaAndTransactions from "../../../comps/Dashboard/Home/TotalBalanceaAndTransactions";
import SectionGradient from "../../../comps/Dashboard/SectionGradient";
import { useTranslation } from "react-i18next";
import { BtnCreateDeposit } from "../../../comps/Buttons";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "next-themes";
import Deposits from "../../../comps/Dashboard/Deposits/Deposits";
import { getDeposits } from "../../../store/slices/depositSlice";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";
import {
  formatNumber,
  USDConvertCurrency,
} from "../../../lib/validations/services";
import { AxiosGlobal } from "../../../lib/axios";
import { convertCurrency } from "../../../lib/currencyServices";
import { getUSDBalance } from "../../../store/slices/authSlice";
import { getPaymentType } from "../../../store/slices/paymentInfoSlice";

export default function UserWallet() {
  const {
    statistics: { wallet_profile, usd_balance, rate },
  } = useSelector((state) => state.auth);
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const [usdAwaitingBalance, setUsdAwaitingBalance] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      profile_business?.country?.short_currency &&
      wallet_profile?.total_balance
    ) {
      dispatch(
        getUSDBalance({
          from: profile_business?.country?.short_currency,
          to: "USD",
          amount: wallet_profile?.total_balance,
        })
      );
    }
  }, [
    dispatch,
    profile_business?.country?.short_currency,
    wallet_profile?.total_balance,
  ]);

  useEffect(() => {
    if (rate && wallet_profile?.awating_transfer) {
      const converted = USDConvertCurrency({
        amount: wallet_profile?.awating_transfer,
        toUsd: true,
        rate: rate,
      });
      setUsdAwaitingBalance(formatNumber(converted));
    }
  }, [dispatch, rate, usd_balance, wallet_profile?.awating_transfer]);

  useEffect(() => {
    dispatch(getDeposits());
    dispatch(getProfilesBusiness());
    dispatch(getPaymentType());
  }, [dispatch]);
  

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        <div
          className={`d-flex justify-content-between text-center flex-wrap g-10 ${buttonStyles.container}`}
          dir={language == "ar" ? "rtl" : "ltr"}
        >
          <div className={`${buttonStyles.balance} rounded-2`}>
            <h2 className="text-white fw-bold mt-3">
              {wallet_profile?.total_balance &&
                formatNumber(wallet_profile?.total_balance)}{" "}
              {profile_business?.country?.short_currency}
              <br />
            </h2>
            <p className="text-white-50">
              {t("dashboard.total_balance")}
              <span className="text-white">
                {usd_balance && ` ≈ ${formatNumber(usd_balance)} USD`}
              </span>
            </p>
          </div>
          <div
            className={`${buttonStyles.balance} ${buttonStyles.Transactions} rounded-2`}
          >
            <h2 className="text-white fw-bold mt-3">
              {wallet_profile?.awating_transfer &&
                formatNumber(wallet_profile?.awating_transfer)}{" "}
              {profile_business?.country?.short_currency}
            </h2>
            <p className="text-white-50">
              {t("dashboard.awaiting_to_transfer")}
              <span className="text-white">
                {` ≈ ${usdAwaitingBalance} USD`}
              </span>
            </p>
          </div>
        </div>

        {/* <div className="d-flex">
                    <SectionGradient text={`${t("dashboard.total_balance")} 00.00`} />
                    <SectionGradient text={`${t("dashboard.awaiting_to_transfer")} 00.00`} />
                </div> */}

        {/* <TotalBalanceaAndTransactions /> */}
        <Deposits />
      </div>
    </div>
  );
}
