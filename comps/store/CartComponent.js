// import LoadingSpinner from "../../LoadingSpinner";
import { Modal, Button, Space, Tag } from 'antd';
import {
  SafqaInput,
  SafqaRadioInput,
  SafqaTextArea,
} from '../Dashboard/Inputs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cardStyles from '../../styles/Dashboard/products/Card.module.css';
import { MagicBtn, MagicBtnCreateLink } from '../Buttons';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DeleteFromCart, EditQuantity } from '../../store/slices/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

const NewCartProduct = ({ product }) => {
  console.log(
    '🚀 ~ file: CartComponent.js:22 ~ NewCartProduct ~ product:',
    product
  );
  const { urlImage, profile } = useSelector((state) => state.cart);
  const [count, setCount] = useState(0);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();

  return (
    <div
      className={`mb-3 row mt-4 border-bottom border-0 ${cardStyles.card}`}
      dir={language == 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="col-md-3 mb-4">
        <div
          className={`d-flex justify-content-center ${cardStyles.cardImage}`}
        >
          <img
            src={
              product.product_image
                ? `${urlImage}/${product.product_image}`
                : '../logo.png'
            }
            className="img-fluid rounded-start mx-auto"
            alt="Nokia phone"
            // width="100px"
          />
        </div>
      </div>

      <div className="col-md-7">
        <div className="card-body mt-3">
          <h5 className="card-title mb-3 fw-bold">
            {language == 'en' ? product.name_en : product.name_ar}
          </h5>
          <p className="card-text">
            {t('dashboard.price')} : {product.price}{' '}
            {profile?.currency?.short_currency}
          </p>
          <p className="card-text">
            {t('dashboard.quantity')} : {product.quantity}
          </p>
          <p className="card-text">
            {language == 'en' ? product.description_en : product.description_ar}
          </p>
        </div>
      </div>

      <div className="col-md-2 mt-4">
        <div
          className={`w-75 ${
            language == 'en' ? 'float-end' : 'float-start'
          }  mx-auto bg-white rounded-2 p-1 d-flex justify-content-between ${
            cardStyles.quantity
          }`}
        >
          <button
            className="border-1 bg-white"
            // onClick={() => setCount(count - 1)}
            onClick={() =>
              dispatch(
                EditQuantity({
                  quantity: product.quantity - 1,
                  id: product.id,
                })
              )
            }
            disabled={product.quantity == 1}
          >
            <RemoveIcon sx={{ width: '20px' }} />
          </button>
          <span className={`fs-5 p-1 px-3 ms-2 ${cardStyles.count}`}>
            {product.quantity}
          </span>
          <button
            className="border-1 bg-white ms-2"
            onClick={() =>
              dispatch(
                EditQuantity({
                  quantity: product.quantity + 1,
                  id: product.id,
                })
              )
            }
            disabled={product.quantity === product.max_quantity}
          >
            <AddIcon sx={{ width: '20px' }} />
          </button>
        </div>

        <div
          className={`w-75 ${
            language == 'en' ? 'float-end' : 'float-start'
          }  mt-2 mx-auto bg-white rounded-2  d-flex align-items-center justify-content-between ${
            cardStyles.quantity
          }`}
        >
          <span className={` ${cardStyles.price} fs-5`}>
            {product.price * product.quantity}{' '}
            {profile?.currency?.short_currency}
          </span>
          <button
            type="button"
            className={`btn border-0 px-3 rounded ${cardStyles.delete}`}
            onClick={() => dispatch(DeleteFromCart({ id: product.id }))}
          >
            <DeleteIcon sx={{ width: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CartComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();

  const { cart_products } = useSelector((state) => state.cart);

  useEffect(() => {
    let tempTotal = 0;
    cart_products.map((p) => (tempTotal = tempTotal + p.quantity * p.price));
    setTotal(tempTotal);
  }, [cart_products, total]);

  return (
    <>
      <div className="container ">
        {cart_products.length > 0 ? (
          <>
            {cart_products.map((product) => (
              <NewCartProduct key={product.id} product={product} />
            ))}
          </>
        ) : (
          <p className="fs-5  mt-3 text-center text-danger">
            There is no products in cart.
            <Link
              className="text-decoration-underline mx-1"
              href={`/store/${id}`}
            >
              Go To Store
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default CartComponent;
