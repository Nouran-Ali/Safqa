import styles from "../../../../styles/Dashboard/dashboard.module.css";
import ProductInfoUpdate from "../../../../comps/Dashboard/Products/ProductInfoUpdate";
import axios from "../../../../lib/axios";
import {AxiosJwt} from "../../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../../store/slices/categorySlice";
import { getCountries } from "../../../../store/slices/countrySlice";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";
import { useRouter } from "next/router";
import { getProduct } from "../../../../store/slices/productSlice";

export default function UpdateProduct() {
    const { product, isLoading, api_errors } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountries());
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
          product && <ProductInfoUpdate product={product} />
        }
      </div>
    </div>
  );
}

