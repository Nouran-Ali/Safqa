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
  ResetSuccess,
} from "../../../store/slices/cartSlice";
import cardStyles from "../../../styles/Dashboard/products/Card.module.css";
import Link from "next/link";
import CheckoutComponent from "../../../comps/store/CheckoutComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../../../lib/validations/en/checkoutSchema";
import LoadingSpinner from "../../../comps/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { checkoutSchemaAr } from "../../../lib/validations/ar/checkoutSchemaAr";

const CheckoutButtons = ({ isLoading, total }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="d-flex justify-content-between">
      <div className="align-self-end">
        {/* <Link href={`/store/${id}/cart`} className={`btn px-5 ${cardStyles.next}`}>{t('links.back')}</Link> */}
      </div>
      <div className="">
        {/* <p className={`px-5 py-2 m-0 ${cardStyles.count}`}>
          Total:{' '}
          <span className="fw-bold">
            {total} {profile?.currency?.short_currency}{' '}
          </span>
        </p> */}
        <button
          type="submit"
          className={`btn px-5 mt-4 ${
            language == 'en' ? 'float-end' : 'float-start'
          } ${
            total == 0 || isLoading ? cardStyles.disabled : cardStyles.next
          } `}
        >
          {isLoading ? <LoadingSpinner /> : t('links.checkout')}
        </button>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const {
    products,
    profile,
    cart_products,
    invoice_id,
    checkout_info,
    logo,
    store_urlImage,
    success,
    isLoading,
    api_errors,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const [total, setTotal] = useState(0);


  const defaultValues = checkout_info;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == "en" ? checkoutSchema : checkoutSchemaAr),
    defaultValues,
  });

  
  useEffect(() => {
    let tempTotal = 0;
    cart_products.map((p) => (tempTotal = tempTotal + p.quantity * p.price));
    setTotal(tempTotal);
  }, [cart_products, total]);

  useEffect(() => {
    id && dispatch(getStore(id));
  }, [dispatch, id]);

  useEffect(() => {
    products?.length && dispatch(getStoredCart());
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(hydrateCartState());
  }, [dispatch, cart_products, products]);

  useEffect(() => {
    console.log("invoice_id : ", invoice_id);
    if (invoice_id && success) {
      dispatch(ResetSuccess());
      router.push(`/payInvoice/${invoice_id}`);
    }
  }, [dispatch, invoice_id, router, success]);

  const onSubmit = (data) => {
    dispatch(checkoutStore({ ...data, id }));
  };

  return (
    <>
      {!cart_products && isLoading && <LoadingPage />}
      {!cart_products && api_errors && (
        <div className="container">
          <ErrorPage />
        </div>
      )}
      {cart_products.length > 0 && products && (
        <>
          <SmallNavbarSiteAllProducts profile={profile} />
          <NavbarSiteAllProducts
            href={`/store/${id}`}
            imageSrc={logo ? `${store_urlImage}/${logo}` : '/logo.png'}
          />

          <div className="container" dir={language == 'en' ? 'ltr' : 'rtl'}>
            <form
              className={`mt-2 w-75 mx-auto`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <CheckoutComponent
                api_errors={api_errors}
                errors={errors}
                register={register}
                total={total}
                currency={profile?.currency?.short_currency}
              />
              <CheckoutButtons isLoading={isLoading} total={total} />
            </form>
          </div>
        </>
      )}
    </>
  );
};

CheckoutPage.getLayout = function getLayout(page) {
  return page;
};

export default CheckoutPage;
