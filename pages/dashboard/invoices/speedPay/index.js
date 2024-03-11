// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../../styles/Dashboard/dashboard.module.css";
import appStyles from "../../../../styles/home/OurAPP.module.css";
import NavInvoices from "../../../../comps/Dashboard/Invoices/NavInvoices";
import SearchInvoices from "../../../../comps/Dashboard/Invoices/SearchInvoices";
import Invoices from "../../../../comps/Dashboard/Invoices/Invoices";
import { useDispatch } from "react-redux";
import { getInvoices } from "../../../../store/slices/invoiceSlice";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import {
  BtnTables,
  GetItInAS,
  GetItInGP,
  MagicLinkIcon,
} from "../../../../comps/Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import OurAPP from "../../../../comps/OurAPP";

export default function SpeedPayPage() {
  const SpeedPayComp = () => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
      <div
        className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`}
        dir={language == "ar" ? "rtl" : "ltr"}
      >
        <div
          className={`rounded-2 ${language == "en" && "me-4"} ${
            theme == "dark" ? styles.info_dark : styles.info
          }`}
        >
          {language == "en" ? (
            <h2 className="mt-5 mx-2 fs-5">
              This service is just available in mobile application
            </h2>
          ) : (
            <h2 className="mt-5 mx-2 fs-5">
              هذه الخدمة متوفرة فقط في تطبيق الهاتف المحمول
            </h2>
          )}

          {/* our APP */}
          <OurAPP />
        </div>
      </div>
    );
  };

  // const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(getInvoices());
  // }, [dispatch])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav invoices buttons */}
        <NavInvoices />

        {/* Invoices */}
        <SpeedPayComp />
      </div>
    </div>
  );
}
