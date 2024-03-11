import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/Dashboard/Bar.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from 'next-themes';
import BarInvoiceType from '../Invoices/BarInvoiceType';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,


  plugins: {
    legend: {
      position: 'bottom',
      align: 'start',
      borderRadius: 20,
      width: '15px',
      height: '15px'

    }
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const labelsAR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];



const BarChart = () => {

  const nav_active = useSelector((state) => state.sideNav.isActive);
  const { statistics: { normal_invoices } } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();
  const [invoices, setInvoices] = useState(null)
  const month_labels = invoices?.map(i => i.month).reverse()
  const paid_invoices_data = invoices?.map(i => i.paidCount).reverse()
  const total_invoices_data = invoices?.map(i => i.count).reverse()

  const data = {
    labels: month_labels,
    datasets: [
      {
        label: "Invoices",
        labelAR: "الفواتير",
        data: total_invoices_data,
        backgroundColor: theme == 'dark' ? ["#85949B"] : ["#66b4d2"],
        borderColor: ["#66b4d2"],
        borderRadius: 200,
      },
      {
        label: "paid Invoices",
        labelAR: "الفواتير المدفوعة",
        data: paid_invoices_data,
        backgroundColor: theme == 'dark' ? ["#2F6782"] : ["#19319c"],
        borderColor: ["#19319c"],
        borderRadius: 200,
      },
    ],
  };

  const dataAR = {
    labels: labelsAR,
    datasets: [
      {
        label: "الفواتير المدفوعة",
        data: [20, 60, 92, 60, 3, 51, 26, 12, 70, 2, 20, 60, 92, 60, 3, 51, 26, 12, 70, 2],
        backgroundColor: ["#19319c"],
        borderColor: ["#19319c"],
        borderRadius: 200,
        marginRight: 20,
      },
      {
        label: "الفواتير",
        data: [20, 60, 92, 60, 3, 51, 26, 12, 70, 2, 20, 60, 92, 60, 3, 51, 26, 12, 70, 2],
        backgroundColor: ["#66b4d2"],
        borderColor: ["#66b4d2"],
        borderRadius: 200,
      },
    ],
  };

  useEffect(() => {
    setIsActive(nav_active);
  }, [nav_active]);

  useEffect(() => {
    setInvoices(normal_invoices)
  }, [normal_invoices])


  return (
    <>
      <BarInvoiceType setInvoices={setInvoices} />
      <div className={` mb-3 ${styles.main}`}>
        <Bar
          className={isActive ? styles["h-240"] : `${styles.hightSmallScreen} ${styles["h-340"]}`}
          data={data}
          options={options}
        />
      </div>
    </>
  );

}


export default BarChart