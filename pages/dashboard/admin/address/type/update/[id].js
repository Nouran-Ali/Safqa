import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import AddressTypeInfoUpdate from "../../../../../../comps/admin/addressType/AddressTypeInfoUpdate";
import {AxiosJwt} from "../../../../../../lib/axios";
import { getAddressType } from "../../../../../../store/slices/addressTypeSlice";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UpdateAddressType() {

    const { addressType, isLoading, api_errors } = useSelector((state) => state.addressType);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getAddressType(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !addressType && isLoading && <LoadingPage />
                }
                {
                    !addressType && api_errors && <ErrorPage />
                }
                {
                    addressType && <AddressTypeInfoUpdate addressTypeInfo={addressType} />
                }
            </div>
        </div>
    );
}
