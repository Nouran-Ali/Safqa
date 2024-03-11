import styles from "../../../../styles/Dashboard/dashboard.module.css";
import InvoiceType from "../../../../comps/Dashboard/Invoices/InvoiceType";
import CustomerInfo from "../../../../comps/Dashboard/Invoices/CustomerInfo";
import QuickInvoiceInfo from "../../../../comps/Dashboard/Invoices/QuickInvoiceInfo";
import { createQuickInvoiceSchema } from "../../../../lib/validations/en/quickInvoiceSchema";
import { MagicBtn } from "../../../../comps/Buttons";
import { Router, useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createQuickInvoice, ResetSuccess } from "../../../../store/slices/invoiceSlice";
import { getCustomers } from "../../../../store/slices/customerSlice";
import { createQuickInvoiceSchemaAr } from "../../../../lib/validations/ar/quickInvoiceSchemaAr";

export default function CreateNewQuickInvoice() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const { myData: { nationality } } = useSelector(state => state.auth);
    console.log("🚀 ~ file: create.js:20 ~ CreateNewQuickInvoice ~ nationality", nationality)
    const { success, api_errors, isLoading, quickInvoiceInfo } =
        useSelector((state) => state.invoice);

    const defaultValues = quickInvoiceInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createQuickInvoiceSchema : createQuickInvoiceSchemaAr),
        defaultValues,
    });

    const inputs = watch();

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push("/dashboard/invoices/quick")
    }, [success, dispatch, router]);



    useEffect(() => {
        setValue('currency_id', nationality?.id)
    }, [language, nationality?.id, setValue])

    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        dispatch(createQuickInvoice(data));
    };

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch])

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>
                    {/* Invoice Type */}
                    <InvoiceType />

                    {/* Customer Info */}
                    <CustomerInfo
                        register={register}
                        errors={errors}
                        api_errors={api_errors}
                        defaultValues={defaultValues}
                        control={control}
                        inputs={inputs}
                        setValue={setValue}
                    />

                    {/* Invoice Info */}
                    <QuickInvoiceInfo
                        register={register}
                        errors={errors}
                        api_errors={api_errors}
                        defaultValues={defaultValues}
                        inputs={inputs}
                    />

                    <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />

                </div>
            </form>
        </div>
    );
}

