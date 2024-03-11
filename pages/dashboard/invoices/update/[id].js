import styles from "../../../../styles/Dashboard/dashboard.module.css";
import InvoiceType from "../../../../comps/Dashboard/Invoices/InvoiceType";
import CustomerInfo from "../../../../comps/Dashboard/Invoices/CustomerInfo";
import InvoiceInfo from "../../../../comps/Dashboard/Invoices/InvoiceInfo";
import InvoiceItems from "../../../../comps/Dashboard/Invoices/InvoiceItems";

import { getInvoice, ResetSuccess, updateInvoice } from "../../../../store/slices/invoiceSlice";
import { createInvoiceSchema } from '../../../../lib/validations/en/invoiceSchema'


import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import InvoiceItemsUpdate from "../../../../comps/Dashboard/Invoices/InvoiceItemsUpdate";
import {AxiosJwt} from "../../../../lib/axios";
import { getTime } from "../../../../lib/dates";
import { getRecurringIntervals } from "../../../../store/slices/recurringIntervalSlice";
import { getProducts } from "../../../../store/slices/productSlice";
import { getCustomers } from "../../../../store/slices/customerSlice";
import { getCountries } from "../../../../store/slices/countrySlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";
import UpdateInvoiceForm from "../../../../comps/Dashboard/Invoices/UpdateInvoiceForm";



export default function UpdateInvoicePage() {
    const { invoice, api_errors, isLoading } = useSelector((state) => state.invoice);
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;


   

    useEffect(() => {
        id && dispatch(getInvoice(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getRecurringIntervals());
        dispatch(getProducts());
        dispatch(getCustomers());
        dispatch(getCountries());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !invoice && isLoading && <LoadingPage />
                }
                {
                    !invoice && api_errors && <ErrorPage />
                }
                {
                    invoice && <UpdateInvoiceForm invoice={{ ...invoice, prductItems: invoice.invoice_item }} />
                }
            </div>
        </div>
    );
}


