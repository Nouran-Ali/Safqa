import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Transaction_response = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const data = [
        {
            no: "1",
            status: t("docs.Transaction_Response.Unpaid"),
            values: "1"
        },
        {
            no: "2",
            status: t("docs.Transaction_Response.Paid"),
            values: "2"
        },
        {
            no: "3",
            status: t("docs.Transaction_Response.Payment_Failure"),
            values: "3"
        },
    ]


    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.API_URL}`}>
                <LinkHierarchy parent={t("docs.Transaction_Create_API_Invoices.Transaction_Create_API_Invoices")} child={t("docs.Transaction_Response.Transaction_Response")} />
                <MainTitleNew title={t("docs.Transaction_Response.Transaction_Response")} />

                <div dir={language == "ar" ? "ltr" : "rtl"}>
                    <CodeSnippetCopy
                        title={t("docs.Transaction_Response.Transaction_Response")}
                        code={`
{
    "InvoiceId": "020479505932",
    "InvoiceReference": "2019000025",
    "CreatedDate": "January 21, 2019",
    "ExpireDate": "January 22, 2019",
    "InvoiceValue": 1200,
    "Comments": "",
    "CustomerName": "Customer01",
    "CustomerMobile": "+96599999999",
    "CustomerEmail": "test@test.com",
    "TransactionDate": "21/01/2019",
    "PaymentGateway": "KNET",
    "ReferenceId": "902110527619",
    "TrackId": "21-01-2019_12594",
    "TransactionId": "8325233011090210",
    "PaymentId": "580540011090210",
    "AuthorizationId": "606679",
    "OrderId": "5059",
    "InvoiceItems": [
        {
        "ProductName": "Pro01",
        "UnitPrice": "100.00",
        "Quantity": "12",
        "ExtendedAmount": "1,200.00"
        }
    ],
    "TransactionStatus": 2,
    "Error": null,
    "PaidCurrency": "KD",
    "PaidCurrencyValue": "1,205.00",
    "TransationValue": "1,200.00",
    "CustomerServiceCharge": "5.00",
    "DueValue": "1,205.00",
    "Currency": "KD",
    "ApiCustomFileds": "string",
    "InvoiceDisplayValue": "1,200.00 KD"
    }`} />
                </div>
                <div className="table-responsive">
                    <table className={`table table-striped text-center mt-3 ${styles.tableTwo}`}>
                        <thead>
                            <tr>
                                <th scope="col">{t("docs.Transaction_Response.Sr_No")}</th>
                                <th scope="col">{t("docs.Transaction_Response.Invoice_Transaction_Status")}</th>
                                <th scope="col">{t("docs.Transaction_Response.Values")}</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                data.map((data) => (
                                    <tr>
                                        <td>{data.no}</td>
                                        <td>{data.status}</td>
                                        <td>{data.values}</td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Transaction_response