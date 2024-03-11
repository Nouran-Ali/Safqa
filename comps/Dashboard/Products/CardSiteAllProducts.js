import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import styles from '../../../styles/Dashboard/products/Card.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddToCart,
  DeleteFromCart,
  EditQuantity,
  hydrateCartState,
} from '../../../store/slices/cartSlice';
import { DeleteOutlined } from '@ant-design/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

const StoreProduct = ({
  categories,
  product,
  urlImage,
  activeLink,
  currency,
}) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const { cart_products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12">
      <div
        className={`card text-center mb-3 mt-3 border-0 ${styles.card} ${styles.cardSite}`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="">
          <div className={`d-flex justify-content-center ${styles.cardImage}`}>
            <img
              src={
                product.product_image
                  ? `${urlImage}/${product.product_image}`
                  : '../logo.png'
              }
              className="rounded-start "
              alt={product.name_en}
              // width="120px"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title mb-3 fw-bold">
              {language == 'en' ? product.name_en : product.name_ar}
            </h5>

            <p className="card-text">
              {language == 'en'
                ? product.description_en
                : product.description_ar}
            </p>
            {activeLink == 'all' && (
              <p className="card-text">
                {t('dashboard.category')}:{' '}
                {categories?.map(
                  (c) =>
                    product.category_id == c.id &&
                    c[language == 'en' ? 'name_en' : 'name_ar']
                )}
              </p>
            )}
            {/* <p className="card-text">{t("dashboard.price")} : {product.price}$</p> */}
          </div>

          <div className="d-flex justify-content-center mx-auto">
            {/* <p className="card-text d-flex align-items-center safqa-bg-primary-dashboard-gradient px-3 position-absolute">{product.price}$</p> */}
            {product.in_cart ? (
              <button
                type="button"
                className={`py-2 w-75 border-0 rounded-4 mb-3 position-relative ${styles.add} ${styles.goCart}`}
                onClick={() => dispatch(() => router.push(`/store/${id}/cart`))}
              >
                <span className="mx-2 d-flex">
                  <p className="card-text d-flex text-light rounded-4 safqa-bg-primary-dashboard position-absolute start-0 top-0 bottom-0 fs-5 ms-auto h-100 px-3">
                    {product.price} {currency}
                  </p>
                  <span className="ms-auto me-3">
                    {t('dashboard.Go_to_cart')}
                  </span>
                </span>
              </button>
            ) : product.quantity > 0 ? (
              <button
                type="button"
                className={`py-2 w-75 border-0 rounded-4 mb-3 position-relative ${styles.add}`}
                onClick={() => dispatch(AddToCart(product))}
              >
                <span className="mx-2 d-flex">
                  <p className="card-text d-flex text-light rounded-4 safqa-bg-primary-dashboard position-absolute start-0 top-0 bottom-0 fs-5 ms-auto h-100 px-3">
                    {product.price} {currency}
                  </p>
                  <span className="ms-auto me-3">
                    {t('dashboard.add_to_cart')}
                  </span>
                </span>
              </button>
            ) : (
              <p
                className={`alert alert-warning text-dark py-2 w-100 border-0 rounded mx-auto mb-3 `}
              >
                This product is out of stock
              </p>
            )}
          </div>

          {/* <div className="col-md-2">
            <div className="mt-4">
              <p className={`card-text ms-4 ${styles.quantityheader}`}>
                {t("dashboard.quantitiy")}
              </p>
              <div
                className={`w-75 mx-auto bg-white rounded-2 p-1 d-flex justify-content-between ${styles.quantity}`}
              >
                <button
                  className="border-1 bg-white"
                  onClick={() => setCount(count - 1)}
                  disabled={count === 0}
                >
                  <RemoveIcon sx={{ width: "20px" }} />
                </button>
                <span className={`fs-5 p-1 px-3 ms-2 ${styles.count}`}>
                  {count}
                </span>
                <button
                  className="border-1 bg-white ms-2"
                  onClick={() => setCount(count + 1)}
                >
                  <AddIcon sx={{ width: "20px" }} />
                </button>
              </div>
              <div>
                <p className={` ms-4 ${styles.price}`}>{product.price} $</p>
              </div>
              <div className="d-flex">
                {
                  inCart ?
                    <button
                      type="button"
                      className={`border-0 rounded mx-auto mb-3 ${styles.add}`}
                      onClick={() => dispatch(DeleteFromCart({ id: product.id }))}
                    >
                      {t("dashboard.delete")}
                    </button>
                    :
                    <button
                      type="button"
                      className={`border-0 rounded mx-auto mb-3 ${styles.add}`}
                      onClick={() => dispatch(AddToCart({ id: product.id, quantity: count, price: product.price }))}
                    >
                      {t("dashboard.add_to_cart")}
                    </button>
                }

              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const CardSiteAllProducts = ({ activeLink }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const {
    cart_products,
    store_products,
    products,
    categories,
    urlImage,
    profile,
  } = useSelector((state) => state.cart);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();

  useEffect(() => {
    activeLink &&
      activeLink !== 'all' &&
      categories &&
      categories?.map((c) => c.name_en == activeLink && setActiveCategory(c));
  }, [activeLink, categories]);

  return (
    <>
      <div className="container">
        <div className="row">
          {activeLink !== 'all'
            ? store_products?.map((product) => {
                if (product?.category_id == activeCategory?.id) {
                  return (
                    <StoreProduct
                      key={product.id}
                      product={product}
                      categories={categories}
                      urlImage={urlImage}
                      activeLink={activeLink}
                      currency={profile?.currency?.short_currency}
                    />
                  );
                }
              })
            : store_products?.map((product) => {
                return (
                  <StoreProduct
                    key={product.id}
                    product={product}
                    categories={categories}
                    urlImage={urlImage}
                    activeLink={activeLink}
                    currency={profile?.currency?.short_currency}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default CardSiteAllProducts;
