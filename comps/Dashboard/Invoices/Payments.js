import Link from "next/link";
import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BtnNewDelete, MagicLinkIcon } from "../../Buttons";
import { BtnTables } from "../../Buttons";
import { BtnShow } from "../../Buttons";
import { BtnEdit } from "../../Buttons";
import { BtnDelete } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { usePageSize } from "../Inputs";
import { useRef } from "react";
import SafqaTable from "../../common/SafqaTable";
import { Space } from "antd";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import {
  deletePaymentLink,
  getPayments,
} from "../../../store/slices/paymentLinkSlice";
import { getFullDateFromISO } from "../../../lib/dates";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import CopyToClipboard from "../CopyToClipboard";

const Payments = () => {
  const { theme } = useTheme();
  const { SelectPageSize, pageSize } = usePageSize(5);
  const tableRef = useRef();
  const { payments, filtered_payments, isLoading, deleteLoading } = useSelector(
    (state) => state.paymentLink
  );

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { getColumnSearchProps } = useSafqaTableSearch();

  const columns = [
    {
      title: t("dashboard.title"),
      dataIndex: "payment_title",
      key: "payment_title",
      ...getColumnSearchProps("payment_title"),
    },
    {
      title: t("dashboard.url"),
      dataIndex: "url",
      key: "url",
      render: (_, payment) => (
        <CopyToClipboard
          copyText={`https://safqapay.com/payLink/${payment.id}`}
          title={t("dashboard.payment_link_url")}
        />
      ),
    },
    {
      title: t("dashboard.date"),
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => <>{getFullDateFromISO(created_at)}</>,
    },
    {
      title: t("dashboard.payment_amount"),
      dataIndex: "payment_amount",
      key: "payment_amount",
      // sorter: (a, b) => a.payment_amount - b.payment_amount,
      render: (_, product) => (
        <p>
          {product.payment_amount} ({product.currency.short_currency})
        </p>
      ),
      // ...getColumnSearchProps("payment_amount"),
    },
    {
      title: t("dashboard.Is_open_amount"),
      dataIndex: "open_amount",
      key: "open_amount",
      render: (_, payment) =>
        payment.open_amount ? (
          <CheckCircleOutlined className="safqa-text-success fs-5" />
        ) : (
          <CloseCircleOutlined className="safqa-text-danger fs-5" />
        ),
      filters: [
        {
          text: "Open",
          value: 1,
        },
        {
          text: "Fixed",
          value: 0,
        },
      ],
      onFilter: (value, payment) => payment.open_amount === value,
    },
    // {
    //   title: t("dashboard.views"),
    //   dataIndex: 'views',
    //   key: 'views'
    // },
    {
      title: t("dashboard.actions"),
      dataIndex: "",
      key: "x",
      render: (_, payment) => (
        <Space>
          <BtnShow href={`/dashboard/invoices/payments/${payment.id}`} />
          <BtnEdit href={`/dashboard/invoices/payments/update/${payment.id}`} />
          <BtnNewDelete
            title={payment.payment_title}
            item={payment}
            handleDelete={deletePaymentLink}
            isLoading={deleteLoading}
          />
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
        <MagicLinkIcon
          url="/dashboard/invoices/payments/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={t("dashboard.create_new")}
        />
        <br />

        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={getPayments}
            data={filtered_payments}
            columns={columns}
            tableRef={tableRef}
            filename="payments"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_payments}
            columns={columns}
            loading={isLoading}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Payments;
