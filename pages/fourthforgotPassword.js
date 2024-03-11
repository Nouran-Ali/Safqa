import styles from '../styles/forgotpassword.module.css';
import ForgetPasswordImage from "../comps/ForgetPasswordImage";
import FourthForgotPassword from "../comps/FourthForgotPassword";

function fourthforgotPassword() {

    return (
        <div className={` ${styles.firstforgotPassword} ${styles.thirdforgotPassword} container mt-4 mb-5`}>
            <div className='row'>
                <FourthForgotPassword/>
                <ForgetPasswordImage />
            </div>
        </div>
    )
}

export default fourthforgotPassword