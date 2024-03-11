// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import ProductInfoShow from "../../../../../comps/Dashboard/Products/ProductInfoShow";
import axios from "../../../../../lib/axios";
import CategoryInfoUpdate from '../../../../../comps/Dashboard/Products/CategoryInfoUpdate';
import {AxiosJwt} from "../../../../../lib/axios";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCategory } from "../../../../../store/slices/categorySlice";
import { useEffect } from "react";


export default function UpdateCategory() {
  const { category, isLoading, api_errors } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && dispatch(getCategory(id))
  }, [dispatch, id])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {
          !category && isLoading && <LoadingPage />
        }
        {
          !category && api_errors && <ErrorPage />
        }
        {
          category && <CategoryInfoUpdate category={category} />
        }
        
      </div>
    </div>
  );
}
