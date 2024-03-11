import styles from "../../../../styles/Dashboard/dashboard.module.css";
import CreateNewAddress from "../../../../comps/Dashboard/Setting/CreateNewAddress";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAddressTypes } from "../../../../store/slices/addressTypeSlice";
import { getAreas } from "../../../../store/slices/areaSlice";
import { getProfilesCity } from "../../../../store/slices/citySlice";

export default function CreateAdresse() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddressTypes());
    dispatch(getAreas());
    dispatch(getProfilesCity());
  }, [dispatch])

  return (

    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>

        {/* Create New Adresse */}
        <CreateNewAddress />
      </div>
    </div>
  );
}

