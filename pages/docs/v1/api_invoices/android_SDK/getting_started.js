import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Getting_started = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Getting_Started.Android_SDK")} child={t("docs.Getting_Started.Getting_Started")} />
                <MainTitleNew title={t("docs.Getting_Started.Getting_Started")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>
                    {t("docs.Getting_Started.body1")}<br/>

                    {t("docs.Getting_Started.body2")}<br/>

                    {t("docs.Getting_Started.Or")}<br/>

                    {t("docs.Getting_Started.body3")}<br/>

                    {t("docs.Getting_Started.body4")}<br/>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Getting_started