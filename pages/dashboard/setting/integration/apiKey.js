import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavSetting from "../../../../comps/Dashboard/Setting/NavSetting";
import NavIntegration from "../../../../comps/Dashboard/Setting/NavIntegration";
import WebhookSetting from "../../../../comps/Dashboard/Setting/WebhookSetting";
import { useDispatch, useSelector } from "react-redux";
import ApiKeySetting from "../../../../comps/Dashboard/Setting/ApiKeySetting";
import { useEffect } from "react";
import { getApiKey } from "../../../../store/slices/integrationSlice";

export default function APIKEY() {
    const { api_key, isLoading, success } = useSelector(state => state.integration)

    const dispatch = useDispatch()

    useEffect(() => {
       !api_key && dispatch(getApiKey())
    }, [api_key, dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav Setting */}
                <NavSetting />

                <NavIntegration />

                <ApiKeySetting />
            </div>
        </div>
    );
}
