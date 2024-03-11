import styles from "../../../styles/Dashboard/SocialMedia.module.css";
import CreateSocialMedia from "./SocialMediaProfile/CreateSocialMediaProfile";
import SocialMediaItemsProfile from "./SocialMediaProfile/SocialMediaItemsProfile";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSocialMediaProfile } from "../../../store/slices/socialMediaSlice";

const SocialMediaProfile = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSocialMediaProfile());
  }, [dispatch]);

  return (
    <div
      className={` ${language == "en" ? "safqa-responsive-width-75" : "me-5"} ${
        styles.SocialMedia
      }`}
    >
      <CreateSocialMedia />
      <SocialMediaItemsProfile />
    </div>
  );
};

export default SocialMediaProfile;
