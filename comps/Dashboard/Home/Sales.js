import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../lib/validations/services";

const Sales = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const { statistics } = useSelector(state => state.auth)
    const { profile_business } = useSelector((state) => state.profileBusiness);
    const { theme } = useTheme()

    return (
        <div className={`mt-5 mb-4`} dir={language == "ar" ? "rtl" : "ltr"}>
            <div className={`d-flex justify-content-around text-center ${theme == 'dark' ? 'dark-text-info-dashboard' : "safqa-text-info-dashboard"}`}>
                <p className="col">{t("dashboard.home.sales_person")}</p>
                <p className="col">{t("dashboard.home.no_invoices")}</p>
                <p className="col">{t("dashboard.home.amount_collected")}</p>
            </div>

            {statistics?.sales_invoice?.map(({ sales_person, count_invoices, amount_collected }) =>
                <div
                    key={sales_person}
                    className={`d-flex text-center mx-auto rounded-2 mt-2 safqa-text-secondary2-dashboard ${theme == 'dark' ? 'dark-box' : 'safqa-bg-grey'}`}
                >
                    <p className="col mt-3">{sales_person}</p>
                    <p className="col mt-3">{count_invoices}</p>
                    <p className="col mt-3">{formatNumber(amount_collected)} {profile_business?.country?.short_currency}</p>
                </div>
            )}
        </div>
    );
};

export default Sales;