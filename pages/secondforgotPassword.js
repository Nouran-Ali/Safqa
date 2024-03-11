import styles from '../styles/forgotpassword.module.css';
import ForgetPasswordImage from "../comps/ForgetPasswordImage";
import SecondForgotPassword from "../comps/SmsForgetPassword";

function secondforgotPassword() {

    return (
        <div className={` ${styles.secondforgotPassword} container mt-4 mb-5`}>
            <div className='row'>
                <SecondForgotPassword />
                <ForgetPasswordImage />
            </div>
        </div>
    )
}

export default secondforgotPassword