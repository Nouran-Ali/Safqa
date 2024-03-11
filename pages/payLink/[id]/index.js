import SmallNavbarSiteAllProducts from "../../../comps/Dashboard/Products/SmallNavbarSiteAllProducts";
import NavbarSiteAllProducts from "../../../comps/Dashboard/Products/NavbarSiteAllProducts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";
import {
  checkoutStore,
  getStore,
  getStoredCart,
  hydrateCartState,
} from "../../../store/slices/cartSlice";
import cardStyles from "../../../styles/Dashboard/products/Card.module.css";
import Link from "next/link";
import CheckoutComponent from "../../../comps/store/CheckoutComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  checkoutSchema,
  payLinkSchema,
} from "../../../lib/validations/en/checkoutSchema";
import LoadingSpinner from "../../../comps/LoadingSpinner";
import { useTranslation } from "react-i18next";
import PayLinkCheckoutComponent from "../../../comps/store/PayLinkCheckoutComponent";
import {
  checkoutPayLink,
  getPayLink,
  ResetSuccess,
} from "../../../store/slices/payLinkSlice";
import { payLinkSchemaAr } from "../../../lib/validations/ar/checkoutSchemaAr";

const CheckoutButtons = ({ isLoading, isValid, pay_link, setValue }) => {
  // const [total, setTotal] = useState(pay_link?.payment_amount);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setValue("invoice_value", pay_link?.payment_amount);
  }, [pay_link, setValue]);

  return (
    <div className="container mb-5 " dir={language == "en" ? "ltr" : "rtl"}>
      <div className={`${language == "en" ? "float-end" : "float-start"}`}>
        {/* <span className={` px-5 py-2 m-0 ${cardStyles.count}`}>{t('total')}: <span className="fw-bold">{total} $</span></span>
        <br /> */}
        {/* <button
          href={total == 0 ? '#' : `/payProduct/${id}/checkout`}
          className={`btn px-5 mt-4 ${language == 'en' ? 'float-end' : 'float-start'} ${total == 0 ? cardStyles.disabled : cardStyles.next} `}
        >{t('links.next')}</button> */}
        <button
          type="submit"
          // className={`btn px-5 mt-4 mb-3 ${language == 'en' ? 'float-end' : 'float-start'} ${total == 0 || isLoading || !isValid ? cardStyles.disabled : cardStyles.next} `}
          className={`btn px-5 mt-4 mb-3 ${
            language == "en" ? "float-end" : "float-start"
          } ${cardStyles.next} `}
        >
          {isLoading ? <LoadingSpinner /> : t("links.checkout")}
        </button>
      </div>
    </div>
  );
};

const CheckoutPayLinkPage = () => {
  const {
    profile,
    pay_link,
    checkout_info,
    store_urlImage,
    logo,
    invoice_id,
    success,
    isLoading,
    api_errors,
  } = useSelector((state) => state.payLink);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const defaultValues = checkout_info;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(language == "en" ? payLinkSchema : payLinkSchemaAr),
    defaultValues,
  });

  // get payment information
  useEffect(() => {
    id && dispatch(getPayLink(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("invoice_id : ", invoice_id);
    if (invoice_id && success) {
      dispatch(ResetSuccess());
      router.push(`/payInvoice/${invoice_id}`);
    }
  }, [dispatch, invoice_id, router, success]);

  const onSubmit = (data) => {
    dispatch(checkoutPayLink({ ...data, id }));
  };

  return (
    <>
      {!pay_link && isLoading && <LoadingPage />}
      {!pay_link && api_errors && (
        <div className="container">
          <ErrorPage />
        </div>
      )}
      {pay_link && (
        <>
          <NavbarSiteAllProducts
            href={`/payLink/${id}`}
            imageSrc={logo ? `${store_urlImage}/${logo}` : "/logo.png"}
          />
          <div className="container" dir={language == "en" ? "ltr" : "rtl"}>
            <form
              className={`mt-2 w-75 mx-auto`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <PayLinkCheckoutComponent
                api_errors={api_errors}
                errors={errors}
                register={register}
                pay_link={pay_link}
              />
              <CheckoutButtons
                isValid={isValid}
                isLoading={isLoading}
                pay_link={pay_link}
                setValue={setValue}
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

CheckoutPayLinkPage.getLayout = function getLayout(page) {
  return page;
};

export default CheckoutPayLinkPage;
