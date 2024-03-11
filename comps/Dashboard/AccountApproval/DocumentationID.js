import styles from "../../../styles/Dashboard/DocumentsProfile.module.css";
import { BtnDelete, BtnDownload, BtnNewDelete, BtnShow } from "../../Buttons";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";


const Document = ({ label, file, setFile }) => {
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const [valueNow, setValueNow] = useState(25);

  const handleChange = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setValueNow(50);
    }, 1000);

    setTimeout(() => {
      setValueNow(100);
    }, 1000);

    setTimeout(() => {
      // setValueNow(100)
      setFile(e.target.value);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="row ms-3 mt-4">
      <label
        htmlFor={label}
        className={`col-3 rounded-2 d-flex align-items-center justify-content-center me-4 
        ${theme == 'dark' ? styles.plus_dark : styles.plus} ${file ? theme == 'dark' ? styles.fileLabel_dark : styles.fileLabel : ''}`}
      >
        {file ? (
          <InsertDriveFileIcon fontSize="large" className={styles.fileDone} />
        ) : (
          <AddIcon fontSize="large" />
        )}
      </label>
      <div className="col mt-2 me-5 d-flex flex-column">
        <span className={`${theme == 'dark' ? 'text-grey' : 'text-dark'} fs-5`}>{label}</span>
        <p className={`form-control border-0 shadow-none p-0 ${theme == 'dark' ? styles.inpfile_dark : styles.inpfile} ${isLoading && "d-none"
          }`}>
          {file ? file : 'No file chosen'}
        </p>
        <input
          hidden
          className={`form-control border-0 shadow-none p-0 ${styles.inpfile} ${isLoading && "d-none"
            }`}
          type="file"
          id={label}
          value={file}
          onChange={handleChange}
        ></input>
        {isLoading && (
          <div className="progress" style={{ width: "150px" }}>
            <div
              className={`progress-bar w-${valueNow}`}
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        )}
      </div>
      {file && (

        <div className="col d-flex align-items-center">

          <div className={`me-2 ${styles.see}`}>
            <BtnShow href="#" />
          </div>

          <div className={`me-2`}>
            <BtnDelete />
          </div>
        </div>
      )}
    </div>
  );
};


const DocumentationID = () => {
  const { theme } = useTheme();
  const [civilId, setCivilId] = useState(null);
  const [civilIdBack, setCivilIdBack] = useState(null);
  const [other, setOther] = useState(null);
  const [bankAccountLetter, setBankAccountLetter] = useState(null);
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div
      className={` 
      ${theme == 'dark' ? styles.DocumentsProfile_dark : styles.DocumentsProfile} 
      ${language == "ar" ? "me-4" : "w-75"}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <Document
        label="Upload your ID from the front"
        file={civilId}
        setFile={setCivilId}
      />
      <Document
        label="Upload your ID from the back"
        file={civilIdBack}
        setFile={setCivilIdBack}
      />
      <Document
        label="Upload your ID from the front with your face"
        file={bankAccountLetter}
        setFile={setBankAccountLetter}
      />
    </div>
  );
};

export default DocumentationID;
