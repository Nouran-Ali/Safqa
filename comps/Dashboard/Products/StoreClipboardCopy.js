import { useState } from "react";
import styles from "../../../styles/Dashboard/Tables.module.css";
import { useTranslation } from "react-i18next";

export default function StoreClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  
  return (
    <>
      {/* <a
        className={` shadow-none border-0 text-decoration-underline ${styles.link}`}
      >{copyText}</a> */}
      <button
        type="button"
        className={`btn ms-3 ${language == "ar" && "me-3"} p-1 px-4 rounded-4 ${styles.copyLinkMyStore}`}
        onClick={handleCopyClick}
      >
        <span>{isCopied ? i18n.language =="ar" ? "! نسخ" :  "Copied!" : i18n.language =="ar" ? "انسخ الرابط" : "Copy Link"}</span>
      </button>
    </>
  );
}
