import SmallNavbarSiteAllProducts from "../../../comps/Dashboard/Products/SmallNavbarSiteAllProducts";
import NavbarSiteAllProducts from "../../../comps/Dashboard/Products/NavbarSiteAllProducts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";
import CartComponent from "../../../comps/store/CartComponent";
import cardStyles from "../../../styles/Dashboard/products/Card.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  getPayProduct,
  getStoredPayProducts,
} from "../../../store/slices/payProductSlice";
import PayProductComponent from "../../../comps/payProduct/PayProductComponent";

const PayProductButtons = () => {
  const [total, setTotal] = useState(0);
  const { link_products } = useSelector((state) => state.payProduct);
  const router = useRouter();
  const { id } = router.query;
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    let tempTotal = 0;
    link_products?.length > 0 &&
      link_products.map((p) => (tempTotal = tempTotal + p.quantity * p.price));
    setTotal(tempTotal);
  }, [link_products, total]);

  return (
    <div className="container mb-5 " dir={language == "en" ? "ltr" : "rtl"}>
      <div className={`${language == "en" ? "float-end" : "float-start"}`}>
        <span className={` px-5 py-2 m-0 ${cardStyles.count}`}>
          {t("total")}:{" "}
          <span className="fw-bold">
            {total} {link_products[0]?.currency?.short_currency}
          </span>
        </span>
        <br />
        <Link
          href={total == 0 ? "#" : `/payProduct/${id}/checkout`}
          className={`btn px-5 mt-4 ${
            language == "en" ? "float-end" : "float-start"
          } ${total == 0 ? cardStyles.disabled : cardStyles.next} `}
        >
          {t("links.next")}
        </Link>
      </div>
    </div>
  );
};

const PayProductPage = () => {
  const {
    products,
    link_products,
    profile,
    isLoading,
    api_errors,
    logo,
    store_urlImage,
  } = useSelector((state) => state.payProduct);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && dispatch(getPayProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (products?.length > 0 && id) {
      dispatch(getStoredPayProducts({ id }));
    }
  }, [dispatch, id, products]);

  return (
    <>
      {!products?.length && isLoading && <LoadingPage />}
      {!products?.length && api_errors && (
        <div className="container">
          <ErrorPage />
        </div>
      )}
      {products?.length && link_products && (
        <>
          <SmallNavbarSiteAllProducts profile={profile} />
          <NavbarSiteAllProducts
            href={`/payProduct/${id}`}
            imageSrc={logo ? `${store_urlImage}/${logo}` : "/logo.png"}
          />
          <PayProductComponent />
          <PayProductButtons />
        </>
      )}
    </>
  );
};

PayProductPage.getLayout = function getLayout(page) {
  return page;
};

export default PayProductPage;
