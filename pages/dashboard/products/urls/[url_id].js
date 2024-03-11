import styles from "../../../../styles/Dashboard/dashboard.module.css";
import ProductLinkInfoShow from "../../../../comps/Dashboard/Products/ProductLinkInfoShow";
import { AxiosJwt } from "../../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsLink } from "../../../../store/slices/productLinkSlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";
import InvoicesViewsShow from "../../../../comps/Dashboard/Invoices/InvoicesViewsShow";
import InvoiceTransactionsShow from "../../../../comps/Dashboard/Invoices/InvoiceTransactionsShow";

export default function ShowProductLink() {
    const { product_link, isLoading, api_errors } = useSelector((state) => state.productLink);
    const dispatch = useDispatch();
    const router = useRouter();
    const { url_id } = router.query;

    useEffect(() => {
        url_id && dispatch(getProductsLink(url_id))
    }, [dispatch, url_id])

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
                    product_link &&
                    <>
                        <ProductLinkInfoShow product_link={product_link} />
                        {/* Invoices Views */}
                        <InvoicesViewsShow invoice={product_link} />

                        {/* Invoice Transactions */}
                        <InvoiceTransactionsShow invoice={product_link} />
                    </>
                }
            </div>
        </div>
    );
}