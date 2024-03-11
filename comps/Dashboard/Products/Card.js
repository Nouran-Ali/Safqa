import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import styles from "../../../styles/Dashboard/products/Card.module.css";
// import Slideshow from "./Slideshow";
import { useTranslation } from "react-i18next";

const Card = () => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(150);
  const [total, setTotal] = useState(0);
  
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    setTotal((price * count)+ 15);
  }, [count, price]);

  const cardData = [
    {
      src: "/dashboard/Headphones.jpg",
      name: "Headphones",
      description:
        "Soundcore by Anker Life Q30 Hybrid Active Noise Cancelling Headphones with Multiple Modes",
      category: "Electronic Devices",
      color: "Black",
      price: "150",
    },
  ];

  return <>
    {cardData.map(({ src, name, description, category, color, price }) => (
      <div className={`card mb-3 mt-3 border-0 ${styles.card}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <div className="row g-0">
          <div className="col-md-3">
            <div
              className={` d-flex justify-content-center ms-5 ${styles.cardImage}`}
            >
              <img
                src={src}
                className="img-fluid rounded-start mx-auto"
                alt="Nokia phone"
                width="100px"
              />
              {/* <Slideshow /> */}
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title mb-3 fw-bold">{name}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <div className="d-flex">
                  <p className={styles.details}>{t("dashboard.category")} :</p>
                  <p className="ms-2">{category}</p>
                </div>
                <div className="d-flex">
                  <p className={styles.details}>{t("dashboard.color")} :</p>
                  <p className="ms-2">{color}</p>
                </div>
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="mt-4 ">
              <p className={`card-text ms-4 ${styles.quantityheader}`}>
                {t("dashboard.quantitiy")}
              </p>
              <div
                className={`w-75 bg-white rounded-2 p-1 d-flex justify-content-between ${styles.quantity}`}
              >
                <button
                  className="border-1 bg-white"
                  onClick={() => setCount(count - 1)}
                  disabled={count === 1}
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
                <p className={` ms-4 ${styles.price}`}>{price} $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}

    <div className="px-5 d-flex justify-content-end" dir={language == "ar"  ? "rtl" : "ltr"}>
      <div className="text-center">
        <div className="d-flex justify-content-center">
          <p className={` ${styles.details}`}>{t("dashboard.shipping")} :</p>
          <p className="ms-2 fw-bold">15 $</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className={` ${styles.details}`}>{t("dashboard.total")} :</p>
          <p className="ms-2 fw-bold">{total} $</p>
        </div>
        <div className="d-flex justify-content-center">
          <Link
            href="/dashboard/invoiceDesign"
            type="button"
            className={`btn mb-3 rounded-2 ${styles.Checkout}`}>

            {t("dashboard.checkout")}

          </Link>
        </div>
      </div>
    </div>
  </>;
};

export default Card;
