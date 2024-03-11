import styles from "../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";

const SectionGradient = (props) => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`${styles.balance} rounded-2 py-2 mb-4 text-center ${language == "ar" && "me-4"}`}  dir={language=="ar" ? "rtl" : "ltr"}>
      <span>{props.text}</span>
    </div>
  );
};

export default SectionGradient;