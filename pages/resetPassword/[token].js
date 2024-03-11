import styles from '../../styles/forgotpassword.module.css';
import ForgetPasswordImage from "../../comps/ForgetPasswordImage";
import ResetPassword from '../../comps/ResetPassword';
import { useRouter } from 'next/router';

function ResetPasswordPagebyToken() {
    return (
        <div className={` ${styles.firstforgotPassword} ${styles.fifthforgotPassword} container mt-4 mb-5`}>
            <div className='row'>
                <ResetPassword />
                <ForgetPasswordImage />
            </div>
        </div>
    )
}

export default ResetPasswordPagebyToken