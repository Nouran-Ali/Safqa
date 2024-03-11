import styles from '../../../styles/Dashboard/Create.module.css';
import { SafqaInput, SafqaSelect, SafqaTextArea } from '../../Dashboard/Inputs';
import { MagicBtn } from '../../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { updatePaymentInfoSchemaAr } from '../../../lib/validations/ar/paymentInfoSchemaAr';
import { updatePaymentInfoSchema } from '../../../lib/validations/en/paymentInfoSchema';
import {
  updatePaymentInformation,
  ResetSuccess,
} from '../../../store/slices/paymentInfoSlice';
import { SafqaRadio } from '../../SafqaInputs';
import { Switch } from 'antd';

const AdminPaymentInfoUpdate = ({ paymentInfo }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, api_errors, success } = useSelector(
    (state) => state.paymentInfo
  );

  const { payment_types } = useSelector((state) => state.invoice);

  const defaultValues = paymentInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == 'en' ? updatePaymentInfoSchema : updatePaymentInfoSchemaAr
    ),
    defaultValues,
  });

  const { payment_type } = watch();

  useEffect(() => {
    success &&
      dispatch(ResetSuccess()) &&
      router.push('/dashboard/admin/paymentInfo');
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(updatePaymentInformation(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`rounded-2 ${
          theme == 'dark' ? styles.info_dark : styles.info
        }`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="d-flex justify-content-between">
          <p className="px-4 fs-5">{t('dashboard.payment_info')}</p>
          <div className="d-flex mx-3" style={{ width: '150px' }}>
            {/* <p>{language == 'en' ? 'active type' : 'النوع النشط'}</p> */}
            <SafqaSelect
              // select_label
              // label={t('dashboard.payment_type')}
              options={payment_types}
              option_name="name_en"
              option_name_ar="name_ar"
              name="payment_type"
              register={register}
              required
              error={errors.payment_type?.message || api_errors?.payment_type}
            />
          </div>
        </div>
        <hr />

        {payment_type == 1 && (
          <>
            <div className="row mt-2 px-3">
              <SafqaInput
                className="mb-3"
                label={t('dashboard.stripe_key')}
                name="stripe_key"
                register={register}
                error={errors.stripe_key?.message || api_errors?.stripe_key}
                required
              />
            </div>
            <div className="row mt-2 px-3">
              <SafqaInput
                className="mb-3"
                label={t('dashboard.stripe_secret')}
                name="stripe_secret"
                register={register}
                error={
                  errors.stripe_secret?.message || api_errors?.stripe_secret
                }
                required
              />
            </div>
          </>
        )}
        {payment_type == 2 && (
          <>
            <div className="row mt-2 px-3">
              <SafqaInput
                className="mb-3"
                label={t('dashboard.ccavanue_merchant_id')}
                name="ccavanue_merchant_id"
                register={register}
                error={
                  errors.ccavanue_merchant_id?.message ||
                  api_errors?.ccavanue_merchant_id
                }
                required
              />
            </div>
            <div className="row mt-2 px-3">
              <SafqaInput
                className="mb-3"
                label={t('dashboard.ccavanue_working_key')}
                name="ccavanue_working_key"
                register={register}
                error={
                  errors.ccavanue_working_key?.message ||
                  api_errors?.ccavanue_working_key
                }
                required
              />
            </div>
            <div className="row mt-2 px-3">
              <SafqaInput
                className="mb-3"
                label={t('dashboard.ccavanue_access_code')}
                name="ccavanue_access_code"
                register={register}
                error={
                  errors.ccavanue_access_code?.message ||
                  api_errors?.ccavanue_access_code
                }
                required
              />
            </div>
          </>
        )}
      </div>

      <MagicBtn label={t('dashboard.save')} isLoading={isLoading} />
    </form>
  );
};

export default AdminPaymentInfoUpdate;
