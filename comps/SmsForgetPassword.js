import styles from '../styles/forgotpassword.module.css';
import Link from "next/link";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordByPhone, ResetSuccess } from '../store/slices/authSlice';
import { forgetPasswordBySmsSchema } from '../lib/validations/en/forgetPasswordSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgetPasswordBySmsSchemaAr } from '../lib/validations/ar/forgetPasswordSchemaAr';


function SmsForgetPassword({ toggleType }) {
    const { active_countries } = useSelector(state => state.country)
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
        resolver: yupResolver(language == 'en' ? forgetPasswordBySmsSchema : forgetPasswordBySmsSchemaAr),
        defaultValues: { phone_number: '', phone_code: '' },
    });

    useEffect(() => {
        success && dispatch(ResetSuccess())
    }, [dispatch, success]);

    const onSubmit = (data) => {
        dispatch(forgetPasswordByPhone(data));
    };

    return (
        <div dir={language == 'en' ? 'ltr' : 'rtl'} data-aos="slide-right" data-aos-offset="100" className={`col-md-6 col-sm-12 mx-auto ${styles.leftForgotPassword}`}>
            <h3 className="text-body fw-bold mb-3">{t("ForgotPassword.header")}</h3>
            <p>{t("ForgotPassword.p2")}</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="d-flex">
                    <select
                        className={`form-select ${styles.numberCountrySelect}`}
                        {...register('phone_code')}

                        style={{ color: "#76abc2" }}
                        aria-label="Default select example"
                    >
                        <option value={""}>{language == 'en' ? "Country code" : "كود البلد"}</option>
                        {active_countries?.map((country) => (
                            <option key={country.code} value={country.code}>
                                <img src={country.src} alt={country.code} width="50px" height="50px" />
                                <span>{country.code}</span>
                            </option>
                        ))}
                    </select>
                    <input
                        {...register('phone_number')}
                        type="text"
                        className="form-control border-0 mb-3 shadow-none"
                        id="exampleFormControlInput1"
                        placeholder={t("input.writeyourphonenumder")}
                        required
                    />
                </div>
                {
                    errors.phone_number && <p className='text-danger mt-1 mx-2'>{errors.phone_number.message}</p>
                }
                {
                    errors.phone_code && <p className='text-danger mt-1 mx-2'>{errors.phone_code.message}</p>
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

export default SmsForgetPassword