import Link from "next/link";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styles from "../../../styles/Dashboard/products/SmallNavbarSiteAllProducts.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SmallNavbarSiteAllProducts = ({ profile }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`p-3 ${language == "en" ? styles.smallNavbar : styles.smallNavbarAR}`} >
      <div className="container">
        <div className={`text-white d-flex ${language == 'en' ? "justify-content-start" : "justify-content-end"}`}>
          <div className={`d-flex ${language == 'en' ? "" : "flex-row-reverse"} ${styles.contact} `}>
            <PhoneIcon sx={{ width: "20px" }} />
            <p className={'mx-3 my-0'}>{profile?.phone_number}</p>
          </div>
          <div className={`d-flex ${language == 'en' ? "" : "flex-row-reverse"} ${styles.contact}`}>
            <EmailIcon sx={{ width: "20px" }} />
            <p className={"mx-3 my-0"}>{profile?.work_email}</p>
          </div>
          {
            profile?.website_url &&
            <div className={`d-flex ${language == 'en' ? "" : "flex-row-reverse"}  ${styles.contact}`}>
              <AttachFileIcon sx={{ width: "20px" }} />
              <p className={"mx-3 my-0"}>{profile?.website_url}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SmallNavbarSiteAllProducts;
