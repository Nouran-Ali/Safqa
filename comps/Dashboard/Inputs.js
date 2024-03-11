import styles from '../../styles/Dashboard/Inputs.module.css';
import TableStyles from '../../styles/Dashboard/Tables.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AutoComplete, Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { Language } from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { getCountries } from '../../store/slices/countrySlice';

export const SafqaLabel = ({ label, span }) => {
  return (
    <label className={`form-label ${styles.label}`}>
      {label} <span className="ms-2">{span}</span>
    </label>
  );
};

export const SafqaLink = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className={`form-label ${styles.label}`}
      rel="noreferrer"
    >
      {url}
    </a>
  );
};

export const MagicInput = ({
  className,
  type,
  label,
  placeholder,
  value,
  setValue,
  required,
  disabled,
  onChange,
  min,
  error,
  typeError,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setValue(e.target.value));
  };

  const [t, i18n] = useTranslation();

  return (
    <>
      {label && (
        <label
          className={`form-label ${styles.label} ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {!required && (
            <span className="ms-2 opacity-75">{t('dashboard.optional')}</span>
          )}
        </label>
      )}

      <input
        className={` form-control shadow-none ${styles.inp} ${
          className && className
        } ${error ? 'border border-1 border-danger text-danger' : 'border-0'}`}
        id={label}
        type={type}
        min={min}
        // required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : handleChange}
        disabled={disabled}
      />
      {typeError && error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const SafqaInput = ({
  label_comment,
  comment,
  label,
  name,
  error,
  className,
  required,
  register,
  disabled,
  ...inputProps
}) => {
  const [t, i18n] = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      {label && (
        <label
          className={`form-label ${
            theme == 'dark' ? 'text-white' : styles.label
          } ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {label_comment && (
            <span className="fs-6 safqa-text-info-dashboard">
              {' '}
              ({label_comment})
            </span>
          )}
          {!required && (
            <span className="ms-2 me-2 opacity-75">
              {t('dashboard.optional')}
            </span>
          )}
        </label>
      )}

      <input
        id={label}
        className={`
        form-control shadow-none  
        ${className && className} 
        ${
          error
            ? 'border border-1 border-danger text-danger'
            : disabled
            ? 'border-white'
            : 'border-0'
        }
        `}
        disabled={disabled}
        {...inputProps}
        {...register(name)}
      />
      {comment && (
        <span className="fs-6 safqa-text-info-dashboard d-block">
          {comment}
        </span>
      )}
      {error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const SafqaInputWithoutRegister = ({
  label_comment,
  comment,
  label,
  name,
  error,
  className,
  required,
  disabled,
  ...inputProps
}) => {
  const [t, i18n] = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      {label && (
        <label
          className={`form-label ${
            theme == 'dark' ? 'text-white' : styles.label
          } ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {label_comment && (
            <span className="fs-6 safqa-text-info-dashboard">
              {' '}
              ({label_comment})
            </span>
          )}
          {!required && (
            <span className="ms-2 me-2 opacity-75">
              {t('dashboard.optional')}
            </span>
          )}
        </label>
      )}

      <input
        id={label}
        className={`
        form-control shadow-none  
        ${className && className} 
        ${
          error
            ? 'border border-1 border-danger text-danger'
            : disabled
            ? 'border-white'
            : 'border-0'
        }
        `}
        disabled={disabled}
        {...inputProps}
      />
      {comment && (
        <span className="fs-6 safqa-text-info-dashboard d-block">
          {comment}
        </span>
      )}
      {error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const SafqaInputCopy = ({
  label_comment,
  comment,
  label,
  name,
  error,
  className,
  required,
  disabled,
  ...inputProps
}) => {
  const [t, i18n] = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      {label && (
        <label
          className={`form-label ${
            theme == 'dark' ? 'text-white' : styles.label
          } ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {label_comment && (
            <span className="fs-6 safqa-text-info-dashboard">
              {' '}
              ({label_comment})
            </span>
          )}
          {!required && (
            <span className="ms-2 me-2 opacity-75">
              {t('dashboard.optional')}
            </span>
          )}
        </label>
      )}
      <div class="input-group mb-3">
        <input
          id={label}
          className={`
        form-control shadow-none  
        ${className && className} 
        ${
          error
            ? 'border border-1 border-danger text-danger'
            : disabled
            ? 'border-white'
            : 'border-0'
        }
        `}
          disabled={disabled}
          {...inputProps}
        />
        <span class="input-group-text" id="basic-addon2">
          @example.com
        </span>
      </div>

      {comment && (
        <span className="fs-6 safqa-text-info-dashboard d-block">
          {comment}
        </span>
      )}
      {error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const SafqaAutoComplete = ({
  onSelect,
  onSearch,
  control,
  label,
  name,
  error,
  className,
  required,
  options,
  ...inputProps
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const onChange = (data) => {
    // setValue(data);
  };

  return (
    <>
      {label && (
        <label
          className={`form-label ${styles.label} ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {!required && (
            <span className="ms-2 me-2 opacity-75">
              {t('dashboard.optional')}
            </span>
          )}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <AutoComplete
            placeholder={'iphone'}
            className={`form-control shadow-none safqa-bg-transparent ${
              styles.inp
            } ${
              error ? 'border border-1 border-danger text-danger' : 'border-0'
            }`}
            {...field}
            id={label}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            // onChange={onChange}
            filterOption={true}
            {...inputProps}
          />
        )}
      />

      {error && <span className="text-danger fs-6 d-block">{error}</span>}
    </>
  );
};

export const SafqaCheckBox = ({ label }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="d-flex">
      <input
        className={`form-check-input shadow-none ${
          language == 'en' ? 'me-4' : 'ms-2'
        }`}
        type="checkbox"
        id={label}
      />
      <label
        htmlFor={label}
        className={`form-label text-wrap ${language == 'ar' && 'ms-5'}`}
      >
        {label}
      </label>
    </div>
  );
};

export const SafqaNewCheckBox = ({ label, register, name, disabled }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="d-flex">
      <input
        {...register(name)}
        className={`form-check-input shadow-none ${
          language == 'en' ? 'me-4' : 'ms-2'
        }`}
        type="checkbox"
        id={name}
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className={`form-label text-wrap text-capitalize ${
          language == 'ar' && 'ms-5'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export const SafqaStaticCheckBox = ({ label, name, value }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="d-flex">
      <input
        className={`form-check-input shadow-none ${
          language == 'en' ? 'me-4' : 'ms-2'
        }`}
        type="checkbox"
        checked={value}
        id={name}
      />
      <label
        htmlFor={name}
        className={`form-label text-wrap text-capitalize ${
          language == 'ar' && 'ms-5'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export const MagicPhoneInput = ({
  phone,
  setPhone,
  code,
  setCode,
  error,
  required,
  label,
  placeholder,
  flag,
  defaultCodeValue,
}) => {
  const dispatch = useDispatch();
  const { active_countries } = useSelector((state) => state.global);

  return (
    <>
      {label && (
        <label
          className={`form-label ${styles.label} ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {!required && <span className="ms-2 opacity-75">( optional )</span>}
        </label>
      )}

      <div
        className={`d-flex bg-white  input-group mb-3 rounded-2 px-2  ${
          styles.codeCountry
        } ${error ? 'border border-1 border-danger text-danger' : 'border-0'}`}
      >
        <img
          src={`/flags/${flag}.png`}
          alt={flag}
          height="25px"
          className="rounded-1 align-self-center"
        />

        <select
          className={`ms-2 shadow-none  border-0`}
          // defaultValue={defaultCodeValue}
        >
          {active_countries?.map((country) => {
            return (
              <option
                key={country.id}
                value={country.id}
                // selected={country.id == defaultCodeValue && true}
                // selected
              >
                {country.code}
              </option>
            );
          })}
        </select>

        <div className={'ms-2 vr border border-2 '}></div>
        <input
          className={`form-control border-0 shadow-none ${styles.inp} ${
            error && ' text-danger'
          }`}
          id={label}
          type="text"
          placeholder={placeholder}
          value={phone}
          onChange={(e) => dispatch(setPhone(e.target.value))}
          // required={required}
        />
      </div>
    </>
  );
};

export const SafqaPhoneInput = ({
  error,
  codeError,
  required,
  label,
  phone_name,
  code_name,
  register,
  default_flag_id,
  // watch
}) => {
  const [flag, setFlag] = useState('/logo.png');
  const dispatch = useDispatch();
  const { active_countries, imageUrl } = useSelector((state) => state.country);

  const onChange = (e) => {
    const currentItem = active_countries.filter(
      (item) => item.id == e.target.value
    );
    if (currentItem.length) {
      setFlag(`${imageUrl}/${currentItem[0]?.['flag']}`);
    } else {
      setFlag('/logo.png');
    }
  };

  // const onChange = (e) => {
  //   const newId = e.target.value;
  //   console.log("🚀 ~ file: Inputs.js:328 ~ onChange ~ newId:", newId)
  //   let newFlag = ''

  //   active_countries?.map(item => {
  //     if (item.id == newId) {
  //       console.log(item)
  //       return newFlag = item.flag;
  //     }
  //   })

  //   setFlag(`${imageUrl}/${newFlag}`)
  // }

  useEffect(() => {
    if (default_flag_id) {
      let newFlag = '';

      active_countries?.map((item) => {
        if (item.id == default_flag_id) {
          console.log(item);
          return (newFlag = item.flag);
        }
      });

      setFlag(`${imageUrl}/${newFlag}`);
    }
  }, [active_countries, default_flag_id, imageUrl]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <>
      {label && (
        <label
          className={`form-label ${styles.label} ${error && 'text-danger'}`}
          htmlFor={label}
        >
          {label}
          {!required && <span className="ms-2 opacity-75">( optional )</span>}
        </label>
      )}

      <div
        className={`d-flex bg-white  input-group rounded-2 px-2  ${
          styles.codeCountry
        } ${error ? 'border border-1 border-danger text-danger' : 'border-0'}`}
      >
        {/* {
          active_countries?.length > 0 ?
            <img
              src={flag}
              height="25px"
              className="rounded-1 align-self-center"
            />

            : null
        } */}

        <div className="input-group-prepend">
          <span className="input-group-text border-0 rounded-0 rounded-start">
            <img src={flag} height="23px" />
          </span>
        </div>

        <select
          className={`ms-2 shadow-none border-0 ${codeError && 'text-danger'}`}
          {...register(code_name)}
          onChange={onChange}
        >
          <option value="">Code</option>
          {active_countries?.length > 0 &&
            active_countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.code}
              </option>
            ))}
        </select>

        <div className={'ms-2 vr border border-2 '}></div>
        <input
          className={`form-control border-0 shadow-none ${styles.inp} ${
            error && ' text-danger'
          }`}
          id={label}
          type="text"
          placeholder="123456789"
          {...register(phone_name)}
        />
      </div>
      {error && <span className="text-danger fs-6">{error}</span>}
      {error && codeError && <br />}
      {codeError && <span className="text-danger fs-6">{codeError}</span>}
    </>
  );
};

export const MagicRadioInput = ({
  label,
  firstLabel,
  secondLabel,
  firstValue,
  secondValue,
  value,
  setValue,
  error,
}) => {
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <label className={`form-label ${error && 'text-danger'}`}>{label}</label>
      <div className="d-flex ">
        <div
          className={`form-check ${language == 'en' ? 'me-5' : 'ms-5'} ${
            styles.radio
          }`}
        >
          <input
            className="form-check-input shadow-none"
            type="radio"
            name={label}
            id={`${label}-1`}
            value={firstValue && firstValue}
            defaultChecked={value == firstValue && true}
            onClick={(e) => dispatch(setValue(e.target.value))}
          />
          <label className="form-check-label" htmlFor={`${label}-1`}>
            {firstLabel}
          </label>
        </div>

        <div
          className={`form-check ${language == 'en' ? 'me-5' : 'ms-5'}  ${
            styles.radio
          }`}
        >
          <input
            className="form-check-input shadow-none"
            type="radio"
            name={label}
            id={`${label}-2`}
            value={secondValue && secondValue}
            defaultChecked={value == secondValue && true}
            onClick={(e) => dispatch(setValue(e.target.value))}
          />
          <label className="form-check-label" htmlFor={`${label}-2`}>
            {secondLabel}
          </label>
        </div>
      </div>
    </>
  );
};

export const SafqaRadioInput = ({
  label,
  items,
  error,
  register,
  name,
  name_en,
  name_ar,
  errorClassName,
  defaultValue,
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  return (
    <>
      {label && (
        <label
          className={`form-label ${error && 'text-danger'} ${
            theme == 'dark' ? 'text-white' : ''
          }`}
        >
          {label}
        </label>
      )}
      <div className="d-flex ">
        <div
          className={`form-check form-check-inline ${
            language == 'en' ? 'me-5' : 'ms-5'
          } ${styles.radio}`}
        >
          {items?.length > 0 &&
            items.map((item) => (
              <div
                key={item.id}
                className={`form-check form-check-inline ${
                  language == 'en' ? 'me-5' : 'ms-3'
                } ${styles.radio}`}
              >
                <input
                  {...register(name)}
                  className="form-check-input shadow-none"
                  type="radio"
                  id={`${label && label}-${item.name || item[name_en]}`}
                  value={item.id}
                  defaultChecked={defaultValue === item.id}
                />
                <label
                  className={`form-check-label text-capitalize ${
                    theme == 'dark' ? 'text-white' : ''
                  }`}
                  htmlFor={`${label && label}-${item.name || item[name_en]}`}
                >
                  {item.name
                    ? item.name
                    : language == 'en'
                    ? item[name_en]
                    : item[name_ar]}
                </label>
              </div>
            ))}
        </div>
      </div>
      {error && (
        <span className={`text-danger fs-6 ${errorClassName}`}>{error}</span>
      )}
    </>
  );
};

export const MagicCurrencySelectInput = ({
  currencyId,
  setCurrencyId,
  error,
  required,
}) => {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.global.data);

  const handleChangeCurrencyId = (e) => {
    dispatch(setCurrencyId(e.target.value));
  };

  return (
    <>
      <label className={`form-label ${error && 'text-danger'}`}>Currency</label>
      <select
        className={`form-control border-0 shadow-none ${styles.inp} ${
          error && ' text-danger'
        }`}
        value={currencyId}
        onChange={handleChangeCurrencyId}
        required={required}
      >
        {country?.map((country) => (
          <option key={country.id} value={country.id}>
            {country.currency}
          </option>
        ))}
      </select>
    </>
  );
};

export const SafqaCurrencySelect = ({ register, name, error, required }) => {
  const { country } = useSelector((state) => state.global.data);

  const [t, i18n] = useTranslation();

  return (
    <>
      <label className={`form-label  ${error && 'text-danger'}`}>
        {t('dashboard.currency')}
      </label>
      <select
        className={`form-control form-select border-0 shadow-none ${
          styles.inp
        } ${error && ' text-danger'}`}
        {...register(name)}
        // defaultValue={""}
      >
        <option value="">Choose Currency</option>
        {country?.length > 0 &&
          country.map((country) => (
            <option key={country.id} value={country.id}>
              {country.currency}
            </option>
          ))}
      </select>
      {error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const SafqaSocialMediaSelect = ({ register, name, error, required }) => {
  const { social_media_list } = useSelector((state) => state.socialMedia);

  const [t, i18n] = useTranslation();

  return (
    <>
      <label className={`form-label  ${error && 'text-danger'}`}>
        {t('dashboard.social_media')}
      </label>
      <select
        className={`form-control form-select border-0 shadow-none ${
          styles.inp
        } ${error && ' text-danger'}`}
        {...register(name)}
      >
        <option value={''}>Choose Social Media</option>
        {social_media_list?.map((social_media) => (
          <option key={social_media.id} value={social_media.id}>
            {social_media.name_en}
          </option>
        ))}
      </select>
      {error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const MagicTextArea = ({ label, value, setValue, required, error }) => {
  const dispatch = useDispatch();
  return (
    <>
      {label && (
        <label
          htmlFor={label}
          className={`form-label ${error && 'text-danger'}`}
        >
          {label}{' '}
          {!required && <span className="ms-2 opacity-75">( optional )</span>}
        </label>
      )}

      <div className="d-flex align-items-center">
        <textarea
          id={label}
          type="text"
          className={`form-control shadow-none ${styles.inpfile} ${
            error ? 'border border-1 border-danger text-danger' : 'border-0'
          }`}
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
          // required={required}
        />
      </div>
    </>
  );
};

export const SafqaTextArea = ({
  className,
  label,
  name,
  register,
  required,
  error,
  ...inputProps
}) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  return (
    <>
      {label && (
        <label
          htmlFor={label}
          className={`form-label ${error && 'text-danger'} ${
            theme == 'dark' ? 'text-white' : ''
          }`}
        >
          {label}{' '}
          {!required && (
            <span className="ms-2 opacity-75">{t('dashboard.optional')}</span>
          )}
        </label>
      )}

      <div className="d-flex align-items-center">
        <textarea
          id={label}
          type="text"
          className={`form-control shadow-none 
          ${className && className} 
          ${styles.inpfile}
           ${error ? 'border border-1 border-danger text-danger' : 'border-0'}`}
          {...register(name)}
          {...inputProps}
        />
      </div>
      {error && <span className="text-danger fs-6">{error}</span>}
    </>
  );
};

export const MagicSelectInput = ({
  label,
  options,
  value,
  setValue,
  error,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="w-100">
      <label className={`${error && 'text-danger'} form-label`}>{label}</label>
      <select
        className={`form-control form-select shadow-none ${styles.inpfile} ${
          error ? 'border border-1 border-danger text-danger' : 'border-0'
        }`}
        value={value}
        onChange={(e) => dispatch(setValue(e.target.value))}
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SafqaSelect = ({
  label_comment,
  comment,
  name,
  register,
  label,
  options,
  error,
  option_name,
  option_name_ar,
  select_label,
  required,
  className,
  undisplay_icon,
  ...props
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();
  const { pathname } = useRouter();

  return (
    <div className="w-100">
      {label && (
        <label className={`${error && 'text-danger'}  form-label`}>
          {label}
          <span>{!required && t('dashboard.optional')}</span>
          {label_comment && (
            <span className="fs-6 safqa-text-info-dashboard">
              {' '}
              ({label_comment})
            </span>
          )}
        </label>
      )}
      <select
        className={`form-control text-capitalize  shadow-none 
        ${undisplay_icon && 'select-icon-none'}
        ${className && className} 
        ${props['disabled'] && 'select-icon-none'}
        ${error ? 'border border-1 border-danger text-danger' : 'border-0'}`}
        {...register(name)}
        {...props}
      >
        {select_label && (
          <option value="" className="text-capitalize">
            {`${t('dashboard.choose')} ${label || select_label}`}
          </option>
        )}

        {options?.length > 0 &&
          options.map((option) => (
            <option
              key={option.id}
              value={option.id}
              className="text-capitalize"
            >
              {language == 'en' ? option[option_name] : option[option_name_ar]}
            </option>
          ))}
      </select>
      {comment && (
        <span className="fs-6 safqa-text-info-dashboard d-block">
          {comment}
        </span>
      )}
      {error && <span className="text-danger fs-6">{error}</span>}
    </div>
  );
};

export const SafqaSelectCommissionType = ({
  label_comment,
  comment,
  register,
  error,
  required,
  className,
  undisplay_icon,
  ...props
}) => {
  const { commission_types } = useSelector((state) => state.invoice);
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <SafqaSelect
      label_comment={label_comment}
      comment={comment}
      name={'commission_type'}
      register={register}
      label={t('dashboard.commission_type')}
      options={commission_types}
      error={error}
      option_name={'name_en'}
      option_name_ar={'name_ar'}
      select_label={t('dashboard.commission_type')}
      required={true}
      className={className}
      undisplay_icon={undisplay_icon}
      {...props}
    />
  );
};

export const SafqaSelectWithImg = ({
  name,
  register,
  label,
  options,
  error,
  option_name,
  option_name_ar,
  select_label,
  required,
  className,
  imageUrl,
  imageName,
  ...props
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();
  const { pathname } = useRouter();
  const [img, setImg] = useState('/logo.png');

  const onChange = (e) => {
    const currentItem = options.filter((item) => item.id == e.target.value);
    if (currentItem.length) {
      setImg(`${imageUrl}/${currentItem[0]?.[imageName]}`);
    } else {
      setImg('/logo.png');
    }
  };

  return (
    <div className="w-100">
      {label && (
        <label className={`${error && 'text-danger'}  form-label`}>
          {label}
          <span>{!required && t('dashboard.optional')}</span>
        </label>
      )}
      <div className="input-group w-100">
        <div className="input-group-prepend">
          <span className="input-group-text border-0 rounded-0 rounded-start">
            <img src={img} height="23px" />
          </span>
        </div>
        <select
          className={`form-select text-capitalize shadow-none rounded-0 rounded-end
        ${className && className} 
        ${error ? 'border border-1 border-danger text-danger' : 'border-0'}`}
          {...register(name)}
          {...props}
          onChange={onChange}
        >
          {select_label && (
            <option value="" className="text-capitalize">
              {`${t('dashboard.choose')} ${label || select_label}`}
            </option>
          )}

          {options?.length > 0 &&
            options.map((option) => (
              <option
                key={option.id}
                value={option.id}
                className="text-capitalize"
              >
                {language == 'en'
                  ? option[option_name]
                  : option[option_name_ar]}
              </option>
            ))}
        </select>
      </div>
      {error && <span className="text-danger fs-6">{error}</span>}
    </div>
  );
};

export const MagicFileInput = ({
  label,
  file,
  setFile,
  required,
  error,
  multiple,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    multiple
      ? dispatch(setFile(e.target.files))
      : dispatch(setFile(e.target.files[0]));
  };

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <label htmlFor={label} className={`form-label ${error && 'text-danger'}`}>
        {label}
        {!required && <span className="ms-2 opacity-75">( optional )</span>}
      </label>
      <div className="d-flex align-items-center">
        <input
          className={`form-control shadow-none ${styles.inpfile} ${
            error ? 'border border-1 border-danger text-danger' : 'border-0'
          }`}
          type="file"
          id={label}
          value={file?.filename}
          onChange={handleChange}
          // required={required}
          multiple={multiple}
        />
        <label
          htmlFor={label}
          className={`btn px-3 ${Language == 'en' ? 'ms-3' : 'me-3'} ${
            styles.btnFile
          }`}
        >
          {t('dashboard.choose')}
        </label>
      </div>
    </>
  );
};

export const SafqaFileInput = ({
  label,
  name,
  error,
  className,
  required,
  register,
  ...inputProps
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  return (
    <>
      <label
        htmlFor={label}
        className={`form-label ${error && 'text-danger'} ${
          theme == 'dark' ? 'text-white' : ''
        }`}
      >
        {label}
        {!required && (
          <span className={`${language == 'en' ? 'ms-2' : 'me-2'} opacity-75`}>
            {t('dashboard.optional')}
          </span>
        )}
      </label>
      <div className="d-flex align-items-center">
        <input
          className={`form-control shadow-none ${styles.inpfile} ${
            error ? 'border border-1 border-danger text-danger' : 'border-0'
          }`}
          type="file"
          id={label}
          {...register(name)}
          {...inputProps}
        />
        <label
          htmlFor={label}
          className={`btn px-3 ${language == 'en' ? 'ms-3' : 'me-3'} ${
            styles.btnFile
          }`}
        >
          {t('dashboard.choose')}
        </label>
      </div>
      {/* <span className="text-danger fs-6">{JSON.stringify(error)}</span> */}
      {error && typeof error == 'string' && (
        <span className="text-danger fs-6">{error}</span>
      )}

      {error && typeof error == 'object' && (
        <span className="text-danger fs-6">{error}</span>
      )}
      {/* {typeof error == 'object' &&
        <>
        </>
        } */}
    </>
  );
};

export const PhoneInput = ({
  error,
  required,
  label,
  flag,
  phone_name,
  code_name,
  register,
  selected,
  defaultCode,
}) => {};

export const SafqaLanguageRadio = ({ label, register, name, error }) => {
  const { language } = useSelector((state) => state.global.data);
  const { theme } = useTheme();

  return (
    <>
      <label className={`form-label ${theme == 'dark' ? 'text-white' : ''}`}>
        {label}
      </label>
      <div className="d-flex">
        {language?.length > 0 &&
          language.map((lang) => (
            <div
              key={lang.id}
              className={`form-check form-check-inline ${
                language == 'en' ? 'me-2' : 'ms-2'
              } ${styles.radio}`}
            >
              <input
                {...register(name)}
                className="form-check-input shadow-none"
                type="radio"
                id={lang.id}
                value={lang.id}
              />
              <label className="form-check-label" htmlFor={lang.id}>
                {lang.name}
              </label>
            </div>
          ))}
      </div>
      <span className="text-danger">{error}</span>
    </>
  );
};

export const usePageSize = (size) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const [pageSize, setPageSize] = useState(size);
  const { theme } = useTheme();

  const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
  ];

  return {
    SelectPageSize: () => (
      <select
        className={`selectpicker mt-3 border-0 rounded-2 p-2 px-3 
        ${TableStyles.marginTopInResponsive} 
        ${language == 'en' ? 'float-end ms-auto' : 'float-start me-auto'}
        ${theme == 'dark' ? 'btn-dark-box' : ''}`}
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    ),
    pageSize: pageSize,
  };
};
