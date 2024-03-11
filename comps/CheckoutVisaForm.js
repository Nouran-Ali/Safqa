import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CheckoutVisaForm({
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
    errors,
    api_errors,
    setValue,
    children
}) {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const [cardNumber, setCardNumber] = useState('');

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

    return (
        <div className={`card-form ${language == 'ar' ? 'text-end' : "text-start"} `}>
            <div className="card-list">{children}</div>
            <div className="card-form__inner w-100 ">
                <div className="card-input mb-3">
                    <input
                        type="tel"
                        name="card_number"
                        {...register('card_number')}
                        placeholder={t("dashboard.card_number")}
                        className={`card-input__input 
                                ${(errors?.card_number?.message || api_errors?.card_number) && 'border border-danger text-danger'}
                                `}
                        autoComplete="off"
                        onChange={onCardNumberChange}
                        maxLength="19"
                        ref={cardNumberRef}
                        onFocus={(e) => onCardInputFocus(e, 'card_number')}
                        onBlur={onCardInputBlur}
                        value={cardNumber}
                    />
                    <div>
                        {errors?.card_number && <p className='text-danger fs-6'>{errors.card_number.message}</p>}
                        {api_errors?.card_number && <p className='text-danger fs-6'>{api_errors.card_number}</p>}
                    </div>
                </div>


                <div className="card-input mb-3">
                    {/* <label htmlFor="cardName" className="card-input__label">
                        {t("dashboard.card_holder_name")}
                    </label> */}
                    <input
                        {...register('card_name')}
                        type="text"
                        placeholder={t("dashboard.card_holder_name")}
                        className={`card-input__input 
                                ${(errors?.card_name?.message || api_errors?.card_name) && 'border border-danger text-danger'}
                                `}
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

                <div className="card-form__row">
                    <div className="card-form__col">
                        <div className="card-form__group">
                            {/* <label
                                htmlFor="cardMonth"
                                className="card-input__label"
                            >
                                Expiration Date
                            </label> */}
                            <select
                                {...register('exp_month')}
                                placeholder={t("dashboard.MM")}
                                className={`card-input__input -select
                                ${(errors?.exp_month?.message || api_errors?.exp_month) && 'border border-danger text-danger'}
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
                                placeholder={t("dashboard.YYYY")}
                                className={`card-input__input -select 
                                ${(errors?.exp_year?.message || api_errors?.exp_year) && 'border border-danger text-danger'}
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
                        {/* exp month */}
                        {/* {errors?.card_date && <p className='text-danger fs-6'>{errors.card_date.message}</p>}
                        {api_errors?.card_date && <p className='text-danger fs-6'>{api_errors.card_date}</p>} */}
                    </div>
                    <div className="card-form__col -cvv">
                        <div className="card-input">
                            {/* <label
                                htmlFor="cvc"
                                className="card-input__label"
                            >
                                CVV
                            </label> */}
                            <input
                                type="tel"
                                className={`card-input__input 
                                ${(errors?.cvc?.message || api_errors?.cvc) && 'border border-danger text-danger'}
                                `}
                                maxLength="4"
                                autoComplete="off"
                                placeholder={t('dashboard.cvc')}
                                {...register('cvc')}
                                name="cvc"
                                onChange={handleFormChange}
                                onFocus={onCvvFocus}
                                onBlur={onCvvBlur}
                                ref={cardCvv}
                            />
                        </div>
                        {/* {errors?.cvc && <p className='text-danger fs-6'>{errors.cvc.message}</p>}
                        {api_errors?.cvc && <p className='text-danger fs-6'>{api_errors.cvc}</p>} */}
                    </div>
                </div>

                <div>
                    {/* exp year */}
                    {errors?.card_date && <p className='text-danger fs-6'>{errors.card_date.message}</p>}
                    {api_errors?.card_date && <p className='text-danger fs-6'>{api_errors.card_date}</p>} 
                </div>

                {/* <div className="card-input">
                    <label htmlFor="amount" className="card-input__label">
                        {t("dashboard.amount")}
                    </label>
                    <input
                        type="number"
                        className="card-input__input"
                        autoComplete="off"
                        {...register('amount')}
                    />
                </div> */}

                {/* {errors?.amount && <p className='text-danger fs-6'>{errors.amount.message}</p>}
                {api_errors?.amount && <p className='text-danger fs-6'>{api_errors.amount}</p>} */}

                {typeof api_errors == 'string' && <p className='text-danger fs-6 text-center m-0 mt-3'>{api_errors}</p>}
            </div>
        </div>
    );
}
