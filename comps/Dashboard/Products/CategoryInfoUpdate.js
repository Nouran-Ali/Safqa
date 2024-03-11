import styles from "../../../styles/Dashboard/Create.module.css";
import {
  MagicInput,
  SafqaInput,
  MagicRadioInput,
  SafqaRadioInput,
} from "../Inputs";
import { ResetSuccess } from "./../../../store/slices/categorySlice";
import { MagicBtn } from "../../Buttons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategorySchema } from "./../../../lib/validations/en/categorySchema";
import { createCategorySchemaAr } from "./../../../lib/validations/ar/categorySchemaAr";
import { updateCategory } from './../../../store/slices/categorySlice';
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CategoryInfo = ({ category }) => {
    const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { success, isLoading, api_errors, is_active_list } = useSelector(
    (state) => state.category
  );

  const defaultValues = category;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createCategorySchema : createCategorySchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/products/category")
  }, [success]);

  const onSubmit = (data) => {
      dispatch(updateCategory({ id, ...data }));
  };

  return (
    <div>
      <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
        <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
          <p className="px-4 fs-5">Category info</p>
          <hr />

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaInput
                type="text"
                register={register}
                name="name_en"
                label="Name (En)"
                error={errors.name_en?.message || api_errors?.name_en}
                required
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaInput
                type="text"
                register={register}
                name="name_ar"
                label="Name (Ar)"
                error={errors.name_ar?.message || api_errors?.name_ar}
                required
              />
            </div>
          </div>

          <div className="row px-4 mt-3 mb-4">
            <SafqaRadioInput
              label="Is Active?"
              register={register}
              name="is_active"
              items={is_active_list}
              error={errors.is_active?.message || api_errors?.is_active}
              defaultValue={defaultValues.is_active}
            />
          </div>

        </div>
        <MagicBtn label="Save" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default CategoryInfo;
