import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getTime } from '../../../lib/dates';
import { createInvoiceSchema } from '../../../lib/validations/en/invoiceSchema';
import { ResetSuccess, updateInvoice } from '../../../store/slices/invoiceSlice';
import { MagicBtn } from '../../Buttons';
import CustomerInfo from './CustomerInfo'
import InvoiceInfo from './InvoiceInfo'
import InvoiceItemsUpdate from './InvoiceItemsUpdate'
import { createInvoiceSchemaAr } from '../../../lib/validations/ar/invoiceSchemaAr';

export default function UpdateInvoiceForm({ invoice }) {
    const { success, api_errors, isLoading } = useSelector((state) => state.invoice);

    const { profile_business } = useSelector(state => state.profileBusiness);
    const { invoice_expiry } = useSelector(state => state.invoice);

    const dispatch = useDispatch();
    const router = useRouter();

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    let defaultValues = { ...invoice };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createInvoiceSchema : createInvoiceSchemaAr),
        defaultValues,
    });

    const inputs = watch()

    useEffect(() => { console.log(errors) }, [errors])

    useEffect(() => {
        success && dispatch(ResetSuccess()) && reset() && router.push("/dashboard/invoices")
    }, [success, dispatch, reset, router]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Customer Info */}
            <CustomerInfo
                errors={errors}
                api_errors={api_errors}
                register={register}
                inputs={inputs}
                control={control}
                setValue={setValue}
            />

            {/* Invoice Info */}
            <InvoiceInfo
                errors={errors}
                api_errors={api_errors}
                register={register}
                defaultValues={defaultValues}
                inputs={inputs}
            />

            {/* Invoice Items */}
            <InvoiceItemsUpdate
                setValue={setValue}
                errors={errors}
                api_errors={api_errors}
                register={register}
                inputs={inputs}
                control={control}
                defaultValues={defaultValues?.invoice_item[0]}
            />

            <MagicBtn isLoading={isLoading} label={t("dashboard.save")} disabled={false} />

        </form>

    )
}
