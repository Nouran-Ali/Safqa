import styles from "../../../../styles/Dashboard/dashboard.module.css";
import CustomerInfoUpdate from "../../../../comps/Dashboard/Customers/CustomerInfoUpdate";
import BankInfoUpdate from "../../../../comps/Dashboard/Customers/BankInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, ResetSuccess, getCustomer } from "../../../../store/slices/customerSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCustomerSchema } from "../../../../lib/validations/en/customerSchema";
import { useEffect } from "react";
import axios from "../../../../lib/axios";
import { useRouter } from 'next/router'
import { AxiosJwt } from "../../../../lib/axios";
import ErrorPage from "../../../../comps/AlertError";
import LoadingPage from "../../../../comps/LoadingPage";
import { updateCustomerSchemaAr } from "../../../../lib/validations/ar/customerSchemaAr";
import { useTranslation } from "react-i18next";


export default function UpdateCustomer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { id } = router.query;
  const { customer, api_errors, isLoading, success } = useSelector((state) => state.customer);

  let defaultValues = null;

  if (customer) {
    defaultValues = {
      ...customer,
      phone_number_code_id: customer.country.id,
      bank_id: customer?.bank.id
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updateCustomerSchema : updateCustomerSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/customers")
  }, [dispatch, router, success]);

  useEffect(() => {
    id && dispatch(getCustomer(id))
  }, [dispatch, id])

  const onSubmit = (data) => {
    dispatch(updateCustomer(data));
  };

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>

          {
            !customer && isLoading && <LoadingPage />
          }
          {
            !customer && api_errors && <ErrorPage />
          }
          {
            customer && <>

              {/* Customer Info */}
              <CustomerInfoUpdate
                errors={errors}
                api_errors={api_errors}
                register={register}
                watch={watch}
              />
              {/* Bank Info */}
              <BankInfoUpdate
                label="Save"
                isLoading={isLoading}
                errors={errors}
                api_errors={api_errors}
                register={register}
                success={success}
                reset={reset}
              />
            </>
          }

        </div>
      </form>
    </div>
  );
}
