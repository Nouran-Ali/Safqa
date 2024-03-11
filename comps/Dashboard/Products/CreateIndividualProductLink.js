import LoadingSpinner from "../../LoadingSpinner";
import { Modal, Button, Space, Tag } from 'antd';
import { SafqaInput, SafqaRadioInput, SafqaTextArea } from "../Inputs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductLinkSchema } from "../../../lib/validations/en/productLinkSchema";
import styles from "../../../styles/Buttons.module.css";
import { MagicBtn, MagicBtnCreateLink } from "../../Buttons";
import { createProductLink, ResetSuccess } from "../../../store/slices/productLinkSlice";
import { createProductLinkSchemaAr } from "../../../lib/validations/ar/productLinkSchemaAr";
import Link from "next/link";
import LinkIcon from '@mui/icons-material/Link';
import { useRouter } from "next/router";


const CreateIndividualProductLink = ({ product }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const { theme } = useTheme()
    const router = useRouter()
    const { isLoading, api_errors, success } = useSelector(
        (state) => state.productLink
    );

    useEffect(() => {
        success && dispatch(ResetSuccess()) && router.push('/dashboard/products/urls')
    }, [dispatch, router, success]);

    const onSubmit = () => {
        const data = {
          products: [product?.id],
          name_en: product?.name_en,
          name_ar: product?.name_ar,
          is_active: 1,
          commission_type: 1,
        };
        dispatch(createProductLink(data));
    };

    return (
        <>
            <div className={styles.edit}>
                <button
                    className="border-0 rounded-circle"
                    type='button'
                    onClick={onSubmit}
                >
                    <LinkIcon sx={{ width: "15px" }} />
                </button>
            </div>
        </>
    )
}

export default CreateIndividualProductLink