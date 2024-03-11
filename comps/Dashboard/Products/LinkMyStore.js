import ClipboardCopy from "./ClipboardCopy";
import styles from "../../../styles/Dashboard/products/LinkMyStore.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import StoreClipboardCopy from "./StoreClipboardCopy";

const LinkMyStore = ({id}) => {

  const { theme } = useTheme()
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { myData } = useSelector(state => state.auth)

  // return (
  //   <div className={` ${styles.LinkMyStore} ${language == "ar" && "me-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
  //     <div className={` ${styles.link}`}>
  //       <div className="row d-flex align-items-center">
  //         <span className={`col-xl-2 col-lg-2 col-md-12 col-sm-12 fs-6 ${theme == 'dark' ? 'text-white' : 'text-grey'}`}>{t("dashboard.your_store_link")}</span>
  //         <span className="text-break">
  //           <ClipboardCopy copyText={`https://safqapay.com/store/${myData?.profile_business?.id}`} />
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <span className="text-break">
      <StoreClipboardCopy copyText={`https://safqapay.com/store/${id}`} />
    </span>
  )
};

export default LinkMyStore;
