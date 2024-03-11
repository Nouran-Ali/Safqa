import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Direct_payment_api = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  return (
    <>
      <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.requirement}`}>
        <LinkHierarchy parent={t("docs.Rest_APIs.Rest_APIs")} child={t("docs.Direct_Payment_API.Direct_Payment_API")} />
        <MainTitleNew title={t("docs.Direct_Payment_API.Direct_Payment_API")} />
        <p className='fw-bold'>{t("docs.Direct_Payment_API.title")}</p>
        <p>{t("docs.Direct_Payment_API.body1")}</p>

        <ul>
          <li>{t("docs.Direct_Payment_API.body2")} <span className='fw-bold'>{t("docs.Direct_Payment_API.body3")}</span></li>
        </ul>

        <div className='mt-3'>
          <p className='fw-bold'>{t("docs.Direct_Payment_API.body4")}</p>
          <p>{t("docs.Direct_Payment_API.body5")}</p>
          <p className='fw-bold'>{t("docs.Direct_Payment_API.body6")}</p>
          <p className='fw-bold'>{t("docs.Direct_Payment_API.Demo_Account")}</p>
          <p>{t("docs.Direct_Payment_API.body7")} <Link href="#" className='safqa-link2-color'>{t("docs.Shipping_API.here")}</Link>.</p>
          <p className='fw-bold mt-3'>{t("docs.Direct_Payment_API.body8")}</p>
          <ol type='1'>
            <li>{t("docs.Direct_Payment_API.list1")}</li>
            <li>{t("docs.Direct_Payment_API.list2")}</li>

            <p className='fw-bold'>
              {t("docs.Direct_Payment_API.Note")}<br />
              {t("docs.Direct_Payment_API.Note_text")}
            </p>
            <p>
              {t("docs.Direct_Payment_API.body9")}
            </p>
            <p className='fw-bold'>{t("docs.Direct_Payment_API.body10")}</p>
            <p>{t("docs.Direct_Payment_API.body11")}</p>
            <p>
              <span className='fw-bold'>{t("docs.Direct_Payment_API.body12")}</span><Link href="#" className='safqa-link2-color text-decoration-underline'>"https://apidemo.Safqa.com/ApiInvoices/ManageDirectPayment?language=Ar&invoiceKey=050720051152542160&paymentGatewayId=6"</Link>
            </p>

            <div dir={language == "ar" ? "ltr" : "rtl"}>
              <CodeSnippetCopy
                title="Request body"
                code={
                  `{ 

    "InvoiceValue": 10, 
    
    "CustomerName": "string", 
    
    "CustomerAddress": "string", 
    
    "DisplayCurrencyIsoAlpha": "KWD", 
    
    "CountryCodeId": 1, 
    
    "InvoiceItemsCreate": [], 
    
    "CallBackUrl": "http://www.success.com", 
    
    "Language": 1, 
    
    "ExpireDate": "2022-07-29T06:09:03.845Z", 
    
    "ErrorUrl": "http://www.errorr.com" 
    
    }
`}
              /></div>

            <div dir={language == "ar" ? "ltr" : "rtl"}>
              <CodeSnippetCopy
                title="Response body"
                code={
                  `{
    "Id": 1525421,
    "IsSuccess": true,
    "Message": "Record Created Successfully!",
    "RedirectUrl": "https://kw.Safqa.com/ia/050720051152542160",
    "FieldsErrors": "",
    "PaymentMethods": [
      {
        "PaymentMethodName": "Visa/master",
        "PaymentMethodUrl": "https://apidemo.Safqa.com/ApiInvoices/ManageDirectPayment?language=Ar&invoiceKey=03051474102741&paymentGatewayId=6",
        "PaymentMethodCode": "vm"
      }
    ],
    "ApiCustomFileds": ""
  }
`}
              /></div>

            <li>{t("docs.Direct_Payment_API.body2")}</li>
            <p className='fw-bold'>{t("docs.Direct_Payment_API.Note")}<br />
              {t("docs.Direct_Payment_API.body13")}</p>
            <p>{t("docs.Direct_Payment_API.body14")}</p>

            <div dir={language == "ar" ? "ltr" : "rtl"}>
              <CodeSnippetCopy
                title="Request body"
                code={
                  `{ 

    "CardExpiryMonth": "05", 
  
    "CardExpiryYear": "21", 
  
    "CardSecurityCode": "100", 
  
    "CardNumber": "2223000000000007" 
  
  }
`}
              /></div>

            <div dir={language == "ar" ? "ltr" : "rtl"}>
              <CodeSnippetCopy
                title="Success Response"
                code={
                  `{ 

    "Status": "success", 
  
    "Message": "", 
  
    "IsSuccess": true, 
  
    "TransactionDetail": { 
  
      "InvoiceId": "string", 
  
      "InvoiceReference": "string", 
  
      "CreatedDate": "string", 
  
      "ExpireDate": "string", 
  
      "InvoiceValue": 0, 
  
      "Comments": "string", 
  
      "CustomerName": "string", 
  
      "CustomerMobile": "string", 
  
      "CustomerEmail": "string", 
  
      "TransactionDate": "string", 
  
      "PaymentGateway": "string", 
  
      "ReferenceId": "string", 
  
      "TrackId": "string", 
  
      "TransactionId": "string", 
  
      "PaymentId": "string", 
  
      "AuthorizationId": "string", 
  
      "OrderId": "string", 
  
      "InvoiceItems": [ 
  
        { 
  
          "ProductName": "string", 
  
          "UnitPrice": "string", 
  
          "Quantity": "string", 
  
          "ExtendedAmount": "string" 
  
        } 
  
      ], 
  
      "TransactionStatus": 1, 
  
      "Error": "string", 
  
      "PaidCurrency": "string", 
  
      "PaidCurrencyValue": "string", 
  
      "TransationValue": "string", 
  
      "CustomerServiceCharge": "string", 
  
      "DueValue": "string", 
  
      "Currency": "string", 
  
      "ApiCustomFileds": "string", 
  
      "InvoiceDisplayValue": "string" 
  
    } 
  
  }
`}
              /></div>
              
            <div dir={language == "ar" ? "ltr" : "rtl"}>
              <CodeSnippetCopy
                title="Failed response"
                code={
                  `{ 
"Status": "INVALID",
 "Message": "Model not valid", 
 "IsSuccess": false, 
 "TransactionDetail": null 
}`}
              />
            </div>
          </ol>
        </div>
      </div>
    </>
  )
}

export default Direct_payment_api
