import styles from "../../../styles/Dashboard/dashboard.module.css";
import AdminBankInfo from "../../../comps/admin/bank/AdminBankInfo";
import { useDispatch, useSelector } from "react-redux";
import { getBanks } from "../../../store/slices/bankSlice";
import { useEffect } from "react";
import { ResetSuccess, getCountries } from "../../../store/slices/countrySlice";
import AdminCreateInfo from "../../../comps/admin/admins/AdminCreateInfo";
import Roles from "../../../comps/Dashboard/Setting/Roles";
import { MagicBtn } from "../../../comps/Buttons";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdminSchema } from "../../../lib/validations/en/adminScehma";
import { createAdminSchemaAr } from "../../../lib/validations/ar/adminScehmaAr";
import { useTranslation } from "react-i18next";
import { createAdmin } from "../../../store/slices/adminSlice";

// is_super_admin: 1

export default function CreateNewAdminUser() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const roleList = [
        {
            label: t("dashboard.wallet"),
            name: 'wallet'
        },
        {
            label: t("dashboard.admins"),
            name: 'admins'
        },
        {
            label: t("dashboard.profiles"),
            name: 'profiles'
        },
        {
            label: t("dashboard.invoices"),
            name: 'invoices'
        },
        {
            label: t("dashboard.refunds"),
            name: 'refunds'
        },
        {
            label: t("dashboard.addresses"),
            name: 'addresses'
        },
        {
            label: t("dashboard.languages"),
            name: 'languages'
        },
        {
            label: t("dashboard.banks"),
            name: 'banks'
        },
        {
            label: t("dashboard.business_categories"),
            name: 'business_categories'
        },
        {
            label: t("dashboard.business_types"),
            name: 'business_types'
        },
        {
            label: t("dashboard.payment_methods"),
            name: 'payment_methods'
        },
        {
            label: t("dashboard.social_media"),
            name: 'social_media'
        }
    ]

    const { adminInfo, isLoading, api_errors, success } = useSelector(
        (state) => state.admin
    );
    
    const defaultValues = adminInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createAdminSchema : createAdminSchemaAr),
        defaultValues,
    });

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push("/dashboard/admins")
    }, [dispatch, router, success]);

    useEffect(() => {
        dispatch(getBanks());
        dispatch(getCountries());
    }, [dispatch])

    const onSubmit = (data) => dispatch(createAdmin(data));

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
                    <AdminCreateInfo
                        errors={errors}
                        api_errors={api_errors}
                        register={register}
                    />
                    <Roles
                        roleList={roleList}
                        register={register}
                    />
                    <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
                </form>
            </div>
        </div>
    );
}
