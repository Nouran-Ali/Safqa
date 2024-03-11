import React from 'react'
import Link from 'next/link';
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Pre_requisites = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Getting_Started.Android_SDK")} child={t("docs.Pre_requisites.Pre_requisites")} />
                <MainTitleNew title={t("docs.Pre_requisites.Pre_requisites")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Pre_requisites.body1")}<Link href="#" className='safqa-link2-color'>{t("docs.Pre_requisites.body2")}</Link>{t("docs.Pre_requisites.body3")}</p>
                </div>

            </div>
        </>
    )
}

export default Pre_requisites