import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/products/Tap.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const Tap = ({ activeLink, setActiveLink }) => {
  const { products, categories } = useSelector((state) => state.cart);
  const { theme } = useTheme();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter();
  const { pathname } = router;

  const [innerWidth, setInnerWidth] = useState()

  useEffect(() => {
    setInnerWidth(window.innerWidth)
  }, [])

  return <>
    <div className={`container border-bottom mt-3 mb-4  ${styles.tap}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <Swiper
        spaceBetween={10}
        slidesPerView={innerWidth < 767.98 ? 2 : 5}
      >
        <SwiperSlide>
          <Link
            href={`#all`}
            className={`btn mb-3 p-1 px-4 border rounded-2 
              ${theme == 'dark' ? styles.link_dark : styles.link} 
              ${activeLink == "all" ?
                theme == 'dark' ?
                  `border-0 ${styles.active_dark}` :
                  `border-0 ${styles.active}` :
                ''}`}
            onClick={() => setActiveLink(`all`)}
          >
            {language == 'en' ? "All" : "الكل"}
          </Link>
        </SwiperSlide>

        {categories?.map(({ name_en, name_ar, id }) => (
          <SwiperSlide key={id}>
            <Link
              href={`#${name_en}`}
              className={`btn mb-3 p-1 px-4 border rounded-2 
              ${theme == 'dark' ? styles.link_dark : styles.link} 
               ${activeLink == name_en ?
                  theme == 'dark' ?
                    `border-0 ${styles.active_dark}` :
                    `border-0 ${styles.active}` :
                  ''}`}
              onClick={(e) => setActiveLink(name_en)}
            >
              {language == 'en' ? name_en : name_ar}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Swiper
      spaceBetween={10}
      slidesPerView={ innerWidth < 767.98 ? 2 : 7 }
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {CategoryList.map(({ url, name }) => (
        <SwiperSlide key={url}>
          <Link
            href={url}
            className={`btn mb-3 px-4 border-0 ${styles.link} ${pathname === `/dashboard/products/${url}` && ` ${styles.active}`}`}>

            {name}

          </Link>
        </SwiperSlide>
      ))}
    </Swiper> */}

    </div>
  </>;
};

export default Tap;
