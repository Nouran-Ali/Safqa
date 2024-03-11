import styles from "../../../styles/Dashboard/dashboard.module.css";
import CustomerInfo from "../../../comps/Dashboard/Customers/CustomerInfo";
import BankInfo from "../../../comps/Dashboard/Customers/BankInfo";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, ResetSuccess } from "../../../store/slices/customerSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCustomerSchema } from "../../../lib/validations/en/customerSchema";
import { useEffect } from "react";
import {useRouter} from 'next/router'
import { createCustomerSchemaAr } from "../../../lib/validations/ar/customerSchemaAr";
import { useTranslation } from "react-i18next";

export default function CreateCustomer() {

  const router = useRouter()
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { customerInfo, bankInfo, api_errors, isLoading, success } =
    useSelector((state) => state.customer);
  const defaultValues = { ...customerInfo, ...bankInfo };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createCustomerSchema : createCustomerSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/customers")
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    console.table(data);
    dispatch(createCustomer(data));
  };

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>

          {/* Customer Info */}
          <CustomerInfo
            errors={errors}
            api_errors={api_errors}
            register={register}
            defaultValues={defaultValues}
            watch={watch}
          />

          {/* Bank Info */}
          <BankInfo
            isLoading={isLoading}
            errors={errors}
            api_errors={api_errors}
            register={register}
            success={success}
            reset={reset}
          />
        </div>
      </form>
    </div>
  );
}
