import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  MagicLinkIcon,
  BtnTables,
  BtnShow,
  BtnEdit,
  BtnDelete,
  BtnNewDelete,
} from "../../Buttons";
import { useTranslation } from "react-i18next";
import SafqaTable from "../../common/SafqaTable";
import { usePageSize } from "../Inputs";
import { useRef } from "react";
import { Space } from "antd";
import { deleteAddress, getAddresses, ResetSuccess } from "../../../store/slices/addressSlice";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const AddressesTable = () => {
  const { theme } = useTheme();
  const { addresses, isLoading, deleteLoading, filtered_addresses } = useSelector(state => state.address)

  const { pageSize, SelectPageSize } = usePageSize(5)
  const tableRef = useRef()

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const columns = [
    {
      title: t("dashboard.address_type"),
      dataIndex: language == 'en' ? ['address_type', 'name_en'] : ['address_type', 'name_ar'],
      key: ['address_type', 'name_en'],
    },
    {
      title: t("dashboard.city"),
      dataIndex: language == 'en' ? ['city', 'name_en'] : ['city', 'name_ar'],
      key: ['city', 'name_en'],
    },
    {
      title: t("dashboard.area"),
      dataIndex: language == 'en' ? ['area', 'name_en'] : ['area', 'name_ar'],
      key: ['area', 'name_en'],
    },
    {
      title: t("dashboard.block"),
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: t("dashboard.actions"),
      dataIndex: '',
      key: 'x',
      render: (_, address) =>
        <Space>
          <BtnShow href={`/dashboard/setting/addresses/${address.id}`} />
          <BtnEdit href={`/dashboard/setting/addresses/update/${address.id}`} />
          <BtnNewDelete
            title={language == "en" ? `${address.city.name_en} address` : `عنوان ${address.city.name_ar}`}
            item={address}
            handleDelete={deleteAddress}
            isLoading={deleteLoading}
          />
        </Space>
    },
  ]

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-4 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 ${language == "en" && "me-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <MagicLinkIcon
          url="/dashboard/setting/addresses/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={t("dashboard.create_new")}
        />
        <br />

        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={getAddresses}
            data={addresses}
            columns={columns}
            tableRef={tableRef}
            filename="addresses"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={addresses}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
          />
        </div>

      </div>
    </div>
  );
};

export default AddressesTable;
