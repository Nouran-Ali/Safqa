import { useState, useEffect } from "react";
import styles from "../../../styles/Dashboard/products/Card.module.css";
import Link from "next/link";

const TotalPriceToSite = () => {

  return (
    <div className="px-5 d-flex justify-content-end">
      <div className="text-center">
        <div className="d-flex justify-content-center fs-5">
          <p className={` ${styles.details}`}>Total:</p>
          <p className="ms-2 fw-bold">150 $</p>
        </div>
        <div className="d-flex justify-content-center">
          <Link href="#" type="button" className={`btn mb-3 ${styles.next}`}>
            
              Next
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceToSite;
