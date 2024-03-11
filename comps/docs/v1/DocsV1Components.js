import Link from "next/link";
import styles from "../../../styles/docs/v1.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import { Button, Tooltip, Collapse } from "antd";
import { Pagination } from "antd";
import { WarningOutlined } from "@mui/icons-material";

const { Panel } = Collapse;

import { Select } from "antd";
import { useTranslation } from "react-i18next";
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

const docsList = [
  {
    root: "Overview",
    rootHref: "overview",
    links: [
      {
        root: "Live account",
        rootHref: "v1/live_account",
      },
      {
        root: "Live account",
        rootHref: "v1/live_account",
      },
      {
        root: "Live account",
        rootHref: "v1/live_account",
      },
    ],
  },
  {
    root: "Invoice",
    rootHref: "invoice",
    links: [
      {
        root: "Quick Invoice",
        rootHref: "quick_invoice",
        links: [
          {
            root: "Transactions",
            rootHref: "v1/transactions",
          },
          {
            root: "Items",
            rootHref: "v1/items",
          },
        ],
      },
    ],
  },
  {
    root: "ISO Lookups",
    rootHref: "iso_lookups",
  },
];

const data = [
  {
    first: "Mark",
    second: "Jacob",
    last: "Jaob",
  },
  {
    first: "Mark",
    second: "Jacob",
    last: "Jaob",
  },
  {
    first: "Mark",
    second: "Jacob",
    last: "Jaob",
  },
  {
    first: "Mark",
    second: "Jacob",
    last: "Jaob",
  },
  {
    first: "Mark",
    second: "Jacob",
    last: "Jaob",
  },
  {
    first: "Mark",
    second: "Jacob",
    last: "Jaob",
  },
];

export function SideNav() {
  const router = useRouter();
  const { pathname } = router;
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const RenderDocsList = ({ title, items }) => {
    const [itemActive, setItemActive] = useState(null);

    useEffect(() => {
      console.log(itemActive);
    }, [itemActive]);

    useEffect(() => {
      items.map((item, index) => {
        {
          item?.links?.map((link) => {
            pathname == link.href && setItemActive(index);
          });
        }
      });
    }, [items]);

    return (
      <>
        <Collapse
          className={` ${styles.sidebar} custom-ant-collapse mb-4`}
          defaultActiveKey={itemActive}
          ghost
        >
          <h5 className="mb-4 text-dark">{title}</h5>
          {items.map((item, index) => (
            <>
              {item?.links?.length ? (
                <Panel header={item.title} key={index} className="fs-5">
                  {item?.links.map((link) => {
                    return (
                      <Link
                        key={item.title}
                        className={`d-block fs-5 ${
                          pathname.includes(link.href) ? styles.active : ""
                        }`}
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </Panel>
              ) : (
                <Link
                  className={`d-block fs-5 ant-collapse-header-text ${
                    pathname.includes(item.href) ? styles.active : ""
                  }`}
                  href={item.href}
                >
                  {item.title}
                </Link>
              )}
            </>
          ))}
        </Collapse>
      </>
    );
  };

  return (
    <>
      {RenderDocsList({
        title: t("docs.sidebar.links.API_DOCUMENTATION"),
        items: [
          {
            title: t("docs.sidebar.links.Overview"),
            links: [
              {
                name: t("docs.sidebar.links.Purpose"),
                href: "/docs/v1/purpose",
              },
              {
                name: t("docs.sidebar.links.Requirements"),
                href: "/docs/v1/requirement",
              },
            ],
          },
          {
            title: t("docs.sidebar.links.Test_Cards"),
            href: "/docs/v1/test_cards",
          },
          {
            title: t("docs.sidebar.links.Demo_Information"),
            href: "/docs/v1/demo_information",
          },
          {
            title: t("docs.sidebar.links.Live_Information"),
            href: "/docs/v1/live_information",
          },
          {
            title: t("docs.sidebar.links.Shipping_Information"),
            href: "/docs/v1/Shipping_information",
          },
        ],
      })}

      {RenderDocsList({
        title: t("docs.sidebar.links.REST_API_INVOICES"),
        items: [
          {
            title: t("docs.sidebar.links.Overview"),
            links: [
              {
                name: t("docs.sidebar.links.Purpose"),
                href: "/docs/v1/api_invoices/purpose",
              },
              {
                name: t("docs.sidebar.links.Requirements"),
                href: "/docs/v1/api_invoices/requirement",
              },
            ],
          },
          {
            title: t("docs.sidebar.links.Considerations"),
            links: [
              {
                name: t("docs.sidebar.links.Dependencies"),
                href: "/docs/v1/api_invoices/dependencies",
              },
              {
                name: t("docs.sidebar.links.Assumptions"),
                href: "/docs/v1/api_invoices/assumptions",
              },
              {
                name: t("docs.sidebar.links.Scope"),
                href: "/docs/v1/api_invoices/scope",
              },
            ],
          },
          {
            title: t("docs.sidebar.links.API_URL"),
            href: "/docs/v1/api_invoices/api_url",
          },
          {
            title: t("docs.sidebar.links.Rest_APIs"),
            links: [
              {
                name: t("docs.sidebar.links.Create_Invoice_Rest_API"),
                href: "/docs/v1/api_invoices/create_Invoice_Rest_API",
              },
              {
                name: t("docs.sidebar.links.Shipping_API"),
                href: "/docs/v1/api_invoices/shipping_api",
              },
              {
                name: t("docs.sidebar.links.Direct_Payment_API"),
                href: "/docs/v1/api_invoices/direct_payment_api",
              },
              {
                name: t("docs.sidebar.links.Sample_Code_C_NET"),
                href: "/docs/v1/api_invoices/sample_code_C",
              },
              {
                name: t("docs.sidebar.links.Sample_Code_PHP"),
                href: "/docs/v1/api_invoices/sample_code_PHP",
              },
            ],
          },
          {
            title: t(
              "docs.sidebar.links.Transaction_Result_Create_Rest_API_Invoices"
            ),
            links: [
              {
                name: t("docs.sidebar.links.Transaction_Result_Request"),
                href: "/docs/v1/api_invoices/transaction_result",
              },
              {
                name: t("docs.sidebar.links.Transaction_Response"),
                href: "/docs/v1/api_invoices/transaction_response",
              },
            ],
          },
          {
            title: t("docs.sidebar.links.Create_Rest_Invoices_SMS_Email"),
            links: [
              {
                name: t("docs.sidebar.links.Merchant_Configuration_Details"),
                href: "/docs/v1/api_invoices/merchant_configuration_details",
              },
              {
                name: t(
                  "docs.sidebar.links.Create_Rest_Invoices_SMS_Email_Request"
                ),
                href: "/docs/v1/api_invoices/create_rest_invoices_SMS_email_request",
              },
              {
                name: t("docs.sidebar.links.Sample_Code"),
                href: "/docs/v1/api_invoices/sample_code",
              },
              {
                name: t("docs.sidebar.links.Response"),
                href: "/docs/v1/api_invoices/response",
              },
            ],
          },
          {
            title: t("docs.sidebar.links.Country_Codes_with_values"),
            href: "/docs/v1/api_invoices/country_codes_with_values",
          },
          {
            title: t(
              "docs.sidebar.links.Display_Currencies_Iso_Alpha_with_values"
            ),
            href: "/docs/v1/api_invoices/display_currencies_iso_alpha_with_values",
          },
          {
            title: t("docs.sidebar.links.Send_Invoice_Options_with_values"),
            href: "/docs/v1/api_invoices/send_invoice_options_with_values",
          },
          {
            title: t("docs.sidebar.links.Language_Options_with_values"),
            href: "/docs/v1/api_invoices/language_options_with_values",
          },
          {
            title: t("docs.sidebar.links.Live_API_URL"),
            href: "/docs/v1/api_invoices/live_api_url",
          },
          {
            title: t("docs.sidebar.links.IOS_SDK"),
            links: [
              {
                name: t("docs.sidebar.links.Prerequisites"),
                href: "/docs/v1/api_invoices/prerequisites",
              },
              {
                name: t("docs.sidebar.links.iOS_Specific"),
                href: "/docs/v1/api_invoices/ios_specific",
              },
              {
                name: t("docs.sidebar.links.Usage"),
                href: "/docs/v1/api_invoices/usage",
              },
              {
                name: t("docs.sidebar.links.Swift"),
                href: "/docs/v1/api_invoices/swift",
              },
              {
                name: t("docs.sidebar.links.Objective_C"),
                href: "/docs/v1/api_invoices/objective_c",
              },
              {
                name: t("docs.sidebar.links.Requirements"),
                href: "/docs/v1/api_invoices/requirements_sdk",
              },
              {
                name: t("docs.sidebar.links.Trouble_Shooting"),
                href: "/docs/v1/api_invoices/trouble_shooting",
              },
            ],
          },
          {
            title: t("docs.sidebar.links.Android_SDK"),
            links: [
              {
                name: t("docs.sidebar.links.Getting_Started"),
                href: "/docs/v1/api_invoices/android_SDK/getting_started",
              },
              {
                name: t("docs.sidebar.links.Pre_requisites"),
                href: "/docs/v1/api_invoices/android_SDK/pre_requisites",
              },
              {
                name: t("docs.sidebar.links.Usage"),
                href: "/docs/v1/api_invoices/android_SDK/usage",
              },
              {
                name: t("docs.sidebar.links.Requirements"),
                href: "/docs/v1/api_invoices/android_SDK/requirements",
              },
            ],
          },
        ],
      })}
    </>
  );
}

export function NavLinks() {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div
      dir={language == "ar" ? "rtl" : "ltr"}
      className={`${styles.NavLinks}`}
    >
      <Select
        showSearch
        // style={{
        //     width: 400,
        // }}
        className="w-100 fs-6 mb-3 d-flex justify-content-end"
        placeholder={t("docs.sidebar.links.Overview")}
        optionFilterProp="children"
        // filterOption={(input, option) => (option?.label ?? '').includes(input)}
        // filterSort={(optionA, optionB) =>
        //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        // }
        options={[
          {
            value: "1",
            label: (
              <div>
                <h6 className="text-dark">
                  {t("docs.sidebar.links.API_DOCUMENTATION")}
                </h6>
                <p>{t("docs.sidebar.links.Overview")}</p>
                <Link href="/docs/v1/purpose" className="ms-3">
                  {t("docs.sidebar.links.Purpose")}
                </Link>
                <Link href="/docs/v1/requirement" className="ms-3 d-block mt-3">
                  {t("docs.sidebar.links.Requirements")}
                </Link>
              </div>
            ),
          },
          {
            value: "2",
            label: (
              <div>
                <Link href="/docs/v1/test_cards">
                  {t("docs.sidebar.links.Test_Cards")}
                </Link>
              </div>
            ),
          },
          {
            value: "3",
            label: (
              <div>
                <Link href="/docs/v1/demo_information">
                  {t("docs.sidebar.links.Demo_Information")}
                </Link>
              </div>
            ),
          },
          {
            value: "4",
            label: (
              <div>
                <Link href="/docs/v1/live_information">
                  {t("docs.sidebar.links.Live_Information")}
                </Link>
              </div>
            ),
          },
          {
            value: "5",
            label: (
              <div>
                <Link href="/docs/v1/Shipping_information">
                  {t("docs.sidebar.links.Shipping_Information")}
                </Link>
              </div>
            ),
          },
          {
            value: "6",
            label: (
              <div>
                <h6 className="text-dark">
                  {t("docs.sidebar.links.REST_API_INVOICES")}
                </h6>
                <p>{t("docs.sidebar.links.Overview")}</p>
                <Link href="/docs/v1/api_invoices/purpose" className="ms-3">
                  {t("docs.sidebar.links.Purpose")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/requirement"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Requirements")}
                </Link>
              </div>
            ),
          },
          {
            value: "7",
            label: (
              <div>
                <p>{t("docs.sidebar.links.Considerations")}</p>
                <Link
                  href="/docs/v1/api_invoices/dependencies"
                  className="ms-3"
                >
                  {t("docs.sidebar.links.Dependencies")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/assumptions"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Assumptions")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/scope"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Scope")}
                </Link>
              </div>
            ),
          },
          {
            value: "8",
            label: (
              <div>
                <Link href="/docs/v1/api_invoices/api_url">
                  {t("docs.sidebar.links.API_URL")}
                </Link>
              </div>
            ),
          },
          {
            value: "9",
            label: (
              <div>
                <p>{t("docs.sidebar.links.Rest_APIs")}</p>
                <Link
                  href="/docs/v1/api_invoices/create_Invoice_Rest_API"
                  className="ms-3"
                >
                  {t("docs.sidebar.links.Create_Invoice_Rest_API")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/shipping_api"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Shipping_API")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/direct_payment_api"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Direct_Payment_API")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/sample_code_C"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Sample_Code_C_NET")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/sample_code_PHP"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Sample_Code_PHP")}
                </Link>
              </div>
            ),
          },
          {
            value: "10",
            label: (
              <div>
                <p>
                  {t(
                    "docs.sidebar.links.Transaction_Result_Create_Rest_API_Invoices"
                  )}
                </p>
                <Link
                  href="/docs/v1/api_invoices/transaction_result"
                  className="ms-3"
                >
                  {t("docs.sidebar.links.Transaction_Result_Request")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/transaction_response"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Transaction_Response")}
                </Link>
              </div>
            ),
          },
          {
            value: "11",
            label: (
              <div>
                <p>{t("docs.sidebar.links.Create_Rest_Invoices_SMS_Email")}</p>
                <Link
                  href="/docs/v1/api_invoices/merchant_configuration_details"
                  className="ms-3"
                >
                  {t("docs.sidebar.links.Merchant_Configuration_Details")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/create_rest_invoices_SMS_email_request"
                  className="ms-3 d-block mt-3"
                >
                  {t(
                    "docs.sidebar.links.Create_Rest_Invoices_SMS_Email_Request"
                  )}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/sample_code"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Sample_Code")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/response"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Response")}
                </Link>
              </div>
            ),
          },
          {
            value: "12",
            label: (
              <div>
                <Link href="/docs/v1/api_invoices/country_codes_with_values">
                  {t("docs.sidebar.links.Country_Codes_with_values")}
                </Link>
              </div>
            ),
          },
          {
            value: "13",
            label: (
              <div>
                <Link href="/docs/v1/api_invoices/display_currencies_iso_alpha_with_values">
                  {t(
                    "docs.sidebar.links.Display_Currencies_Iso_Alpha_with_values"
                  )}
                </Link>
              </div>
            ),
          },
          {
            value: "14",
            label: (
              <div>
                <Link href="/docs/v1/api_invoices/send_invoice_options_with_values">
                  {t("docs.sidebar.links.Send_Invoice_Options_with_values")}
                </Link>
              </div>
            ),
          },
          {
            value: "15",
            label: (
              <div>
                <Link href="/docs/v1/api_invoices/language_options_with_values">
                  {t("docs.sidebar.links.Language_Options_with_values")}
                </Link>
              </div>
            ),
          },
          {
            value: "16",
            label: (
              <div>
                <Link href="/docs/v1/api_invoices/live_api_url">
                  {t("docs.sidebar.links.Live_API_URL")}
                </Link>
              </div>
            ),
          },
          {
            value: "17",
            label: (
              <div>
                <p>{t("docs.sidebar.links.IOS_SDK")}</p>
                <Link
                  href="/docs/v1/api_invoices/prerequisites"
                  className="ms-3"
                >
                  {t("docs.sidebar.links.Prerequisites")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/ios_specific"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.iOS_Specific")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/usage"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Usage")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/swift"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Swift")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/objective_c"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Objective_C")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/requirements_sdk"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Requirements")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/trouble_shooting"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Trouble_Shooting")}
                </Link>
              </div>
            ),
          },
          {
            value: "18",
            label: (
              <div>
                <p>{t("docs.sidebar.links.Android_SDK")}</p>
                <Link
                  href="/docs/v1/api_invoices/android_SDK/getting_started"
                  className="ms-3"
                >
                  {" "}
                  {t("docs.sidebar.links.Getting_Started")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/android_SDK/pre_requisites"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Pre_requisites")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/android_SDK/usage"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Usage")}
                </Link>
                <Link
                  href="/docs/v1/api_invoices/android_SDK/requirements"
                  className="ms-3 d-block mt-3"
                >
                  {t("docs.sidebar.links.Requirements")}
                </Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export const MainTitle = () => {
  const router = useRouter();
  const { pathname } = router;

  let title = "";

  docsList.forEach((doc) => {
    if (pathname.includes(doc.rootHref)) {
      title = doc.root;
    } else if (doc.links) {
      doc.links.forEach((link) => {
        if (pathname.includes(link.rootHref)) {
          title = link.root;
        }
      });
    }
  });

  return <p className={`${styles.main_title}`}>{title}</p>;
};

export const MainTitleNew = ({ title }) => {
  return <h2 className={`${styles.main_title} `}>{title}</h2>;
};

export const LinkHierarchy = ({ parent, child, className = "" }) => {
  return (
    <div className={`d-flex ${className} mb-2`}>
      <p className={`${styles.root} fs-5 m-0`}>{parent}</p>
      <p className={`${styles.current} fs-5 m-0`}>{child}</p>
    </div>
  );
};

export function CodeSnippetCopy({ code, title }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  return (
    <pre className={`${styles.code_snippet_code} mt-3`}>
      <p className="color-secondary">{title}</p>
      <hr />
      {code}

      {isClicked ? (
        <Tooltip placement="top" title={`Copied`}>
          <DoneIcon className={styles.copy_button} />
        </Tooltip>
      ) : (
        <Tooltip placement="top" title={`Copy to clipboard`}>
          <ContentCopyIcon
            className={styles.copy_button}
            onClick={handleCopyClick}
          />
        </Tooltip>
      )}
    </pre>
  );
}

export function NoteText({ text }) {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={styles.note_text}>
      <div className="d-flex ">
        <ErrorIcon className={styles.error_icon} />
        <p>{t("docs.DocsV1Components.NOTE")}</p>
      </div>
      {text}
    </div>
  );
}

export function WarningText({ text }) {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`${styles.warning_text} mb-3`}>
      <div className="d-flex ">
        <WarningOutlined className={styles.error_icon} />
        <p>{t("docs.DocsV1Components.WarningText")}</p>
      </div>
      <span style={{ wordBreak: "break-all" }}>{text}</span>
    </div>
  );
}

export function Paginat() {
  return <Pagination defaultCurrent={1} total={50} />;
}

export function Table() {
  return (
    <div className="table-responsive">
      <table className={`table table-striped text-center mt-3 ${styles.table}`}>
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">second</th>
            <th scope="col">Last</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ data, index }) => (
            <tr key={index}>
              <td className={styles.first}>{data.first}</td>
              <td>{data.second}</td>
              <td>{data.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableTwo() {
  return (
    <div className="table-responsive">
      <table
        className={`table table-striped text-center mt-3 ${styles.tableTwo}`}
      >
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ data, index }) => (
            <tr key={index}>
              <td>{data.first}</td>
              <td>{data.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableThree() {
  return (
    <div className="table-responsive">
      <table
        className={`table table-striped text-center mt-3 ${styles.tableThree}`}
      >
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ data, index }) => (
            <tr key={index}>
              <td>{data.first}</td>
              <td>{data.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
