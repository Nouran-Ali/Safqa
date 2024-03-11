import Link from 'next/link';
import React from 'react'
import { LinkHierarchy, MainTitleNew, NoteText } from '../../../comps/docs/v1/DocsV1Components';
import styles from "../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Demo_information = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.demo_information}`}>
                <MainTitleNew title={t("docs.Demo_Information.Demo_Information")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Demo_Information.body1")}</p>
                    <p className='mt-2'>
                        <span className='fw-bold'> {t("docs.Demo_Information.URL")}</span> <Link href="#" className='text-info'>https://apidemo.Safqa.com</Link> <br />
                        <span className='fw-bold'>{t("docs.Demo_Information.Username")}</span> demoApiuser@Safqa.com <br />
                        <span className='fw-bold'>{t("docs.Demo_Information.Password")}</span> Mf@12345678 <br />
                    </p>
                </div>
                <NoteText text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod`} />
            </div>
        </>
    )
}

export default Demo_information
