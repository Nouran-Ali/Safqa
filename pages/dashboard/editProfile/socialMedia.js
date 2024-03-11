import styles from "../../../styles/Dashboard/dashboard.module.css";
import NavEditProfile from "../../../comps/Dashboard/EditProfile/NavEditProfile";
import SocialMedia from './../../../comps/Dashboard/EditProfile/SocialMedia';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSocialMedia } from "../../../store/slices/socialMediaSlice";

export default function SocialMediaDetails() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSocialMedia());
  }, [dispatch])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav edit profile buttons */}
        <NavEditProfile />

        {/* Social Media */}
        <SocialMedia />

      </div>
    </div>
  );
}

