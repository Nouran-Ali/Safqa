import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "../../comps/LoginForm";
import styles from "../../styles/login/Login.module.css";
import LoginFormOTP from "../../comps/LoginFormOTP";

function OTP() {
    const { token } = useSelector((state) => state.auth);
    const router = useRouter();

    return (
        <div className={styles.login}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                        <div data-aos="slide-right" data-aos-offset="100">
                            <img
                                className={styles.imageLogin}
                                src="/login/login-img.png"
                                alt="apple"
                                width="551px"
                            />
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 text-center">
                        <div className={styles.bg_login}></div>
                        <LoginFormOTP />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTP;
