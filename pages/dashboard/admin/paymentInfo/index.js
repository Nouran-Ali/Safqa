import { useEffect } from 'react';
import styles from '../../../../styles/Dashboard/dashboard.module.css';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { usePageSize } from '../../../../comps/Dashboard/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { BtnEdit } from '../../../../comps/Buttons';
import { getPaymentInformation } from '../../../../store/slices/paymentInfoSlice';
import LoadingPage from '../../../../comps/LoadingPage';
import ErrorPage from '../../../../comps/AlertError';
import AdminPaymentInfoUpdate from '../../../../comps/admin/paymentInfo/AdminPaymentInfoUpdate';

const PaymentInformaion = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { paymentInfo, isLoading, api_errors } = useSelector(
    (state) => state.paymentInfo
  );
  console.log(paymentInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentInformation());
  }, [dispatch]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {!paymentInfo && isLoading && <LoadingPage />}
        {!paymentInfo && api_errors && <ErrorPage />}
        {paymentInfo && <AdminPaymentInfoUpdate paymentInfo={paymentInfo} />}
      </div>
    </div>
  );
};

export default PaymentInformaion;
