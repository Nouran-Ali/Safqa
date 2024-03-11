import styles from "../../../styles/Dashboard/TotalBalanceaAndTransactions.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";
import { useEffect } from "react";
import { formatNumber } from "../../../lib/validations/services";

const TotalBalanceaAndTransactions = () => {
    const { statistics: { invoices, transaction_count, transaction_value } } = useSelector((state) => state.auth);
    const { profile_business } = useSelector((state) => state.profileBusiness);
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState('monthly')
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const { theme } = useTheme();

    const toggleActive = (e) => {
        setIsActive(e.target.id)
    }


    return (
        <div className={`w-100`}>
            <div className={`d-flex justify-content-end mb-3`}>
                <div className={`${theme == "dark" ? styles.buttons_dark : styles.buttons} rounded-3 p-3 px-2 ${theme == 'dark' ? "dark-blue-box" : ""}`}>
                    <a
                        id="overall"
                        className={`
                        ${styles.btn} 
                        ${theme == 'light' && isActive == 'overall' && styles.active} 
                        ${theme == 'dark' && isActive == 'overall' && 'active'} 
                        p-2 px-4 rounded-3 me-3
                        `}
                        onClick={toggleActive}
                    >
                        {t("dashboard.overall")}
                    </a>
                    <a
                        id="monthly"
                        className={`
                        ${styles.btn} 
                        ${theme == 'light' && isActive == 'monthly' && styles.active} 
                        ${theme == 'dark' && isActive == 'monthly' && 'active'} 
                        p-2 px-4 rounded-3 me-3
                        `}
                        onClick={toggleActive}
                    >
                        {t("dashboard.monthly")}
                    </a>

                </div>
            </div>
            <div className="d-flex justify-content-between text-center" dir={language == "ar" ? "rtl" : "ltr"}>
                <div className={`${styles.balance} rounded-2`}>
                    <h2 className="text-white fw-bold mt-3">
                        {/* {
                            transaction_value &&
                            formatNumber(transaction_value?.[
                                isActive == 'overall' ?
                                    'current_amount' :
                                    'current_month_amount'
                            ])
                        }
                         */}
                        {
                            (isActive == 'overall' && transaction_value?.current_amount)
                            && formatNumber(transaction_value?.current_amount)
                        }
                        {
                            (isActive == 'monthly' && transaction_value?.current_month_amount)
                            && formatNumber(transaction_value?.current_month_amount)
                        }
                        {
                            (isActive == 'overall' && !transaction_value?.current_amount) ||
                            (isActive == 'monthly' && !transaction_value?.current_month_amount)
                            && formatNumber(0)
                        }
                        <span className="mx-2">{profile_business?.country?.short_currency || '$'}</span>
                    </h2>
                    <p className="text-white-50">{t("dashboard.total_transactions")}</p>
                </div>
                <div className={`${styles.balance} ${styles.Transactions} rounded-2`}>
                    <h2 className="text-white fw-bold mt-3">{transaction_count?.[isActive == 'overall' ? 'all' : 'currentMonth']}</h2>
                    <p className="text-white-50">{t("dashboard.number_transactions")}</p>
                </div>
            </div>
        </div>
    );
};

export default TotalBalanceaAndTransactions;