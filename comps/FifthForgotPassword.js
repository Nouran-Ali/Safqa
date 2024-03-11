import styles from '../styles/forgotpassword.module.css';
import Link from "next/link";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';

function FifthForgotPassword() {

    const [t, i18n] = useTranslation();

    return (
        <div data-aos="slide-right" data-aos-offset="100" className={`col-md-6 col-sm-12 mx-auto ${styles.leftForgotPassword}`}>
            <h3 className="text-body fw-bold mb-3">{t("ForgotPassword.header3")}</h3>
            <input
                type="password"
                className="form-control border-0 shadow-none mt-4"
                id="exampleFormControlInput1"
                placeholder={t("input.newpassword")}
                required
            />
            <input
                type="password"
                className="form-control border-0 shadow-none mt-3"
                id="exampleFormControlInput1"
                placeholder={t("input.confirmpassword")}
                required
            />
            <div className="form-check mt-3">
                <input className="form-check-input shadow-none" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    {t("input.rememberme")}
                </label>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Link
                    href="/fifthforgotPassword"
                    className={` ${styles.nextBtn} ${styles.saveBtn} p-2 px-5 rounded-5`}>
                    {t("links.save")}
                </Link>
            </div>
        </div>
    );
}

export default FifthForgotPassword