import Link from "next/link";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";

const NavSmallSite = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="border-bottom d-flex justify-content-between px-5" dir={language == "ar"  ? "rtl" : "ltr"}>
      <div>
        <Link href="#" className="nav-link d-flex align-items-center mt-4">

          <img src="/dashboard/logoCompany.png" width="60px" />
          <p className={`mt-3 ${language == "en" ? "ms-2" : "me-2"} fs-5 text-dark`}>Tm L.L.C</p>

        </Link>
      </div>
      <div className="text-dark mt-3">
        <div className="d-flex">
          <PhoneIcon sx={{width:"20px"}}/>
          <p className={language == "en" ? "ms-2" : "me-2"}>581823530</p>
        </div>
        <div className="d-flex">
          <EmailIcon sx={{width:"20px"}}/>
          <p className={language == "en" ? "ms-2" : "me-2"}>info@tm-ae.com</p>
        </div>
        <div className="d-flex">
          <AttachFileIcon sx={{width:"20px"}}/>
          <p className={language == "en" ? "ms-2" : "me-2"}>tm-ae.com</p>
        </div>
      </div>
    </div>
  );
};

export default NavSmallSite;
