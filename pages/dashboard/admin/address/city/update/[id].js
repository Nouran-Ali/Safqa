import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import CityInfoUpdate from "../../../../../../comps/admin/city/CityInfoUpdate";
import {AxiosJwt} from "../../../../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCity } from "../../../../../../store/slices/citySlice";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { getCountries } from "../../../../../../store/slices/countrySlice";

export default function UpdateCityPage() {

    const { city, isLoading, api_errors } = useSelector((state) => state.city);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getCity(id))
    }, [dispatch, id])


    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !city && isLoading && <LoadingPage />
                }
                {
                    !city && api_errors && <ErrorPage />
                }
                {
                    city && <CityInfoUpdate cityInfo={city} />
                }
            </div>
        </div>
    );
}
