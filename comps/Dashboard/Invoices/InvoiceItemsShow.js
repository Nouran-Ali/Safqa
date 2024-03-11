import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import SafqaTable from "../../common/SafqaTable";
import { usePageSize } from "../Inputs";

const InvoiceItemsShow = ({ invoice }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { SelectPageSize, pageSize } = usePageSize(5);

  const {
    invoice_item,

  } = invoice;


  const columns = [
    {
      title: t("dashboard.product_name"),
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: t("dashboard.unit_price"),
      dataIndex: 'product_price',
      key: 'product_price',
    },
    {
      title: t("dashboard.quantitiy"),
      dataIndex: 'product_quantity',
      key: 'product_quantity'
    },
    {
      title: t("dashboard.total"),
      dataIndex: '',
      key: '',
      render: (item) => <span>{item.product_quantity * item.product_price}</span>,

    }
  ]

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className="d-flex align-items-center">
          <h5>{t("dashboard.invoice_items")}</h5>
          {invoice_item?.length ? <SelectPageSize /> : null}
        </div>
        {invoice_item?.length ?
          <SafqaTable
            dataSource={invoice_item}
            columns={columns}
            pageSize={pageSize}
          />
          :
          <p>
            {language == 'en' ? 'There is no items' : 'لا توجد عناصر'}
          </p>
        }
        <hr />
      </div>
    </div>
  );
};

export default InvoiceItemsShow;