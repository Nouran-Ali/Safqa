import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
    SafqaFileInput,
    SafqaInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createBusinessTypeSchema } from "../../../lib/validations/en/businessTypeSchema";
import { createBusinessTypeSchemaAr } from "../../../lib/validations/ar/businessTypeSchemaAr";
import { createBusinessType, ResetSuccess } from "../../../store/slices/businessTypeSlice";

const BusinessTypeInfoComp = () => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const router = useRouter()
    const dispatch = useDispatch();

    const { businessTypeInfo, isLoading, api_errors, success } = useSelector(
        (state) => state.businessType
    );

    const defaultValues = businessTypeInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createBusinessTypeSchema : createBusinessTypeSchemaAr),
        defaultValues,
    });

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/businessType")
    }, [success]);

    const onSubmit = (data) => dispatch(createBusinessType(data));

    return (
        <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
                <p className="px-4 fs-5">{t("dashboard.businessType_info")}</p>
                <hr />

                <div className="row px-3">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaInput
                            label={t("dashboard.name_En")}
                            name="name_en"
                            type="text"
                            register={register}
                            error={errors.name_en?.message || api_errors?.name_en}
                            required
                        />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaInput
                            label={t("dashboard.name_Ar")}
                            type="text"
                            name="name_ar"
                            register={register}
                            required
                            error={errors.name_ar?.message || api_errors?.name_ar}
                        />
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                        <SafqaFileInput
                            required
                            name="business_logo"
                            register={register}
                            label={t("dashboard.business_logo")}
                            error={errors.business_logo?.message || api_errors?.business_logo}
                        />
                    </div>
                </div>
            </div>

            <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
        </form>
    );
};

export default BusinessTypeInfoComp;
