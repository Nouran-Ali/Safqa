import styles from "../styles/Buttons.module.css";
import Link from "next/link";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Modal } from "antd";
import { SafqaInput } from "./Dashboard/Inputs";
import { ResetSuccess, updateRequestMoney } from "../store/slices/depositSlice";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createDepositSchema } from "../lib/validations/en/depositSchema";
import { createDepositSchemaAr } from "../lib/validations/ar/depositSchemaAr";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { USDConvertCurrency } from "../lib/validations/services";

const BtnEditWithdraw = ({ depositInfo }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [usdAmount, setUsdAmount] = useState(0);
  const [feesAmount, setFeesAmount] = useState(0);
  const formRef = useRef();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { api_errors, success, isLoading } = useSelector(
    (state) => state.deposit
  );
  const {
    statistics: { wallet_profile, rate },
  } = useSelector((state) => state.auth);
  const total_balance = wallet_profile?.total_balance;
  const defaultValues = depositInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == "en"
        ? createDepositSchema(total_balance)
        : createDepositSchemaAr(total_balance)
    ),
    defaultValues,
  });

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess());
      reset();
      setModal1Open(false);
    }
  }, [dispatch, reset, success]);

  const onChangeAmount = (e) => {
    setValue("amount", e.target.value);
    setFeesAmount(e.target.value);
    const usdValue = USDConvertCurrency({
      rate: rate,
      amount: e.target.value,
      toUsd: true,
    });
    setUsdAmount(usdValue);
  };

  const onChangeUsdAmount = (e) => {
    setUsdAmount(e.target.value);
    const amount = USDConvertCurrency({
      rate: rate,
      amount: e.target.value,
      toUsd: false,
    });
    setValue("amount", amount);
  };

  useEffect(() => {
    setValue("amount", depositInfo.amount);
    setFeesAmount(depositInfo.amount);
    const usd = USDConvertCurrency({
      rate: rate,
      amount: depositInfo.amount,
      toUsd: true,
    });
    setUsdAmount(usd);
  }, [depositInfo.amount, setValue]);

  const onSubmit = (data) => {
    dispatch(updateRequestMoney(data));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.edit}>
        <Link
          href={"#"}
          className="rounded-circle"
          onClick={() => setModal1Open(true)}
        >
          <ModeEditOutlineIcon sx={{ width: "15px" }} />
        </Link>

        <Modal
          className={theme == "dark" ? "dark-ant-modal" : ""}
          title={language == "en" ? "Withdraw from wallet" : "سحب من المحفظة"}
          style={{
            top: 20,
          }}
          open={modal1Open}
          confirmLoading={isLoading}
          okText="create"
          onOk={handleSubmit(onSubmit)}
          onCancel={() => setModal1Open(false)}
        >
          <div className={` ${language == "ar" ? "text-end" : "text-start"} `}>
            <div className="row">
              <div className="col-6">
                <div className="card-input">
                  <label htmlFor="amount" className="card-input__label">
                    {t("dashboard.amount")} (
                    {profile_business?.country?.short_currency})
                  </label>
                  <input
                    type="number"
                    className={`card-input__input 
                                    ${
                                      errors?.amount?.message &&
                                      "text-danger border-danger"
                                    }
                                    `}
                    autoComplete="off"
                    {...register("amount")}
                    onChange={onChangeAmount}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="card-input">
                  <label htmlFor="amount" className="card-input__label">
                    {t("dashboard.amount")} (
                    {language == "en" ? "USD" : "دولار أمريكي"})
                  </label>
                  <input
                    type="number"
                    className="card-input__input"
                    autoComplete="off"
                    onChange={onChangeUsdAmount}
                    value={usdAmount}
                  />
                </div>
              </div>
            </div>
            <p className="fs-6 mt-2 safqa-text-info-dashboard">
              {t("dashboard.withdraw_fees_note")} : {(feesAmount || 0) * 0.03}{" "}
              {profile_business?.country?.short_currency}
            </p>
            {/* <MagicBtnCreateLink label={t("dashboard.create")} isLoading={isLoading} /> */}
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default BtnEditWithdraw;
