import Link from "next/link";
import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MagicLinkIcon, BtnTables, BtnEdit, BtnShow, BtnNewDelete } from "../../Buttons";
import { useSelector, useDispatch } from 'react-redux'
import LoadingSpinner from './../../LoadingSpinner';
import {
  deleteCustomer,
  getCustomers,
  ResetSuccess
} from './../../../store/slices/customerSlice'
import { deleteCustomer as deleteCustomerThunk } from './../../../store/slices/customerSlice'
import { useTranslation } from "react-i18next";
import { usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { useRef } from "react";
import { Space } from "antd";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";
import { useTheme } from "next-themes";

const Customers = () => {
    const { theme } = useTheme();
  const { customers, filtered_customers, isLoading, deleteLoading, success, api_errors} = useSelector(state => state.customer)
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { pageSize, SelectPageSize } = usePageSize(5)
  const { getColumnSearchProps } = useSafqaTableSearch()
  const tableRef = useRef()

  const columns = [
    {
      title: t("dashboard.customer_name"),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: t("dashboard.customer_mobile"),
      dataIndex: 'phone_number',
      key: 'category',
      render: (_, customer) => customer.country.code + " " + customer.phone_number
    },
    {
      title: t("dashboard.email"),
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')

    },
    {
      title: t("dashboard.customer_reference"),
      dataIndex: 'customer_reference',
      key: 'customer_reference',
    },
    {
      title: t("dashboard.actions"),
      dataIndex: '',
      key: 'x',
      render: (_, customer) =>
        <Space>
          <BtnShow href={`../../dashboard/customers/${customer.id}`} />
          <BtnEdit href={`/dashboard/customers/update/${customer.id}`} />
          <BtnNewDelete
            title={customer.name_en}
            item={customer}
            handleDelete={deleteCustomer}
            isLoading={deleteLoading}
            success={success}
            error={api_errors}
            resetSuccess={ResetSuccess}
            getItems={getCustomers}
          />
        </Space>
    },
  ]

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar"  ? "rtl" : "ltr"}>
      <div className={`rounded-2 ${language == "en" && "me-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <MagicLinkIcon
          url="/dashboard/customers/create"
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

        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={getCustomers}
            data={filtered_customers}
            columns={columns}
            tableRef={tableRef}
            filename="customers"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_customers}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
          />
        </div>

      </div>
    </div>
  );
};


export default Customers;
