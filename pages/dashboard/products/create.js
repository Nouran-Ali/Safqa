import styles from "../../../styles/Dashboard/dashboard.module.css";
import ProductInfo from "../../../comps/Dashboard/Products/ProductInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../store/slices/categorySlice";
import { getCountries } from "../../../store/slices/countrySlice";

export default function CreateNewProduct() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountries());
  }, [dispatch])
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Product Info */}
        <ProductInfo />
      </div>
    </div>
  );
}
