import styles from "../../../styles/Dashboard/dashboard.module.css";
import Contact from "../../../comps/Dashboard/Help/Contact";
import LeaveAMessage from "../../../comps/Dashboard/Help/LeaveAMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContacts } from "../../../store/slices/contactSlice";
import { getSupportTypes } from "../../../store/slices/supportTypeSlice";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";
import { getAbouts } from "../../../store/slices/aboutSlice";

export default function Help() {
  const dispatch = useDispatch()
  const { contacts, isLoading, api_errors } = useSelector(state => state.contact)

  useEffect(() => {
    dispatch(getContacts());
    dispatch(getAbouts());
    dispatch(getSupportTypes());
  }, [dispatch])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {
          !contacts && isLoading && <div className="vh-100"><LoadingPage /></div>
        }
        {
          !contacts && api_errors && <ErrorPage />
        }
        {
          contacts &&
          <>
            <Contact contacts={contacts} />
            <LeaveAMessage />
          </>
        }
      </div>
    </div>
  );
}
