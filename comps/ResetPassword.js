import styles from '../styles/forgotpassword.module.css';
import Link from "next/link";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { SafqaInput } from './Dashboard/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordSchema } from '../lib/validations/en/resetPasswordSchema';
import { resetPassword, ResetSuccess } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import LoadingSpinner from './LoadingSpinner';
import { getCookie } from 'cookies-next';
import { resetPasswordSchemaAr } from '../lib/validations/ar/resetPasswordSchemaAr';

function ResetPassword() {
    const router = useRouter()
    // const { token } = router.query;

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const { success, api_errors, isLoading, resetPasswordInfo } = useSelector(
        (state) => state.auth
    );

    const defaultValues = resetPasswordInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? resetPasswordSchema : resetPasswordSchemaAr),
        defaultValues,
    });

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push("/login")
    }, [dispatch, router, success]); 

    const onSubmit = (data) => {
        const sender = getCookie('sender')
        dispatch(resetPassword({ ...data, sender }));
    }; 

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            data-aos="slide-right"
            data-aos-offset="100"
            className={`col-md-6 col-sm-12 mx-auto ${styles.leftForgotPassword}`}
        >

            <h3 className="text-body fw-bold mb-3">{t("ForgotPassword.header3")}</h3>
            <SafqaInput
                name="password"
                register={register}
                className="mt-3"
                type="password"
                placeholder={t("dashboard.new_password")}
                error={errors.password?.message || api_errors?.password}
                required
            />
            <SafqaInput
                name="password_confirmation"
                register={register}
                className="mt-3"
                type="password"
                placeholder={t("dashboard.new_password_confirmation")}
                error={errors.password_confirmation?.message || api_errors?.password_confirmation}
                required
            />
            <SafqaInput
                name="verification_code"
                register={register}
                className="mt-3"
                placeholder={t("dashboard.verification_code")}
                error={errors.verification_code?.message || api_errors?.verification_code}
                required
            />
            <div className="d-flex justify-content-center mt-3 ">
                <button
                    className={` ${styles.nextBtn} ${styles.saveBtn} w-100 p-2 px-5 rounded-5 border-0 ${isLoading ? "opacity-50" : ""}`}
                    disabled={isLoading}
                >
                    {
                        isLoading ?
                            <LoadingSpinner /> :
                            t("links.save")
                    }
                </button>
            </div>

            <div className="d-flex justify-content-center mt-3 ">
                <Link
                    href="/forgetPassword"
                    className={` p-2 px-5 rounded-5 border-0 btn w-100 btn-secondary opacity-75`}
                    disabled={isLoading}
                >
                    {t("links.back")}
                    
                </Link>
            </div>

        </form>
    );
}

export default ResetPassword