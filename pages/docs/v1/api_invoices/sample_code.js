import Link from "next/link";
import React from "react";
import {
  CodeSnippetCopy,
  LinkHierarchy,
  MainTitleNew,
} from "../../../../comps/docs/v1/DocsV1Components";
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Sample_code = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div
        dir={language == "ar" ? "rtl" : "ltr"}
        className={`fs-5 text-dark ${styles.requirement}`}
      >
        <LinkHierarchy
          className="safqa-scroll-x p-0 m-0 "
          parent={t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Create_Rest_Invoices_SMS_Email"
          )}
          child={t("docs.Sample_Code.Sample_Code")}
        />
        <MainTitleNew title={t("docs.Sample_Code.Sample_Code")} />
        <div dir={language == "ar" ? "ltr" : "rtl"}>
          <CodeSnippetCopy
            title={t("docs.Sample_Code.Rest_Invoices_SMS_Email_Request")}
            code={`{
  "InvoiceValue": 100,
  "CustomerName": "Customer01",
  "CountryCodeId": 1,
  "CustomerMobile": "99999999",
  "CustomerEmail": "test@test.com",
  "DisplayCurrencyId": 1,
  "SendInvoiceOption": 3,
  "InvoiceItemsCreate": [
    {
      "ProductId": 1,
      "ProductName": "Book",
      "Quantity": 5,
      "UnitPrice": 20
    }
  ],
  "Language": 1
}
`}
          />
        </div>
      </div>
    </>
  );
};

export default Sample_code;
