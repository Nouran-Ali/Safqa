import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Live_api_url = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Prerequisites.IOS_SDK")} child={t("docs.Prerequisites.Prerequisites")} />
                <MainTitleNew title={t("docs.Prerequisites.Prerequisites")} />
                <div className='fs-5 text-dark mt-3'>
                    <p> {t("docs.Prerequisites.text1")}<Link href="#" className='safqa-link2-color'>Safqa</Link> {t("docs.Prerequisites.text2")}</p>
                </div>
            </div>
        </>
    )
}

export default Live_api_url