import styles from '../styles/forgotpassword.module.css';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function ForgetPasswordImage() {

    return (
        <div data-aos="slide-left" data-aos-offset="100" className='col-md-6 col-sm-12 d-flex justify-content-center mt-5'>
            <img src="/forgotPassword.png" className={`${styles.forgotPasswordImg}`} width="80%" />
        </div>
    )
}

export default ForgetPasswordImage