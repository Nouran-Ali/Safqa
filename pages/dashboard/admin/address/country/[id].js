import CountryShow from "../../../../../comps/admin/country/CountryShow";
import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCountry } from "../../../../../store/slices/countrySlice";

export default function ShowCountry() {
    const { country, isLoading, api_errors } = useSelector((state) => state.country);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getCountry(id))
    }, [dispatch, id])


    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !country && isLoading && <LoadingPage />
                }
                {
                    !country && api_errors && <ErrorPage />
                }
                {
                    country && <CountryShow country={country}/>
                }
                
            </div>
        </div>
    );
}
