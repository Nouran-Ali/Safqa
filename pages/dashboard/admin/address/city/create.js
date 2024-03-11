import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import CityInfo from "../../../../../comps/admin/city/CityInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../../../../../store/slices/countrySlice";

export default function CreateNewCity() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <CityInfo />
            </div>
        </div>
    );
}
