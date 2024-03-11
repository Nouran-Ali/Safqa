const { v4: uuidv4 } = require('uuid');
import { SafqaInput } from './Dashboard/Inputs';
import LoadingSpinner from './LoadingSpinner';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from '../styles/Buttons.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import { Modal } from 'antd';
import { useTheme } from 'next-themes';
import {
  addToWalletSchema,
  createDepositSchema,
} from '../lib/validations/en/depositSchema';
import {
  addToWallet,
  createDeposit,
  ResetSuccess,
} from '../store/slices/depositSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import {
  addToWalletSchemaAr,
  createDepositSchemaAr,
} from '../lib/validations/ar/depositSchemaAr';
import { useCallback } from 'react';
import VisaForm from './VisaForm';
import VisaCard from './VisaCard';
import { USDConvertCurrency } from '../lib/validations/services';
import { encrypt } from '../lib/ccAvenue/ccavutils';
import { getProductionUrl } from '../store/slices/ccAvenueSlice';
import { MagicBtn } from './Buttons';

export const BtnWithdraw = ({ icon, name, style }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [usdAmount, setUsdAmount] = useState(0);
  const [feesAmount, setFeesAmount] = useState(0);
  const formRef = useRef();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { depositInfo, api_errors, success, isLoading } = useSelector(
    (state) => state.deposit
  );
  const {
    statistics: { wallet_profile, rate, usd_balance },
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
        ? createDepositSchema(total_balance)
        : createDepositSchemaAr(total_balance)
    ),
    defaultValues,
  });

  const { amount } = watch;

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess());
      reset();
      setModal1Open(false);
    }
  }, [dispatch, reset, success]);

  const onChangeAmount = (e) => {
    setValue('amount', e.target.value);
    setFeesAmount(e.target.value);
    const usdValue = USDConvertCurrency({
      rate: rate,
      amount: e.target.value,
      toUsd: true,
    });
    setUsdAmount(usdValue);
  };

  const onChangeUsdAmount = (e) => {
    setUsdAmount(e.target.value);
    const amount = USDConvertCurrency({
      rate: rate,
      amount: e.target.value,
      toUsd: false,
    });
    setValue('amount', amount);
  };

  const onSubmit = (data) => {
    dispatch(createDeposit(data));
  };

  const onOk = () => {};

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Link
          href={'#'}
          onClick={() => setModal1Open(true)} // usd_balance > 50 ? true : false
          className={`btn px-3 mt-2 ${
            language == 'ar' ? 'me-1' : 'me-3'
          } ${style}`}
        >
          {icon}
          <span className="ms-3 align-middle text-white">{name}</span>
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
          onOk={onOk}
          onCancel={() => setModal1Open(false)}
        >
          <div className={` ${language == 'ar' ? 'text-end' : 'text-start'} `}>
            <div className="row">
              <div className="col-6">
                <div className="card-input">
                  <label htmlFor="amount" className="card-input__label">
                    {t('dashboard.amount')} (
                    {profile_business?.country?.short_currency})
                  </label>
                  <input
                    type="number"
                    className={`card-input__input 
                                    ${
                                      errors?.amount?.message &&
                                      'text-danger border-danger'
                                    }
                                    `}
                    autoComplete="off"
                    {...register('amount')}
                    onChange={onChangeAmount}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="card-input">
                  <label htmlFor="amount" className="card-input__label">
                    {t('dashboard.amount')} (
                    {language == 'en' ? 'USD' : 'دولار أمريكي'})
                  </label>
                  <input
                    type="number"
                    className="card-input__input"
                    autoComplete="off"
                    onChange={onChangeUsdAmount}
                    value={usdAmount}
                  />
                </div>
              </div>
            </div>
            <p className="fs-6 mt-2 safqa-text-info-dashboard">
              {t('dashboard.withdraw_fees_note')} : {(feesAmount || 0) * 0.03}{' '}
              {profile_business?.country?.short_currency}
            </p>
            {api_errors && (
              <p className="text-danger m-0 mt-2 fs-5">{api_errors}</p>
            )}
            {/* <MagicBtnCreateLink label={t("dashboard.create")} isLoading={isLoading} /> */}
          </div>
        </Modal>
      </form>
    </>
  );
};

const initialState = {
  card_number: '#### #### #### ####',
  card_name: 'FULL NAME',
  exp_month: '',
  exp_year: '',
  cvc: '',
  isCardFlipped: false,
};

const ccavInitialState = {
  // redirect_url: 'https://api.safqapay.com/api/ccavanue/redirect_url',
  // cancel_url: 'https://www.google.com/',
  amount: 0,

  // required from backend

  // order_id: uuidv4().slice(0, 30),
  // language: 'EN',
  // merchant_id: '50423',
  // currency: 'AED',
  // integration_type: 'iframe_normal', // 'iframe_normal'
  // billing_name: 'Peter', // 'Peter'
  // billing_address: 'Santacruz', // 'Santacruz'
  // billing_city: 'Mumbai', // 'Mumbai'
  // billing_state: 'MH', // 'MH'
  // billing_zip: '400054', // '400054'
  // billing_country: 'India', // 'India'
  // billing_tel: '9876543210', // '9876543210'
  // billing_email: 'testing@domain.com', // 'testing@domain.com'

  // optional

  // delivery_name: 'Sam', // 'Sam'
  // delivery_address: 'Vile Parle', // 'Vile Parle'
  // delivery_city: 'Mumbai', // 'Mumbai'
  // delivery_state: 'Maharashtra', // 'Maharashtra'
  // delivery_zip: '400038', // '400038'
  // delivery_country: 'India', // 'India'
  // delivery_tel: '0123456789', // '0123456789'
  // merchant_param1: 'additional Info', // 'additional Info'
  // merchant_param2: 'additional Info', // 'additional Info'
  // merchant_param3: 'additional Info', // 'additional Info'
  // merchant_param4: 'additional Info', // 'additional Info'
  // merchant_param5: 'additional Info', // 'additional Info'
  // promo_code: '', // ''
  // customer_identifier: '', // ''
};

const ChargeWalletStepOne = ({
  errors,
  api_errors,
  register,
  onChange,
  ccavState,
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();

  // const onSubmit = () => {
  //   dispatch(getProductionUrl(ccavState));
  //   setCcavStep(2);
  // };

  const CcavenueFormTable = (ccavState, onChange) => {
    return (
      <table width="40%" height="100" border="1" align="center">
        <tr>
          <td>Parameter Name:</td>
          <td>Parameter Value:</td>
        </tr>
        <tr>
          <td colspan="2">Compulsory information</td>
        </tr>
        <tr>
          <td>Merchant Id</td>
          <td>
            <input
              type="text"
              name="merchant_id"
              id="merchant_id"
              value={ccavState.merchant_id}
              // onChange={onChange}
              disabled
            />{' '}
          </td>
        </tr>
        <tr>
          <td>Order Id</td>
          <td>
            <input
              type="text"
              name="order_id"
              value={ccavState.order_id}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Currency</td>
          <td>
            <input
              type="text"
              name="currency"
              value={ccavState.currency}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>
            <input
              type="text"
              name="amount"
              value={ccavState.amount}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">Billing information(optional):</td>
        </tr>
        <tr>
          <td>Billing Name</td>
          <td>
            <input
              type="text"
              name="billing_name"
              value={ccavState.billing_name}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing Address:</td>
          <td>
            <input
              type="text"
              name="billing_address"
              value={ccavState.billing_address}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing City:</td>
          <td>
            <input
              type="text"
              name="billing_city"
              value={ccavState.billing_city}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing State:</td>
          <td>
            <input
              type="text"
              name="billing_state"
              value={ccavState.billing_state}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing Zip:</td>
          <td>
            <input
              type="text"
              name="billing_zip"
              value={ccavState.billing_zip}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing Country:</td>
          <td>
            <input
              type="text"
              name="billing_country"
              value={ccavState.billing_country}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing Tel:</td>
          <td>
            <input
              type="text"
              name="billing_tel"
              value={ccavState.billing_tel}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Billing Email:</td>
          <td>
            <input
              type="text"
              name="billing_email"
              value={ccavState.billing_email}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">Shipping information(optional):</td>
        </tr>
        <tr>
          <td>Shipping Name</td>
          <td>
            <input
              type="text"
              name="delivery_name"
              value={ccavState.delivery_name}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Shipping Address:</td>
          <td>
            <input
              type="text"
              name="delivery_address"
              value={ccavState.delivery_address}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Shipping City:</td>
          <td>
            <input
              type="text"
              name="delivery_city"
              value={ccavState.delivery_city}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Shipping State:</td>
          <td>
            <input
              type="text"
              name="delivery_state"
              value={ccavState.delivery_state}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Shipping Zip:</td>
          <td>
            <input
              type="text"
              name="delivery_zip"
              value={ccavState.delivery_zip}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Shipping Country:</td>
          <td>
            <input
              type="text"
              name="delivery_country"
              value={ccavState.delivery_country}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Shipping Tel:</td>
          <td>
            <input
              type="text"
              name="delivery_tel"
              value={ccavState.delivery_tel}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Merchant Param1</td>
          <td>
            <input
              type="text"
              name="merchant_param1"
              value={ccavState.merchant_param1}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Merchant Param2</td>
          <td>
            <input
              type="text"
              name="merchant_param2"
              value={ccavState.merchant_param2}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Merchant Param3</td>
          <td>
            <input
              type="text"
              name="merchant_param3"
              value={ccavState.merchant_param3}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Merchant Param4</td>
          <td>
            <input
              type="text"
              name="merchant_param4"
              value={ccavState.merchant_param4}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Merchant Param5</td>
          <td>
            <input
              type="text"
              name="merchant_param5"
              value={ccavState.merchant_param5}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Integration Type:</td>
          <td>
            <select
              name="integration_type"
              disabled
              value={ccavState.integration_type}
              onChange={onChange}
            >
              <option value="iframe_normal">iframe_normal</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Promo Code:</td>
          <td>
            <input
              type="text"
              name="promo_code"
              value={ccavState.promo_code}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>Customer Id:</td>
          <td>
            <input
              type="text"
              name="customer_identifier"
              value={ccavState.customer_identifier}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="submit" value="Checkout" />
          </td>
        </tr>
      </table>
    );
  };

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
        <SafqaInput
          className={'bg-grey'}
          label={`${t('dashboard.Amount')} (AED)`}
          name="amount"
          register={register}
          type="number"
          error={errors.amount?.message || api_errors?.amount}
          required
        />
      </div>
      {/* <CcavenueFormTable ccavState={ccavState} onChange={onChange} /> */}
    </div>
  );
};

const ChargeWalletStepTwo = ({ setCcavStep }) => {
  const { isLoading, api_errors, productionUrl } = useSelector(
    (state) => state.ccavenue
  );

  return (
    <iframe
      className="mx-auto text-center"
      src={productionUrl}
      id="paymentFrame"
      width="700"
      height="550"
      frameBorder="0"
      scrolling="No"
    ></iframe>
  );
};

export const BtnAddToWallet = ({ icon, name, style }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [ccavStep, setCcavStep] = useState(1);
  const [ccavState, setCcavState] = useState(ccavInitialState);
  const [state, setState] = useState(initialState);
  const [productionUrl, setProductionUrl] = useState('');
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);
  const formRef = useRef();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { addToWalletInfo, api_errors, success, isLoading } = useSelector(
    (state) => state.deposit
  );

  const { payment_type } = useSelector((state) => state.paymentInfo);

  const {
    statistics: { usd_balance },
  } = useSelector((state) => state.auth);

  const defaultValues = addToWalletInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(
      language == 'en' ? addToWalletSchema : addToWalletSchemaAr
    ),
    defaultValues,
  });

  const inputs = watch();
  const { amount } = inputs;

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || initialState[keyName],
      });
    },
    [state]
  );

  // References for the Form Inputs used to focus corresponding inputs.
  let formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef(),
  };

  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key]?.current?.focus();
  });

  // This are the references for the Card DIV elements.
  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  let onCardFormInputFocus = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  let onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess());
      reset();
      setState({ ...initialState });
      setModal1Open(false);
    }
  }, [dispatch, reset, success]);

  useEffect(() => {console.log(payment_type);}, [payment_type]);

  const onSubmit = (data) => {
    if (ccavStep == 1) {
      dispatch(getProductionUrl({ ...ccavState, amount }));
      setCcavStep(2);
    } else if (ccavStep == 2) {
      setCcavStep(1);
      // setModal1Open(false);
    }
  };

  const onChangeCcavState = (e) => {
    const { name, value } = e.target;
    setCcavState({ ...ccavState, [name]: value });
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Link
          href={'#'}
          onClick={() => setModal1Open(true)} // usd_balance ? true : false
          className={`btn px-3 mt-2 ${
            language == 'ar' ? 'me-1' : 'me-3'
          } ${style}`}
        >
          {icon}
          <span className="ms-3 align-middle text-white">{name}</span>
        </Link>

        <Modal
          className={`${ccavStep == 2 && 'text-center'} ${
            theme == 'dark' ? 'dark-ant-modal' : ''
          }`}
          // title={language == 'en' ? "Add balance to wallet" : "إضافة رصيد الى المحفظة"}
          style={{
            top: 20,
          }}
          width={payment_type == 1 ? '550px' : ccavStep == 2 ? '800px' : '400px'}
          open={modal1Open}
          confirmLoading={isLoading}
          okText={ccavStep == 1 ? 'Create' : 'Back'}
          onOk={handleSubmit(onSubmit)}
          onCancel={() => {
            setModal1Open(false);
            setValue('amount', 1);
            setCcavStep(1);
          }}
        >
          <div className="">
            {payment_type == 1 && (
              <>
                {/* stripe */}
                <VisaForm
                  cardMonth={state.exp_month}
                  cardYear={state.exp_year}
                  setValue={setValue}
                  errors={errors}
                  api_errors={api_errors}
                  register={register}
                  inputs={inputs}
                  onUpdateState={updateStateValues}
                  cardNumberRef={formFieldsRefObj.cardNumber}
                  cardHolderRef={formFieldsRefObj.cardHolder}
                  cardDateRef={formFieldsRefObj.cardDate}
                  onCardInputFocus={onCardFormInputFocus}
                  onCardInputBlur={onCardInputBlur}
                >
                  <VisaCard
                    cardNumber={state.card_number}
                    cardHolder={state.card_name}
                    cardMonth={state.exp_month}
                    cardYear={state.exp_year}
                    cardCvv={state.cvc}
                    isCardFlipped={state.isCardFlipped}
                    currentFocusedElm={currentFocusedElm}
                    onCardElementClick={focusFormFieldByKey}
                    cardNumberRef={cardElementsRef.cardNumber}
                    cardHolderRef={cardElementsRef.cardHolder}
                    cardDateRef={cardElementsRef.cardDate}
                  ></VisaCard>
                </VisaForm>
              </>
            )}
            {payment_type == 2 && (
              <>
                {/* ccavenue */}
                {ccavStep == 1 && (
                  <ChargeWalletStepOne
                    setProductionUrl={setProductionUrl}
                    onChange={onChangeCcavState}
                    ccavState={ccavState}
                    setCcavStep={setCcavStep}
                    api_errors={api_errors}
                    register={register}
                    errors={errors}
                  />
                )}
                {ccavStep == 2 && (
                  <ChargeWalletStepTwo
                    productionUrl={productionUrl}
                    setCcavStep={setCcavStep}
                  />
                )}
              </>
            )}
          </div>
        </Modal>
      </form>
    </>
  );
};
