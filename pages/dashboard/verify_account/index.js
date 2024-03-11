import AccountApproval from "../../../comps/Dashboard/AccountApproval/AccountApproval";
import IdentityDocumentation from "../../../comps/Dashboard/AccountApproval/IdentityDocumentation";
import styles from "../../../styles/Dashboard/dashboard.module.css";

const VerifyAccount = () => {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <IdentityDocumentation />
                {/* <AccountApproval /> */}
            </div>
        </div>
    )
}

export default VerifyAccount
