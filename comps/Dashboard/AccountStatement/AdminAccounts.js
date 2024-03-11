import styles from "../../../styles/Dashboard/Tables.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MagicLinkIcon } from "../../Buttons";
import { BtnTables } from "../../Buttons";
import { useTranslation } from "react-i18next";
import SafqaTable from "../../common/SafqaTable";
import { usePageSize } from "../Inputs";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { getAccountStatments } from "../../../store/slices/accountStatmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFullDateFromISO } from "../../../lib/dates";
import { formatNumber } from "../../../lib/validations/services";
import { useRouter } from "next/router";

const AdminAccounts = () => {
  const { theme } = useTheme();
  const { SelectPageSize, pageSize } = usePageSize(5)
  const router = useRouter()
  const { profile_id } = router.query;
  const { accountstatments, isLoading } = useSelector(state => state.accountStatement)
  const tableRef = useRef()
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const columns = [
    {
      title: t("dashboard.reference_number"),
      dataIndex: "reference_number",
      key: 'reference_number',
    },
    {
      title: t("dashboard.date"),
      dataIndex: "date",
      key: 'date',
      render: (_, statement) => <>{getFullDateFromISO(statement.created_at)}</>
    },
    {
      title: t("dashboard.description"),
      dataIndex: "Description",
      key: 'Description',
    },
    // {
    //   title: t("dashboard.method"),
    //   dataIndex: "method",
    //   key: 'method',
    //   render: (method) => <span className={`${method === "Credit" ? styles.GreenColor : styles.RedColor
    //     }`}>{method}</span>
    // },
    {
      title: t("dashboard.debit"),
      dataIndex: "Debit",
      key: 'Debit',
      render: (Debit) => <span className="text-danger fw-bold">{formatNumber(Debit || 0)}</span>
    },
    {
      title: t("dashboard.credit"),
      dataIndex: "Credit",
      key: 'Credit',
      render: (Credit) => <span className="text-success fw-bold">{formatNumber(Credit || 0)}</span>
    },
    {
      title: t("dashboard.balance"),
      dataIndex: "Balance",
      key: 'Balance',
      render: (Balance) => <span className="fw-bold">{formatNumber(Balance)}</span>
    },
  ]

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={` rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>

        {/* <div className="safqa-scroll-x-x safqa-grid">
          <MagicLinkIcon
            url="/dashboard/consolidatedTaxInvoice"
            style={styles.bgBlue}
            name={t("dashboard.consolidated_tax_invoice")}
          />
          <MagicLinkIcon
            url="/dashboard"
            style={styles.bgBlue}
            name={t("dashboard.export_filtered_as_CSV")}
          />
        </div> */}

        {/* <br /> */}

        {/* <div className="safqa-scroll-x-x d-flex">
          <BtnTables
            getItems={getItems}
            data={accountstatments}
            columns={columns}
            tableRef={tableRef}
            filename="Accounts"
          />
          <SelectPageSize />
        </div> */}

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={accountstatments}
            columns={columns}
            loading={isLoading}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAccounts;
