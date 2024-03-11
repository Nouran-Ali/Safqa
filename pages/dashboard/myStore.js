import styles from "../../styles/Dashboard/dashboard.module.css";
import NavProducts from "../../comps/Dashboard/Products/NavProducts";
import LinkMyStore from "../../comps/Dashboard/Products/LinkMyStore";
import TapMyStore from "../../comps/Dashboard/Products/TapMyStore";
import CardMyStore from "../../comps/Dashboard/Products/CardMyStore";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getStoreProducts,
  getStore,
} from "../../store/slices/productSlice";
import { getCategories } from "../../store/slices/categorySlice";
import { useEffect, useState } from "react";
import StoreInfo from "../../comps/Dashboard/Products/StoreInfo";
import LoadingPage from "../../comps/LoadingPage";
import ErrorPage from "../../comps/AlertError";
import { useTranslation } from "react-i18next";

export default function MyStorePage() {
  const [activeLink, setActiveLink] = useState("all");
  const { store_products, storeInfo, success, isLoading, api_errors } =
    useSelector((state) => state.product);
  const [categoryProducts, setCategoryProducts] = useState();
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    if (store_products?.length || activeLink !== "all") {
      const new_products = store_products.filter(
        (product) => product.category.name_en == activeLink
      );
      setCategoryProducts(new_products);
    } else {
      setCategoryProducts(store_products);
    }
  }, [activeLink, store_products]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getStore());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav products*/}

        {/* <NavProducts /> */}

        {!storeInfo && isLoading && (
          <div className="vh-100">
            <LoadingPage />
          </div>
        )}
        {storeInfo && (
          <>
            <StoreInfo />
            {/* <LinkMyStore /> */}
            {
              store_products?.length > 0 ? (
                <TapMyStore
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                />
              ) : null
              // <p className="fs-5">{language == 'en' ? "There is no products in store yet." : "لا توجد منتجات في المتجر حتى الآن."}</p>
            }
            {/* store products */}
            <div className="row">
              {activeLink == "all" &&
                store_products?.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                    >
                      <CardMyStore product={product} />
                    </div>
                  );
                })}

              {categoryProducts ? (
                categoryProducts?.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                    >
                      <CardMyStore product={product} />
                    </div>
                  );
                })
              ) : (
                <p className="fs-6">
                  {language == "en"
                    ? "There is no store products for this category."
                    : "لا توجد منتجات متجر لهذه الفئة."}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
