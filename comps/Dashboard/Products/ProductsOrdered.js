import { useRef, useState } from "react";
import styles from "../../../styles/Dashboard/Tables.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  BtnShow,
  BtnRefund,
  BtnDelete,
  BtnTables,
  BtnNewDelete,
} from "../../Buttons";
import ClipboardCopy from "../ClipboardCopy";
import { useTranslation } from "react-i18next";
import { usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { Space } from "antd";
import { useTheme } from "next-themes";
import { getOrders } from "../../../store/slices/orderSlice";
import { useSelector } from "react-redux";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";

const ProductsOrdered = () => {
  const {
    filtered_orders,
    orders,
    isLoading,
    deleteLoading,
    success,
    api_errors,
  } = useSelector((state) => state.order);
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const tableRef = useRef();
  const { theme } = useTheme();
  const { SelectPageSize, pageSize } = usePageSize(5);
  const { getColumnSearchProps } = useSafqaTableSearch();
  const [checked, setChecked] = useState(false);

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const columns = [
    {
      title: t("dashboard.order_ID"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("dashboard.customer_name"),
      dataIndex: "customer_name",
      key: "customer_name",
      ...getColumnSearchProps("customer_name"),
    },
    {
      title: t("dashboard.customer_email"),
      dataIndex: "customer_email",
      key: "customer_email",
      ...getColumnSearchProps("customer_email"),
    },
    {
      title: t("dashboard.customer_mobile"),
      dataIndex: "customer_mobile",
      key: "customer_mobile",
      ...getColumnSearchProps("customer_mobile"),
    },
    {
      title: `${t("dashboard.value")} (${
        profile_business?.country?.short_currency
      })`,
      dataIndex: "invoice_value",
      key: "invoice_value",
      ...getColumnSearchProps("invoice_value"),
    },
    {
      title: t("dashboard.order_status"),
      dataIndex: "status",
      key: "status",
    },
    // {
    //   title: t("dashboard.actions"),
    //   dataIndex: '',
    //   key: 'x',
    //   render: (_, product) =>
    //     <Space>
    //       <BtnShow href="/dashboard/products/showProductsOrdered" />
    //       {/* <BtnRefund url="/dashboard" /> */}
    //       <BtnNewDelete
    //         title={product.name_en}
    //         item={product}
    //       // handleDelete={deleteProduct}
    //       // isLoading={deleteLoading}
    //       // success={success}
    //       // error={api_errors}
    //       // resetSuccess={ResetSuccess}
    //       // getItems={getPayment}
    //       />
    //     </Space>
    // },
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
        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={getOrders}
            data={filtered_orders}
            columns={columns}
            tableRef={tableRef}
            filename="orders"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_orders}
            pageSize={pageSize}
            columns={columns}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsOrdered;
