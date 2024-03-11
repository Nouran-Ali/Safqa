import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BtnNewDelete, BtnRefund, MagicLinkIcon } from "../../Buttons";
import { BtnTables } from "../../Buttons";
import { BtnShow } from "../../Buttons";
import { BtnEdit } from "../../Buttons";
import { BtnDelete } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoice,
  filterInvoices,
  getInvoices,
  ResetSuccess,
} from "../../../store/slices/invoiceSlice";
import LoadingSpinner from "../../LoadingSpinner";
import { useEffect, useRef } from "react";
import { SafqaInput, usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { Space } from "antd";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchInvoiceSchema } from "../../../lib/validations/en/invoiceSchema";
import { searchInvoiceSchemaAr } from "../../../lib/validations/ar/invoiceSchemaAr";
import { useTheme } from "next-themes";
import { formatNumber } from "../../../lib/validations/services";
import { getFullDateFromISO } from "../../../lib/dates";

const Invoices = () => {
  const { theme } = useTheme();
  const {
    invoices,
    filtered_invoices,
    success,
    isLoading,
    api_errors,
    deleteLoading,
  } = useSelector((state) => state.invoice);
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { SelectPageSize, pageSize } = usePageSize(5);
  const tableRef = useRef();
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { getColumnSearchProps } = useSafqaTableSearch();

  const { searchInfo } = useSelector((state) => state.invoice);

  const defaultValues = searchInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == "en" ? searchInvoiceSchema : searchInvoiceSchemaAr
    ),
    defaultValues,
  });

  const { customer_name } = watch();

  useEffect(() => {
    dispatch(filterInvoices({ customer_name }));
  }, [customer_name, dispatch]);

  const columns = [
    {
      title: t("dashboard.invoice_ID"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("dashboard.customer"),
      dataIndex: "customer_name",
      key: "customer_name",
      ...getColumnSearchProps("customer_name"),
    },
    {
      title: t("dashboard.date"),
      dataIndex: "created_at",
      key: "created_at",
      render: (_, invoice) => <>{getFullDateFromISO(invoice.created_at)}</>,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      // ...getColumnSearchProps('created_at')
    },
    {
      title: `${t("dashboard.value")} (${
        profile_business?.country?.short_currency
      })`,
      dataIndex: "invoice_value",
      key: "invoice_value",
      render: (_, invoice) => (
        <>{invoice.invoice_value && formatNumber(invoice.invoice_value)} </>
      ),
      sorter: (a, b) => a.invoice_value - b.invoice_value,
      // ...getColumnSearchProps('invoice_value')
    },
    // {
    //   title: t("dashboard.method"),
    //   dataIndex: 'method',
    //   key: 'method',
    //   render: (_, invoice) => invoice.transcation ?
    //     <p>{invoice.transcation.typeCard}</p> :
    //     <p>-</p>
    // },
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
          text: "Paid",
          value: "paid",
        },
        {
          text: "UnPaid",
          value: "unpaid",
        },
      ],
      onFilter: (value, category) => category.status === value,
      // render: (_, invoice) => invoice.status ?
      //   <CheckCircleOutlined className="safqa-text-success fs-5" /> :
      //   <CloseCircleOutlined className="safqa-text-danger fs-5" />
    },
    {
      title: t("dashboard.actions"),
      dataIndex: "",
      key: "x",
      render: (_, invoice) => (
        <Space>
          <BtnShow href={`../../dashboard/invoices/${invoice.id}`} />

          {invoice.status == "pending" && (
            <BtnEdit
              href={`/dashboard/invoices/${
                invoice.invoice_type == "invoice"
                  ? `update/${invoice.id}`
                  : `quick/update/${invoice.id}`
              }`}
            />
          )}
          {invoice.status == "paid" && (
            <BtnRefund url={`/dashboard/refunds/create/${invoice.id}`} />
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
        <MagicLinkIcon
          url="/dashboard/invoices/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={`${t("dashboard.create")} ${t("dashboard.invoice")}`}
        />

        <MagicLinkIcon
          url="/dashboard/invoices/quick/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={`${t("dashboard.create")} ${t("dashboard.quick_invoice")}`}
        />
        <br />

        <div className={`safqa-scroll-x d-flex`}>
          <BtnTables
            getItems={getInvoices}
            data={filtered_invoices}
            columns={columns}
            filename="invoices"
            tableRef={tableRef}
          />

          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_invoices}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
