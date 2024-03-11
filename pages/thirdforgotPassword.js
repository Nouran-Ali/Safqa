import styles from '../styles/forgotpassword.module.css';
import ForgetPasswordImage from "../comps/ForgetPasswordImage";
import ThirdForgotPassword from "../comps/ThirdForgotPassword";

function thirdforgotPassword() {

    return (
        <div className={` ${styles.firstforgotPassword} ${styles.thirdforgotPassword} container mt-4 mb-5`}>
            <div className='row'>
                <ThirdForgotPassword/>
                <ForgetPasswordImage />
            </div>
        </div>
    )
}

export default thirdforgotPassword