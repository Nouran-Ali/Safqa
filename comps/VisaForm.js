import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MinusSafqaPercent, USDConvertCurrency } from '../lib/validations/services';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CForm({
    cardMonth,
    cardYear,
    onUpdateState,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    onCardInputFocus,
    onCardInputBlur,
    cardCvv,
    register,
    inputs,
    errors,
    api_errors,
    setValue,
    children
}) {

    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const { profile_business } = useSelector(state => state.profileBusiness)
    const { statistics: { rate } } = useSelector(state => state.auth)
    const { amount } = inputs;
    const [cardNumber, setCardNumber] = useState('');
    const [usdAmount, setUsdAmount] = useState(0);

    const handleFormChange = (event) => {
        console.log('first change')
        const { name, value } = event.target;
        console.log("🚀 ~ file: VisaForm.js:35 ~ handleFormChange ~ value:", value)
        console.log("🚀 ~ file: VisaForm.js:35 ~ handleFormChange ~ name:", name)
        setValue(name, value)
        onUpdateState(name, value);
    };

    // TODO: We can improve the regex check with a better approach like in the card component.
    const onCardNumberChange = (event) => {
        let { value, name } = event.target;
        const result = value.replace(/\s/g, "");
        let cardNumber = value;
        setValue('card_number', result);
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(cardNumber.trimRight());
        onUpdateState(name, cardNumber);
    };

    const onCvvFocus = (event) => {
        onUpdateState('isCardFlipped', true);
    };

    const onCvvBlur = (event) => {
        onUpdateState('isCardFlipped', false);
    };

    const onChangeAmount = (e) => {
        setValue('amount', e.target.value)
        const usdValue = USDConvertCurrency({ rate: rate, amount: e.target.value, toUsd: true })
        setUsdAmount(usdValue)
    }

    const onChangeUsdAmount = (e) => {
        setUsdAmount(e.target.value)
        const amount = USDConvertCurrency({ rate: rate, amount: e.target.value, toUsd: false })
        setValue('amount', amount)
    }

    // useEffect(() => {
    //     const amount = USDConvertCurrency({ rate: rate, amount: usdAmount, toUsd: false })
    //     setValue('amount', Math.ceil(amount))
    // }, [rate])

    return (
        <div className={`card-form ${language == 'ar' ? 'text-end' : "text-start"} `}>
            <div className="card-list">{children}</div>
            <div className="card-form__inner">
                <div className="card-input mb-2">
                    <label htmlFor="card_number" className="card-input__label">
                        {t("dashboard.card_number")}
                    </label>
                    <input
                        type="tel"
                        name="card_number"
                        {...register('card_number')}
                        className="card-input__input"
                        autoComplete="off"
                        onChange={onCardNumberChange}
                        maxLength="19"
                        ref={cardNumberRef}
                        onFocus={(e) => onCardInputFocus(e, 'card_number')}
                        onBlur={onCardInputBlur}
                        value={cardNumber}
                    />
                </div>

                <div>
                    {errors?.card_number && <p className='text-danger fs-6'>{errors.card_number.message}</p>}
                    {api_errors?.card_number && <p className='text-danger fs-6'>{api_errors.card_number}</p>}
                </div>

                <div className="card-input mb-2">
                    <label htmlFor="cardName" className="card-input__label">
                        {t("dashboard.card_holder_name")}
                    </label>
                    <input
                        {...register('card_name')}
                        type="text"
                        className="card-input__input"
                        autoComplete="off"
                        name="card_name"
                        onChange={handleFormChange}
                        ref={cardHolderRef}
                        onFocus={(e) => onCardInputFocus(e, 'card_name')}
                        onBlur={onCardInputBlur}
                    />
                </div>

                <div>
                    {errors?.card_name && <p className='text-danger fs-6'>{errors.card_name.message}</p>}
                    {api_errors?.card_name && <p className='text-danger fs-6'>{api_errors.card_name}</p>}
                </div>

                <div className="card-form__row mb-2">
                    <div className="card-form__col">
                        <div className="card-form__group">
                            <label
                                htmlFor="cardMonth"
                                className="card-input__label"
                            >
                                Expiration Date
                            </label>
                            <select
                                {...register('exp_month')}
                                className={`card-input__input -select 
                                ${errors.exp_month?.message && 'text-danger border border-danger'}
                                ${api_errors?.exp_month && 'text-danger border border-danger'}
                                `}
                                value={cardMonth}
                                name="exp_month"
                                onChange={handleFormChange}
                                ref={cardDateRef}
                                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                onBlur={onCardInputBlur}
                            >
                                <option value="" disabled>
                                    {t("dashboard.MM")}
                                </option>

                                {monthsArr.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                            <select
                                {...register('exp_year')}
                                name="exp_year"
                                className={`card-input__input -select 
                                ${errors.exp_year?.message && 'text-danger border border-danger'}
                                ${api_errors?.exp_year && 'text-danger border border-danger'}
                                `}
                                value={cardYear}
                                onChange={handleFormChange}
                                onFocus={(e) => onCardInputFocus(e, 'exp_year')}
                                onBlur={onCardInputBlur}
                            >
                                <option value="" disabled>
                                    {t("dashboard.YYYY")}
                                </option>

                                {yearsArr.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card-form__col -cvv">
                        <div className="card-input">
                            <label
                                htmlFor="cvc"
                                className="card-input__label"
                            >
                                CVV
                            </label>
                            <input
                                type="tel"
                                className={`card-input__input 
                                 ${errors.cvc?.message && 'text-danger border border-danger'}
                                ${api_errors?.cvc && 'text-danger border border-danger'}
                                `}
                                maxLength="4"
                                autoComplete="off"
                                {...register('cvc')}
                                name="cvc"
                                onChange={handleFormChange}
                                onFocus={onCvvFocus}
                                onBlur={onCvvBlur}
                                ref={cardCvv}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    {/* card_date */}
                    {errors?.card_date && <p className='text-danger fs-6'>{errors.card_date.message}</p>}
                    {api_errors?.card_date && <p className='text-danger fs-6'>{api_errors.card_date}</p>}
                    {/* exp month */}
                    {/* {errors?.exp_month && <p className='text-danger fs-6'>{errors.exp_month.message}</p>}
                    {api_errors?.exp_month && <p className='text-danger fs-6'>{api_errors.exp_month}</p>} */}
                    {/* exp year */}
                    {/* {errors?.exp_year && <p className='text-danger fs-6'>{errors.exp_year.message}</p>}
                    {api_errors?.exp_year && <p className='text-danger fs-6'>{api_errors.exp_year}</p>} */}
                    {/* cvc */}
                    {/* {errors?.cvc && <p className='text-danger fs-6'>{errors.cvc.message}</p>}
                    {api_errors?.cvc && <p className='text-danger fs-6'>{api_errors.cvc}</p>} */}
                </div>

                {
                    profile_business?.country?.short_currency.toLowerCase() !== 'usd' ?
                        <div className='row '>
                            <div className='col-6'>
                                <div className="card-input">
                                    <label htmlFor="amount" className="card-input__label">
                                        {t("dashboard.amount")} ({profile_business?.country?.short_currency})
                                    </label>
                                    <input
                                        type="number"
                                        className="card-input__input"
                                        autoComplete="off"
                                        {...register('amount')}
                                        onChange={onChangeAmount}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="card-input">
                                    <label htmlFor="amount" className="card-input__label">
                                        {t("dashboard.amount")} ({language == 'en' ? "USD" : "دولار أمريكي"})
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
                        :
                        <div className="card-input">
                            <label htmlFor="amount" className="card-input__label">
                                {t("dashboard.amount")} ({profile_business?.country?.short_currency})
                            </label>
                            <input
                                type="number"
                                className="card-input__input"
                                autoComplete="off"
                                {...register('amount')}
                                onChange={onChangeAmount}
                            />
                        </div>
                }

                {/* <div className='row mt-3 bg-grey p-4 rounded rounded-2'>
                    <div className='col-6'>
                        <p className='fs-5 fw-bold m-0'>Deposit Amount :</p>
                        <p className='fs-5 fw-bold m-0'> Safqa Fees :</p>
                        <p className='fs-5 fw-bold m-0'>Final Amount :</p>
                    </div>
                    <div className='col-6'>
                        <p className='fs-5 m-0'>{amount}</p>
                        <p className='fs-5 m-0 text-danger'>-5%</p>
                        <p className='fs-5 m-0 text-success'>{MinusSafqaPercent(amount)}</p>
                    </div>
                </div> */}

                {/* amount */}
                {errors?.amount && <p className='text-danger fs-6'>{errors.amount.message}</p>}
                {api_errors?.amount && <p className='text-danger fs-6'>{api_errors.amount}</p>}

                {typeof api_errors == 'string' && <p className='text-danger fs-6 text-center m-0 mt-3'>{api_errors}</p>}
            </div>
        </div>
    );
}
