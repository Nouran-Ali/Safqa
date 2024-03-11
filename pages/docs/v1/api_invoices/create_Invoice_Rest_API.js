import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";



const API_URL = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const data = [
        {
            first: t("docs.Rest_APIs.Invoice_Value"),
            second: {
                title: t("docs.Rest_APIs.Invoice_Value_title"),
                description: t("docs.Rest_APIs.Invoice_Value_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Name"),
            second: {
                title: t("docs.Rest_APIs.Customer_Name_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Block"),
            second: {
                title: t("docs.Rest_APIs.Customer_Block_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Street"),
            second: {
                title: t("docs.Rest_APIs.Customer_Street_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_House_Building_No"),
            second: {
                title: t("docs.Rest_APIs.Customer_House_Building_No_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Civil_Id"),
            second: {
                title: t("docs.Rest_APIs.Customer_Civil_Id_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Address"),
            second: {
                title: t("docs.Rest_APIs.Customer_Address"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Reference"),
            second: {
                title: t("docs.Rest_APIs.Customer_Reference_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Display_Currency_Iso_Alpha"),
            second: {
                title: t("docs.Rest_APIs.Display_Currency_Iso_Alpha_title"),
                description: t("docs.Rest_APIs.Display_Currency_Iso_Alpha_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Country_Code_Id"),
            second: {
                title: t("docs.Rest_APIs.Country_Code_Id_title"),
                description: t("docs.Rest_APIs.Country_Code_Id_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Mobile"),
            second: {
                title: t("docs.Rest_APIs.Customer_Mobile_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Customer_Email"),
            second: {
                title: t("docs.Rest_APIs.Customer_Email_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Send_Invoice_Option"),
            second: {
                title: t("docs.Rest_APIs.Send_Invoice_Option_title"),
                description: t("docs.Rest_APIs.Send_Invoice_Option_description"),
            },

        },
        {
            first: t("docs.Rest_APIs.Invoice_Item_Details"),
            second: {
                title: "",
            },
        },
        {
            first: t("docs.Rest_APIs.Product_Id"),
            second: {
                title: t("docs.Rest_APIs.Product_Id_title"),
                description: t("docs.Rest_APIs.Product_Id_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Product_Name"),
            second: {
                title: t("docs.Rest_APIs.Product_Name_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Quantity"),
            second: {
                title: t("docs.Rest_APIs.Quantity_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Unit_Price"),
            second: {
                title: t("docs.Rest_APIs.Unit_Price_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.Call_Back_URL"),
            second: {
                title: t("docs.Rest_APIs.Call_Back_URL_title"),
                description: t("docs.Rest_APIs.Call_Back_URL_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Language"),
            second: {
                title: t("docs.Rest_APIs.Language_title"),
                description: t("docs.Rest_APIs.Language_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Expire_Date"),
            second: {
                title: t("docs.Rest_APIs.Expire_Date_title"),
            },
        },
        {
            first: t("docs.Rest_APIs.API_Custom_Fields"),
            second: {
                title: t("docs.Rest_APIs.API_Custom_Fields_title"),
                description: t("docs.Rest_APIs.API_Custom_Fields_description"),
            },
        },
        {
            first: t("docs.Rest_APIs.Error_URL"),
            second: {
                title: t("docs.Rest_APIs.Error_URL_title"),
            },
        },

    ]

    const data2 = [
        {
            first: t("docs.Rest_APIs.ID"),
            second: t("docs.Rest_APIs.ID_description"),
        },
        {
            first: t("docs.Rest_APIs.Response_Message"),
            second: t("docs.Rest_APIs.Response_Message"),
        },
        {
            first: t("docs.Rest_APIs.Redirect_URL"),
            second: t("docs.Rest_APIs.Redirect_URL_description"),
        },
        {
            first: t("docs.Rest_APIs.Payment_Methods"),
            second: "",
        },
        {
            first: t("docs.Rest_APIs.Payment_Method_Name"),
            second: t("docs.Rest_APIs.Payment_Method_Name"),
        },
        {
            first: t("docs.Rest_APIs.Payment_Method_URL"),
            second: t("docs.Rest_APIs.Payment_Method_URL_description"),
        },
        {
            first: t("docs.Rest_APIs.Payment_Method_Code"),
            second: t("docs.Rest_APIs.Payment_Method_Code"),
        },
        {
            first: t("docs.Rest_APIs.API_Custom_Fields"),
            second: t("docs.Rest_APIs.API_Custom_Fields"),
        },
    ]
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.API_URL}`}>
                <LinkHierarchy parent={t("docs.Rest_APIs.Rest_APIs")} child={t("docs.Rest_APIs.Create_Invoice_Rest_API")} />
                <MainTitleNew title={t("docs.Rest_APIs.Create_Invoice_Rest_API")} />
                <p>{t("docs.Rest_APIs.body1")}</p>
                <p>{t("docs.Rest_APIs.body2")}</p>
                <div className="table-responsive">
                    <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
                        <thead>
                            <tr>
                                <th scope="col" className='safqa_table_padding'>{t("docs.Rest_APIs.INPUT_PARAMETER")}</th>
                                <th scope="col" className='safqa_table_padding'></th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td className='safqa_table_padding'>{t("docs.Rest_APIs.Invoice_Details")}</td>
                                <td className='safqa_table_padding'></td>
                            </tr>
                            <tr>
                                <td className='safqa_table_padding'>{t("docs.Rest_APIs.Parameter")}</td>
                                <td className='safqa_table_padding'>{t("docs.Rest_APIs.Description")}</td>
                            </tr>
                            {
                                data.map((data) => (
                                    <tr>
                                        <td className='safqa_table_padding'>{data.first}</td>
                                        <td className='safqa_table_padding'>
                                            {
                                                data.second ? <>
                                                    <p>{data.second.title}</p>
                                                    <p>{data.second.description}</p>
                                                </>
                                                    :
                                                    data.second
                                            }
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
                        <thead>
                            <tr>
                                <th scope="col" className='safqa_table_padding'>{t("docs.Rest_APIs.RESPONSE_PARAMETER")}</th>
                                <th scope="col" className='safqa_table_padding'></th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td className='safqa_table_padding'>{t("docs.Rest_APIs.Parameter")}</td>
                                <td className='safqa_table_padding'>{t("docs.Rest_APIs.Description")}</td>
                            </tr>
                            {
                                data2.map((data) => (
                                    <tr>
                                        <td className='safqa_table_padding'>{data.first}</td>

                                        <td className='safqa_table_padding'>
                                            {data.second}</td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div dir={language == "ar" ? "ltr" : "rtl"}>
                    <CodeSnippetCopy

                        title="Sample Request Body"
                        code={`
{
"InvoiceValue": 1200,
"CustomerName": "Customer01",
"CustomerBlock": "string",
"CustomerStreet": "string",
"CustomerHouseBuildingNo": "string",
"CustomerCivilId": "string",
"CustomerAddress": "string",
"CustomerReference": "string",
"DisplayCurrencyIsoAlpha": "KWD",
"CountryCodeId": 1,
"CustomerMobile": "99999999",
"CustomerEmail": "test@test.com",
"SendInvoiceOption": 3,
"InvoiceItemsCreate": [
    {
    "ProductId": null,
    "ProductName": "Product01",
    "Quantity": 12,
    "UnitPrice": 100
    }
],
"CallBackUrl": "https://www.flipkart.com/",
"Language": 2,
"ExpireDate": "2019-01-22T09:08:12.624Z",
"ApiCustomFileds": "string",
"ErrorUrl": "https://www.amazon.in/"
}`} />
                </div>

                <div dir={language == "ar" ? "ltr" : "rtl"}>
                    <CodeSnippetCopy
                        title="Sample Request Body"
                        code={`
{
"Id": 5059,
"IsSuccess": true,
"Message": "Record Created Successfully!",
"RedirectUrl": "https://demo.Safqa.com/ie/020479505932",
"FieldsErrors": null,
"PaymentMethods": [
    {
    "PaymentMethodName": "KNET",
    "PaymentMethodUrl": "https://demo.Safqa.com/En/PayInvoice/Checkout?invoiceKey=020479505932&paymentGatewayId=1",
    "PaymentMethodCode": "kn"
    },
    {
    "PaymentMethodName": "VISA/MASTER",
    "PaymentMethodUrl": "https://demo.Safqa.com/En/PayInvoice/Checkout?invoiceKey=020479505932&paymentGatewayId=6",
    "PaymentMethodCode": "vm"
    }
],
"ApiCustomFileds": "string"
}`} />
                </div>

            </div>
        </>
    )
}

export default API_URL