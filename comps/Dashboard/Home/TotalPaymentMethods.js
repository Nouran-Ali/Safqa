import styles from "../../../styles/Dashboard/TotalPaymentMethods.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const TotalPaymentMethods = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const { theme } = useTheme();

    return (
        <div className={`mt-4 ${styles.table}`} dir={language == "ar" ? "rtl" : "ltr"}>
            <table className="table text-center">
                <thead className="border-bottom">
                    <tr className={theme == 'dark' ? "dark-text-info-dashboard" : ""}>
                        <th scope="col">{t("dashboard.img")}</th>
                        <th scope="col">{t("dashboard.name")}</th>
                        <th scope="col">{t("dashboard.transactions")}</th>
                        <th scope="col">{t("dashboard.total")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={theme == 'dark' ? "border-secondary text-grey" : "border-white"}>
                        <td scope="row">
                            <img src="./dashboard/kn.png" width="30px" />
                        </td>
                        <td>KNET</td>
                        <td>6</td>
                        <td>1560 $</td>
                    </tr>
                    <tr className={theme == 'dark' ? "border-secondary text-grey" : "border-white"}>
                        <td scope="row">
                            <img src="./dashboard/vm.png" width="30px" />
                        </td>
                        <td>VISA/MasterCard</td>
                        <td>6</td>
                        <td>1560 $</td>
                    </tr>
                    <tr className={theme == 'dark' ? "border-secondary text-grey" : "border-white"}>
                        <td scope="row">
                            <img src="./dashboard/ae.png" width="30px" />
                        </td>
                        <td>AMEX</td>
                        <td>6</td>
                        <td>1560 $</td>
                    </tr>
                    <tr className={theme == 'dark' ? "border-secondary text-grey" : "border-white"}>
                        <td scope="row">
                            <img src="./dashboard/vm.png" width="30px" />
                        </td>
                        <td>Debit/Credit Cards</td>
                        <td>6</td>
                        <td>1560 $</td>
                    </tr>
                    <tr className={theme == 'dark' ? "border-secondary text-grey" : "border-white"}>
                        <td scope="row">
                            <img src="./dashboard/np.png" width="30px" />
                        </td>
                        <td>Qatar Debit Card</td>
                        <td>6</td>
                        <td>1560 $</td>
                    </tr>
                    <tr className={theme == 'dark' ? "border-secondary text-grey" : "border-white"}>
                        <td scope="row">
                            <img src="./dashboard/ap.png" width="30px" />
                        </td>
                        <td>Apple Pay</td>
                        <td>6</td>
                        <td>1560 $</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default TotalPaymentMethods;