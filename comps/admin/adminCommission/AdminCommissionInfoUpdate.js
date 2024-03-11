import styles from "../../../styles/Dashboard/Create.module.css";
import {
  SafqaInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { ResetSuccess, updatePaymentMethod } from "../../../store/slices/paymentMethodSlice";
import { updateAdminCommissionSchemaAr } from "../../../lib/validations/ar/commissionSchemaAr";
import { updateAdminCommissionSchema } from "../../../lib/validations/en/commissionSchema";
import { updateAdminCommission } from "../../../store/slices/adminCommissionSlice";

const AdminCommissionInfoUpdate = ({ adminCommission }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { isLoading, api_errors, success } = useSelector(
    (state) => state.adminCommission
  );

  const defaultValues = adminCommission;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updateAdminCommissionSchema : updateAdminCommissionSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/commissions")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(updateAdminCommission(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.commission_info")}</p>
        <hr />

        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.safqa_commission")}
              name="safqa_commission"
              type="number"
              register={register}
              error={errors.safqa_commission?.message || api_errors?.safqa_commission}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.payment_commission")}
              name="payment_commission"
              type="number"
              register={register}
              error={errors.payment_commission?.message || api_errors?.payment_commission}
              required
            />
          </div>
          
        </div>
        
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default AdminCommissionInfoUpdate;
