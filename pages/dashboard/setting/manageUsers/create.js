import styles from "../../../../styles/Dashboard/dashboard.module.css";
import UserDetails from "../../../../comps/Dashboard/Setting/UserDetails";
import { createManageUser, ResetSuccess } from "../../../../store/slices/manageUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import Roles from "../../../../comps/Dashboard/Setting/Roles";
import NotificationSetting from "../../../../comps/Dashboard/Setting/NotificationSetting";
import { MagicBtn } from "../../../../comps/Buttons";
import { useTranslation } from "react-i18next";
import { createManageUserSchema } from "../../../../lib/validations/en/manageUserSchema";
import { createManageUserSchemaAr } from "../../../../lib/validations/ar/manageUserSchemaAr";

export default function CreateManageUser() {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const roleList = [
        {
            label: t("dashboard.batch_invoices"),
            name: 'batch_invoices'
        },
        {
            label: t("dashboard.deposits"),
            name: 'deposits'
        },
        {
            label: t("dashboard.payment_links"),
            name: 'payment_links'
        },
        {
            label: t("dashboard.profile"),
            name: 'profile'
        },
        {
            label: t("dashboard.users"),
            name: 'users'
        },
        {
            label: t("dashboard.refund"),
            name: 'refund'
        },
        {
            label: t("dashboard.show_all_invoices"),
            name: 'show_all_invoices'
        },
        {
            label: t("dashboard.customers"),
            name: 'customers'
        },
        {
            label: t("dashboard.invoices"),
            name: 'invoices'
        },
        {
            label: t("dashboard.products"),
            name: 'products'
        },
        {
            label: t("dashboard.commissions"),
            name: 'commissions'
        },
        {
            label: t("dashboard.account_statement"),
            name: 'account_statements'
        },
        {
            label: t("dashboard.orders"),
            name: 'orders'
        },
        {
            label: t("dashboard.suppliers"),
            name: 'suppliers'
        },
    ]
    const router = useRouter()
    const dispatch = useDispatch();
    const { userInfo, api_errors, isLoading, success } = useSelector((state) => state.manageUser);
    const defaultValues = userInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createManageUserSchema : createManageUserSchemaAr),
        defaultValues,
    });

    const inputs = watch()

    // useEffect(() => { console.log(inputs) }, [inputs])

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push("/dashboard/setting/manageUsers")
    }, [dispatch, router, success]);

    const onSubmit = (data) => {
        console.table(data);
        dispatch(createManageUser(data));
    };

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>

                    {/* User Details */}
                    <UserDetails
                        errors={errors}
                        api_errors={api_errors}
                        register={register}
                        defaultValues={defaultValues}
                        watch={watch}
                    />

                    {/* United Arab Emirates - Roles */}
                    <Roles
                        roleList={roleList}
                        register={register}
                    />

                    {/* Here is the notification */}
                    <NotificationSetting
                        errors={errors}
                        api_errors={api_errors}
                        register={register}
                        defaultValues={defaultValues}
                        watch={watch}
                    />

                    <MagicBtn
                        isLoading={isLoading}
                        label={t("dashboard.create")}
                        disabled={false}
                    />

                </div>
            </form>
        </div>
    );
}