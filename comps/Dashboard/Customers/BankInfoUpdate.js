import styles from "../../../styles/Dashboard/Create.module.css";
import { MagicBtn } from "../../Buttons";
import { MagicInput, SafqaInput, MagicSelectInput, SafqaSelect } from "../Inputs";
import {
  setBankId,
  setBankAccount,
  setIBAN,
  ResetSuccess,
} from "../../../store/slices/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const BankInfoUpdate = ({ errors, api_errors, register, success, isLoading, reset }) => {
  const { banks } = useSelector(state => state.global.data)
  const [t, i18n] = useTranslation();
  const { theme } = useTheme();

  const dispatch = useDispatch()
  useEffect(() => {
    success && setTimeout(() => dispatch(ResetSuccess()), 5000);
    reset();
  }, [success, dispatch, reset]);

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <p className="px-4 fs-5">
          Bank info <span className="ms-2">( optional )</span>
        </p>
        <hr />

        {/* bank name */}
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              label={t("dashboard.bank_name")}
              options={banks}
              register={register}
              name="bank_id"
              error={errors.bank_id?.message || api_errors?.bank_id}
              option_name="name_en"
              option_name_ar="name_ar"
            />
          </div>
        </div>

        <div className="row">
          {/* bank account */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              label="Bank Account"
              name="bank_account"
              register={register}
              error={errors.bank_account?.message || api_errors?.bank_account}

            />
          </div>
          {/* IBAN */}
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3 mb-3">
            <SafqaInput
              type="text"
              label="IBAN"
              name="IBAN"
              register={register}
              error={errors.IBAN?.message || api_errors?.IBAN}
            />
          </div>
        </div>

      </div>

      <MagicBtn label="Save" isLoading={isLoading} />
    </div>
  );
};

export default BankInfoUpdate;

