import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Shipping_api = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.requirement}`}>
                <LinkHierarchy parent={t("docs.Rest_APIs.Rest_APIs")} child={t("docs.Shipping_API.Shipping_API")} />
                <MainTitleNew title={t("docs.Shipping_API.Shipping_API")} />
                <p className='fw-bold'>{t("docs.Shipping_API.title")}</p>
                <p>{t("docs.Shipping_API.body1")}</p>
                <p className='mt-2'>{t("docs.Shipping_API.body2")}</p>
                {/* <div>
                    <img src='/docs/v1/3.png' width="400px" className='d-flex justify-content-center mx-auto' />
                </div> */}
                <ul>
                    <li>{t("docs.Shipping_API.body3")}</li>
                </ul>
                <div className='mt-3'>
                    <p className='fw-bold'>{t("docs.Shipping_API.Prerequisites")}</p>
                    <ul>
                        <li>{t("docs.Shipping_API.Prerequisites_body1")}</li>
                        <li>{t("docs.Shipping_API.Prerequisites_body2")}</li>
                    </ul>
                    <p>{t("docs.Shipping_API.body4")}
                        <Link href="#" className='safqa-link2-color'>{t("docs.Shipping_API.settings")}</Link> {t("docs.Shipping_API.body5")} <br />

                        {t("docs.Shipping_API.Demo_Account")}<br />

                        {t("docs.Shipping_API.body6")} <Link href="#" className='safqa-link2-color'>{t("docs.Shipping_API.here")}</Link>.<br />
                    </p>
                    <p className='fw-bold'>{t("docs.Shipping_API.body7")}</p>
                    <ol type="1">
                        <li>{t("docs.Shipping_API.list1")}</li>
                        <p>{t("docs.Shipping_API.list1_body1")}</p>
                        <p className='fw-bold'>{t("docs.Shipping_API.list1_body2")}</p>
                        <li>{t("docs.Shipping_API.list2")}</li>
                        <p className='fw-bold'>{t("docs.Shipping_API.list2_body")}</p>
                        <li>{t("docs.Shipping_API.list3")}</li>
                        <p>
                            {t("docs.Shipping_API.list3_body1")}<br />
                            {t("docs.Shipping_API.list3_body2")}
                        </p>
                        <p className='fw-bold'>{t("docs.Shipping_API.list3_body3")}</p>
                        <li>{t("docs.Shipping_API.list4")}</li>
                        <p className='fw-bold'>{t("docs.Shipping_API.list4_body")}</p>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="ShippingChargeModel"
                                code={
                                    `{
    "ShippingMethod": 1,
    "Items": [
        {
        "ProductName": "test",
        "Description": "test",
        "Weight": 1.0,
        "Width": 1.0,
        "Height": 1.0,
        "Depth": 1.0,
        "Quantity": 1.0,
        "UnitPrice": 1.0
        }
    ],
    "CityName": "kuwait",
    "PostalCode": "1200",
"CountryCode": "1"
}
`}
                            />
                        </div>

                        <li>{t("docs.Shipping_API.list5")}</li>
                        <p className='fw-bold'>{t("docs.Shipping_API.list5_body")}</p>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="ShippingInvoiceModel"
                                code={
                                    `{
"ShippingMethod": 1,
"Items": [

    {
    "ProductName": "car 88 ",
    "Description": "TEST ",
    "Weight": 1,
    "Width": 1,
    "Height": 1,
    "Depth": 1,
    "Quantity": 1,
    "UnitPrice": 190,
    "UseExist":true
    }
],
"Consignee": {
    "PersonName": "Dina ",
    "Mobile": "12345678",
    "EmailAddress": "xx@yy.com",
    "LineAddress": "test ",
    "CityName": "CAIRO",
    "CountryCode": "EG"
},
"DisplayCurrencyId": 1,
"SendInvoiceOption": 4,
"Language": 1,
"CallBackUrl":"http://www.google.com",
"ErrorUrl":"http://www.microsoft.com"
}
`} />
                        </div>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Response"
                                code={
                                    `{
"Id": 41681,
"IsSuccess": true,
"Message": "Record Created Successfully!",
"RedirectUrl": "https://demo.Safqa.com/ia/03051474168141",
"FieldsErrors": null,
"PaymentMethods": [
    {
    "PaymentMethodName": "اميكس",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=3",
    "PaymentMethodCode": "ae"
    },
    {
    "PaymentMethodName": "سداد",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=4",
    "PaymentMethodCode": "s"
    },
    {
    "PaymentMethodName": "بنفت",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=5",
    "PaymentMethodCode": "b"
    },
    {
    "PaymentMethodName": "فيزا / ماستر",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=6",
    "PaymentMethodCode": "vm"
    },
    {
    "PaymentMethodName": "البطاقات المدينة - الامارات",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=7",
    "PaymentMethodCode": "uaecc"
    },
    {
    "PaymentMethodName": "مدى",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=10",
    "PaymentMethodCode": "md"
    },
    {
    "PaymentMethodName": "كي فاست",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=13",
    "PaymentMethodCode": "kf"
    },
    {
    "PaymentMethodName": "كي نت",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=20",
    "PaymentMethodCode": "kn"
    },
    {
    "PaymentMethodName": "أبل الدفع",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=21",
    "PaymentMethodCode": "ap"
    },
    {
    "PaymentMethodName": "AFS",
    "PaymentMethodUrl": "https://demo.Safqa.com/Ar/PayInvoice/Checkout?invoiceKey=03051474168141&paymentGatewayId=23",
    "PaymentMethodCode": "af"
    }
],
"ApiCustomFileds": null
}
`} /></div>

                        <li>{t("docs.Shipping_API.list6")}</li>
                        <li>{t("docs.Shipping_API.list7")}</li>
                        <li>{t("docs.Shipping_API.list8")}</li>
                        <p className='fw-bold'>{t("docs.Shipping_API.list8_body1")}</p>
                        <p>
                            {t("docs.Shipping_API.list8_body2")}<br />
                            {t("docs.Shipping_API.list8_body3")}<br />
                            {t("docs.Shipping_API.list8_body4")}<br />

                            {t("docs.Shipping_API.list8_body5")}<br />
                            {t("docs.Shipping_API.list8_body6")}<br />
                            {t("docs.Shipping_API.list8_body7")}<br />
                            {t("docs.Shipping_API.list8_body8")}<br />
                            {t("docs.Shipping_API.list8_body9")}<br />
                            {t("docs.Shipping_API.list8_body10")}
                        </p>
                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="QueryString"
                                code={
                                    `?shippingMethod=1&orderStatus=0`}
                            />
                        </div>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Response body"
                                code={
                                    `{
    "IsSuccess": true,
    "Message": null,
    "FieldsErrors": null,
    "Data": {
        "ShippingMethod": "DHL",
        "OrderStatus": "Pending",
        "TotalOrders": 10,
        "OrderNumbers": [
            40481,
            40480,
        ],
        "ShippingOrders": [
            {
                "OrderNumber": 40481,
                "OrderType": "Shipping",
                "OrderStatus": "Pending",
                "CustomerName": "XYZ",
                "ShippingMethod": "DHL",
                "ShippingValue": 13.464
            },
            {
                "OrderNumber": 40480,
                "OrderType": "Shipping",
                "OrderStatus": "Pending",
                "CustomerName": "XYZ",
                "ShippingMethod": "DHL",
                "ShippingValue": 13.464
            }
        ]
    }
}
`}
                            /></div>
                        <li>{t("docs.Shipping_API.list9")}</li>
                        <p>{t("docs.Shipping_API.list9_body1")}</p>
                        <p className='fw-bold'>{t("docs.Shipping_API.list9_body2")}</p>
                        <p>
                            {t("docs.Shipping_API.list9_body3")}<br />
                            {t("docs.Shipping_API.list9_body4")}<br />
                            {t("docs.Shipping_API.list9_body5")} <br />

                            {t("docs.Shipping_API.list9_body6")} <br />
                            {t("docs.Shipping_API.list9_body7")} <br />
                            {t("docs.Shipping_API.list9_body8")} <br />
                            {t("docs.Shipping_API.list9_body9")} <br />
                            {t("docs.Shipping_API.list9_body10")}<br />
                            {t("docs.Shipping_API.list9_body11")}
                        </p>
                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Request body"
                                code={
                                    `{
    "ShippingMethod":1,
    "InvoiceNumbers": [
        40481,40480
    ],
    "OrderStatusChangedTo": 1
    }
`}
                            />
                        </div>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Success Response"
                                code={
                                    `{
    "IsSuccess": true,
    "Message": null,
    "FieldsErrors": null,
    "Data": {
        "ShippingOrder": [
            {
                "OrderNumber": 40480,
                "OrderStatus": "Prepared"
            },
            {
                "OrderNumber": 40481,
                "OrderStatus": "Prepared"
            }
        ]
    }
}
`}
                            />
                        </div>

                        <p className='fw-bold'>{t("docs.Shipping_API.list9_body12")}</p>
                        <li>{t("docs.Shipping_API.list10")}</li>
                        <p className='fw-bold'>{t("docs.Shipping_API.list10_body1")}</p>
                        <p>
                            {t("docs.Shipping_API.list10_body2")} <br />
                            {t("docs.Shipping_API.list10_body3")}<br />
                            {t("docs.Shipping_API.list10_body4")}
                        </p>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Querystring"
                                code={
                                    `?shippingMethod=1`}
                            />
                        </div>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Response"
                                code={
                                    `{
    "IsSuccess": true,
    "Message": null,
    "FieldsErrors": null,
    "Data": [
        {
            "OrderNumber": 40430,
            "OrderStatus": "RequestPickup"
        },
        {
            "OrderNumber": 40476,
            "OrderStatus": "RequestPickup"
        },
        {
            "OrderNumber": 40479,
            "OrderStatus": "RequestPickup"
        },
        {
            "OrderNumber": 40484,
            "OrderStatus": "RequestPickup"
        }
    ]
}
`}
                            />
                        </div>

                        <li>{t("docs.Shipping_API.list11")}</li>
                        <p>{t("docs.Shipping_API.list11_body1")} <i>{t("docs.Shipping_API.list11_body2")}</i>{t("docs.Shipping_API.API")} </p>
                        <p>
                            {t("docs.Shipping_API.list11_body3")}<br />
                            {t("docs.Shipping_API.list11_body4")}<br />
                            {t("docs.Shipping_API.list11_body5")}<br />

                            {t("docs.Shipping_API.list11_body6")} <br />
                            {t("docs.Shipping_API.list11_body7")} <br />
                            {t("docs.Shipping_API.list11_body8")} <br />
                            {t("docs.Shipping_API.list11_body9")}<br />
                            {t("docs.Shipping_API.list11_body10")} <br />
                            {t("docs.Shipping_API.list11_body11")}
                        </p>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Request"
                                code={
                                    `{
    "ShippingMethod":1,
    "InvoiceNumbers": [
      40481,40480
    ],
    "OrderStatusChangedTo": 3
  }
`}
                            />
                        </div>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Response"
                                code={
                                    `{
    "IsSuccess": true,
    "Message": null,
    "FieldsErrors": null,
    "Data": {
        "ShippingOrder": [
            {
                "OrderNumber": 40480,
                "OrderStatus": "Picked"
            },
            {
                "OrderNumber": 40481,
                "OrderStatus": "Picked"
            }
        ]
    }
}
`}
                            />
                        </div>
                    </ol>
                </div>
            </div>
        </>
    )
}

export default Shipping_api
