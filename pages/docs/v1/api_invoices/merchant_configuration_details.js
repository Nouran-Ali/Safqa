import React from "react";
import {
  CodeSnippetCopy,
  LinkHierarchy,
  MainTitleNew,
} from "../../../../comps/docs/v1/DocsV1Components";
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Merchant_configuration_details = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const data = [
    {
      first: t("docs.Merchant_Configuration_Details.User_Name"),
      second: "smsapi@Safqa.com",
    },
    {
      first: t("docs.Merchant_Configuration_Details.Password"),
      second: "SMDj2o23@!",
    },
  ];

  return (
    <>
      <div
        dir={language == "ar" ? "rtl" : "ltr"}
        className={`fs-5 text-dark ${styles.API_URL}`}
      >
        <LinkHierarchy
          className="safqa-scroll-x p-0 m-0 "
          parent={t(
            "docs.Merchant_Configuration_Details.Create_Rest_Invoices_SMS_Email"
          )}
          child={t(
            "docs.Merchant_Configuration_Details.Merchant_Configuration_Details"
          )}
        />
        <MainTitleNew
          title={t(
            "docs.Merchant_Configuration_Details.Merchant_Configuration_Details"
          )}
        />

        <div className="table-responsive">
          <table
            className={`table table-striped text-center mt-3 ${styles.tableTwo}`}
          >
            <thead>
              <tr>
                <th scope="col">
                  {t(
                    "docs.Merchant_Configuration_Details.Merchant_Credentials"
                  )}
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr>
                  <td>{data.first}</td>
                  <td>{data.second}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Merchant_configuration_details;
