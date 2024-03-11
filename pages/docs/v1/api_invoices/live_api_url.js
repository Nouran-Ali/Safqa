import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Live_api_url = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.demo_information}`}>
                <MainTitleNew title={t("docs.Live_API_URL.Live_API_URL")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <p> {t("docs.Live_API_URL.body1")}</p>
                    <p className='mt-2'>
                    {t("docs.Live_API_URL.Note")}<br/>
                    {t("docs.Live_API_URL.text1")}<br/>
                    {t("docs.Live_API_URL.text2")}
                    </p>
                    <p>{t("docs.Live_API_URL.link_title")}</p>
                    <button className={`w-100 btn border ${language == "ar" ? "text-center" : "text-start"} fs-4 py-3`}> {t("docs.Live_API_URL.Safqa_UI")}</button>
                </div>
            </div>
        </>
    )
}

export default Live_api_url