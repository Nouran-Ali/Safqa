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
import { deleteProduct, getProducts as getProductsThunk } from "../../../store/slices/productSlice";
import {
  deleteProduct as deleteProductThunk,
  ResetSuccess,
} from "../../../store/slices/productSlice";
import { useEffect } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import RefreshIcon from '@mui/icons-material/Refresh';
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
import { deleteProductLink, getProductsLinks } from "../../../store/slices/productLinkSlice";
import CopyToClipboard from "../CopyToClipboard";



const ProductLinks = () => {
  const { theme } = useTheme()
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch()
  const { SelectPageSize, pageSize } = usePageSize(5);
  const { getColumnSearchProps } = useSafqaTableSearch()

  const tableRef = useRef();


  const { filtered_product_links, product_links, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.productLink);


  const columns = [
    {
      title: t("dashboard.link_name"),
      dataIndex: language == 'en' ? 'name_en' : 'name_ar',
      key: language == 'en' ? 'name_en' : 'name_ar',
    },
    {
      title: t("dashboard.link"),
      dataIndex: "",
      key: '',
      render: (_, product_link) => <CopyToClipboard
        copyText={`https://safqapay.com/payProduct/${product_link.id}`}
        title={t("dashboard.product_url")}
      /> 
    },
    {
      title: t("dashboard.active"),
      dataIndex: 'is_active',
      key: 'is_active',
      render: (_, product) => product.is_active ?
        <CheckCircleOutlined className="safqa-text-success fs-5" /> :
        <CloseCircleOutlined className="safqa-text-danger fs-5" />,
      filters: [
        {
          text: 'Active',
          value: 1,
        },
        {
          text: 'Inactive',
          value: 0,
        },
      ],
      onFilter: (value, product) => product.is_active === value,
    },
    {
      title: t("dashboard.actions"),
      dataIndex: '',
      key: 'x',
      render: (_, product) =>
        <Space>
          <BtnShow href={`../../dashboard/products/urls/${product.id}`} />
          <BtnEdit href={`/dashboard/products/urls/update/${product.id}`} />
          {/* <BtnNewDelete
            title={product.name_en}
            item={product}
            handleDelete={deleteProductLink}
            isLoading={deleteLoading}
          /> */}
        </Space>
    },
  ]


  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 ${language == "en" && "me-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`}>

        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={getProductsLinks}
            data={product_links}
            columns={columns}
            filename="product Links"
            tableRef={tableRef}
          />

          <SelectPageSize />

        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_product_links}
            pageSize={pageSize}
            columns={columns}
            loading={isLoading}
          />
        </div>

      </div>
    </div>
  );
};

export default ProductLinks;


