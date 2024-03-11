import styles from "../../styles/Dashboard/dashboard.module.css";
import MultiFactorAuthenticationComponent from "../../comps/Dashboard/MultiFactorAuthentication/MultiFactorAuthenticationComponent";

import Factors from "../../comps/Dashboard/MultiFactorAuthentication/Factors";

export default function MultiFactorAuth() {
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Multi Factor Authentication*/}
        <MultiFactorAuthenticationComponent />

        {/* Factors */}
        <Factors />
      </div>
    </div>
  );
}
