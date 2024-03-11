import styles from "../../../../styles/Dashboard/dashboard.module.css";
import ProductInfoShow from "../../../../comps/Dashboard/Products/ProductInfoShow";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts } from "../../../../store/slices/productSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";

export default function ShowProduct() {
  
    const { product, isLoading, api_errors } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;


  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])


  useEffect(() => {
      id && dispatch(getProduct(id))
  }, [dispatch, id])

  
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {
          !product && isLoading && <LoadingPage />
        }
        {
          !product && api_errors && <ErrorPage />
        }
        {
          product && <ProductInfoShow product={product} />
        }
      </div>
    </div>
  );
}

