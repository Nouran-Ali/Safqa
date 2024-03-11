import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavProducts from "../../../../comps/Dashboard/Products/NavProducts";
import SearchCategory from "../../../../comps/Dashboard/Products/SearchCategory";
import Categories from "../../../../comps/Dashboard/Products/Categories";
import axios from "../../../../lib/axios";
import { useDispatch } from 'react-redux';
import { getCategories as getCategoriesThunk } from "../../../../store/slices/categorySlice";
import { useEffect } from 'react'


export default function ProductCategory() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoriesThunk())
    }, [dispatch]);

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav products*/}
                <NavProducts />

                {/* Search Category Products */}
                {/* <SearchCategory /> */}

                {/* Categories Products */}
                <Categories />
            </div>
        </div>
    );
}
