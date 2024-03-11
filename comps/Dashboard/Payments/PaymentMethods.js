import styles from "../../../styles/Dashboard/PaymentMethod.module.css";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Collapse, Switch, Space } from 'antd';
import { SaveBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { SafqaSelect } from "../Inputs";
import { ResetSuccess, updatePaymentMethodUser } from "../../../store/slices/paymentMethodSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePaymentMethodUserSchema } from "../../../lib/validations/en/paymentMethodSchema";
import { updatePaymentMethodUserSchemaAr } from "../../../lib/validations/ar/paymentMethodSchemaAr";
import { useEffect } from "react";
const { Panel } = Collapse;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PaymentMethods = () => {
    const { theme } = useTheme();
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const dispatch = useDispatch();
    const { commissions_from } = useSelector(state => state.commission)
    const { payment_methods, payment_methods_user, success, api_errors } = useSelector(state => state.paymentMethod)

    const defaultValues = payment_methods_user;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language=='en'?updatePaymentMethodUserSchema:updatePaymentMethodUserSchemaAr),
        defaultValues,
    });

    useEffect(() => {
        success && dispatch(ResetSuccess())
    }, [dispatch, success]);

    const onSubmit = (data) => {
        // reset()
        dispatch(updatePaymentMethodUser(data));
    };

    return (
        <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
            <div className={`rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
                <h5>{t("dashboard.payment_method")}</h5>
                <hr />

                {/* <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`mt-4 ${theme == 'dark' ? 'payment_method_dark' : 'payment_method_light'}`}
                > */}
                {/* antd accordion */}
                <div className="bg-white">
                    {
                        payment_methods?.map(({ id, name_en, name_ar, commission_bank, commission_safqa, is_active }, index) => (


                            <>

                                <div className="my-3">
                                    <div className="rounded bg-grey d-flex justify-content-between p-4 ">
                                        <div>{language == 'en' ? name_en : name_ar}</div>
                                        <div>
                                            <Switch
                                                // {...field}
                                                className="ms-auto"
                                                checkedChildren="Active"
                                                unCheckedChildren="InActive"
                                                checked={is_active}
                                            // disabled
                                            />
                                        </div>
                                    </div>
                                    
                                </div>



                                {/* <Panel
                                    key={id}
                                    header={
                                        <div className="d-flex">
                                            <span>{language == 'en' ? name_en : name_ar}</span>
                                            <Controller
                                                control={control}
                                                name={`is_active[${index}]`}
                                                render={({ field }) => (
                                                    <Switch
                                                        {...field}
                                                        className="ms-auto"
                                                        checkedChildren="Active"
                                                        unCheckedChildren="InActive"
                                                        defaultChecked
                                                    />
                                                )}
                                            />
                                        </div>
                                    }
                                >
                                    <input hidden type="text" {...register(`payment_method_id[${index}]`)} value={id} />
                                    <p>{commission_bank} {t("dashboard.transaction_value")}</p>
                                    <p>{commission_safqa}% {t("dashboard.transaction_value")}</p>
                                    <SafqaSelect
                                        select_label
                                        options={commissions_from}
                                        option_name="name_en"
                                        option_name_ar="name_ar"
                                        name={`commission_from_id[${index}]`}
                                        register={register}
                                        label={t("dashboard.commission_from_id")}
                                        required
                                        error={errors?.commission_from_id?.[index]?.message || api_errors?.commission_from_id[index]}
                                    />
                                </Panel> */}
                            </>
                        ))
                    }
                    {/* <Panel header="This is panel header 2" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3">
                            <p>{text}</p>
                        </Panel>
                        <PaymentAccordion
                            header={"this is the header"}
                            key={1}
                            percent={0.1}
                            price={2.000}
                        /> */}
                </div>

                {/* <SaveBtn isLoading={false} /> */}

                {/* </form> */}
            </div>
        </div>
    )
}

export default PaymentMethods
