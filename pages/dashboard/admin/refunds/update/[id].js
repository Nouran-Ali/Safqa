import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import AdminBankInfoUpdate from "../../../../../comps/admin/bank/AdminBankInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getBank, getBanks } from "../../../../../store/slices/bankSlice";
import { useEffect } from "react";
import { getCountries } from "../../../../../store/slices/countrySlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdateAdminBank() {

    const { bank, isLoading, api_errors } = useSelector((state) => state.bank);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(getBanks());
        dispatch(getCountries());
    }, [dispatch])


    useEffect(() => {
        id && dispatch(getBank(id))
    }, [dispatch, id])


    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !bank && isLoading && <LoadingPage />
                }
                {
                    !bank && api_errors && <ErrorPage />
                }
                {
                    bank && <AdminBankInfoUpdate bankInfo={bank} />
                }
            </div>
        </div>
    );
}
