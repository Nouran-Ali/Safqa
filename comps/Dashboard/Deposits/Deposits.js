import styles from "../../../styles/Dashboard/Tables.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  BtnBlock,
  BtnEdit,
  BtnNewDelete,
  BtnTables,
  MagicLinkIcon,
} from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { useTheme } from "next-themes";
import { getFullDateFromISO } from "../../../lib/dates";
import {
  ResetSuccess,
  deleteRequestMoney,
  getDeposits,
} from "../../../store/slices/depositSlice";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BtnAddToWallet, BtnWithdraw } from "../../Wallet";
import { Space } from "antd";
import BtnEditWithdraw from "../../BtnEditWithdraw";
import BlockIcon from "@mui/icons-material/Block";

const Deposits = () => {
  const { theme } = useTheme();
  const { pageSize, SelectPageSize } = usePageSize();
  const tableRef = useRef();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const {
    filtered_deposits,
    deposits,
    isLoading,
    deleteLoading,
    success,
    api_errors,
  } = useSelector((state) => state.deposit);
  const {
    statistics: { wallet_profile, usd_balance, rate },
  } = useSelector((state) => state.auth);

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: `${t("dashboard.amount")} (${
        profile_business?.country?.short_currency
      })`,
      dataIndex: "amount",
      key: "amount",
      render: (_, item) => (
        <p
          className={`m-0 fw-bold ${
            item.type == "charge_wallet" ? "text-success" : "text-danger"
          }`}
        >
          {item.type == "charge_wallet" ? "+ " : "- "}{" "}
          {Math.round(item.amount * 100) / 100}
        </p>
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
          {deposit.status == "pending" && (
            <>
              <BtnEditWithdraw depositInfo={deposit} />
              <BtnBlock
                title={deposit.amount}
                item={deposit}
                handleDelete={deleteRequestMoney}
                isLoading={deleteLoading}
                success={success}
                error={api_errors}
                resetSuccess={ResetSuccess}
                getItems={getDeposits}
                icon={<BlockIcon />}
              />
            </>
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
        className={`rounded-2  ${
          theme == "dark" ? styles.info_dark : styles.info
        }`}
      >
        <div
          className={`rounded-2 d-flex justify-content-center ${
            theme == "dark" ? styles.info_dark : styles.info
          }`}
        >
          <div className="row w-100">
            <div className="col-md-3  d-flex justify-content-center">
              <BtnAddToWallet
                style={styles.bgBlue}
                icon={<AddIcon />}
                name={t("dashboard.add_balance")}
              />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <BtnWithdraw
                style={styles.bgBlue}
                icon={<RemoveIcon />}
                name={t("dashboard.withdrawal")}
              />
            </div>
            <div className="col-md-6   d-flex justify-content-center">
              <p className="text-center mt-3 fs-6 fw-bold safqa-text-info-dashboard d-block">
                {t("comment.lowest_wallet_note")}
              </p>
            </div>
          </div>
        </div>
        <div className="safqa-scroll-x d-flex">
          <BtnTables
            getItems={getDeposits}
            data={deposits}
            columns={columns}
            tableRef={tableRef}
            filename="Deposits"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={deposits}
            columns={columns}
            loading={isLoading}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Deposits;
