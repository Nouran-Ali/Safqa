import Link from 'next/link';
import React from 'react'
import { MainTitleNew } from '../../../comps/docs/v1/DocsV1Components';
import styles from "../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Shipping_information = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language=="ar" ? "rtl" : "ltr"} className={`${styles.live_information} container`}>
                <MainTitleNew title={t("docs.Shipping_Information.Shipping_Information")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Shipping_Information.body1")}</p>
                    <p className='mt-2'>
                        <ol type="1">
                            <li>{t("docs.Shipping_Information.items.1")}</li>
                            <li>{t("docs.Shipping_Information.items.2")}<span className='fw-bold'>{t("docs.Shipping_Information.items.bold2")}</span> {t("docs.Shipping_Information.items.com2")}</li>
                            <li>{t("docs.Shipping_Information.items.3")}</li>
                            <li>{t("docs.Shipping_Information.items.4")} <span className='fw-bold'>{t("docs.Shipping_Information.items.bold4")}</span> {t("docs.Shipping_Information.items.com4")}</li>
                        </ol>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Shipping_information