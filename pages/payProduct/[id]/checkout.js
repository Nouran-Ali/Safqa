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
import { checkoutSchema } from "../../../lib/validations/en/checkoutSchema";
import LoadingSpinner from "../../../comps/LoadingSpinner";
import { useTranslation } from "react-i18next";
import {
  checkoutPayProduct,
  getPayProduct,
  getStoredPayProducts,
  ResetSuccess,
} from "../../../store/slices/payProductSlice";
import { checkoutSchemaAr } from "../../../lib/validations/ar/checkoutSchemaAr";

const CheckoutButtons = ({ isLoading, isValid }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="d-flex justify-content-between">
      <div className="align-self-end mb-4">
        {/* <Link href={`/payProduct/${id}`} className={`btn px-5 ${cardStyles.next}`}>{t('links.back')}</Link> */}
      </div>
      <div className="mb-4">
        {/* <p className={`px-5 py-2 m-0 ${cardStyles.count}`}>{t('total')}: <span className="fw-bold">{total} $</span></p> */}
        <button
          type="submit"
          className={`btn px-5 mt-4 ${
            language == "en" ? "float-end" : "float-start"
          } 
                    ${cardStyles.next} `}
        >
          {isLoading ? <LoadingSpinner /> : t("links.checkout")}
        </button>
      </div>
    </div>
  );
};

const CheckoutPayProductPage = () => {
  const {
    products,
    profile,
    link_products,
    checkout_info,
    store_urlImage,
    logo,
    invoice_id,
    success,
    isLoading,
    api_errors,
  } = useSelector((state) => state.payProduct);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    link_products?.map((p) => (tempTotal = tempTotal + p.quantity * p.price));
    setTotal(tempTotal);
  }, [link_products, total]);

  const defaultValues = checkout_info;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(language == "en" ? checkoutSchema : checkoutSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    id && dispatch(getPayProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (products?.length > 0 && id) {
      dispatch(getStoredPayProducts({ id }));
    }
  }, [dispatch, id, products]);

  useEffect(() => {
    console.log("invoice_id : ", invoice_id);
    if (invoice_id && success) {
      dispatch(ResetSuccess());
      router.push(`/payInvoice/${invoice_id}`);
    }
  }, [dispatch, invoice_id, router, success]);

  const onSubmit = (data) => {
    dispatch(checkoutPayProduct({ ...data, id }));
  };

  return (
    <>
      {!link_products && isLoading && <LoadingPage />}
      {!link_products && api_errors && (
        <div className="container">
          <ErrorPage />
        </div>
      )}
      {link_products?.length > 0 && products && (
        <>
          <SmallNavbarSiteAllProducts profile={profile} />
          <NavbarSiteAllProducts
            href={`/payProduct/${id}`}
            imageSrc={logo ? `${store_urlImage}/${logo}` : "/logo.png"}
          />
          <div className="container" dir={language == "en" ? "ltr" : "rtl"}>
            <form
              className={`mt-2 w-75 mx-auto`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <CheckoutComponent
                api_errors={api_errors}
                errors={errors}
                register={register}
                total={total}
                currency={link_products[0]?.currency?.short_currency}
              />
              <CheckoutButtons isValid={isValid} isLoading={isLoading} />
            </form>
          </div>
        </>
      )}
    </>
  );
};

CheckoutPayProductPage.getLayout = function getLayout(page) {
  return page;
};

export default CheckoutPayProductPage;
