import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Language_options_with_values = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const data = [
        {
            no: "1",
            options: t("docs.Language_Options_with_values.Arabic"),
            value: "1"
        },
        {
            no: "2",
            options: t("docs.Language_Options_with_values.English"),
            value: "2"
        },
    ]

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={` ${styles.demo_information}`}>
                <MainTitleNew title={t("docs.Language_Options_with_values.Language_Options_with_values")} />
                <hr />
                <div className='fs-5 text-dark mt-3'>
                    <div className="table-responsive">
                        <table className={`table table-striped text-center mt-3 ${styles.tableTwo}`}>
                            <thead>
                                <tr>
                                    <th scope="col">{t("docs.Language_Options_with_values.Sr_No")}</th>
                                    <th scope="col">{t("docs.Language_Options_with_values.Language_Options")}</th>
                                    <th scope="col">{t("docs.Language_Options_with_values.Values")}</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    data.map((data) => (
                                        <tr>
                                            <td>{data.no}</td>
                                            <td>{data.options}</td>
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

export default Language_options_with_values