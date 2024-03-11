import { useState } from "react";
import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MagicLinkIcon } from "../../Buttons";
import { BtnEdit } from "../../Buttons";
import { BtnDelete, BtnNewDelete } from "../../Buttons";
import ClipboardCopy from "../ClipboardCopy";
import { BtnTables } from "../../Buttons";
import { usePageSize } from "../Inputs";
import {
  deleteCategory as deleteCategoryThunk,
  ResetSuccess,
} from "../../../store/slices/categorySlice";
import { getCategories as getCategoriesThunk } from "../../../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import LoadingSpinner from '../../LoadingSpinner'
import { useTranslation } from "react-i18next";
import { Select, Space, Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import SafqaTable from "../../common/SafqaTable";
import { useRef } from "react";
import { useTheme } from "next-themes";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";

const Categories = () => {
  const dispatch = useDispatch()
  const { theme } = useTheme();
  const { categories, filtered_categories, isLoading, deleteLoading, success, api_errors } = useSelector((state) => state.category);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const tableRef = useRef()
  const { SelectPageSize, pageSize } = usePageSize(5);
  const { getColumnSearchProps } = useSafqaTableSearch()


  const columns = [
    {
      title: t("dashboard.name_En"),
      dataIndex: 'name_en',
      key: 'name_en',
      ...getColumnSearchProps('name_en')
      // render: text => <a>{text}</a>,
    },
    {
      title: t("dashboard.name_Ar"),
      dataIndex: 'name_ar',
      key: 'name_ar',
      ...getColumnSearchProps('name_ar')

    },
    {
      title: t("dashboard.is_active"),
      dataIndex: 'is_active',
      key: 'id',
      render: (_, category) => category.is_active ?
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
      onFilter: (value, category) => category.is_active === value,
    },
    {
      title: t("dashboard.actions"),
      dataIndex: '',
      key: 'x',
      render: (_, category) =>
        <Space >
          <BtnEdit href={`/dashboard/products/category/update/${category.id}`} />
          <BtnNewDelete
            title={category.name_en}
            item={category}
            handleDelete={deleteCategoryThunk}
            isLoading={deleteLoading}
            success={success}
            error={api_errors}
            resetSuccess={ResetSuccess}
          />
        </Space>
    },
  ]


  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 ${language == "en" && "me-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <MagicLinkIcon
          url="/dashboard/products/category/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={t("dashboard.create_new_category")}
        />

        <br />

        <div className="safqa-scroll-x d-flex">
          <BtnTables
            columns={columns}
            getItems={getCategoriesThunk}
            filename="categories"
            data={filtered_categories}
            isLoading={isLoading}
            tableRef={tableRef}
          />

          {/* select page size */}
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_categories}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default Categories;
