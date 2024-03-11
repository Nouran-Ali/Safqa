import React from 'react'
import { LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Assumptions = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.requirement}`}>
                <LinkHierarchy parent={t("docs.Dependencies.Considerations")} child={t("docs.Assumptions.Assumptions")} />
                <MainTitleNew title={t("docs.Assumptions.Assumptions")} />
                <ul>
                    <li>{t("docs.Assumptions.body1")}</li>
                    <li>{t("docs.Assumptions.body2")}</li>
                </ul>
            </div>
        </>
    )
}

export default Assumptions