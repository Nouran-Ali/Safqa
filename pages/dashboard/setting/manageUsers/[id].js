import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../../../comps/AlertError";
import { MagicBtn } from "../../../../comps/Buttons";
import NotificationSetting from "../../../../comps/Dashboard/Setting/NotificationSetting";
import Roles from "../../../../comps/Dashboard/Setting/Roles";
import ShowNotificationSetting from "../../../../comps/Dashboard/Setting/ShowNotificationSetting";
import ShowRoles from "../../../../comps/Dashboard/Setting/ShowRoles";
import ShowUserDetails from "../../../../comps/Dashboard/Setting/ShowUserDetails";
import UserDetails from "../../../../comps/Dashboard/Setting/UserDetails";
import LoadingPage from "../../../../comps/LoadingPage";
import {AxiosJwt} from "../../../../lib/axios";
import axios from "../../../../lib/axios";
import { createManageUserSchemaAr } from "../../../../lib/validations/ar/manageUserSchemaAr";
import { createManageUserSchema } from "../../../../lib/validations/en/manageUserSchema";
import { createManageUser, getManageUser, ResetSuccess, updateManageUser } from "../../../../store/slices/manageUserSlice";
import styles from "../../../../styles/Dashboard/dashboard.module.css";


export default function ShowManageUSer() {
    const { manage_user, isLoading, api_errors } = useSelector((state) => state.manageUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    let defaultValues = null;
    if (manage_user) {
        defaultValues = manage_user
    }

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


    useEffect(() => {
        id && dispatch(getManageUser({ user_id: id }))
    }, [dispatch, id])

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
                            // defaultValues={defaultValues}
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
                            // disabled
                        />

                        {/* Here is the notification */}
                        <ShowNotificationSetting
                            userInfo={manage_user}
                            // errors={errors}
                            // api_errors={api_errors}
                            // register={register}
                            // defaultValues={defaultValues}
                            // watch={watch}
                        />
                    </>
                }
            </div>
        </div>
    );
}
