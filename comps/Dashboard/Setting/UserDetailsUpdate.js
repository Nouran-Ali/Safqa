import styles from "../../../styles/Dashboard/Create.module.css";
import {
    MagicRadioInput,
    SafqaInput,
    SafqaPhoneInput,
    SafqaRadioInput,
    SafqaSelect,
} from "../Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const UserDetailsUpdate = ({ userInfo, errors, api_errors, register, watch }) => {
    const { theme } = useTheme();
    const { country } = useSelector(state => state.global.data)

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div className={`mt-2 mb-4`}>
            <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <p className="px-4 fs-5">{t("dashboard.user_details")}</p>
                <hr />
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaInput
                            type="text"
                            label={t("dashboard.full_name")}
                            placeholder="Mohamed Salah"
                            required
                            name="full_name"
                            register={register}
                            error={errors.full_name?.message || api_errors?.full_name}
                        />
                    </div>


                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaPhoneInput
                            label={t("dashboard.phone_number")}
                            register={register}
                            phone_name="phone_number_manager"
                            code_name="phone_number_code_manager_id"
                            required
                            error={errors.phone_number_manager?.message || api_errors?.phone_number_manager}
                            codeError={errors.phone_number_code_manager_id?.message || api_errors?.phone_number_code_manager_id}
                            watch={watch}
                        />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaInput
                            type="text"
                            label={t("dashboard.email")}
                            placeholder={"sample@gmail.com"}
                            name="email"
                            register={register}
                            error={
                                errors.email?.message ||
                                api_errors?.email
                            }
                            required
                        />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaSelect
                            select_label
                            label={t("select.Nationality")}
                            name="nationality_id"
                            options={country}
                            option_name="nationality_en"
                            option_name_ar="nationality_ar"
                            register={register}
                            error={
                                errors.nationality_id?.message ||
                                api_errors?.nationality_id
                            }
                            required
                        />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-4">
                        
                        <SafqaRadioInput
                            register={register}
                            name="is_enable"
                            label={t("dashboard.is_user_enabled")}
                            items={[
                                { id: 1, name: t("dashboard.yes") },
                                { id: 0, name: t("dashboard.no") },
                            ]}
                            error={
                                errors.is_enable?.message ||
                                api_errors?.is_enable
                            }
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDetailsUpdate;
