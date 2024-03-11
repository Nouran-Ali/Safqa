import styles from "../../../../styles/Dashboard/dashboard.module.css";
import ProductInfoShow from "../../../../comps/Dashboard/Products/ProductInfoShow";
import {AxiosJwt} from "../../../../lib/axios";
import RefundInfoShow from "../../../../comps/Dashboard/Products/RefundInfoShow";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";
import { getRefund } from "../../../../store/slices/refundSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function ShowRefund() {
    const { refund, isLoading, api_errors } = useSelector((state) => state.refund);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getRefund(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !refund && isLoading && <LoadingPage />
                }
                {
                    !refund && api_errors && <ErrorPage />
                }
                {
                    refund && <RefundInfoShow refund={refund} />
                }
                
            </div>
        </div>
    );
}

