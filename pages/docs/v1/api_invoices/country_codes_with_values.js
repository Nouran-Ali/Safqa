import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Display_currencies_iso_alpha_with_values = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const data = [
        {
            code: "+965",
            country: t("docs.Country_Codes_with_values.Kuwait"),
            value: "1"
        },
        {
            code: "+966",
            country: t("docs.Country_Codes_with_values.Saudi_Arabia"),
            value: "2"
        },
        {
            code: "+973",
            country: t("docs.Country_Codes_with_values.Bahrain"),
            value: "3"
        },
        {
            code: "+971",
            country: t("docs.Country_Codes_with_values.UAE"),
            value: "4"
        },
        {
            code: "+974",
            country: t("docs.Country_Codes_with_values.Qatar"),
            value: "5"
        },
        {
            code: "+968",
            country: t("docs.Country_Codes_with_values.Oman"),
            value: "6"
        },
        {
            code: "+962",
            country: t("docs.Country_Codes_with_values.Jordan"),
            value: "7"
        },
        {
            code: "+1",
            country: t("docs.Country_Codes_with_values.USA"),
            value: "8"
        },
        {
            code: "",
            country: t("docs.Country_Codes_with_values.EUROPE"),
            value: "9"
        },
    ]

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={` ${styles.demo_information}`}>
                <MainTitleNew title={t("docs.Country_Codes_with_values.Country_Codes_with_values")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <div className="table-responsive">
                        <table className={`table table-striped text-center mt-3 ${styles.tableTwo}`}>
                            <thead>
                                <tr>
                                    <th scope="col">{t("docs.Country_Codes_with_values.Code")}</th>
                                    <th scope="col">{t("docs.Country_Codes_with_values.Country")}</th>
                                    <th scope="col">{t("docs.Country_Codes_with_values.Values")}</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    data.map((data) => (
                                        <tr>
                                            <td>{data.code}</td>
                                            <td>{data.country}</td>
                                            <td>
                                                {data.value}
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Display_currencies_iso_alpha_with_values