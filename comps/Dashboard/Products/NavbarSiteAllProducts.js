import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "../../../styles/Dashboard/products/NavbarSiteAllProducts.module.css";
import { useTranslation } from "react-i18next";
import CartComponent from "../../store/CartComponent";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const NavbarSiteAllProducts = ({imageSrc, href}) => {

  const [t, i18n] = useTranslation();
  const { language, changeLanguage } = i18n;

  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const { cart_products } = useSelector(
    (state) => state.cart
  );

  const toggleLanguage = () => {
    if (language == 'en') {
      setCookie('language', 'ar')
      changeLanguage('ar')
    } else {
      setCookie('language', 'en')
      changeLanguage('en')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-transparent" dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`container-fluid container mt-2 ${language == "en" && "px-4"}`}>
        <Link href={href} className={"mx-3"}>

          <img src={imageSrc} width="60px" />

        </Link>

        <div className={`${language == "en" && "ms-auto"} d-flex mb-2 mb-lg-0`}>
          <button
            type="button"
            className={`p-2 mx-2 border-0 rounded-2 position-relative ${styles.btnsNav}`}
            onClick={toggleLanguage}
          >
            {language == "en" ? "AR" : "EN"}
          </button>
          {
            pathname.includes('store') &&
            <button
              type="button"
              className={`p-2 mx-2 border-0 rounded-2 position-relative ${styles.btnsNav}`}
              onClick={() => router.push(`/store/${id}/cart`)}
            >
              <ShoppingCartIcon />
              <span
                className={`position-absolute top-0 start-100 badge translate-middle p-1 px-2 border border-light rounded-circle ${styles.circleShape}`}
              >
                {cart_products?.length}
              </span>
            </button>
          }
          {/* <div>
            <CartComponent />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSiteAllProducts;
