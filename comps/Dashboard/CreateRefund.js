import React from 'react'
import styles from "../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { InfoCircleFilled } from '@ant-design/icons';
import { SafqaRadioInput, SafqaNewCheckBox } from './Inputs';
import { MagicBtnBlue } from '../Buttons';
import { createProduct, ResetSuccess } from '../../store/slices/productSlice';
import { createRefundSchema } from '../../lib/validations/en/refundSchema';
import { createRefund } from '../../store/slices/refundSlice';
import { createRefundSchemaAr } from '../../lib/validations/ar/refundSchemaAr';

const CreateRefund = ({ item }) => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const { theme } = useTheme();
    const router = useRouter()
    const dispatch = useDispatch();

    const { profile_business } = useSelector((state) => state.profileBusiness);
    const { refundInfo, refundSummary, isLoading, api_errors, success } = useSelector(
        (state) => state.refund
    );

    const defaultValues = refundInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ?
            createRefundSchema(item.invoice_value - item.refund_amount) :
            createRefundSchemaAr(item.invoice_value - item.refund_amount)
        ),
        defaultValues,
    });

    const { makePartialRefund, amount } = watch()

    useEffect(() => {
        makePartialRefund == 0 && setValue("amount", item.invoice_value - item.refund_amount)
    }, [item.invoice_value, item.refund_amount, makePartialRefund, setValue])

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push("/dashboard/refunds")
    }, [dispatch, router, success]);

    useEffect(() => {
        console.log("errors:", errors)
    }, [errors])


    const onSubmit = (data) => {
        // reset()
        dispatch(createRefund({ ...data, id: item.id }));
    };

    return (
        <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className='col-xl-7 col-lg-7 col-md-6 col-sm-6'>
                    <div className='mt-4'>
                        <SafqaRadioInput
                            label="Refund Type"
                            items={[
                                { id: 1, name: "Partial refund" },
                                { id: 0, name: "Full refund" },
                            ]}
                            name="makePartialRefund"
                            register={register}
                            className="ps-0"
                            defaultValue={defaultValues.makePartialRefund}
                            error={errors?.makePartialRefund?.message}
                        />

                        <div className='w-75'>
                            <label
                                className={`form-label ${theme == 'dark' ? 'text-white' : styles.label}`}
                                htmlFor="amount"
                            >
                                {t('dashboard.amount')}
                            </label>

                            <input
                                id='amount'
                                type="number"
                                className={`form-control shadow-none bg-grey`}
                                {...register('amount')}
                                disabled={makePartialRefund == 0}
                            />
                            {errors?.amount && <span className="text-danger fs-6">{errors.amount?.message}</span>}
                            {/* <div className='mt-2'>
                                <p className='safqa-text-secondary-dashboard'><InfoCircleFilled className='me-2' />Please note that refund service charge is <span className='safqa-text-info-dashboard'>0 AED</span></p>
                            </div> */}
                        </div>

                        {/* <SafqaRadioInput
                            label=""
                            items={[
                                { id: 1, name: "Send refund" },
                                { id: 0, name: "Deduct from wallet" },
                            ]}
                            name="is_active"
                            register={register}
                        // defaultValue={defaultValues.is_active}
                        // error={errors?.is_active}
                        /> */}

                        {/* <div>
                            <SafqaNewCheckBox
                                register={register}
                                name="IsDeductRefundChargeFromCustomer"
                                label="Deduct refund charges from customer"
                            />

                            <SafqaNewCheckBox
                                register={register}
                                name="IsDeductServiceChargeFromCustomer"
                                label="Deduct Safqa fees from customer"
                            />

                            <div>
                                <p className='safqa-text-secondary-dashboard'><InfoCircleFilled className='me-2' />The fees deducted by Safqa for earlier transaction</p>
                            </div>
                        </div> */}

                        {/* <div className='w-75'>
                            <label
                                htmlFor="comment"
                                className={`form-label`}>
                                Comment
                            </label>

                            <div className="d-flex align-items-center">
                                <textarea
                                    type="text"
                                    rows="3"
                                    {...register('comments')}
                                    className={`form-control shadow-none border-0 bg-grey ${styles.inpfile}`}
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className='col-xl-5 col-lg-5 col-md-6 col-sm-6'>
                    <div className='safqa-bg-grey rounded-2 w-75 py-3'>
                        <p className='text-center safqa-text-info-dashboard'>Refund Summary</p>
                        <hr className={`opacity-50 m-0 ${styles.hr}`} />
                        <div className='row px-4 mt-3'>
                            <div className='col-6'>
                                <p>Customer Paid</p>
                            </div>
                            <div className='col-6'>
                                <p>{item.invoice_value - item.refund_amount} {profile_business?.country?.short_currency}</p>
                            </div>

                            <div className='col-6'>
                                <p>Vendor Received</p>
                            </div>
                            <div className='col-6'>
                                <p>{amount} {profile_business?.country?.short_currency}</p>
                            </div>

                            {/* <div className='col-8'>
                                <p>Refund Vendor Pays</p>
                            </div>
                            <div className='col-4'>
                                <p className='safqa-text-success'>4.835 AED</p>
                            </div>

                            <div className='col-8'>
                                <p>Refund Customer Receives</p>
                            </div>
                            <div className='col-4'>
                                <p className='safqa-info2-color'>4.835 AED</p>
                            </div> */}
                        </div>
                        <MagicBtnBlue
                            type="submit"
                            label={t("dashboard.submit")}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateRefund
