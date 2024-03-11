import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Requirements_sdk = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Prerequisites.IOS_SDK")} child={t("docs.requirements_sdk.requirements_sdk")} />
                <MainTitleNew title={t("docs.requirements_sdk.requirements_sdk")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <ul>
                        <li>{t("docs.requirements_sdk.body1")}</li>
                        <li>{t("docs.requirements_sdk.body2")}</li>
                        <li>{t("docs.requirements_sdk.body3")}</li>
                        <li>{t("docs.requirements_sdk.body4")}</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Requirements_sdk