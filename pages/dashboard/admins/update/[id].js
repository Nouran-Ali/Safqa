import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { AxiosJwt } from "../../../../lib/axios";
import AdminBankInfoUpdate from "../../../../comps/admin/bank/AdminBankInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getBank, getBanks } from "../../../../store/slices/bankSlice";
import { useEffect } from "react";
import { getCountries } from "../../../../store/slices/countrySlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";
import { ResetSuccess, getAdmin, updateAdmin } from "../../../../store/slices/adminSlice";
import AdminUpdateInfo from "../../../../comps/admin/admins/AdminUpdateInfo";
import Roles from "../../../../comps/Dashboard/Setting/Roles";
import { MagicBtn } from "../../../../comps/Buttons";
import { createAdminSchema } from "../../../../lib/validations/en/adminScehma";
import { createAdminSchemaAr } from "../../../../lib/validations/ar/adminScehmaAr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";


const FormUpdate = ({ admin }) => {
    const { isLoading, api_errors, success } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const router = useRouter();
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

    const defaultValues = admin;

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
        if (success) {
            dispatch(ResetSuccess())
            router.push("/dashboard/admins")
        }
    }, [dispatch, router, success]);

    const onSubmit = (data) => dispatch(updateAdmin(data));
    return (
        <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
            <AdminUpdateInfo
                errors={errors}
                api_errors={api_errors}
                register={register}
            />
            <Roles
                roleList={roleList}
                register={register}
                admin={admin}
            />
            <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
        </form>
    )
}

export default function UpdateAdminBank() {

    const { admin, isLoading, api_errors, success } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getAdmin(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !admin && isLoading && <LoadingPage />
                }
                {
                    !admin && api_errors && <ErrorPage />
                }
                {
                    admin && <FormUpdate admin={admin} />
                }
            </div>
        </div>
    );
}
