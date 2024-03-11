import styles from "../../../styles/Dashboard/dashboard.module.css";
import NavProducts from "../../../comps/Dashboard/Products/NavProducts";
import SearchOrderedProducts from "../../../comps/Dashboard/Products/SearchOrderedProducts";
import ProductsOrdered from "../../../comps/Dashboard/Products/ProductsOrdered";
import { useEffect } from "react";
import { getOrders } from "../../../store/slices/orderSlice";
import { useDispatch } from "react-redux";

export default function ProductsOrderedPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (

    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav products Ordered*/}
        <NavProducts />

        {/* Search Products Ordered */}
        {/* <SearchOrderedProducts /> */}

        {/* Products Ordered*/}
        <ProductsOrdered />
      </div>
    </div>
  );
}

