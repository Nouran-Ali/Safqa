import { useState } from "react";
import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MagicLinkIcon } from "../../Buttons";
import { BtnShow } from "../../Buttons";
import { BtnTables, BtnEdit } from "../../Buttons";
import { BtnDelete, BtnNewDelete } from "../../Buttons";
import ClipboardCopy from "../ClipboardCopy";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  getProducts as getProductsThunk,
} from "../../../store/slices/productSlice";
import {
  deleteProduct as deleteProductThunk,
  ResetSuccess,
} from "../../../store/slices/productSlice";
import { useEffect } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";
import { SafqaInput, usePageSize } from "../Inputs";
import { Space, Table } from "antd";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
import getNowDate from "../../../lib/getNowDate";
import { useRef } from "react";
import SafqaTable from "../../common/SafqaTable";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";
import useRowSelection from "../../../hooks/SafqaTableRowSelection";
import { useTheme } from "next-themes";
import CreateProductLink from "./CreateProductLink";
import CreateIndividualProductLink from "./CreateIndividualProductLink";

const Products = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  const { SelectPageSize, pageSize } = usePageSize(5);
  const { getColumnSearchProps } = useSafqaTableSearch();

  const { rowSelection, selectedRowKeys, selectedRows } = useRowSelection({
    type: "checkbox",
    getCheckboxProps: (record) => ({
      disabled: record.is_active === 0,
      name: record.name_en,
    }),
    selections: [
      Table.SELECTION_NONE,
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
    ],
  });
  const tableRef = useRef();

  const {
    filtered_products,
    products,
    isLoading,
    deleteLoading,
    success,
    api_errors,
  } = useSelector((state) => state.product);

  const columns = [
    {
      title: t("dashboard.product_name"),
      dataIndex: language == "en" ? "name_en" : "name_ar",
      key: "name_en",
      ...getColumnSearchProps("name_en"),
    },
    {
      title: t("dashboard.product_category"),
      dataIndex:
        language == "en" ? ["category", "name_en"] : ["category", "name_ar"],
      key: "category",
      // ...getColumnSearchProps('category')
    },
    {
      title: t("dashboard.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps("price"),
    },
    {
      title: t("dashboard.remaining_quantity"),
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: t("dashboard.active"),
      dataIndex: "is_active",
      key: "is_active",
      render: (_, product) =>
        product.is_active ? (
          <CheckCircleOutlined className="safqa-text-success fs-5" />
        ) : (
          <CloseCircleOutlined className="safqa-text-danger fs-5" />
        ),
      filters: [
        {
          text: "Active",
          value: 1,
        },
        {
          text: "Inactive",
          value: 0,
        },
      ],
      onFilter: (value, product) => product.is_active === value,
    },
    {
      title: t("dashboard.actions"),
      dataIndex: "",
      key: "x",
      render: (_, product) => (
        <Space>
          {product.is_active && (
            <CreateIndividualProductLink product={product} />
          )}
          <BtnShow href={`../../dashboard/products/show/${product.id}`} />
          <BtnEdit href={`/dashboard/products/update/${product.id}`} />
          <BtnNewDelete
            title={product.name_en}
            item={product}
            handleDelete={deleteProduct}
            isLoading={deleteLoading}
            success={success}
            error={api_errors}
            resetSuccess={ResetSuccess}
            getItems={getProductsThunk}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);
  useEffect(() => {
    console.log(selectedRowKeys);
  }, [selectedRowKeys]);

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
          url="/dashboard/products/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={t("dashboard.create_new")}
        />
        {/* <MagicLinkIcon
          url="/dashboard"
          style={styles.bgBlue}
          icon={<VerticalAlignBottomIcon />}
          name={t("dashboard.import")}
        /> */}

        <br />
      </div>
      <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
        <BtnTables
          getItems={getProductsThunk}
          data={products}
          columns={columns}
          filename="products"
          tableRef={tableRef}
        />

        <CreateProductLink
          selectedRowKeys={selectedRowKeys}
          selectedRows={selectedRows}
        />

        <SelectPageSize />
      </div>

      <div className="w-100 mt-2" ref={tableRef}>
        <SafqaTable
          dataSource={filtered_products}
          pageSize={pageSize}
          columns={columns}
          loading={isLoading}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};

export default Products;
