import styles from '../../styles/forgotpassword.module.css';
import ForgetPasswordImage from "../../comps/ForgetPasswordImage";
import EmailForgetPassword from '../../comps/EmailForgetPassword';
import SmsForgetPassword from '../../comps/SmsForgetPassword';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../store/slices/countrySlice';
import { ResetSuccess } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

function ForgetPassword() {
    const [type, setType] = useState('email');
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const toggleType = () => setType((c) => c == 'email' ? 'sms' : 'email');
    const dispatch = useDispatch()
    const router = useRouter()
    const { success } = useSelector(state => state.auth)

    useEffect(() => {
        if (success) {
            dispatch(ResetSuccess())
            router.push('/resetPassword')
        }
    }, [dispatch, router, success])


    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    return (
        <div dir={language == 'en' ? 'ltr' : 'rtl'} className={` ${type == 'email' ? styles.firstforgotPassword : styles.secondforgotPassword} container mt-4 mb-5`}>
            <div className='row'>
                {
                    type == 'email' ?
                        <EmailForgetPassword toggleType={toggleType} /> :
                        <SmsForgetPassword toggleType={toggleType} />

                }
                <ForgetPasswordImage />
            </div>
        </div>
    )
}

export default ForgetPassword