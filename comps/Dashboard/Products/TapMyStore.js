import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/products/TapMyStore.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const TapMyStore = ({ activeLink, setActiveLink }) => {
  const { theme } = useTheme()
  const router = useRouter();
  const { pathname } = router;

  const [innerWidth, setInnerWidth] = useState()
  const { categories } = useSelector(state => state.category)

  useEffect(() => {
    setInnerWidth(window.innerWidth)
    console.log(pathname)
  }, [pathname])

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={` mt-3 mb-4 ${styles.tap} ${language == "ar" && "me-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <Swiper
        spaceBetween={10}
        slidesPerView={innerWidth < 767.98 ? 2 : 5}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <button
            className={`btn mb-3 p-1 px-4 border rounded-2 
              ${theme == 'dark' ? styles.link_dark : styles.link} 
              ${activeLink == "all" ?
                theme == 'dark' ?
                  `border-0 ${styles.active_dark}` :
                  `border-0 ${styles.active}` :
                ''}`}
            onClick={(e) => setActiveLink(`all`)}
          >
            {language == 'en' ? "All" : "الكل"}

          </button>
        </SwiperSlide>

        {/* <select
          onChange={(e) => setActiveLink(e.target.value)}
        >
          <option value="all">All</option>
          {categories?.map(category =>
            <option
              key={category.name_en}
              value={category.name_en}
            >
              {language == 'en' ? category.name_en : category.name_ar}
            </option>)}
        </select> */}

        {categories?.map(({ name_en, name_ar, id }) => (
          <SwiperSlide key={id}>
            <button
              // href={`#`}
              className={`btn mb-3 p-1 px-4 border rounded-2 
              ${theme == 'dark' ? styles.link_dark : styles.link} 
               ${activeLink == name_en ?
                  theme == 'dark' ?
                    `border-0 ${styles.active_dark}` :
                    `border-0 ${styles.active}` :
                  ''}`}
              onClick={() => setActiveLink(name_en)}

            >

              {language == 'en' ? name_en : name_ar}

            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TapMyStore;
