import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import CreateNewAddress from "../../../../../comps/Dashboard/Setting/CreateNewAddress";
import {AxiosJwt} from "../../../../../lib/axios";
import { useEffect } from "react";
import UpdateAddress from "../../../../../comps/Dashboard/Setting/UpdateAddress";
import { useDispatch, useSelector } from "react-redux";
import { getAddressTypes } from "../../../../../store/slices/addressTypeSlice";
import { getAreas } from "../../../../../store/slices/areaSlice";
import { getProfilesCity } from "../../../../../store/slices/citySlice";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import { getAddress } from "../../../../../store/slices/addressSlice";
import { useRouter } from "next/router";

export default function UpdateAddressPage() {

    const { address, isLoading, api_errors } = useSelector((state) => state.address);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getAddress(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getAddressTypes());
        dispatch(getAreas());
        dispatch(getProfilesCity());
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !address && isLoading && <LoadingPage />
                }
                {
                    !address && api_errors && <ErrorPage />
                }
                {
                    address && <UpdateAddress address={address} />
                }
            </div>
        </div>
    );
}

