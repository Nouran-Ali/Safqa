import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavProducts from "../../../../comps/Dashboard/Products/NavProducts";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductsLinks } from "../../../../store/slices/productLinkSlice";
import ProductLinks from "../../../../comps/Dashboard/Products/ProductLinks";

export default function ProductLinksPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsLinks())
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav products*/}
                <NavProducts />

                {/* Search Products */}
                {/* <SearchProducts /> */}

                {/* Products */}
                <ProductLinks />
            </div>
        </div>
    );
}

