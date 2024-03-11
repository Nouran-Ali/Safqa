import { useState } from "react";
import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BtnAdminRefund, BtnRefund, MagicLinkIcon } from "../../Buttons";
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
import { usePageSize } from "../Inputs";
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
import { confirmRefund, getAdminRefunds } from "../../../store/slices/refundSlice";
import { getFullDateFromISO } from "../../../lib/dates";


const AdminAdmin_refunds = () => {
  const { theme } = useTheme()

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch()
  const { SelectPageSize, pageSize } = usePageSize(5);
  const tableRef = useRef();


  const { filtered_admin_refunds, admin_refunds, isLoading, success, api_errors } = useSelector(state => state.refund);


  const columns = [
    {
      title: t("dashboard.invoice_ID"),
      dataIndex: 'invoice_id',
      key: 'invoice_id',
    },
    {
      title: t("dashboard.date_created"),
      dataIndex: 'date_created',
      key: 'date_created',
      render: (_, refund) => <>{getFullDateFromISO(refund.created_at)}</>
    },
    {
      title: t("dashboard.customer_name"),
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (_, refund) => <>{refund.invoice.customer_name}</>
    },
    {
      title: t("dashboard.amount"),
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: t("dashboard.status"),
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span
        className={`${status == 'pending' && 'text-warning'}
        ${status == 'refunded' && 'text-success'}`}
      >{status}</span>,
      filters: [
        {
          text: 'Pending',
          value: 'pending',
        },
        {
          text: 'Refunded',
          value: 'Refunded',
        },
      ],
      onFilter: (value, refund) => refund.status === value,
    },
    {
      title: t("dashboard.actions"),
      dataIndex: '',
      key: 'x',
      render: (_, refund) =>
        <Space>
          <BtnShow href={`/dashboard/admin/refunds/${refund.id}`} />
          {
            refund.status == 'pending' &&
            <BtnAdminRefund
              refund={refund}
              handleRefund={confirmRefund}
              isLoading={isLoading}
            />
          }
        </Space>
    },
  ]


  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 ${language == "en" && "me-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={getAdminRefunds}
            data={filtered_admin_refunds}
            columns={columns}
            filename="filtered_admin_refunds"
            tableRef={tableRef}
          />
          <SelectPageSize />

        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_admin_refunds}
            pageSize={pageSize}
            columns={columns}
            loading={isLoading}
          />
        </div>

      </div>
    </div>
  );
};

export default AdminAdmin_refunds;