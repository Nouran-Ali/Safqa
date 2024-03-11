import React from 'react'
import { Paginat } from '../../../comps/docs/v1/DocsV1Components';
import styles from "../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

export default function Version1() {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.overview}`}>
            <h2>{t("docs.Overview.overview")}</h2>
            <p className='mt-3'>{t("docs.Overview.body1")}</p>
            <hr />
            <p>{t("docs.Overview.body2")}</p>
            <hr />
            <p>{t("docs.Overview.body3")}</p>
            <p className='mt-2'>{t("docs.Overview.body4")}</p>
            <button className='w-100 btn border text-start fs-4 py-3'>{t("docs.Overview.Magento1")}</button>
            <hr />
            <p>{t("docs.Overview.body5")}</p>

            <p className='mt-2'>{t("docs.Overview.body6")}</p>
            {/* <Paginat /> */}
        </div>
    )
}
