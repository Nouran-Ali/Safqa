import styles from "../../../styles/Dashboard/dashboard.module.css";
import InvoiceType from "../../../comps/Dashboard/Invoices/InvoiceType";
import CustomerInfo from "../../../comps/Dashboard/Invoices/CustomerInfo";
import InvoiceInfo from "../../../comps/Dashboard/Invoices/InvoiceInfo";
import InvoiceItems from "../../../comps/Dashboard/Invoices/InvoiceItems";

import { createInvoice, getInvoicesExpiry, ResetSuccess } from "../../../store/slices/invoiceSlice";
import { createInvoiceSchema } from '../../../lib/validations/en/invoiceSchema'


import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { getCookie } from "cookies-next";
import { getDateAfterDays, getDateAfterMinutes, getTime, getTomorrowDate } from "../../../lib/dates";
import { getRecurringIntervals } from "../../../store/slices/recurringIntervalSlice";
import { getProducts } from "../../../store/slices/productSlice";
import { getCustomers } from "../../../store/slices/customerSlice";
import { getCountries } from "../../../store/slices/countrySlice";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";
import { createInvoiceSchemaAr } from "../../../lib/validations/ar/invoiceSchemaAr";



export default function CreateNewInvoice() {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const { myData: { nationality } } = useSelector(state => state.auth);
    const { invoice_expiry } = useSelector(state => state.invoice);
    const { profile_business } = useSelector(state => state.profileBusiness);
    const dispatch = useDispatch()

    const {
        success,
        api_errors,
        isLoading,
        customerInfo,
        invoiceInfo,
        prductItems,
    } = useSelector((state) => state.invoice);

    const defaultValues = { ...customerInfo, ...invoiceInfo, prductItems };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(language == 'en' ? createInvoiceSchema : createInvoiceSchemaAr),
        defaultValues,
    });

    const inputs = watch();
    const { is_terms } = inputs


    function getExpiryDateAndTime() {
        let dateType = profile_business?.invoice_expiry_after_type_id ?
            invoice_expiry?.filter(item => item.id == profile_business?.invoice_expiry_after_type_id) : []
        switch (dateType?.[0]?.name_en) {
            case 'Minute':
                return getDateAfterMinutes(profile_business?.invoice_expiry_after_number || 1);
            case 'Hour':
                return getDateAfterMinutes(60 * (profile_business?.invoice_expiry_after_number || 1));
            case 'Day':
                return getDateAfterDays(1 * (profile_business?.invoice_expiry_after_number || 1));
            case 'Week':
                return getDateAfterDays(7 * (profile_business?.invoice_expiry_after_number || 1));
            case 'Month':
                return getDateAfterDays(30 * (profile_business?.invoice_expiry_after_number || 1)); // This is an approximate value, as months can have varying number of days 
            case 'Year':
                return getDateAfterDays(365 * (profile_business?.invoice_expiry_after_number || 1));  // This is an approximate value, as years can have varying number of days
            default:
                return null; // Return null if an invalid date type is provided
        }

    }


    useEffect(() => {
        success && setTimeout(() => dispatch(ResetSuccess()), 5000) && reset();
    }, [success, dispatch, reset]);


    useEffect(() => {
        if (profile_business && invoice_expiry.length > 0) {
            console.log("🚀 ~ file: create.js:91 ~ useEffect ~ profile_business:", profile_business)
            const { time, date } = getExpiryDateAndTime()
            setValue('currency_id', profile_business?.country?.id)
            setValue('expiry_date', date)
            setValue('expiry_time', time)
            setValue('attach_file', "")
            setValue('is_terms', "0")
            setValue('is_open_invoice', 0)
            setValue('max_amount', 0)
            setValue('min_amount', 0)
        }

    }, [invoice_expiry, language, profile_business, setValue])

    useEffect(() => {
        is_terms == 1 ?
            setValue('terms_and_conditions', profile_business?.terms_and_conditions) :
            setValue('terms_and_conditions', "")
    }, [is_terms, profile_business, setValue])


    useEffect(() => {
        dispatch(getRecurringIntervals());
        dispatch(getProducts());
        dispatch(getCustomers());
        dispatch(getCountries());
        dispatch(getInvoicesExpiry());
        // dispatch(getProfilesBusiness());
    }, [dispatch])


    const onSubmit = (data) => {
        dispatch(createInvoice(data));
    };

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>
                    {/* Invoice Type */}
                    <InvoiceType />

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
                </div>

                {/* Invoice Info */}
                <InvoiceInfo
                    errors={errors}
                    api_errors={api_errors}
                    register={register}
                    defaultValues={defaultValues}
                    inputs={inputs}
                    setValue={setValue}
                />

                {/* Invoice Items */}
                <InvoiceItems
                    setValue={setValue}
                    errors={errors}
                    api_errors={api_errors}
                    register={register}
                    inputs={inputs}
                    control={control}
                    defaultValues={defaultValues.prductItems[0]}
                />
            </form>
        </div>
    );
}

