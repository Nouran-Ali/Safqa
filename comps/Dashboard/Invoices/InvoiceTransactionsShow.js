import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { usePageSize } from "../Inputs";
import SafqaTable from "../../common/SafqaTable";
import { getFullDateFromISO } from "../../../lib/dates";
import { formatNumber } from "../../../lib/validations/services";
import { useSelector } from "react-redux";

const InvoiceTransactionsShow = ({ invoice }) => {
  const { theme } = useTheme();
  const { profile_business } = useSelector(state=>state.profileBusiness)
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const transcations = invoice.transactions || invoice.transcations || invoice.transcation || invoice.transaction
  const { SelectPageSize, pageSize } = usePageSize(5); 

  const columns = [
    // {
    //   title: t("dashboard.id"),
    //   dataIndex: 'reference_id',
    //   key: 'reference_id',
    // },
    {
      title: t("dashboard.card_holder_name"),
      dataIndex: 'card_name',
      key: 'card_name',
    },
    {
      title: t("dashboard.payment_method"),
      dataIndex: 'typeCard',
      key: 'typeCard',
      render: (typeCard) => <span className="text-uppercase">{typeCard}</span>
    },
    {
      title: `${t("transaction_value")} (${invoice?.currency?.short_currency})`,
      dataIndex: 'transaction_value',
      key: 'transaction_value',
      render: (transaction_value) => <span className="text-uppercase">{Math.ceil(transaction_value)}</span>
    },
    {
      title: t("dashboard.charge_id"),
      dataIndex: 'charge_id',
      key: 'charge_id',
    },
    {
      title: t("dashboard.transaction_date"),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, transaction) => <>{getFullDateFromISO(transaction.created_at)}</>
    },
    // {
    //   title: t("dashboard.transaction_status"),
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    // {
    //   title: t("dashboard.payment_gateway"),
    //   dataIndex: 'typeCard',
    //   key: 'typeCard',
    // },
    // {
    //   title: t("dashboard.payment_id"),
    //   dataIndex: 'payment_id',
    //   key: 'payment_id',
    // },
    // {
    //   title: t("dashboard.authorization_id"),
    //   dataIndex: 'authorization_id',
    //   key: 'authorization_id',
    // },


  ]

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className="d-flex align-items-center">
          <h5>{t("dashboard.transactions")}</h5>
          {transcations?.length > 0 && <SelectPageSize />}
        </div>
        {/* <hr /> */}
        {transcations?.length > 0 ?
          <SafqaTable
            dataSource={transcations}
            columns={columns}
            pageSize={pageSize}
          />
          :
          <p >
            {language == 'en' ? 'No Transactions yet' : 'لا توجد معاملات حتى الآن'}
          </p>
        }
      </div>
    </div>
  );
};

export default InvoiceTransactionsShow;