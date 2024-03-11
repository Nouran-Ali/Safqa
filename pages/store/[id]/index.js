import Tap from "../../../comps/Dashboard/Products/Tap";
import CardSiteAllProducts from "../../../comps/Dashboard/Products/CardSiteAllProducts";
import SmallNavbarSiteAllProducts from "../../../comps/Dashboard/Products/SmallNavbarSiteAllProducts";
import NavbarSiteAllProducts from "../../../comps/Dashboard/Products/NavbarSiteAllProducts";
import Header from "../../../comps/Dashboard/Products/Header";
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

const Store = () => {
  const [activeLink, setActiveLink] = useState("all");
  const {
    products,
    cart_products,
    store_urlImage,
    logo,
    profile,
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
      {!products && isLoading && <LoadingPage />}
      {!products && api_errors && (
        <div className="container">
          <ErrorPage />
        </div>
      )}
      {products && (
        <>
          <SmallNavbarSiteAllProducts profile={profile} />
          <NavbarSiteAllProducts
            href={`/store/${id}`}
            imageSrc={logo ? `${store_urlImage}/${logo}` : "/logo.png"}
          />
          <Header />
          <Tap activeLink={activeLink} setActiveLink={setActiveLink} />
          <CardSiteAllProducts activeLink={activeLink} />
        </>
      )}
    </>
  );
};

Store.getLayout = function getLayout(page) {
  return page;
};

export default Store;
