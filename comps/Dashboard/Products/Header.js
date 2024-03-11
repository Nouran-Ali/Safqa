import Link from "next/link";
import styles from "../../../styles/Dashboard/products/Header.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Header = () => {
  const { profile, description } = useSelector(state => state.cart)
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={styles.header} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`container p-5 ${language == "ar" ? " px-4" : ""}`}>
        <h5 className="fw-bold">{language == "en" ? "About" : "عن"} {profile.company_name}</h5>
        <hr className={language == "ar" ? styles.hr_AR : ""} />
        <p className="mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Header;
