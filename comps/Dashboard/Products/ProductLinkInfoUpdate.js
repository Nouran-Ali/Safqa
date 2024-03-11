import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  MagicInput,
  MagicTextArea,
  MagicRadioInput,
  MagicSelectInput,
  MagicFileInput,
  SafqaSelect,
  SafqaInput,
  SafqaTextArea,
  SafqaFileInput,
  SafqaRadioInput,
  usePageSize,
  SafqaSelectCommissionType,
} from "../Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema } from "../../../lib/validations/en/productSchema";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import SafqaTable from "../../common/SafqaTable";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, Space, Table, Tag } from "antd";
import { createProductLinkSchema } from "../../../lib/validations/en/productLinkSchema";
import { ResetSuccess, updateProductLink } from "../../../store/slices/productLinkSlice";
import useRowSelection from "../../../hooks/SafqaTableRowSelection";
import { useRef } from "react";
import useSafqaTableSearch from "../../../hooks/SafqaTableSearch";
import { MagicBtn } from "../../Buttons";
import { useRouter } from "next/router";
import { createProductLinkSchemaAr } from "../../../lib/validations/ar/productLinkSchemaAr";

const ProductLinkInfoUpdate = ({ product_link }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  const router = useRouter();

  const { success, api_errors, isLoading } = useSelector((state) => state.productLink);
  const productState = useSelector((state) => state.product);


  const defaultValues = product_link

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createProductLinkSchema : createProductLinkSchemaAr),
    defaultValues: defaultValues
  });

  const tableRef = useRef();

  const { getColumnSearchProps } = useSafqaTableSearch()

  const { rowSelection, selectedRowKeys, selectedRows, setSelectedRowKeys, setSelectedRows } = useRowSelection({
    type: 'checkbox',
    getCheckboxProps: (record) => ({
      disabled: record.is_active === 0,
      name: record.name_en
    }),
    selections: [
      Table.SELECTION_NONE,
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
    ]
  })

  const columns = [
    {
      title: t("dashboard.product_name"),
      dataIndex: language == 'en' ? 'name_en' : 'name_ar',
      key: language == 'en' ? 'name_en' : 'name_ar',
      ...getColumnSearchProps(language == 'en' ? 'name_en' : 'name_ar',)
    },
    {
      title: t("dashboard.product_category"),
      dataIndex: language == 'en' ? ["category", "name_en"] : ["category", "name_ar"],
      key: language == 'en' ? ["category", "name_en"] : ["category", "name_ar"],
      ...getColumnSearchProps(language == 'en' ? ["category", "name_en"] : ["category", "name_ar"])

    },
    {
      title: t("dashboard.price"),
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps('price')
    },
    {
      title: t("dashboard.remaining_quantity"),
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,

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
  ]


  useEffect(() => {
    let rows = []
    let rowsKeys = []
    if (product_link) {
      product_link.products?.map(p => {
        rows.push(p)
        rowsKeys.push(p.id)
      })
      setSelectedRows(rows)
      setSelectedRowKeys(rowsKeys)
    }
  }, [product_link, setSelectedRowKeys, setSelectedRows])

  useEffect(() => {
    setValue("products", selectedRowKeys)
  }, [selectedRowKeys, setValue])


  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/products/urls")
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    dispatch(updateProductLink(data));
  };

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`rounded-2  ${language == 'ar' && 'me-5 ms-4'} ${
          theme == 'dark' ? styles.info_dark : styles.info
        }`}
      >
        <p className="px-4 fs-5">{t('dashboard.product_link_info')}</p>
        <hr />

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t('dashboard.name_En')}
              name="name_en"
              type="text"
              register={register}
              error={errors.name_en?.message || api_errors?.name_en}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              name="name_ar"
              register={register}
              label={t('dashboard.name_Ar')}
              required
              error={errors.name_ar?.message || api_errors?.name_ar}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaRadioInput
              label={t('dashboard.is_active')}
              items={[
                { id: 1, name: t('dashboard.yes') },
                { id: 0, name: t('dashboard.no') },
              ]}
              name="is_active"
              register={register}
              defaultValue={product_link?.is_active}
              error={errors?.is_active?.message}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelectCommissionType
              select_label
              required
              register={register}
              error={
                errors.commission_type?.message || api_errors?.commission_type
              }
            />
          </div>
        </div>

        <div className="row ">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaTextArea
              className="bg-grey"
              label={t('dashboard.terms_conditions')}
              name="Terms_and_conditions"
              register={register}
              error={
                errors.Terms_and_conditions?.message ||
                api_errors?.Terms_and_conditions
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
            <p
              className={
                theme == 'dark'
                  ? 'text-white'
                  : 'safqa-text-secondary2-dashboard'
              }
            >
              {selectedRowKeys?.length
                ? t('dashboard.products')
                : t('dashboard.no_products')}
              <Badge
                className="site-badge-count-109 mx-2"
                count={selectedRowKeys?.length}
              />
            </p>
            <Space size={[0, 6]} wrap>
              {selectedRows?.map((product) => (
                <Tag key={product.id} className="fs-6 rounded">
                  {language == 'en' ? product.name_en : product.name_ar}
                </Tag>
              ))}
            </Space>
          </div>
        </div>

        <div className="row ">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4">
            <div className="w-100 mt-2" ref={tableRef}>
              <SafqaTable
                dataSource={productState.products}
                pageSize={5}
                columns={columns}
                loading={productState.isLoading}
                rowSelection={rowSelection}
              />
            </div>
          </div>
        </div>
      </div>

      <MagicBtn label="Save" isLoading={isLoading} />
    </form>
  );
};

export default ProductLinkInfoUpdate;
