import React from 'react'
import { LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Requirement = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.requirement}`}>
                <LinkHierarchy parent={t("docs.Overview.overview")} child={t("docs.Overview.Requirement.Requirement")} />
                <MainTitleNew title={t("docs.Overview.Requirement.Requirement")} />
                <p>{t("docs.Requirement.body")}</p>
                <ol type="a">
                    <li>{t("docs.Requirement.items.a")}</li>
                    <li>{t("docs.Requirement.items.b")}</li>
                    <li>{t("docs.Requirement.items.c")}</li>
                    <li>{t("docs.Requirement.items.d")}</li>
                </ol>
            </div>
        </>
    )
}

export default Requirement
