// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import CustomerInfoShow from "../../../comps/Dashboard/Customers/CustomerInfoShow";
import BankInfoShow from "../../../comps/Dashboard/Customers/BankInfoShow";
import axios from "./../../../lib/axios";
import {AxiosJwt} from "./../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCustomer } from "../../../store/slices/customerSlice";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";


export default function ShowCustomers() {

  const { customer, isLoading, api_errors } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && dispatch(getCustomer(id))
  }, [dispatch, id])


  return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>

        {
          !customer && isLoading && <LoadingPage />
        }
        {
          !customer && api_errors && <ErrorPage />
        }
        {
          customer &&
          <>
            <CustomerInfoShow customer={customer} />
            <BankInfoShow customer={customer} />
          </>
        }
          </div>
        </div>
  );
}
