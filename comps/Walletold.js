import { SafqaInput } from "./Dashboard/Inputs";
import LoadingSpinner from "./LoadingSpinner";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import styles from "../styles/Buttons.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { Modal } from "antd";
import { useTheme } from "next-themes";
import { addToWalletSchema, createDepositSchema } from "../lib/validations/en/depositSchema";
import { addToWallet, createDeposit, ResetSuccess } from "../store/slices/depositSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { addToWalletSchemaAr, createDepositSchemaAr } from "../lib/validations/ar/depositSchemaAr";


const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export const BtnWithdraw = ({
    icon,
    name,
    style,
    cardMonth,
    cardYear,
    onUpdateState,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    onCardInputFocus,
    onCardInputBlur,
    cardCvv,
    children }) => {
    const [modal1Open, setModal1Open] = useState(false);
    const formRef = useRef()
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const { depositInfo, api_errors, success, isLoading } = useSelector((state) => state.deposit);
    // const {  } = useSelector((state) => state.auth);
    const total_balance = 10000
    const defaultValues = depositInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? createDepositSchema(total_balance) : createDepositSchemaAr(total_balance)),
        defaultValues,
    });

    useEffect(() => {
        success && dispatch(ResetSuccess()) && reset()
    }, [dispatch, reset, success]);

    const onSubmit = (data) => {
        // reset()
        dispatch(createDeposit(data));
    };

    /* visa */
    const [cardNumber, setCardNumber] = useState('');

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        onUpdateState(name, value);
    };

    // TODO: We can improve the regex check with a better approach like in the card component.
    const onCardNumberChange = (event) => {
        let { value, name } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(cardNumber.trimRight());
        onUpdateState(name, cardNumber);
    };

    const onCvvFocus = (event) => {
        onUpdateState('isCardFlipped', true);
    };

    const onCvvBlur = (event) => {
        onUpdateState('isCardFlipped', false);
    };

    return <>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Link
                href={"#"}
                onClick={() => setModal1Open(true)}
                className={`btn px-3 mt-2 ${language == "ar" ? "me-1" : "me-3"} ${style}`}>
                {icon}
                <span className="ms-3 align-middle text-white">{name}</span>
            </Link>

            <Modal
                className={theme == 'dark' ? "dark-ant-modal" : ""}
                title={language == 'en' ? "Withdraw from wallet" : "سحب من المحفظة"}
                style={{
                    top: 20,
                }}
                open={modal1Open}
                confirmLoading={isLoading}
                okText="create"
                onOk={handleSubmit(onSubmit)}
                onCancel={() => setModal1Open(false)}
            >
                <div className={` ${language == 'ar' ? 'text-end' : "text-start"} `}>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 ">
                            <SafqaInput
                                label={t("dashboard.amount")}
                                className="bg-grey"
                                name="amount"
                                type="number"
                                register={register}
                                error={errors.amount?.message || api_errors?.amount}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                    </div>
                    {/* <MagicBtnCreateLink label={t("dashboard.create")} isLoading={isLoading} /> */}
                </div>
            </Modal>
        </form>
    </>;
};


export const BtnAddToWallet = ({ icon, name, style }) => {
    const [modal1Open, setModal1Open] = useState(false);
    const formRef = useRef()
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const { addToWalletInfo, api_errors, success, isLoading } = useSelector((state) => state.deposit);
    // const {  } = useSelector((state) => state.auth);
    // const total_balance = 10000
    const defaultValues = addToWalletInfo;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(language == 'en' ? addToWalletSchema : addToWalletSchemaAr),
        defaultValues,
    });

    useEffect(() => {
        success && dispatch(ResetSuccess()) && reset()
    }, [dispatch, reset, success]);

    const onSubmit = (data) => {
        // reset()
        dispatch(addToWallet(data));
        // setModal1Open(false)
    };

    return <>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Link
                href={"#"}
                onClick={() => setModal1Open(true)}
                className={`btn px-3 mt-2 ${language == "ar" ? "me-1" : "me-3"} ${style}`}>
                {icon}
                <span className="ms-3 align-middle text-white">{name}</span>
            </Link>

            <Modal
                className={theme == 'dark' ? "dark-ant-modal" : ""}
                // title={language == 'en' ? "Add balance to wallet" : "إضافة رصيد الى المحفظة"}
                style={{
                    top: 20,
                }}
                open={modal1Open}
                confirmLoading={isLoading}
                okText="create"
                onOk={handleSubmit(onSubmit)}
                onCancel={() => setModal1Open(false)}
            >
                <div className={` ${language == 'ar' ? 'text-end' : "text-start"} `}>
                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mb-3">
                            <SafqaInput
                                label={t("dashboard.card_holder_name")}
                                className="bg-grey"
                                name="card_name"
                                register={register}
                                error={errors.card_name?.message || api_errors?.card_name}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mb-3">
                            <SafqaInput
                                label={t("dashboard.card_number")}
                                className="bg-grey"
                                name="card_number"
                                register={register}
                                error={errors.card_number?.message || api_errors?.card_number}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 mb-3">
                            <SafqaInput
                                label={t("dashboard.MM")}
                                className="bg-grey"
                                name="exp_month"
                                type="number"
                                register={register}
                                error={errors.exp_month?.message || api_errors?.exp_month}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 mb-3">
                            <SafqaInput
                                label={t("dashboard.YYYY")}
                                className="bg-grey"
                                name="exp_year"
                                type="number"
                                register={register}
                                error={errors.exp_year?.message || api_errors?.exp_year}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 mb-3">
                            <SafqaInput
                                label={t("dashboard.cvc")}
                                className="bg-grey"
                                name="cvc"
                                type="number"
                                register={register}
                                error={errors.cvc?.message || api_errors?.cvc}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 px-4 mb-3">
                            <SafqaInput
                                label={t("dashboard.amount")}
                                className="bg-grey"
                                name="amount"
                                type="number"
                                register={register}
                                error={errors.amount?.message || api_errors?.amount}
                                required
                                autoComplete={'off'}
                            />
                        </div>
                    </div>
                    {/* <MagicBtnCreateLink label={t("dashboard.create")} isLoading={isLoading} /> */}
                </div>
            </Modal>
        </form>
    </>;
};