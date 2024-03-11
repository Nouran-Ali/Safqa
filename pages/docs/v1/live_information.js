import Link from 'next/link';
import React from 'react'
import { MainTitleNew } from '../../../comps/docs/v1/DocsV1Components';
import styles from "../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Live_information = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const data = [
        {
            country: "Kuwait",
            url: "https://apikw.Safqa.com",
        },
        {
            country: "Saudi Arabia",
            url: "https://apisa.Safqa.com",
        },
        {
            country: "Bahrain",
            url: "https://apisa.Safqa.com",
        },
        {
            country: "Qatar",
            url: "https://apisa.Safqa.com",
        },
        {
            country: "United Arab Emirates",
            url: "https://apisa.Safqa.com",
        },
        {
            country: "Egypt",
            url: "https://apisa.Safqa.com",
        },
        {
            country: "Oman",
            url: "https://apisa.Safqa.com",
        },
        {
            country: "Jordan",
            url: "https://apisa.Safqa.com",
        },
    ]
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.live_information}`}>
                <MainTitleNew title={t("docs.Live_Information.Live_Information")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Live_Information.body1")}</p>
                    <p className='mt-2'>
                        <ol type="1">
                            <li> {t("docs.Live_Information.items.1")}  <Link href="#" className='text-info'>{t("docs.Live_Information.items.link1")}</Link></li>
                            <li>{t("docs.Live_Information.items.2")}</li>
                            <li>{t("docs.Live_Information.items.3")}</li>
                            <li>{t("docs.Live_Information.items.4")}</li>
                            <li>{t("docs.Live_Information.items.5")}</li>
                            <li>{t("docs.Live_Information.items.6")}</li>
                            <li>{t("docs.Live_Information.items.7")}</li>
                            <li>{t("docs.Live_Information.items.8")}</li>
                            <li>{t("docs.Live_Information.items.9")}</li>
                            <li>{t("docs.Live_Information.items.10")}</li>
                        </ol>
                    </p>
                    <p className='mt-2'>{t("docs.Live_Information.body2")}</p>
                    <img src='/docs/v1/1.png' width="830px" />

                    {/* <div className="table-responsive">
                         <table className={`table table-striped text-center mt-3 ${styles.tableTwo}`}>
                            <thead>
                                <tr>
                                    <th scope="col">{t("docs.Live_Information.body2")}</th>
                                    <th scope="col">{t("docs.Live_Information.body2")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((data) => (
                                        <tr>
                                            <td>{data.country}</td>
                                            <td>{data.url}</td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table> 
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Live_information
