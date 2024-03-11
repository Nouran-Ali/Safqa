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
import ShowNotificationSetting from "../../../../../../../comps/Dashboard/Setting/ShowNotificationSetting";
import ShowRoles from "../../../../../../../comps/Dashboard/Setting/ShowRoles";
import ShowUserDetails from "../../../../../../../comps/Dashboard/Setting/ShowUserDetails";
import UserDetails from "../../../../../../../comps/Dashboard/Setting/UserDetails";
import LoadingPage from "../../../../../../../comps/LoadingPage";
import { AxiosJwt } from "../../../../../../../lib/axios";
import axios from "../../../../../../../lib/axios";
import { createManageUserSchema } from "../../../../../../../lib/validations/en/manageUserSchema";
import { createManageUser, getManageUser, ResetSuccess, updateManageUser } from "../../../../../../../store/slices/manageUserSlice";
import styles from "../../../../../../../styles/Dashboard/dashboard.module.css";
import { createManageUserSchemaAr } from "../../../../../../../lib/validations/ar/manageUserSchemaAr";


export default function AdminShowManageUSer() {
    const { manage_user, isLoading, api_errors } = useSelector((state) => state.manageUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const { user_id, profile_id } = router.query;

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    useEffect(() => {
        if (profile_id && user_id) {
            dispatch(getManageUser({ user_id, profile_id }))
        }
    }, [dispatch, profile_id, user_id])

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

                        {/* User Details */}
                        <ShowUserDetails
                            userInfo={manage_user}
                        // errors={errors}
                        // api_errors={api_errors}
                        // register={register}
                        // watch={watch}
                        />

                        {/* United Arab Emirates - Roles */}
                        <ShowRoles
                            // errors={errors}
                            // api_errors={api_errors}
                            // register={register}
                            // defaultValues={defaultValues}
                            // watch={watch}
                            // setValue={setValue}
                            userInfo={manage_user}
                        />

                        {/* Here is the notification */}
                        <ShowNotificationSetting
                            userInfo={manage_user}
                        />
                    </>
                }
            </div>
        </div>
    );
}
