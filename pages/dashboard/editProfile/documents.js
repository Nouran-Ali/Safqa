import styles from "../../../styles/Dashboard/dashboard.module.css";
import NavEditProfile from "../../../comps/Dashboard/EditProfile/NavEditProfile";
import DocumentsProfile from './../../../comps/Dashboard/EditProfile/DocumentsProfile';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDocuments } from "../../../store/slices/documentSlice";
import { useEffect } from "react";

export default function ProfileDocuments() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocuments())
  }, [dispatch])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav edit profile buttons */}
        <NavEditProfile />

        {/* Documents Profile */}
        <DocumentsProfile />
      </div>
    </div>
  );
}
