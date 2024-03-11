import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { useSelector } from "react-redux";
import { getFullDateFromISO } from "../../../lib/dates";

const InvoicesViewsShow = ({invoice}) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { SelectPageSize, pageSize } = usePageSize(5);
  const views = invoice?.views || invoice.view

  const columns = [
    {
      title: t("dashboard.view_dateTime"),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, view) => <>{getFullDateFromISO(view.created_at)}</>
    },
    {
      title: t("dashboard.IpAddress"),
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
  ]

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className="d-flex align-items-center ">
          <h5>{t("dashboard.views")}</h5>
          {
            views?.length ? <SelectPageSize /> : null}
        </div>
        {
          views?.length ?
            <SafqaTable
              dataSource={views}
              columns={columns}
              pageSize={pageSize}
            />
            :
            <p >
              {language == 'en' ? 'No one opened this invoice yet' : 'لم يفتح أحد هذه الفاتورة بعد'}
            </p>
        }
        <hr />
      </div>
    </div>
  );
};

export default InvoicesViewsShow;
