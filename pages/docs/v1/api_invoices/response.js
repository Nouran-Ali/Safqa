import Link from "next/link";
import React from "react";
import {
  CodeSnippetCopy,
  LinkHierarchy,
  MainTitleNew,
} from "../../../../comps/docs/v1/DocsV1Components";
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Response = () => {
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
          child={t("docs.Response.Response")}
        />
        <MainTitleNew title={t("docs.Response.Response")} />
        <div dir={language == "ar" ? "ltr" : "rtl"}>
          <CodeSnippetCopy
            title={t("docs.Response.Rest_Invoices_SMS_Email_Response")}
            code={`{
  "Id": 232,
  "IsSuccess": true,
  "Message": "Record Created Successfully!",
  "RedirectUrl": "https://demo.Safqa.com/ie/0103224345",
  "FieldsErrors": null
}
`}
          />
        </div>
      </div>
    </>
  );
};

export default Response;
