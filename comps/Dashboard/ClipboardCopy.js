import { useState } from "react";
import styles from "../../styles/Dashboard/Tables.module.css";

export default function ClipboardCopy({ copyText }) {
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

  return (
    <div className="modal-body d-flex justify-content-between p-4">
      <input
        type="text"
        value={copyText}
        readOnly
        className={` form-control shadow-none w-75 ${styles.inp}`}
      />
      <button
        type="button"
        className={`btn ms-3 w-25 ${styles.copy}`}
        onClick={handleCopyClick}
      >
        <span>{isCopied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}
