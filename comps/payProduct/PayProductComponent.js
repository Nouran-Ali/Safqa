// import LoadingSpinner from "../../LoadingSpinner";
import { Modal, Button, Space, Tag } from "antd";
import {
  SafqaInput,
  SafqaRadioInput,
  SafqaTextArea,
} from "../Dashboard/Inputs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cardStyles from "../../styles/Dashboard/products/Card.module.css";
import { MagicBtn, MagicBtnCreateLink } from "../Buttons";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { EditQuantity } from "../../store/slices/payProductSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

const LinkProduct = ({ product }) => {
  const { imageUrl, profile } = useSelector((state) => state.payProduct);
  const [count, setCount] = useState(0);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();

  return (
    <div
      className={`mb-3 row mt-3 border-0 ${cardStyles.card}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div className="col-md-3">
        <div
          className={`d-flex justify-content-center ${cardStyles.cardImage}`}
        >
          <img
            src={
              product.product_image
                ? `${imageUrl}/${profile?.id}/${product.product_image}`
                : "../logo.png"
            }
            className="img-fluid rounded-start mx-auto"
            alt={product.name_en}
            // width="100px"
          />
        </div>
      </div>

      <div className="col-md-7">
        <div className="card-body mt-3">
          <h5 className="card-title mb-3 fw-bold">
            {language == "en" ? product.name_en : product.name_ar}
          </h5>
          <p className="card-text">
            {t("dashboard.price")} : {product.price} (
            {product?.currency?.short_currency})
          </p>
          <p className="card-text">
            {t("dashboard.quantity")} : {product.quantity}
          </p>
          <p className="card-text">
            {language == "en" ? product.description_en : product.description_ar}
          </p>
        </div>
      </div>

      <div className="col-md-2 mt-4">
        <div
          className={`w-75 ${
            language == "en" ? "float-end" : "float-start"
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
                  id: product.product_id,
                })
              )
            }
            disabled={product.quantity == 0}
          >
            <RemoveIcon sx={{ width: "20px" }} />
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
                  id: product.product_id,
                })
              )
            }
            disabled={product.quantity === product.max_quantity}
          >
            <AddIcon sx={{ width: "20px" }} />
          </button>
        </div>

        <div
          className={`w-75 ${
            language == "en" ? "float-end" : "float-start"
          }   mt-2 mx-auto bg-white rounded-2  ${cardStyles.quantity}`}
        >
          <span className={` ${cardStyles.price} fs-5`}>
            {t("total")} = {product.price * product.quantity} (
            {product?.currency?.short_currency})
          </span>
          {/* <button
                        type="button"
                        className={`btn border-0 px-3 rounded ${cardStyles.delete}`}
                        onClick={() => dispatch(DeleteFromCart({ id: product.id }))}
                    >
                        <DeleteIcon sx={{ width: "20px" }} />
                    </button> */}
        </div>
      </div>
    </div>
  );
};

const PayProductComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();

  const { link_products } = useSelector((state) => state.payProduct);

  return (
    <>
      <div className="container ">
        {link_products?.length &&
          link_products.map((product) => (
            <LinkProduct key={product.product_id} product={product} />
          ))}
      </div>
    </>
  );
};

export default PayProductComponent;
