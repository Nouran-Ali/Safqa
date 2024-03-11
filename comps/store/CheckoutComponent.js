// import LoadingSpinner from "../../LoadingSpinner";
import { Modal, Button, Space, Tag } from "antd";
import {
  SafqaInput,
  SafqaRadioInput,
  SafqaTextArea,
} from "../Dashboard/Inputs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cardStyles from "../../styles/Dashboard/products/Card.module.css";
import styles from "../../styles/Dashboard/Create.module.css";

import { MagicBtn, MagicBtnCreateLink } from "../Buttons";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeleteFromCart, EditQuantity } from "../../store/slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { formatNumber } from "../../lib/validations/services";

const CheckoutComponent = ({
  register,
  errors,
  api_errors,
  total,
  currency,
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();

  return (
    <div
      className={`mb-4 rounded-2 ${
        theme == "dark" ? styles.info_dark : styles.info
      } m-0 p-4`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div className="d-flex justify-content-between">
        <p className="px-4 fs-5">{t("dashboard.customer_info")}</p>
        <p className="px-4 fs-5">
          {t("total")} :{" "}
          <span className="fw-bold">
            {formatNumber(total)} ({currency})
          </span>
        </p>
      </div>
      <hr />

      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 px-4 mt-3">
          <SafqaInput
            label={t("dashboard.customer_name")}
            name="customer_name"
            type="text"
            register={register}
            error={errors.customer_name?.message || api_errors?.customer_name}
            required
          />
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 px-4 mt-3">
          <SafqaInput
            label={t("dashboard.customer_phone_number")}
            name="customer_mobile"
            type="text"
            register={register}
            error={
              errors.customer_mobile?.message || api_errors?.customer_mobile
            }
            required
          />
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 px-4 mt-3">
          <SafqaInput
            label={t("dashboard.customer_email")}
            name="customer_email"
            type="text"
            register={register}
            error={errors.customer_email?.message || api_errors?.customer_email}
          />
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 px-4 mt-3">
          <SafqaInput
            type="text"
            name="civil_id"
            register={register}
            label={t("dashboard.civil_id")}
            error={errors.civil_id?.message || api_errors?.civil_id}
          />
        </div>

        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
          <SafqaTextArea
            name="comment"
            register={register}
            label={t("dashboard.comments")}
            error={errors.comment?.message || api_errors?.comment}
            rows="3"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
