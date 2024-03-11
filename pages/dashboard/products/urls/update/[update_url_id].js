import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ProductLinkInfoUpdate from "../../../../../comps/Dashboard/Products/ProductLinkInfoUpdate";
import { getProductsLink } from "../../../../../store/slices/productLinkSlice";
import { getProducts } from "../../../../../store/slices/productSlice";
import LoadingSpinner from "../../../../../comps/LoadingSpinner";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdateProductLink() {
    const { product_link, isLoading, api_errors } = useSelector((state) => state.productLink);
    const dispatch = useDispatch();
    const router = useRouter();
    const { update_url_id } = router.query;


    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
        update_url_id && dispatch(getProductsLink(update_url_id))
    }, [dispatch, update_url_id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !product_link && isLoading && <LoadingPage />
                }
                {
                    !product_link && api_errors && <ErrorPage />
                }
                {
                    product_link && <ProductLinkInfoUpdate product_link={product_link}  />
                }
            </div>
        </div>
    );
}
