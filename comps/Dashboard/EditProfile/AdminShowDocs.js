import Link from "next/link";
import styles from "../../../styles/Dashboard/DocumentsProfile.module.css";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useEffect, useState } from "react";
import { BtnDelete, BtnDownload, BtnNewDelete, BtnShow, BtnShowImg, MagicBtn } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createDocument, ResetSuccess } from "../../../store/slices/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import { createDocumentSchema } from "../../../lib/validations/en/documentSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { createDocumentSchemaAr } from "../../../lib/validations/ar/documentSchemaAr";


const AddDocument = ({
  label,
  name,
  error,
  inputs,
  setValue,
}) => {
  const { theme } = useTheme();
  const [file, setFile] = useState("");

  const { documentInfo, documents, urlFile, isLoading, api_errors, success } = useSelector(
    (state) => state.document
  );

  const onChangeFile = (e) => {
    // console.log(e.target.files[0])
    // console.log(e.target.value)
    setFile(e.target.files[0]?.name)
    setValue(name, e.target.files)
  }

  return (
    <div className="row ms-3 mt-4">
      <label
        // htmlFor={label}
        className={`col-3 rounded-2 d-flex align-items-center justify-content-center me-4 
        ${theme == 'dark' ? styles.plus_dark : styles.plus} ${inputs[name] ? theme == 'dark' ? styles.fileLabel_dark : styles.fileLabel : ''}`}
      >
        {documents?.[name] ? (
          <InsertDriveFileIcon fontSize="large" className={styles.fileDone} />
        ) : (
            <SimCardAlertIcon fontSize="large" />
        )}
      </label>

      <div className="col mt-2 me-5 d-flex flex-column">
        <span
          className={`${theme == 'dark' ? 'text-grey' : 'text-dark'} fs-5`}
        >{label}</span>

        <p
          className={`form-control border-0 shadow-none p-0 ${theme == 'dark' ? styles.inpfile_dark : styles.inpfile}`}
        >{documents?.[name] ? "" : 'No file uploaded'}
        </p>

        {/* <input
          hidden
          disabled
          type="file"
          id={label}
          onChange={onChangeFile}
        ></input> */}

      </div>

      {documents?.[name] && (
        <div className="col-2 d-flex align-items-center">
            <BtnShowImg src={`${urlFile}/${documents[name]}`} />
            <BtnDownload url={`${urlFile}/${documents[name]}`} name={name}/>

          {/* <div className={`me-2`}>
            <BtnDelete />
          </div> */}
        </div>
      )}
      {error && <span className="text-danger fs-6">{error}</span>}
    </div>
  );
};

const AdminShowDocs = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { documentInfo, documents, isLoading, api_errors, success } = useSelector(
    (state) => state.document
  );

  const defaultValues = documentInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createDocumentSchema : createDocumentSchemaAr),
    defaultValues,
  });

  const inputs = watch();

  useEffect(() => {
    success && dispatch(ResetSuccess()) && reset()
  }, [dispatch, reset, success]);

  useEffect(() => {
    const name = 'civil_id'
    console.log(inputs)
    console.log(inputs[name]?.[0])
  }, [inputs])


  return (
    <div
      className={` 
      ${theme == 'dark' ? styles.DocumentsProfile_dark : styles.DocumentsProfile} 
      ${language == "ar" ? "me-4" : "w-75"}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <AddDocument
          label={t("dashboard.civil_id")}
          name="civil_id"
          error={errors.civil_id?.message || api_errors?.civil_id}
          setValue={setValue}
          inputs={inputs}
        />
        <AddDocument
          label={t("dashboard.civil_id_back")}
          name="civil_id_back"
          error={errors.civil_id_back?.message || api_errors?.civil_id_back}
          setValue={setValue}
          inputs={inputs}
        />
        <AddDocument
          label={t("dashboard.bank_account_letter")}
          name="bank_account_letter"
          error={errors.bank_account_letter?.message || api_errors?.bank_account_letter}
          setValue={setValue}
          inputs={inputs}
        />
        <AddDocument
          label={t("dashboard.other")}
          name="other"
          error={errors.other?.message || api_errors?.other}
          setValue={setValue}
          inputs={inputs}
        />
        {/* <MagicBtn label={t("dashboard.save")} isLoading={isLoading} /> */}
      {/* </form> */}
    </div>
  );
};

export default AdminShowDocs;
