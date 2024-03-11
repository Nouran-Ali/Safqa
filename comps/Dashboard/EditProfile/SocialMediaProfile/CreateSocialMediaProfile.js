import styles from "../../../../styles/Dashboard/SocialMedia.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { SafqaSocialMediaSelect, SafqaInput, MagicSelectInput, MagicInput, SafqaSelect, SafqaSelectWithImg } from "../../Inputs";
import { MagicBtnIcon } from "../../../Buttons";
import { useTranslation } from "react-i18next";
import { createSocialMediaProfile, ResetSuccess } from "../../../../store/slices/socialMediaSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createSocialMediaProfileSchema } from "../../../../lib/validations/en/socialMediaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { createSocialMediaProfileSchemaAr } from "../../../../lib/validations/ar/socialMediaSchemaAr";
import CustomSelect from "../../CustomSelect";

const CreateSocialMediaProfile = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const dispatch = useDispatch()

  const { socialMedia, social_media_list, imageUrl, isLoading, createLoading, success, api_errors } = useSelector((state) => state.socialMedia);
  const { data: { social_media } } = useSelector((state) => state.global);


  const defaultValues = socialMedia;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createSocialMediaProfileSchema(social_media_list) :
      createSocialMediaProfileSchemaAr(social_media_list)),
    defaultValues,
  });

  useEffect(() => {
    success && reset() && dispatch(ResetSuccess());
  }, [dispatch, reset, success]);

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    dispatch(createSocialMediaProfile(data));
  };


  return (
    <div className={`${styles.border_small_screen} rounded-2 mt-3 mb-2`} dir={language == "ar" ? "rtl" : "ltr"}>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
          <SafqaSelectWithImg
            select_label
            label={t("dashboard.social_media")}
            register={register}
            options={social_media}
            option_name="name_en"
            option_name_ar="name_ar"
            name="social_id"
            error={errors.social_id?.message || api_errors?.social_id}
            imageUrl={imageUrl}
            imageName="icon"
            required
          />
          {/* <CustomSelect/> */}
          
        </div>
        <div className="col-xl-5 col-lg-5 col-md-3 col-sm-3">
          <SafqaInput
            label={t("dashboard.social_media_url")}
            register={register}
            name="url"
            error={errors.url?.message || api_errors?.url}
            required />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 mt-4 me-auto">
          <div className="mt-1 text-center">
            <MagicBtnIcon
              type="submit"
              icon={<AddRoundedIcon />}
              label={t("dashboard.create_new")}
              className={styles.MagicBtnIcon}
              isLoading={createLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSocialMediaProfile;
