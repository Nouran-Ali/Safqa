import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Country_codes_with_values = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const data = [
        {
            no: "1",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.Kuwait"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.KWD")
        },
        {
            no: "2",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.Saudi_Arabia"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.SAR")
        },
        {
            no: "3",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.Bahrain"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.BHD")
        },
        {
            no: "4",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.UAE"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.AED")
        },
        {
            no: "5",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.Qatar"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.QAR")
        },
        {
            no: "6",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.Oman"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.OMR")
        },
        {
            no: "7",
            currencies: t("docs.Display_Currencies_Iso_Alpha_with_values.Jordan"),
            value: t("docs.Display_Currencies_Iso_Alpha_with_values.JOD")
        },
    ]

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={` ${styles.demo_information}`}>
                <MainTitleNew title={t("docs.Display_Currencies_Iso_Alpha_with_values.Display_Currencies_Iso_Alpha_with_values")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <div className="table-responsive">
                        <table className={`table table-striped text-center mt-3 ${styles.tableTwo}`}>
                            <thead>
                                <tr>
                                    <th scope="col">{t("docs.Display_Currencies_Iso_Alpha_with_values.Sr_No")}</th>
                                    <th scope="col">{t("docs.Display_Currencies_Iso_Alpha_with_values.Display_Currencies")}</th>
                                    <th scope="col">{t("docs.Display_Currencies_Iso_Alpha_with_values.Values")}</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    data.map((data) => (
                                        <tr>
                                            <td>{data.no}</td>
                                            <td>{data.currencies}</td>
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

export default Country_codes_with_values