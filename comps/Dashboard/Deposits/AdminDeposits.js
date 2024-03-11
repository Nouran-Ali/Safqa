import styles from "../../../styles/Dashboard/Tables.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BtnAdminDeposit, BtnBlock, BtnShow, BtnTables } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { useTheme } from "next-themes";
import { getFullDateFromISO } from "../../../lib/dates";
import {
  ResetSuccess,
  confirmDeposit,
  deleteDeposit,
  getAdminDeposits,
  getDeposits,
} from "../../../store/slices/depositSlice";
import { useSelector } from "react-redux";
import { Space } from "antd";
// import { BtnEditWithdraw } from "../../Wallet";
import BlockIcon from "@mui/icons-material/Block";
import BtnEditWithdraw from "../../BtnEditWithdraw";
import BtnAdminEditWithdraw from "../../BtnAdminEditWithdraw";
import { formatNumber } from "../../../lib/validations/services";

const AdminDeposits = () => {
  const { theme } = useTheme();
  const { pageSize, SelectPageSize } = usePageSize();
  const tableRef = useRef();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { admin_deposits, isLoading, deleteLoading, success, api_errors } =
    useSelector((state) => state.deposit);

  const columns = [
    {
      title: t("dashboard.company_name"),
      dataIndex: ["profile_information", "company_name"],
      key: ["profile_information", "company_name"],
    },
    {
      title: t("dashboard.Amount"),
      dataIndex: "amount",
      key: "amount",
      render: (_, deposit) => (
        <span>
          {Math.round(deposit.amount * 100) / 100} (
          {deposit.profile_information.country.short_currency})
        </span>
      ),
    },
    {
      title: t("dashboard.amount_after_fees"),
      dataIndex: "",
      key: "",
      render: (_, deposit) => (
        <span>
          {Math.round((deposit.amount - deposit.amount * 0.03) * 100) / 100} (
          {deposit.profile_information.country.short_currency})
        </span>
      ),
    },
    {
      title: t("dashboard.bank_name"),
      dataIndex: "Bank_name",
      key: "Bank_name",
    },
    {
      title: t("dashboard.date"),
      dataIndex: "date",
      key: "date",
      render: (_, deposit) => <>{getFullDateFromISO(deposit.created_at)}</>,
    },
    {
      title: t("dashboard.status"),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${status == "pending" && "text-warning"}
        ${status == "paid" && "text-success"}
         ${status == "unpaid" && "text-danger"} text-uppercase`}
        >
          {status}
        </span>
      ),
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Processing",
          value: "processing",
        },
        {
          text: "Paid",
          value: "paid",
        },
        {
          text: "UnPaid",
          value: "unpaid",
        },
      ],
      onFilter: (value, category) => category.status === value,
    },
    {
      title: t("dashboard.actions"),
      dataIndex: "",
      key: "x",
      render: (_, deposit) => (
        <Space>
          {/* <BtnShow href={`../../dashboard/Deposits/show/${deposit.id}`} /> */}
          {(deposit.status == "pending" || deposit.status == "processing") && (
            <BtnAdminEditWithdraw depositInfo={deposit} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div
      className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div
        className={`rounded-2 ${language == "en" && "me-4"} ${
          theme == "dark" ? styles.info_dark : styles.info
        }`}
      >
        <div className="safqa-scroll-x d-flex">
          <BtnTables
            getItems={getAdminDeposits}
            data={admin_deposits}
            columns={columns}
            tableRef={tableRef}
            filename="Admin Deposits"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={admin_deposits}
            columns={columns}
            loading={isLoading}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDeposits;
