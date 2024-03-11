import { InfoCircleFilled } from "@ant-design/icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const AccountNote = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <div
      div
      className={`${
        theme == "dark"
          ? "dark-blue-box text-white"
          : "safqa-bg-red-note text-black"
      } 
        rounded-2 py-3 px-4 fs-6 mb-4`}
    >
      <p className="m-0">
        <InfoCircleFilled className="mt-0 safqa-text-danger safqa-vl-0 mx-2" />
        <span>{t("dashboard.account_approval_note")}</span>
        <Link
          href="/dashboard/editProfile/documents"
          className={`ms-1 safqa-text-danger text-decoration-underline mx-2`}
        >
          {t("dashboard.verify_account")}
        </Link>
      </p>
    </div>
  );
};

export default AccountNote;
