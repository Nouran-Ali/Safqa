import Head from "next/head";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Dashboard/dashboard.module.css";
import ChangePasswordComponent from "../../comps/Dashboard/ChangePassword/ChangePassword";

export default function ChangePassword() {
  const [isActive, setIsActive] = useState();
  const nav_active = useSelector((state) => state.sideNav.isActive)

  useEffect(() => {
    setIsActive(nav_active);
  }, [nav_active]);

  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Change Password */}
            <ChangePasswordComponent />
          </div>
        </div>
    </>
  );
}

