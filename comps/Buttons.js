import LoadingSpinner from "./LoadingSpinner";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import styles from "../styles/Buttons.module.css";
import BlockIcon from "@mui/icons-material/Block";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { Excel } from "antd-table-saveas-excel";
import { useReactToPrint } from "react-to-print";
import getNowDate from "../lib/getNowDate";
import { Button, Image, Modal } from "antd";
import { saveAs } from "file-saver";
import { useTheme } from "next-themes";
import { SafqaInput, SafqaRadioInput, SafqaTextArea } from "./Dashboard/Inputs";
import {
  addToWalletSchema,
  createDepositSchema,
} from "../lib/validations/en/depositSchema";
import {
  addToWallet,
  createDeposit,
  updateRequestMoney,
} from "../store/slices/depositSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { createDepositSchemaAr } from "../lib/validations/ar/depositSchemaAr";

export const GetItInGP = ({
  label,
  className,
  href = 'https://play.google.com/store/apps/details?id=com.DROPIDEA.Safqa',
}) => {
  return (
    <div className={`me-4 ${styles.container}`}>
      <div className={className}>
        <a href={href}>
          <div className="d-flex align-items-center">
            <img
              src="/home/main/google-play.png"
              alt="apple"
              width="25%"
              // layout="fixed"
              className="float-start me-3"
            />
            <div>
              {label}
              <br />
              <span className="fw-bold">Google Play</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export const GetItInAS = ({ label, className, href }) => {
  return (
    <div className={styles.container}>
      <div className={className}>
        <a href={href}>
          <div className="d-flex align-items-center">
            <img
              src="/home/main/apple.png"
              alt="apple"
              width="25%"
              className="float-start me-3"
            />
            <div>
              {label}
              <br />
              <span className="fw-bold">App Store</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export const BtnJoin = ({ label, className, href }) => {
  return (
    <div className={styles.container}>
      <div className={className}>
        <Link href="/join">
          <div>{label}</div>
        </Link>
      </div>
    </div>
  );
};

export const MagicBtn = ({ isLoading, label, disabled, text_center_none }) => {
  return (
    <div className={`${text_center_none ? "" : "text-center"} mt-3 mb-5`}>
      <button
        className={`${
          (isLoading || disabled) && "opacity-50"
        }  rounded-2 border-0 ${styles.magicBtn}`}
        type="submit"
        disabled={isLoading || disabled}
      >
        {isLoading && <LoadingSpinner />}
        {label}
      </button>
    </div>
  );
};

export const MagicBtnProps = ({ isLoading, label, disabled, ...props }) => {
  return (
    <div className={`text-center mt-3 mb-5`}>
      <button
        className={`${
          (isLoading || disabled) && "opacity-50"
        }  rounded-2 border-0 ${styles.magicBtn}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {label}
      </button>
    </div>
  );
};

export const MagicBtnCreateLink = ({ isLoading, label, disabled }) => {
  return (
    <div className={`text-center mt-3`}>
      <button
        className={`${
          (isLoading || disabled) && "opacity-50"
        }  rounded-2 border-0 ${styles.magicBtn}`}
        type="submit"
        disabled={isLoading || disabled}
      >
        {isLoading && <LoadingSpinner />}
        {label}
      </button>
    </div>
  );
};

export const MagicLinkIcon = ({ url, icon, name, style }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <Link
        href={url}
        className={`btn px-2 mt-2 ${
          language == "ar" ? "me-1" : "me-3"
        } ${style}`}
      >
        {icon}
        <span className="mx-1 align-middle text-white">{name}</span>
      </Link>
    </>
  );
};

export const MagicLinkDisIconInMobile = ({ url, icon, name, style }) => {
  return (
    <>
      <Link href={url} className={`btn me-3 px-3 mt-2 ${style}`}>
        {icon}
        <span className="ms-3 align-middle text-white safqa-dn">{name}</span>
      </Link>
    </>
  );
};

export const MagicBtnIcon = ({
  isLoading,
  type,
  icon,
  label,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn mb-3 me-3 px-3 ${className}`}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon}
          <span className="ms-2 align-middle">{label}</span>
        </>
      )}
    </button>
  );
};

export const BtnShow = ({ ...props }) => {
  return (
    <>
      <div className={styles.see}>
        <Link
          {...props}
          className="rounded-circle"
          data-bs-toggle="tooltip"
          data-bs-title="Show"
        >
          <RemoveRedEyeIcon sx={{ width: "15px" }} />
        </Link>
      </div>
    </>
  );
};

export const BtnShowImg = ({ src }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.showImg}
        onClick={() => setVisible(true)}
      >
        <RemoveRedEyeIcon sx={{ width: "15px" }} />
      </button>
      <Image
        width={200}
        style={{
          display: "none",
        }}
        src={src}
        preview={{
          visible,
          scaleStep: 1,
          src: src,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export const BtnRefund = ({ url }) => {
  return (
    <>
      <div className={styles.refund}>
        <Link href={url} className="rounded-circle">
          <RefreshIcon sx={{ width: "15px" }} />
        </Link>
      </div>
    </>
  );
};

export const BtnAdminRefund = ({ refund, handleRefund, isLoading }) => {
  const { theme } = useTheme();
  const [modal1Open, setModal1Open] = useState(false);

  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div className={styles.refund}>
        <Link
          href="#"
          className="rounded-circle"
          onClick={() => setModal1Open(true)}
        >
          <RefreshIcon sx={{ width: "15px" }} />
        </Link>
      </div>

      <Modal
        className={theme == "dark" ? "dark-refund-modal" : "refund-modal"}
        title={language == "en" ? "Confirm Refund?" : "تأكيد الاسترداد؟"}
        style={{
          top: 20,
        }}
        open={modal1Open}
        confirmLoading={isLoading}
        okText="Confirm"
        onOk={() => dispatch(handleRefund(refund.id))}
        onCancel={() => setModal1Open(false)}
      >
        <div className={` ${language == "ar" ? "text-end" : "text-start"} `}>
          {language == "en" ? (
            <p>
              Are you sure you want to refund
              <span className="fw-bold mx-1">{refund.amount}</span>
              to
              <span className="fw-bold mx-1">
                {refund.invoice.customer_name}
              </span>
            </p>
          ) : (
            <p>
              هل انت متأكد من استرداد
              <span className="fw-bold mx-1">{refund.amount}</span>
              إلى
              <span className="fw-bold mx-1">
                {refund.invoice.customer_name}
              </span>
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export const BtnAdminDeposit = ({ deposit, handleDeposit, isLoading }) => {
  const { theme } = useTheme();
  const [modal1Open, setModal1Open] = useState(false);

  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div className={styles.refund}>
        <Link
          href="#"
          className="rounded-circle"
          onClick={() => setModal1Open(true)}
        >
          <RefreshIcon sx={{ width: "15px" }} />
        </Link>
      </div>

      <Modal
        className={theme == "dark" ? "dark-refund-modal" : "refund-modal"}
        title={language == "en" ? "Confirm Deposit?" : "تأكيد الإيداع؟"}
        style={{
          top: 20,
        }}
        open={modal1Open}
        confirmLoading={isLoading}
        okText="Confirm"
        onOk={() => dispatch(handleDeposit(deposit.id))}
        onCancel={() => setModal1Open(false)}
      >
        <div className={` ${language == "ar" ? "text-end" : "text-start"} `}>
          {language == "en" ? (
            <p>
              Are you sure you want to send
              <span className="fw-bold mx-1">{deposit?.amount}</span>
              to
              <span className="fw-bold mx-1">
                {deposit?.profile_information?.company_name}
              </span>
            </p>
          ) : (
            <p>
              هل انت متأكد من استرداد
              <span className="fw-bold mx-1">{deposit?.amount}</span>
              إلى
              <span className="fw-bold mx-1">
                {deposit?.profile_information?.company_name}
              </span>
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export const BtnEdit = ({ ...props }) => {
  return (
    <div className={styles.edit}>
      <Link {...props} className="rounded-circle">
        <ModeEditOutlineIcon sx={{ width: "15px" }} />
      </Link>
    </div>
  );
};

export const BtnDelete = () => {
  return (
    <>
      <div className={styles.delete}>
        <Link
          href="#"
          className="rounded-circle"
          data-bs-toggle="modal"
          data-bs-target={`#delete}`}
        >
          <DeleteIcon sx={{ width: "15px" }} />
        </Link>
      </div>

      <div
        className="modal fade"
        id={`delete`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0 px-4">
            <div className="modal-body">
              <div className="text-start">
                <p className="text-dark fw-bold mb-0">Confirm Deletion?</p>
                <p>Are you sure you want to delete ?</p>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className={`btn p-1 px-4 ${styles.btnCancel}`}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn p-1 px-4 ms-3 ${styles.btnDelete}`}
                  // onClick={()=> dispatch(handleDelete(item.id))}
                  // disabled={isLoading}
                >
                  {/* {isLoading ? <LoadingSpinner /> : "Delete" } */}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const BtnNewDelete = ({ item, handleDelete, title, isLoading }) => {
  const { theme } = useTheme();
  const [modal1Open, setModal1Open] = useState(false);

  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div className={styles.delete}>
        <Link
          href="#"
          className="rounded-circle"
          onClick={() => setModal1Open(true)}
        >
          <DeleteIcon sx={{ width: "15px" }} />
        </Link>
      </div>

      <Modal
        className={theme == "dark" ? "dark-delete-modal" : "delete-modal"}
        title={language == "en" ? "Confirm Deletion?" : "تأكيد الحذف؟"}
        style={{
          top: 20,
        }}
        open={modal1Open}
        confirmLoading={isLoading}
        okText="Delete"
        onOk={() => dispatch(handleDelete(item.id))}
        onCancel={() => setModal1Open(false)}
      >
        <div className={` ${language == "ar" ? "text-end" : "text-start"} `}>
          {language == "en" ? (
            <p>
              Are you sure you want to delete{" "}
              <span className="fw-bold">{title}</span>?
            </p>
          ) : (
            <p>
              هل انت متأكد من حذف <span className="fw-bold">{title}</span>؟
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export const BtnBlock = ({ item, handleDelete, title, isLoading, icon }) => {
  const { theme } = useTheme();
  const [modal1Open, setModal1Open] = useState(false);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div className={icon ? styles.block : styles.delete}>
        <Link
          href="#"
          className="rounded-circle"
          onClick={() => setModal1Open(true)}
        >
          {icon ? icon : <DeleteIcon sx={{ width: "15px" }} />}
        </Link>
      </div>

      <Modal
        className={theme == "dark" ? "dark-delete-modal" : "delete-modal"}
        title={language == "en" ? "Confirm Cancel?" : "تأكيد الإلغاء؟"}
        style={{
          top: 20,
        }}
        open={modal1Open}
        confirmLoading={isLoading}
        okText={language == "en" ? "Confirm" : "تأكيد"}
        onOk={() => dispatch(handleDelete(item.id))}
        onCancel={() => setModal1Open(false)}
      >
        <div className={` ${language == "ar" ? "text-end" : "text-start"} `}>
          {language == "en" ? (
            <p>
              {" "}
              Are you sure you want to cancel withdraw{" "}
              <span className="fw-bold">{title}</span>?
            </p>
          ) : (
            <p>
              {" "}
              هل أنت متأكد أنك تريد إلغاء سحب{" "}
              <span className="fw-bold">{title}</span>؟
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export const MagicBtnBlue = ({ isLoading, label, disabled }) => {
  return (
    <div className="text-center mt-3 mb-4">
      <button
        className={`${
          (isLoading || disabled) && "opacity-50"
        }  rounded-2 border-0 ${styles.magicBtnBlue}`}
        type="submit"
        disabled={isLoading || disabled}
      >
        {isLoading && <LoadingSpinner />}
        {label}
      </button>
    </div>
  );
};

export const BtnDownload = ({ url, name }) => {
  const handleDownload = () => {
    saveAs(url, name);
  };
  return (
    <span className={`${styles.download}`}>
      <Link href="#" className="rounded-circle" onClick={handleDownload}>
        <FileDownloadIcon sx={{ width: "15px" }} />
      </Link>
    </span>
  );
};

export const BtnSearch = () => {
  const [t, i18n] = useTranslation();
  const { theme } = useTheme();

  return (
    <button
      type="submit"
      className={`btn border-0 px-5 p-1  ${
        theme == "dark" ? styles.btnSearch_dark : styles.btnSearch
      }`}
    >
      {t("dashboard.search")}
    </button>
  );
};

export const BtnReset = ({ onClick }) => {
  const [t, i18n] = useTranslation();
  const { theme } = useTheme();

  return (
    <button
      className={`btn border-0 px-5 p-1  ${
        theme == "dark" ? styles.btnReset_dark : styles.btnReset
      }`}
      onClick={onClick}
      type="button"
    >
      {t("dashboard.reset")}
    </button>
  );
};

export const BtnTables = ({ getItems, data, filename, columns, tableRef }) => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();

  const exportPDF = useReactToPrint({
    content: () => tableRef.current,
  });

  const exportCSV = () => {
    let headers = [];

    if (data?.length > 0) {
      for (let key in data[0]) {
        if (typeof data[0][key] == "object") {
          for (let k in data[0][key]) {
            if (data[0][key][k] !== "object") {
              headers.push({ label: `${key}_${k}`, key: `${key}.${k}` });
            }
          }
        } else {
          headers.push({ label: key, key });
        }
      }
    } else {
      headers.push({ label: `There is no available ${filename}` });
    }

    return {
      filename: `${filename}_${getNowDate()}.csv`,
      data: data || [],
      headers: headers,
    };
  };

  const exportXLSX = () => {
    let newColumns = [...columns];
    // remove actions and render from columns
    newColumns.map((column, index) => {
      if (column.key === "x") {
        return newColumns.splice(index, 1);
      } else {
        for (let key in column) {
          if (key == "render") {
            delete column.render;
          }
        }
      }
    });

    // init excel to download file
    const excel = new Excel();
    excel
      .addSheet(filename)
      .addColumns(newColumns)
      .addDataSource(data, {
        str2Percent: true,
      })
      .saveAs(`${filename}_sheet_${getNowDate()}.xlsx`);
  };

  return (
    <div className="d-inline-block " style={{ width: 350 }}>
      {/* <button
        type="button"
        className={`btn ${language == "en" ? "me-3" : "ms-3"} mt-3 ${styles.BtnTables}`}
      >
        {t("dashboard.print")}
      </button> */}

      <button
        type="button"
        className={`btn ${
          language == "en" ? "me-3" : "ms-3"
        } mt-3 text-nowrap ${
          theme == "dark" ? "btn-dark-box" : styles.BtnTables
        }`}
        onClick={exportPDF}
      >
        {t("dashboard.print")} / {t("dashboard.PDF")}
      </button>
      <button
        type="button"
        className={`btn text-nowrap ${
          language == "en" ? "me-3" : "ms-3"
        } mt-3 ${theme == "dark" ? "btn-dark-box" : styles.BtnTables}`}
        onClick={exportXLSX}
      >
        {t("dashboard.excel")}
      </button>
      <CSVLink
        {...exportCSV()}
        className={`btn ${language == "en" ? "me-3" : "ms-3"} mt-3 ${
          theme == "dark" ? "btn-dark-box" : styles.BtnTables
        }`}
      >
        {t("dashboard.CSV")}
      </CSVLink>
      <button
        type="button"
        className={`btn ${language == "en" ? "me-3" : "ms-3"} mt-3 ${
          theme == "dark" ? "btn-dark-box" : styles.BtnTables
        }`}
        onClick={() => getItems && dispatch(getItems())}
      >
        <RefreshIcon />
      </button>
    </div>
  );
};

export const SaveBtn = ({ isLoading }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="text-center mt-5 mb-5">
      <button href="#" className={`rounded-2 border-0 ${styles.SaveBtn}`}>
        {isLoading ? <LoadingSpinner /> : t("dashboard.save")}
      </button>
    </div>
  );
};
