// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import Pusher from "pusher-js";
import ButtonsDashboard from "../../comps/Dashboard/Home/ButtonsDashboard";
import RecentInvoices from "../../comps/Dashboard/Home/RecentInvoices";
import Piechart from "../../comps/Dashboard/Home/Piechart";
import Bar from "../../comps/Dashboard/Home/Bar";
import TotalBalanceaAndTransactions from "../../comps/Dashboard/Home/TotalBalanceaAndTransactions";
import TotalPaymentMethods from "../../comps/Dashboard/Home/TotalPaymentMethods";
import Sales from "../../comps/Dashboard/Home/Sales";
import styles from "../../styles/Dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminHomePage,
  getHomePage,
  getMyData,
} from "../../store/slices/authSlice";
import AccountNote from "../../comps/Dashboard/AccountApproval/AccountNote";
import { getInvoices } from "../../store/slices/invoiceSlice";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { getProfiles } from "../../store/slices/profileSlice";
import ButtonsDashboardAdmin from "../../comps/Dashboard/Home/ButtonsDashboardAdmin";
import RecentProfiles from "../../comps/Dashboard/Home/RecentProfiles";
import { getProfilesBusiness } from "../../store/slices/profileBusinessSlice";
import { AddNewNotification } from "../../store/slices/notificationSlice";

const DashboardComp = () => {
  const {
    myData,
    statistics: { wallet_profile },
    token,
  } = useSelector((state) => state.auth);
  const { profile_business } = myData;
  const router = useRouter();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    // dispatch(getProfilesBusiness());
    dispatch(getInvoices());
  }, [dispatch]);

  return (
    <div className="row">
      <div className={`col-xl-3 col-lg-3 col-md-12 col-sm-12`}></div>

      <div className={`col-xl-6 col-lg-6 col-md-12 col-sm-12`}>
        <div className={styles.container}>
          {/* account approval status */}
          {!profile_business?.is_approval && <AccountNote />}

          {/* first buttons */}
          <ButtonsDashboard />

          {/* bar chart */}
          <Bar />

          {/* TotalBalanceaAndTransactions */}
          <TotalBalanceaAndTransactions />

          {/* Payment Methods */}
          {/* <TotalPaymentMethods /> */}

          {/* Sales */}
          <Sales />
        </div>
      </div>
      <div className={"col-xl-3 col-lg-3 col-md-12 col-sm-12 overflow-auto"}>
        <div className={`position-fixed ${styles.fixed} ${styles.container}`}>
          {/* Recent Invoices */}
          <RecentInvoices />

          {/* pie chart */}
          {
            // wallet_profile?.total_balance > 0 &&
            <div className="mx-auto d-flex justify-content-center">
              <Piechart />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

const DashboardAdminComp = () => {
  const {
    myData,
    statistics: { wallet_profile },
  } = useSelector((state) => state.auth);
  const { profile_business } = myData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <div className="row">
      <div className={`col-xl-3 col-lg-3 col-md-12 col-sm-12`}></div>

      <div className={`col-xl-6 col-lg-6 col-md-12 col-sm-12`}>
        <div className={styles.container}>
          {/* account approval status */}
          {/* {!profile_business?.is_approval && <AccountNote />} */}

          {/* first buttons */}
          <ButtonsDashboardAdmin />

          {/* bar chart */}
          <Bar />

          {/* TotalBalanceaAndTransactions */}
          <TotalBalanceaAndTransactions />

          {/* Payment Methods */}
          {/* <TotalPaymentMethods /> */}

          {/* Sales */}
          <div className="mt-3"></div>
          {/* <Sales /> */}
        </div>
      </div>
      <div
        className={`col-xl-3 col-lg-3 col-md-12 col-sm-12 overflow-auto ${styles.container}`}
      >
        <RecentProfiles />
        <div className={`position-fixed ${styles.fixed} `}>
          {/* Recent Profiles */}

          {/* pie chart */}
          {
            // wallet_profile?.total_balance > 0 &&
            // <div className="mx-auto d-flex justify-content-center">
            //   <Piechart />
            // </div>
          }
        </div>
      </div>
    </div>
  );
};

const LoadingComp = () => {
  return (
    <div className={styles.container}>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border safqa-text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const nav_active = useSelector((state) => state.sideNav.isActive);
  const { isLoading, error, myData, token } = useSelector(
    (state) => state.auth
  );
  const { notifications } = useSelector((state) => state.notification);
  const [isActive, setIsActive] = useState();
  const dispatch = useDispatch();
  let decoded = jwt_decode(token);
  const role = decoded?.role_type;

  // useEffect(() => {
  //   if (role == 'admin') {
  //     dispatch(getAdminHomePage())
  //     dispatch(getProfiles())
  //   } else {
  //     dispatch(getHomePage())
  //   }
  // }, [dispatch, role])
  useEffect(() => {
    setIsActive(nav_active);
  }, [nav_active]);

  if (isLoading) return <LoadingComp />;
  return <>{role == "admin" ? <DashboardAdminComp /> : <DashboardComp />}</>;
}
