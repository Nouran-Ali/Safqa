import React from 'react'
import { LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Dependencies = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.requirement}`}>
                <LinkHierarchy parent={t("docs.Dependencies.Considerations")} child={t("docs.Dependencies.Dependencies")} />
                <MainTitleNew title={t("docs.Dependencies.Dependencies")} />
                <p>{t("docs.Dependencies.body")}</p>
            </div>
        </>
    )
}

export default Dependencies