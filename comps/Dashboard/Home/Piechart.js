import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const Piechart = () => {
  const { statistics: { invoices, transaction_count, transaction_value, wallet_profile } } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: Piechart.js:9 ~ Piechart ~ wallet_profile:", wallet_profile)

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  const COLORS = theme == 'dark' ?
    ["#2f6782", "#B8B8B8"] :
    ["#2037a7", "#a8a8a8"];


  const pieData = [
    {
      name: language === "en" ? "Total balance" : "إجمالي الرصيد",
      nameAR: "إجمالي الرصيد",
      value: wallet_profile?.total_balance,
    },
    {
      name: language === "en" ? "Awaiting to transfer" : "في انتظار النقل",
      nameAR: "في انتظار النقل",
      value: wallet_profile?.awating_transfer,
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            color: "#000000",
            padding: "5px",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}`}</label>
        </div>
      );
    }
    return null;
  };


  return (
    <>
      <PieChart width={300} height={180}>
        {
          wallet_profile?.total_balance > 0 &&
            <>
              <Pie
                data={pieData}
                color="#000000"
                dataKey="value"
                nameKey={"name"}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              >
                {pieData.map((entry, index) => {
                  return (
                    <Cell
                      id={`cell-${index}`}
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                }
                )
                }

              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </> 
        }
      </PieChart>
    </>

  );

}
export default Piechart;