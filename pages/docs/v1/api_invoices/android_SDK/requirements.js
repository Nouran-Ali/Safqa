import React from 'react'
import Link from 'next/link';
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Requirements = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Getting_Started.Android_SDK")} child={t("docs.Requirements.Requirements")} />
                <MainTitleNew title={t("docs.Requirements.Requirements")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Requirements.body")}</p>
                </div>

            </div>
        </>
    )
}

export default Requirements