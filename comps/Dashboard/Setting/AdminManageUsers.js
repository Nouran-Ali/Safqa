import styles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BtnNewDelete, MagicLinkIcon } from "../../Buttons";
import { BtnTables } from "../../Buttons";
import { BtnShow } from "../../Buttons";
import { BtnEdit } from "../../Buttons";
import { useTranslation } from "react-i18next";
import SafqaTable from "../../common/SafqaTable";
import { usePageSize } from "../Inputs";
import { useRef } from "react";
import { Space } from "antd";
import { useSelector } from "react-redux";
import { getManageUsers } from "../../../store/slices/manageUserSlice";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const AdminManageUsers = () => {
  const { theme } = useTheme();
  const { manage_users, filtered_manage_users, isLoading } = useSelector(state => state.manageUser)

  const { pageSize, SelectPageSize } = usePageSize(5)
  const tableRef = useRef()

  const router = useRouter();
  const { profile_id } = router.query;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const columns = [
    {
      title: t("dashboard.user_name"),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: t("dashboard.email"),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t("dashboard.phone_number"),
      dataIndex: 'phone_number_manager',
      key: 'phone_number_manager',
    },
    {
      title: t("dashboard.country"),
      dataIndex: language == 'en' ? ['nationality', 'name_en'] : ['nationality', 'name_ar'],
      key: ['nationality', 'name_en'],
    },
    {
      title: t("dashboard.actions"),
      dataIndex: '',
      key: 'x',
      render: (_, user) =>
        <Space>
          <BtnShow href={`/dashboard/admin/profile/${user.profile_business_id}/users/${user.id}`} />
          {/* <BtnEdit href={`/dashboard/admin/profile/${user.profile_business_id}/users/${user.id}/update`} /> */}
          {/* <BtnEdit href={`/dashboard/setting/manageUsers/update/${user.id}`} /> */}
          {/* <BtnNewDelete
            title={user.name_en}
            item={user}
          // handleDelete={deleteUser}
          // isLoading={deleteLoading}
          // success={success}
          // error={api_errors}
          // resetSuccess={ResetSuccess}
          // getItems={getUser}
          /> */}
        </Space>
    },
  ]

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <MagicLinkIcon
          url="/dashboard/setting/manageUsers/create"
          style={styles.bgBlue}
          icon={<AddIcon />}
          name={t("dashboard.create_new")}
        />
        <br />

        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
          <BtnTables
            getItems={()=>getManageUsers(profile_id)}
            data={filtered_manage_users}
            columns={columns}
            tableRef={tableRef}
            filename="addresses"
          />
          <SelectPageSize />
        </div>

        <div className="w-100 mt-2" ref={tableRef}>
          <SafqaTable
            dataSource={filtered_manage_users}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
          />
        </div>


      </div>
    </div>
  );
};

export default AdminManageUsers;
