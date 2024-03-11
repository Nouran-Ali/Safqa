import styles from '../styles/forgotpassword.module.css';
import Link from "next/link";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';

function ThirdForgotPassword() {

    const [t, i18n] = useTranslation();

    return (
        <div data-aos="slide-right" data-aos-offset="100" className={`col-md-6 col-sm-12 mx-auto ${styles.leftForgotPassword}`}>
            <h3 className="text-body fw-bold mb-3">{t("ForgotPassword.header2")}</h3>
            <p>{t("ForgotPassword.p3")}<br />
                <span>moh547@gmail.com</span>
            </p>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control shadow-none"
                    id="exampleFormControlInput1"
                    required
                />
                <Link
                    href="#"
                    className={`btn border-0 text-white fw-normal rounded-2 ms-3 ${styles.btnResend}`}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">

                    {t("button.resend")} <span>(40)</span>

                </Link>
            </div>
            <div className="mt-5">
                <Link
                    href="/fifthforgotPassword"
                    className={` ${styles.nextBtn} p-2 px-5 rounded-5`}>
                    {t("links.next")}
                </Link>
            </div>
        </div>
    );
}

export default ThirdForgotPassword