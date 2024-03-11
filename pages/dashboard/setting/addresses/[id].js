import styles from "../../../../styles/Dashboard/dashboard.module.css";
import ShowAddressDetails from "../../../../comps/Dashboard/Setting/ShowAddressDetails";
import {AxiosJwt} from "../../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getAddress } from "../../../../store/slices/addressSlice";
import { useEffect } from "react";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";

export default function AdresseDetails() {
    const { address, isLoading, api_errors } = useSelector((state) => state.address);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getAddress(id))
    }, [dispatch, id])

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
                    address && <ShowAddressDetails address={address} />
                }
            </div>
        </div>
    );
}

