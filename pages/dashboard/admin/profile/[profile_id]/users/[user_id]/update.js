import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../../../../../../comps/AlertError";
import { MagicBtn } from "../../../../../../../comps/Buttons";
import NotificationSetting from "../../../../../../../comps/Dashboard/Setting/NotificationSetting";
import Roles from "../../../../../../../comps/Dashboard/Setting/Roles";
import UpdateRoles from "../../../../../../../comps/Dashboard/Setting/UpdateRoles";
import UserDetails from "../../../../../../../comps/Dashboard/Setting/UserDetails";
import LoadingPage from "../../../../../../../comps/LoadingPage";
import { AxiosJwt } from "../../../../../../../lib/axios";
import axios from "../../../../../../../lib/axios";
import { createManageUserSchemaAr, updateManageUserSchemaAr } from "../../../../../../../lib/validations/ar/manageUserSchemaAr";
import { createManageUserSchema, updateManageUserSchema } from "../../../../../../../lib/validations/en/manageUserSchema";
import { adminUpdateManageUser, createManageUser, getManageUser, ResetSuccess, updateManageUser } from "../../../../../../../store/slices/manageUserSlice";
import styles from "../../../../../../../styles/Dashboard/dashboard.module.css";
import UserDetailsUpdate from "../../../../../../../comps/Dashboard/Setting/UserDetailsUpdate";


export default function AdminUpdateManageUser() {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const dispatch = useDispatch();
    const router = useRouter();
    const { user_id, profile_id } = router.query;
    const { manage_user, isLoading, api_errors, success } = useSelector((state) => state.manageUser);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? updateManageUserSchema : updateManageUserSchemaAr),
        defaultValues: manage_user,
    });

    useEffect(() => {
        if (manage_user) {
            for (let key in manage_user) {
                setValue(key, manage_user[key]);
            }
        }
    }, [setValue, manage_user])

    useEffect(() => {
        success && dispatch(ResetSuccess()) && reset() && router.push("/dashboard/setting/manageUsers")
    }, [dispatch, reset, router, success]);

    useEffect(() => {
        if (profile_id && user_id) {
            profile_id && dispatch(getManageUser({ user_id, profile_id }))
        }
    }, [dispatch, profile_id, user_id])

    const onSubmit = (data) => {
        dispatch(adminUpdateManageUser(data));
    };

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !manage_user && isLoading && <LoadingPage />
                }
                {
                    !manage_user && api_errors && <ErrorPage />
                }
                {
                    manage_user && <>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >

                            {/* User Details */}
                            <UserDetailsUpdate
                                userInfo={manage_user}
                                errors={errors}
                                api_errors={api_errors}
                                register={register}
                                watch={watch}
                                defaultValues={manage_user}
                            />

                            {/* United Arab Emirates - Roles */}
                            <UpdateRoles
                                errors={errors}
                                api_errors={api_errors}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                disabled
                            />

                            {/* Here is the notification */}
                            <NotificationSetting
                                errors={errors}
                                api_errors={api_errors}
                                register={register}
                                watch={watch}
                            />

                            <MagicBtn
                                isLoading={isLoading}
                                label={t("dashboard.save")}
                                disabled={false}
                            />

                        </form>
                    </>
                }

            </div>
        </div>
    );
}
