import { useState } from "react";
import styles from "../../styles/Dashboard/Tables.module.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { Button } from "antd";

export default function CopyToClipboard({ copyText, title }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Button
        type="primary rounded copy-to-clipboard"
        className="mb-3 "
        icon={isCopied ? <DoneIcon /> : <ContentCopyIcon />}
        onClick={handleCopyClick}
      >
        <span className="text-white">
          {isCopied ? "Copied" : title}
        </span>
      </Button>
    </>
  );
}
