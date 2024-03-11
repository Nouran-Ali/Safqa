// import Link from "next/link";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '../../../styles/Dashboard/products/CardMyStore.module.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';

const CardMyStore = ({ product }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();
  const { urlImage } = useSelector((state) => state.product);
  const { profile_business } = useSelector((state) => state.profileBusiness);

  return (
    <div
      className={`card border-0 me-3 mb-3 mx-auto ${
        theme == 'dark' ? styles.CardMyStore_dark : styles.CardMyStore
      }`}
      dir={language == 'ar' ? 'rtl' : 'ltr'}
    >
      <div
        className={` d-flex justify-content-center ${
          theme == 'dark' ? styles.cardImage_dark : styles.cardImage
        }`}
      >
        <img
          // src={`/dashboard/Headphones.jpg`}
          src={`${urlImage}/${product.product_image}`}
          className=" rounded-start mx-auto"
          alt={product.name_en}
          // width="160px"
          height="120px"
        />
      </div>
      <div className="btn-group  position-absolute end-0 mt-2">
        {/* <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
      </Dropdown> */}

        <Link
          href={`/dashboard/products/${product.id}`}
          className="me-3 text-secondary opacity-75"
        >
          <Tooltip
            className="mb-2"
            placement="top"
            title={language == 'en' ? 'more details' : 'عرض المنتج'}
          >
            {/* <Button>Top</Button> */}
            <InfoCircleOutlined />
          </Tooltip>
        </Link>
      </div>

      {/* <div className="btn-group  position-absolute end-0 mt-2">
        <button
          type="button"
          className="btn border-0"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <MoreVertIcon />
        </button>
        <ul className={`dropdown-menu dropdown-menu-end rounded-0 me-2 p-2 px-2
        ${theme == 'dark' ? "dark-dropdown-menu" : ""}`}>
          <li>
            <button className={`dropdown-item mt-1 ${theme == 'dark' ? "dark-dropdown-item" : ""}`} type="button">
              Product details
            </button>
          </li>
          <li>
            <button className={`dropdown-item mt-1 ${theme == 'dark' ? "dark-dropdown-item" : ""}`} type="button">
              Remove from the store
            </button>
          </li>
        </ul>
      </div> */}

      <div className="card-body text-center text-dark">
        <p className="card-text">
          {language == 'en' ? product.name_en : product.name_ar}
        </p>
        <p
          className={`card-text fw-bold ${theme == 'dark' ? 'dark-title' : ''}`}
        >
          {product.price} {profile_business?.country?.short_currency}
        </p>
      </div>
    </div>
  );
};

export default CardMyStore;
