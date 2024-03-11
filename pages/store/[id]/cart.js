import SmallNavbarSiteAllProducts from "../../../comps/Dashboard/Products/SmallNavbarSiteAllProducts";
import NavbarSiteAllProducts from "../../../comps/Dashboard/Products/NavbarSiteAllProducts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";
import {
  getStore,
  getStoredCart,
  hydrateCartState,
} from "../../../store/slices/cartSlice";
import CartComponent from "../../../comps/store/CartComponent";
import cardStyles from "../../../styles/Dashboard/products/Card.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const CartButtons = () => {
  const [total, setTotal] = useState(0);
  const { cart_products, profile } = useSelector((state) => state.cart);
  const router = useRouter();
  const { id } = router.query;
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    let tempTotal = 0;
    cart_products.map((p) => (tempTotal = tempTotal + p.quantity * p.price));
    setTotal(tempTotal);
  }, [cart_products, total]);

  return (
    <div className="container mb-5" dir={language == 'en' ? 'ltr' : 'rtl'}>
      <div className="d-flex justify-content-between">
        <div className="align-self-end">
          {/* <Link href={`/store/${id}`} className={`btn px-5 ${cardStyles.next}`}>{t('links.back')}</Link> */}
        </div>
        <div className="">
          <p className={`px-5 py-2 m-0 mt-3 ${cardStyles.count}`}>
            Total:{' '}
            <span className="fw-bold">
              {total} {profile?.currency?.short_currency}
            </span>
          </p>
          <Link
            href={total == 0 ? '#' : `/store/${id}/checkout`}
            className={`btn px-4 mt-4 ${
              language == 'en' ? 'float-end' : 'float-start'
            }  ${total == 0 ? cardStyles.disabled : cardStyles.next} `}
          >
            {t('process_to_checkout')}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const {
    products,
    profile,
    cart_products,
    logo,
    store_urlImage,
    isLoading,
    api_errors,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && dispatch(getStore(id));
  }, [dispatch, id]);

  useEffect(() => {
    products?.length && dispatch(getStoredCart());
  }, [dispatch, products]);

  useEffect(() => {
    products?.length && dispatch(hydrateCartState());
  }, [dispatch, cart_products, products]);

  return (
    <>
      {!cart_products && isLoading && <LoadingPage />}
      {!cart_products && api_errors && (
        <div className="container">
          <ErrorPage />
        </div>
      )}
      {cart_products && products && (
        <>
          <SmallNavbarSiteAllProducts profile={profile} />
          <NavbarSiteAllProducts
            href={`/store/${id}`}
            imageSrc={logo ? `${store_urlImage}/${logo}` : "/logo.png"}
          ></NavbarSiteAllProducts>
          <CartComponent />
          <CartButtons />
        </>
      )}
    </>
  );
};

Cart.getLayout = function getLayout(page) {
  return page;
};

export default Cart;
