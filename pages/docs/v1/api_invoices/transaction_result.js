import React from "react";
import {
  CodeSnippetCopy,
  LinkHierarchy,
  MainTitleNew,
} from "../../../../comps/docs/v1/DocsV1Components";
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Transaction_result = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const data = [
    {
      first: t("docs.Transaction_Create_API_Invoices.Id"),
      second: {
        title: t("docs.Transaction_Create_API_Invoices.Payment_ID"),
        description: t(
          "docs.Transaction_Create_API_Invoices.Payment_ID_description"
        ),
      },
    },
  ];

  const data2 = [
    {
      first: t("docs.Transaction_Create_API_Invoices.Invoice_Id"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Invoice_Id"),
          t("docs.Transaction_Create_API_Invoices.Invoice_Id_description"),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Invoice_Reference"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Invoice_Reference"),
          t("docs.Transaction_Create_API_Invoices.Invoice_Id"),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Created_Date"),
      second: t("docs.Transaction_Create_API_Invoices.Invoice_Created_Date"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Expire_Date"),
      second: t("docs.Transaction_Create_API_Invoices.Invoice_Expiration_Date"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Invoice_Value"),
      second: t("docs.Transaction_Create_API_Invoices.Invoice_Value"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Comments"),
      second: t("docs.Transaction_Create_API_Invoices.Comments"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Customer_Name"),
      second: t("docs.Transaction_Create_API_Invoices.Customer_Name"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Customer_Mobile"),
      second: t("docs.Transaction_Create_API_Invoices.Customer_Mobile"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Customer_Email"),
      second: t("docs.Transaction_Create_API_Invoices.Customer_Email"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Transaction_Date"),
      second: t("docs.Transaction_Create_API_Invoices.Transaction_Date"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Payment_Gateway"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Payment_Gateway"),
          t("docs.Transaction_Create_API_Invoices.Payment_Gateway_description"),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Reference_Id"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Reference_Id"),
          t("docs.Transaction_Create_API_Invoices.Reference_Id_description"),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Track_Id"),
      second: t("docs.Transaction_Create_API_Invoices.Track_Id"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Transaction_Id"),
      second: t("docs.Transaction_Create_API_Invoices.Transaction_Id"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Payment_Id"),
      second: t("docs.Transaction_Create_API_Invoices.Payment_Id"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Authorization_Id"),
      second: t("docs.Transaction_Create_API_Invoices.Authorization_Id"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Order_Id"),
      second: t("docs.Transaction_Create_API_Invoices.Order_Id"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Invoice_Items_Details"),
      second: "",
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Product_Id"),
      second: t("docs.Transaction_Create_API_Invoices.Product_Id"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Product_Name"),
      second: t("docs.Transaction_Create_API_Invoices.Product_Name"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Unit_Price"),
      second: t("docs.Transaction_Create_API_Invoices.Unit_Price_description"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Quantity"),
      second: t("docs.Transaction_Create_API_Invoices.Quantity_description"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Extended_Amount"),
      second: t(
        "docs.Transaction_Create_API_Invoices.Extended_Amount_description"
      ),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Transaction_Details"),
      second: "",
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Transaction_Status"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Transaction_Status"),
          t(
            "docs.Transaction_Create_API_Invoices.Transaction_Status_description"
          ),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Error"),
      second: t("docs.Transaction_Create_API_Invoices.Error_description"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Paid_Currency"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Paid_Currency"),
          t("docs.Transaction_Create_API_Invoices.Paid_Currency_description"),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Paid_Currency_Value"),
      second: t("docs.Transaction_Create_API_Invoices.Paid_Currency_Value"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Transaction_Value"),
      second: t("docs.Transaction_Create_API_Invoices.Transaction_Value"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Customer_Service_Charge"),
      second: {
        items: [
          t("docs.Transaction_Create_API_Invoices.Customer_Service_Charge"),
          t(
            "docs.Transaction_Create_API_Invoices.Customer_Service_Charge_description"
          ),
        ],
      },
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Due_Value"),
      second: t("docs.Transaction_Create_API_Invoices.Due_Value"),
    },
    {
      first: t("docs.Transaction_Create_API_Invoices.Currency"),
      second: t("docs.Transaction_Create_API_Invoices.Currency"),
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
            "docs.Transaction_Create_API_Invoices.Transaction_Create_API_Invoices"
          )}
          child={t(
            "docs.Transaction_Create_API_Invoices.Transaction_Result_Request"
          )}
        />
        <MainTitleNew title={t("docs.Transaction_Create_API_Invoices.title")} />
        <div className="table-responsive">
          <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
            <thead>
              <tr>
                <th scope="col" className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.INPUT_PARAMETER")}
                </th>
                <th scope="col" className="safqa_table_padding"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="safqa_table_padding">
                  {t(
                    "docs.Transaction_Create_API_Invoices.Transaction_Result_Details"
                  )}
                </td>
                <td className="safqa_table_padding"></td>
              </tr>
              <tr>
                <td className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.Parameter")}
                </td>
                <td className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.Description")}
                </td>
              </tr>
              {data.map((data) => (
                <tr>
                  <td className="safqa_table_padding">{data.first}</td>
                  <td className="safqa_table_padding">
                    {data.second ? (
                      <>
                        <p>{data.second.title}</p>
                        <p>{data.second.description}</p>
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
        <p className="fw-bold">
          {t("docs.Transaction_Create_API_Invoices.Note1")}
        </p>
        <div className="table-responsive">
          <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
            <thead>
              <tr>
                <th scope="col" className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.RESPONSE_PARAMETER")}
                </th>
                <th scope="col" className="safqa_table_padding"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.Invoice_Details")}
                </td>
                <td className="safqa_table_padding"></td>
              </tr>
              <tr>
                <td className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.Parameter")}
                </td>
                <td className="safqa_table_padding">
                  {t("docs.Transaction_Create_API_Invoices.Description")}
                </td>
              </tr>
              {data2.map((data) => (
                <tr>
                  <td className="safqa_table_padding">{data.first}</td>
                  <td className="safqa_table_padding">
                    {data.second?.items ? (
                      <>
                        {data.second.items.map((second) => (
                          <p>{second}</p>
                        ))}
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
        <h3>
          {t("docs.Transaction_Create_API_Invoices.Transaction_Result_Request")}
        </h3>
        <p className="fw-bold">
          {t("docs.Transaction_Create_API_Invoices.Note2")}
        </p>
      </div>
    </>
  );
};

export default Transaction_result;
