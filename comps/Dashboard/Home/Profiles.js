import styles from "../../../styles/Dashboard/RecentInvoices.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { getFullDateFromISO } from "../../../lib/dates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';


const Profiles = () => {
  const { profiles } = useSelector(state => state.profile)
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  return (
    <>
      {profiles?.length == 0 ?
        <p className={theme == "dark" ? "text-grey" : "black"}>There no profiles yet.</p> :
        profiles?.slice(0, 4).reverse().map(({ company_name, work_email, is_approval, account_number, country, phone_number }, index) => (
          <div key={index} className={`w-100 p-2 px-3 mb-3 ${theme == 'dark' ? "dark-box" : ""} ${styles.Invoice}`} dir={language == "ar" ? "rtl" : "ltr"}>
            <div className="d-flex justify-content-between">
              <p className="fw-bold">{company_name}</p>
              <p>{country?.code} {phone_number}</p>
              
            </div>
            <div className="d-flex justify-content-between">
              <p className={`${is_approval ? "safqa-text-success" : "safqa-text-danger"}`}>
                {is_approval ?
                  <CheckCircleIcon className="safqa-text-success" /> :
                  <CancelIcon className="safqa-text-danger" />
                }
              </p>
              <p >{work_email}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Profiles;
