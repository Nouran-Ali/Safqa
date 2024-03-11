import styles from '../styles/forgotpassword.module.css';
import ForgetPasswordImage from "../comps/ForgetPasswordImage";
import FifthForgotPassword from "../comps/FifthForgotPassword";

function fifthforgotPassword() {

    return (
        <div className={` ${styles.firstforgotPassword} ${styles.fifthforgotPassword} container mt-4 mb-5`}>
            <div className='row'>
                <FifthForgotPassword/>
                <ForgetPasswordImage />
            </div>
        </div>
    )
}

export default fifthforgotPassword