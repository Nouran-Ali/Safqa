import Link from "next/link";
import styles from "../../../styles/Dashboard/Show.module.css";
import { BtnShow, BtnShowImg } from "../../Buttons";
import { BtnDownload } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminShow = ({ admin }) => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();


  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.admin_info")}</h5>
        <hr />


        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.name")}</p>
            <p className={styles.data}>{admin.name}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.email")}</p>
            <p className={styles.data}>{admin.email}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.phone")}</p>
            <p className={styles.data}>{admin.phone}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.is_super_admin")}</p>
            <p className={styles.data}>{admin.is_super_admin ? <CheckCircleOutlined className="text-success fs-5" /> : <CloseCircleOutlined className="text-danger fs-5" />}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminShow;
