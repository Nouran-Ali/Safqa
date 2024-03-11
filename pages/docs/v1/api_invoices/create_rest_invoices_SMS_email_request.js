import React from "react";
import {
  CodeSnippetCopy,
  LinkHierarchy,
  MainTitleNew,
} from "../../../../comps/docs/v1/DocsV1Components";
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Create_rest_invoices_SMS_email_request = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const data = [
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Invoice_Value"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Invoice_Value_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Id"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Id_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Name"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Name_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Country_Code_Id"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Country_Code_Id_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Mobile"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Mobile_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Customer_Email"),
      second: t("docs.Create_Rest_Invoices_SMS_Email_Request.Description"),
    },
    {
      first: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Display_Currency_Id"
      ),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Display_Currency_Id_description"
      ),
    },
    {
      first: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option"
      ),
      second: {
        title: t(
          "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option_title"
        ),
        description: t(
          "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option_description"
        ),
        items: [
          t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option_1"
          ),
          t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option_2"
          ),
          t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option_3"
          ),
          t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Send_Invoice_Option_4"
          ),
        ],
      },
    },
    {
      first: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Invoice_Item_Details"
      ),
      second: "",
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Product_Id"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Product_Id_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Product_Name"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Product_Name_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Quantity"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Quantity_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Unit_Price"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Unit_Price_description"
      ),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Language"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Language_description"
      ),
      // second: {
      //     title: "Invoice Language. (Required)",
      //     description: "- Please note user should enter value of each Language. Each Language options(Arabic or English) differentiated by a value.",
      // },
    },
  ];

  const data2 = [
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Response_Message"),
      second: t("docs.Create_Rest_Invoices_SMS_Email_Request.Response_Message"),
    },
    {
      first: t("docs.Create_Rest_Invoices_SMS_Email_Request.Redirect_URL"),
      second: t(
        "docs.Create_Rest_Invoices_SMS_Email_Request.Redirect_URL_description"
      ),
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
            "docs.Create_Rest_Invoices_SMS_Email_Request.Create_Rest_Invoices_SMS_Email"
          )}
          child={t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Create_Rest_Invoices_SMS_Email_Request"
          )}
        />
        <MainTitleNew
          title={t(
            "docs.Create_Rest_Invoices_SMS_Email_Request.Create_Rest_Invoices_SMS_Email_Request"
          )}
        />

        <div className="table-responsive">
          <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
            <thead>
              <tr>
                <th scope="col">
                  {t(
                    "docs.Create_Rest_Invoices_SMS_Email_Request.INPUT_PARAMETER"
                  )}
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {t(
                    "docs.Create_Rest_Invoices_SMS_Email_Request.Invoice_Details"
                  )}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  {t("docs.Create_Rest_Invoices_SMS_Email_Request.Parameter")}
                </td>
                <td>
                  {t("docs.Create_Rest_Invoices_SMS_Email_Request.Description")}
                </td>
              </tr>
              {data.map((data) => (
                <tr>
                  <td>{data.first}</td>
                  <td>
                    {data.second?.items ? (
                      <>
                        <p>{data.second.title}</p>
                        <p>{data.second.description}</p>
                        <ol>
                          {data.second.items.map((item) => (
                            <li>{item}</li>
                          ))}
                        </ol>
                      </>
                    ) : (
                      data.second
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol>
          <li>{t("docs.Create_Rest_Invoices_SMS_Email_Request.list1")}</li>
          <li> {t("docs.Create_Rest_Invoices_SMS_Email_Request.list2")}</li>
          <li> {t("docs.Create_Rest_Invoices_SMS_Email_Request.list3")}</li>
          <li> {t("docs.Create_Rest_Invoices_SMS_Email_Request.list4")}</li>
        </ol>

        <div className="table-responsive">
          <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
            <thead>
              <tr>
                <th scope="col" className="safqa_table_padding">
                  {t(
                    "docs.Create_Rest_Invoices_SMS_Email_Request.RESPONSE_PARAMETER"
                  )}
                </th>
                <th scope="col" className="safqa_table_padding"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="safqa_table_padding">
                  {t("docs.Create_Rest_Invoices_SMS_Email_Request.Parameter")}
                </td>
                <td className="safqa_table_padding">
                  {t("docs.Create_Rest_Invoices_SMS_Email_Request.Description")}
                </td>
              </tr>
              {data2.map((data) => (
                <tr>
                  <td className="safqa_table_padding">{data.first}</td>
                  <td className="safqa_table_padding">{data.second}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="fw-bold">
          {" "}
          {t("docs.Create_Rest_Invoices_SMS_Email_Request.note")}
        </p>
      </div>
    </>
  );
};

export default Create_rest_invoices_SMS_email_request;
