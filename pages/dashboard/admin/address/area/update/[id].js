import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import AreaInfoUpdate from "../../../../../../comps/admin/area/AreaInfoUpdate";
import {AxiosJwt} from "../../../../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCities } from "../../../../../../store/slices/citySlice";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { getArea } from "../../../../../../store/slices/areaSlice";

export default function UpdateAreaPage() {

    const { area, isLoading, api_errors } = useSelector((state) => state.area);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getArea(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !area && isLoading && <LoadingPage />
                }
                {
                    !area && api_errors && <ErrorPage />
                }
                {
                    area && <AreaInfoUpdate areaInfo={area} />
                }

            </div>
        </div>
    );
}
