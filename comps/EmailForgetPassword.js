import styles from '../styles/forgotpassword.module.css';
import Link from "next/link";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgetPasswordByEmailSchema } from '../lib/validations/en/forgetPasswordSchema';
import { forgetPasswordByEmail, ResetSuccess } from '../store/slices/authSlice';
import { useRouter } from 'next/router';
import { forgetPasswordByEmailSchemaAr } from '../lib/validations/ar/forgetPasswordSchemaAr';

function EmailForgetPassword({ toggleType }) {
    const router = useRouter()
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const { success, api_errors, isLoading } = useSelector(
        (state) => state.auth
    );

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? forgetPasswordByEmailSchema : forgetPasswordByEmailSchemaAr),
        defaultValues: {email: ''},
    });


    const onSubmit = (data) => {
        dispatch(forgetPasswordByEmail(data));
    };

    return (
        <div data-aos="slide-right" data-aos-offset="100" className={`col-md-6 col-sm-12 mx-auto ${styles.leftForgotPassword}`}>

            <h3 className="text-body fw-bold mb-3">{t("ForgotPassword.header")}</h3>
            <p>{t("ForgotPassword.p1")}</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    {...register('email')}
                    name='email'
                    type="email"
                    className="form-control border-0 shadow-none"
                    placeholder={t("input.writeyouremail")}
                />
                {
                    errors.email && <p className='text-danger mt-1 mx-2'>{errors.email.message}</p>
                }
                <div className="mt-5 d-flex justify-content-center mt-3">
                    <Link
                        onClick={toggleType}
                        href="#"
                        className={`${styles.link} mx-3 mt-2`}
                    >
                        {t("links.tryanotherway")}
                    </Link>
                    <button
                        className={` ${styles.nextBtn} p-2 px-5 rounded-5 border-0`}>
                        {t("links.next")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmailForgetPassword