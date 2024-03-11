import styles from "../../../styles/Dashboard/dashboard.module.css";
import NavProducts from "../../../comps/Dashboard/Products/NavProducts";
import SearchProducts from "../../../comps/Dashboard/Products/SearchProducts";
import Products from "../../../comps/Dashboard/Products/Products";
import { getProducts as getProductsThunk } from '../../../store/slices/productSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function ProductsPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch])

  return (

    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav products*/}
        <NavProducts />

        {/* Search Products */}
        {/* <SearchProducts /> */}

        {/* Products */}
        <Products />
      </div>
    </div>
  );
}

