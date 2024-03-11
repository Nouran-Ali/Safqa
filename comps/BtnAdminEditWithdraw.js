import styles from '../styles/Buttons.module.css';
import Link from 'next/link';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Modal } from 'antd';
import { SafqaInput, SafqaSelect } from './Dashboard/Inputs';
import {
  ResetSuccess,
  confirmDeposit,
  updateAdminRequestMoney,
  updateRequestMoney,
} from '../store/slices/depositSlice';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createDepositSchema,
  updateAdminDepositSchema,
} from '../lib/validations/en/depositSchema';
import {
  createDepositSchemaAr,
  updateAdminDepositSchemaAr,
} from '../lib/validations/ar/depositSchemaAr';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

const BtnAdminEditWithdraw = ({ depositInfo }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [feesAmount, setFeesAmount] = useState(0);
  const formRef = useRef();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { api_errors, success, isLoading } = useSelector(
    (state) => state.deposit
  );
  const {
    statistics: { wallet_profile },
  } = useSelector((state) => state.auth);
  const total_balance = wallet_profile?.total_balance;
  const defaultValues = depositInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == 'en'
        ? updateAdminDepositSchema()
        : updateAdminDepositSchemaAr()
    ),
    defaultValues,
  });

  const { amount } = watch();

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess());
      reset();
      setModal1Open(false);
    }
  }, [dispatch, reset, success]);

  useEffect(() => {
    setValue('amount', depositInfo.amount - depositInfo.amount * 0.03);
  }, [setValue, depositInfo.amount]);

  useEffect(() => {
    setValue('status', depositInfo.status);
  }, [setValue, amount]);

  const onSubmit = (data) => {
    dispatch(confirmDeposit(data));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.edit}>
        <Link
          href={'#'}
          className="rounded-circle"
          onClick={() => setModal1Open(true)}
        >
          <ModeEditOutlineIcon sx={{ width: '15px' }} />
        </Link>

        <Modal
          className={theme == 'dark' ? 'dark-ant-modal' : ''}
          title={language == 'en' ? 'Withdraw from wallet' : 'سحب من المحفظة'}
          style={{
            top: 20,
          }}
          open={modal1Open}
          confirmLoading={isLoading}
          okText="create"
          onOk={handleSubmit(onSubmit)}
          onCancel={() => setModal1Open(false)}
        >
          <div className={` ${language == 'ar' ? 'text-end' : 'text-start'} `}>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 ">
                <SafqaInput
                  label={`${t('dashboard.amount')} (${
                    depositInfo.profile_information.country.short_currency
                  })`}
                  className="bg-grey"
                  name="amount"
                  type="number"
                  register={register}
                  error={errors.amount?.message || api_errors?.amount}
                  required
                  disabled
                  autoComplete={'off'}
                />
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 ">
                <SafqaSelect
                  select_label
                  options={[
                    {
                      id: 'pending',
                      name_en: 'Pending',
                      name_ar: 'قيد الانتظار',
                    },
                    {
                      id: 'processing',
                      name_en: 'Processing',
                      name_ar: 'قيد المعالجة',
                    },
                    { id: 'paid', name_en: 'Paid', name_ar: 'مدفوع' },
                    {
                      id: 'unpaid',
                      name_en: 'Unpaid',
                      name_ar: 'غير مدفوع الأجر',
                    },
                  ]}
                  option_name="name_en"
                  option_name_ar="name_ar"
                  name="status"
                  register={register}
                  label={t('dashboard.status')}
                  required
                  className="bg-grey"
                  error={errors.status?.message || api_errors?.status}
                />
              </div>
              {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 ">
                            <SafqaInput
                                label={`${t("dashboard.amount")} (USD)`}
                                className="bg-grey"
                                name="amount_usd"
                                type="number"
                                register={register}
                                error={errors.amount_usd?.message || api_errors?.amount_usd}
                                required
                                autoComplete={'off'}
                            />
                        </div> */}
            </div>
            {/* <MagicBtnCreateLink label={t("dashboard.create")} isLoading={isLoading} /> */}
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default BtnAdminEditWithdraw;
