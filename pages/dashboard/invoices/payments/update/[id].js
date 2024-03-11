import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import CustomerInfo from "../../../../../comps/Dashboard/Invoices/CustomerInfo";

import { ResetSuccess, updateInvoice } from "../../../../../store/slices/invoiceSlice";
import { createInvoiceSchema } from '../../../../../lib/validations/en/invoiceSchema'


import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {AxiosJwt} from "../../../../../lib/axios";
import QuickInvoiceInfo from "../../../../../comps/Dashboard/Invoices/QuickInvoiceInfo";
import { MagicBtn } from "../../../../../comps/Buttons";
import { createQuickInvoiceSchema } from "../../../../../lib/validations/en/quickInvoiceSchema";
import PaymentLinkInfoUpdate from "../../../../../comps/Dashboard/Invoices/PaymentLinkInfoUpdate";
import { getCountries } from "../../../../../store/slices/countrySlice";
import { getPayment } from "../../../../../store/slices/paymentLinkSlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";



export default function UpdatePaymentLink({ paymentLinkInfo }) {
    const { payment, isLoading, api_errors } = useSelector((state) => state.paymentLink);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    useEffect(() => {
        id && dispatch(getPayment(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !payment && isLoading && <LoadingPage />
                }
                {
                    !payment && api_errors && <ErrorPage />
                }
                {
                    payment && <PaymentLinkInfoUpdate paymentLinkInfo={payment} />
                }
                
            </div>
        </div>
    );
}
