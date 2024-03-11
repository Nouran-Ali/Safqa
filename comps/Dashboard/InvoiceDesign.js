import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PublicIcon from '@mui/icons-material/Public';
import styles from '../../styles/Dashboard/InvoiceDesign.module.css';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer';
import LogoImg from '/public/logo.png';
import { getFullDateFromISO, getFullDateInString } from '../../lib/dates';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  payInvoiceCcavenueSchema,
  payInvoiceSchema,
} from '../../lib/validations/en/payInvoiceSchema';
import {
  chargeInvoice,
  getPayInvoice,
} from '../../store/slices/payInvoiceSlice';
import LoadingSpinner from '../LoadingSpinner';
import { setCookie } from 'cookies-next';
import { AxiosGlobal } from '../../lib/axios';
import { useEffect, useState } from 'react';
import {
  payInvoiceCcavenueSchemaAr,
  payInvoiceSchemaAr,
} from '../../lib/validations/ar/payInvoiceSchemaAr';
import { useCallback } from 'react';
import VisaForm from '../VisaForm';
import VisaCard from '../VisaCard';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import CheckoutVisaForm from '../CheckoutVisaForm';
import { getInvoiceProductionUrl } from '../../store/slices/ccAvenueSlice';
import LoadingPage from '../LoadingPage';

const InvoiceInfo = ({ invoiceInfo }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const {
    id,
    created_at,
    customer_email,
    customer_mobile,
    customer_name,
    invoice_display_value,
    invoice_item,
    invoice_type,
    invoice_value,
    profile,
  } = invoiceInfo;

  const CompanyInformation = () => {
    return (
      <div>
        <div>
          {/* <div className="d-flex justify-content-center"> */}
            <div className="text-center">
              <img
                src={
                  profile?.logo
                    ? `https://api.safqapay.com/image/profile/${profile?.id}/${profile.logo}`
                    : '/logo.png'
                }
                width="55px"
              />
            </div>
          {/* </div> */}
        </div>
        <div className="mt-2">
          <AccountBoxIcon />
          <span
            className={`w-100 text-wrap ${language == 'en' ? 'ms-3' : 'me-3'}`}
          >
            {profile?.company_name}
          </span>
        </div>
        <div className="mt-2">
          <PhoneIcon />
          <span className={language == 'en' ? 'ms-3' : 'me-3'}>
            {profile?.phone_number}
          </span>
        </div>
        <div className="mt-2">
          <MailIcon />
          <span className={language == 'en' ? 'ms-3' : 'me-3'}>
            {profile?.work_email}
          </span>
        </div>
        {profile?.website_url && (
          <div className="mt-2">
            <AttachmentIcon />
            <span className={language == 'en' ? 'ms-3' : 'me-3'}>
              {
                <Link href={profile?.website_url}>
                  {t('dashboard.website_URL')}
                </Link>
              }
            </span>
          </div>
        )}
      </div>
    );
  };

  const InvoiceInfo = () => {
    return (
      <>
        <div className={`${styles.dataInvoice}`}>
          <div className="mt-2">
            <p>
              {t('dashboard.invoice_id')} {id}
            </p>
          </div>
          <div className="mt-2">
            <p>{t('dashboard.created_on')}</p>
            <p className={`${styles.data}`}>
              {getFullDateInString(created_at, 'en')}
            </p>
          </div>
          <div className="mt-2">
            <p>{t('dashboard.INVOICE_TO')}</p>
            <p className={`fs-5 fw-bold ${styles.data} ${styles.name}`}>
              {customer_name}
            </p>
          </div>
          {customer_mobile && (
            <div className="mt-2">
              <p>{t('dashboard.customer_mobile')}</p>
              <p className={`${styles.data}`}>{customer_mobile}</p>
            </div>
          )}
          {customer_email && (
            <div className="mt-2">
              <p>{t('dashboard.customer_email')}</p>
              <p className={`${styles.data}`}>{customer_email}</p>
            </div>
          )}
          {/* <div className="mt-2">
            <p>{t("dashboard.customer_reference")}</p>
            <p className={`${styles.data}`}></p>
          </div> */}
        </div>
      </>
    );
  };

  return (
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
      <div className={`d-md-block d-flex justify-content-around align-items-start`}>
        <CompanyInformation />
        <hr className='d-md-block d-none' />
        <InvoiceInfo />
      </div>
    </div>
  );
};

const InvoiceItems = ({ invoiceItems }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="table-responsive w-100 mb-3">
      <table
        className={`table text-center rounded-2 mt-4 safqa-scroll-x ${styles.table}`}
      >
        <thead>
          <tr>
            <th scope="col">{t('dashboard.item')}</th>
            <th scope="col">{t('dashboard.quantity')}</th>
            <th scope="col">{t('dashboard.price')}</th>
            <th scope="col">{t('dashboard.total')}</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems?.map(
            ({ id, product_name, product_quantity, product_price }) => {
              return (
                <>
                  <tr key={id} className="border-bottom border-2">
                    <td>{product_name}</td>
                    <td>{product_quantity}</td>
                    <td>{product_price}</td>
                    <td>{product_quantity * product_price}</td>
                  </tr>
                </>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

const NewInvoiceCheckout = ({
  register,
  setValue,
  errors,
  api_errors,
  isLoading,
}) => {
  const initialState = {
    card_number: '#### #### #### ####',
    card_name: 'FULL NAME',
    exp_month: '',
    exp_year: '',
    cvc: '',
    isCardFlipped: false,
  };

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const [modal1Open, setModal1Open] = useState(false);
  const formRef = useRef();
  const { theme } = useTheme();
  const [state, setState] = useState(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

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

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <div>
      <div className={`d-flex`}>
        <hr />
        <p className="mx-4 mt-2 fw-bold">
          {t('dashboard.insert_card_details')}
        </p>
        <hr />
      </div>

      <CheckoutVisaForm
        cardMonth={state.exp_month}
        cardYear={state.exp_year}
        setValue={setValue}
        errors={errors}
        api_errors={api_errors}
        register={register}
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
      </CheckoutVisaForm>

      <div className={` ${styles.cardDetails}`}>
        <div className="my-3 text-center">
          <button
            className={`border-0 rounded-2 w-100 ${styles.Pay} ${
              isLoading ? 'opacity-50' : ''
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : t('dashboard.pay')}
          </button>
        </div>
      </div>
    </div>
  );
};

const CCAvenuePayInvoice = ({
  invoice_id,
  invoice_display_value,
  is_open_invoice,
}) => {
  const { productionUrl, isLoading } = useSelector((state) => state.ccavenue);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!is_open_invoice) {
      dispatch(
        getInvoiceProductionUrl({
          id: invoice_id,
          amount: invoice_display_value,
        })
      );
    }
  }, []);

  return (
    <div className="mx-auto text-center">
      {isLoading && <LoadingPage />}
      {productionUrl && !isLoading && (
        <iframe
          className="mx-auto text-center"
          src={productionUrl}
          id="paymentFrame"
          width="700"
          height="500"
          frameBorder="0"
          scrolling="No"
        ></iframe>
      )}
    </div>
  );
};

const InvoiceDesign = ({ payInvoice }) => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language, changeLanguage } = i18n;
  const { active_countries, countries } = useSelector((state) => state.country);
  const { payment_type } = useSelector((state) => state.paymentInfo);
  const [currencyInp, setCurrencyInp] = useState(
    payInvoice.currency?.short_currency
  );
  const { productionUrl } = useSelector((state) => state.ccavenue);
  const [renderValue, setRenderValue] = useState(payInvoice.invoice_value);
  const [loading, setLoading] = useState(false);

  const {
    id,
    created_at,
    customer_email,
    customer_mobile,
    customer_name,
    invoice_display_value,
    terms_and_conditions,
    invoice_item,
    invoice_type,
    profile,
    currency,
    is_open_invoice,
    min_invoice,
    max_invoice,
    status,
    discount_type,
    discount_value,
    comments,
    amount_changable,
  } = payInvoice;
  const { invoiceCheckoutInfo, success, api_errors, isLoading } = useSelector(
    (state) => state.payInvoice
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      payment_type == 1
        ? language == 'en'
          ? payInvoiceSchema(
              min_invoice,
              max_invoice - amount_changable,
              is_open_invoice
            )
          : payInvoiceSchemaAr(
              min_invoice,
              max_invoice - amount_changable,
              is_open_invoice
            )
        : language == 'en'
        ? payInvoiceCcavenueSchema(
            min_invoice,
            max_invoice - amount_changable,
            is_open_invoice
          )
        : payInvoiceCcavenueSchemaAr(
            min_invoice,
            max_invoice - amount_changable,
            is_open_invoice
          )
    ),
    defaultValues: is_open_invoice
      ? { ...invoiceCheckoutInfo, amount: max_invoice - amount_changable }
      : { ...invoiceCheckoutInfo },
  });

  const toggleLanguage = () => {
    if (language == 'en') {
      setCookie('language', 'ar');
      changeLanguage('ar');
    } else {
      setCookie('language', 'en');
      changeLanguage('en');
    }
  };

  // convert invoice currency
  useEffect(() => {
    const convertCurrency = async () => {
      setLoading(true);
      try {
        const { data } = await AxiosGlobal.get(
          `https://api.apilayer.com/fixer/convert?to=${currencyInp}&from=${currency?.short_currency}&amount=${invoice_display_value}`,
          {
            headers: { apikey: 'mCFAqSZGgfz1vYfLic62hcqbMHnZKm7G' },
          }
        );
        setRenderValue(data?.result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (currencyInp == currency?.short_currency) {
      setRenderValue(invoice_display_value);
    } else {
      convertCurrency();
    }
  }, [currency, currencyInp, invoice_display_value]);

  const onSubmit = (data) => {
    console.log(data);
    if (payment_type == 1) {
      dispatch(chargeInvoice({ ...data, id }));
    } else {
      dispatch(getInvoiceProductionUrl({ ...data, id }));
    }
  };

  const renderStatus = (status) => {
    if (status == 'pending' || status == 'processing') {
      return (
        <>
          {payment_type == 1 && (
            <NewInvoiceCheckout
              register={register}
              setValue={setValue}
              errors={errors}
              isLoading={isLoading}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              api_errors={api_errors}
            />
          )}

          {payment_type == 2 && (
            <CCAvenuePayInvoice
              invoice_id={id}
              invoice_display_value={invoice_display_value}
              is_open_invoice={is_open_invoice}
            />
          )}
        </>
      );
    } else if (status == 'unpaid') {
      return (
        <div className="alert alert-danger" role="alert">
          <p className="fs-5 m-0">{t('dashboard.invoice_expired')}</p>
        </div>
      );
    } else if (status == 'paid') {
      return (
        <div className="alert alert-success" role="alert">
          <p className="fs-5 m-0">{t('dashboard.invoice_paid')}</p>
        </div>
      );
    }
  };

  const renderInvoiceValue = () => {
    return (
      <>
        {is_open_invoice ? (
          <div className=" text-center">
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  {min_invoice} - {max_invoice - amount_changable}
                </span>
              </div>
              {(status == 'pending' || status == 'processing') && (
                <input
                  className={`form-control shadow-none border-3 ${
                    errors.amount?.message && 'border-danger'
                  }`}
                  type="number"
                  {...register('amount')}
                />
              )}

              <div class="input-group-append">
                <span class="input-group-text">{currencyInp}</span>
              </div>

              {payment_type == 2 && (
                <div class="input-group-append">
                  <button class="btn btn-outline-primary" type="submit">
                    {language == 'en' ? 'Progress a payment' : 'متابعة الدفع'}
                  </button>
                </div>
              )}
            </div>

            {/* <button className='btn btn-primary'>Progress a payment</button> */}

            {errors.amount?.message && (
              <p className="text-danger">{errors.amount.message}</p>
            )}
          </div>
        ) : (
          <div className={` ${styles.title} mt-3 text-center`}>
            <h2 className="fw-bold">
              {loading ? <LoadingSpinner /> : renderValue} {currencyInp}
            </h2>
          </div>
        )}
      </>
    );
  };

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <div className="container">
      <div
        className={`mt-2 mb-4 ${styles.InvoiceDesign}`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="row">
          {/* here is the invoice info */}
          <InvoiceInfo invoiceInfo={payInvoice} />
          <div
            className={` col-xl-9 col-lg-9 col-md-9 col-sm-12 ${styles.sectionRight}`}
          >
            <div >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between">
                  <div
                    className={` ${styles.title} ${language == 'ar' && 'mt-1'}`}
                  >
                    <h2 className="fw-bold">{t('dashboard.INVOICE')}</h2>
                    <hr />
                  </div>
                  {renderInvoiceValue()}

                  <div className="d-flex align-items-start mt-3">
                    {is_open_invoice ? null : (
                      <select
                        className={`form-select shadow-none 
                            ${language == 'en' ? 'me-4' : 'ms-4'} 
                            ${styles.selectinp}`}
                        aria-label="Default select example"
                        value={currencyInp}
                        onChange={(e) => setCurrencyInp(e.target.value)}
                        disabled={
                          is_open_invoice || loading || status == 'paid'
                        }
                      >
                        {countries?.map((country) => (
                          <option
                            key={country.id}
                            value={country?.short_currency}
                          >
                            {country?.short_currency}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      type="button"
                      className={`btn btn-secondary d-flex px-4 ${styles.btnAR}`}
                      onClick={toggleLanguage}
                    >
                      <span className={language == 'ar' && 'ms-2'}>
                        {language === 'en' ? 'العربيه' : 'الانجليزيه'}
                      </span>
                      <PublicIcon sx={{ marginLeft: '5px' }} />
                    </button>
                  </div>
                </div>

                {renderStatus(status)}
              </form>

              {comments && (
                <div className={styles.terms + ' mb-3'}>
                  <p className="fw-bold">{t('dashboard.comments')}</p>
                  <span>{comments}</span>
                </div>
              )}

              {terms_and_conditions && (
                <div className={styles.terms}>
                  <p className="fw-bold">{t('dashboard.terms_conditions')}</p>
                  <span>{terms_and_conditions}</span>
                </div>
              )}

              <div>
                {
                  // invoice_type == 'invoice' &&
                  <InvoiceItems invoiceItems={invoice_item} />
                }

                <div
                  className={`${
                    language == 'en' ? 'float-end' : 'float-start'
                  } mb-3`}
                >
                  <div className="p-4 bg-grey rounded-3">
                    <p className={`m-0 p-2 fs-5  text-black `}>
                      {t('dashboard.total')} :
                      <span className="fw-bold mx-2">
                        {invoice_display_value + (discount_value || 0)}{' '}
                        {currency?.short_currency}
                      </span>
                    </p>
                    {is_open_invoice > 0 && (
                      <>
                        {discount_value == 1 && (
                          <p className={`m-0 p-2 fs-5  text-danger`}>
                            {t('dashboard.discount')} :
                            <span className="fw-bold mx-2">
                              {discount_value}{' '}
                              {discount_type == 0
                                ? currency?.short_currency
                                : '%'}
                            </span>
                          </p>
                        )}
                        <p className={`m-0 p-2 fs-5  text-danger`}>
                          {t('dashboard.paid_amount')} :
                          <span className="fw-bold mx-2">
                            {amount_changable} {currency?.short_currency}
                          </span>
                        </p>
                        <p className={`m-0 p-2 fs-5  text-success`}>
                          {t('final_total')} :
                          <span className="fw-bold mx-2">
                            {invoice_display_value - amount_changable}{' '}
                            {currency?.short_currency}
                          </span>
                        </p>
                      </>
                    )}
                    {discount_value && !is_open_invoice ? (
                      <>
                        <p className={`m-0 p-2 fs-5  text-danger`}>
                          {t('dashboard.discount')} :
                          <span className="fw-bold mx-2">
                            {discount_value}{' '}
                            {discount_type == 0
                              ? currency?.short_currency
                              : '%'}
                          </span>
                        </p>
                        <p className={`m-0 p-2 fs-5  text-success`}>
                          {t('final_total')} :
                          <span className="fw-bold mx-2">
                            {invoice_display_value} {currency?.short_currency}
                          </span>
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDesign;
