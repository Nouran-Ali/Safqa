import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import CustomerInfo from "../../../../../comps/Dashboard/Invoices/CustomerInfo";

import { getInvoice, ResetSuccess, updateInvoice } from "../../../../../store/slices/invoiceSlice";
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
import { getCustomers } from "../../../../../store/slices/customerSlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import { createQuickInvoiceSchemaAr } from "../../../../../lib/validations/ar/quickInvoiceSchemaAr";



export default function UpdateQuickInvoice() {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const {
        invoice,
        success,
        api_errors,
        isLoading,
    } = useSelector((state) => state.invoice);

    let defaultValues = null;
    if (invoice) {
        defaultValues = invoice
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createQuickInvoiceSchema : createQuickInvoiceSchemaAr),
        defaultValues,
    });

    const inputs = watch();

    useEffect(() => {
        success && dispatch(ResetSuccess()) && reset() && router.push('/dashboard/invoices')
    }, [success, dispatch, reset, router]);

    useEffect(() => {
        id && dispatch(getInvoice(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch])

    useEffect(() => {
        console.log("🚀 ~ file: UpdateInvoiceForm.js:61 ~ useEffect ~ invoice.currency:", invoice.currency)
        if (invoice) {
            if (invoice.discount_value) {
                setValue('is_discount', "1")
                setValue('discount_type', invoice.discount_type)
                setValue('discount_value', invoice.discount_value)
            } else {
                setValue('is_discount', "0")
                setValue('discount_type', "0")
                setValue('discount_value', "0")
            }
            if (invoice.is_open_invoice) {
                setValue('is_open_invoice', invoice.is_open_invoice)
                setValue('max_invoice', invoice.max_invoice)
                setValue('min_invoice', invoice.min_invoice)
            } else {
                setValue('is_open_invoice', '0')
                setValue('max_invoice', '0')
                setValue('min_invoice', '0')
            }
            setValue('currency_id', invoice?.currency?.id)
            setValue('expiry_date', invoice?.expiry_date.slice(0, 10))
            setValue('expiry_time', getTime())
            setValue('attach_file', "")
            setValue('is_terms', "0")

        }
    }, [invoice, setValue])
    
    const onSubmit = (data) => {
        dispatch(updateInvoice(data));
    };

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>
                    {
                        !invoice && isLoading && <LoadingPage />
                    }
                    {
                        !invoice && api_errors && <ErrorPage />
                    }
                    {
                        invoice && <>
                            {/* Customer Info */}
                            <CustomerInfo
                                errors={errors}
                                api_errors={api_errors}
                                register={register}
                                defaultValues={defaultValues}
                                inputs={inputs}
                                control={control}
                                setValue={setValue}
                            />

                            {/* QuickInvoiceInfo */}
                            <QuickInvoiceInfo
                                register={register}
                                errors={errors}
                                api_errors={api_errors}
                                defaultValues={defaultValues}
                                inputs={inputs}
                            />

                            <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
                        </>
                    }
                </div>
            </form>
        </div>
    );
}

