import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GetItInAS, GetItInGP } from '../../comps/Buttons';
import styles from '../../styles/ourApp/ourApp.module.css';

const isMobile = () => {
  const threshold = 576;
  return window.innerWidth <= threshold;
};

const isDesktop = () => {
  const threshold = 992;
  return window.innerWidth > threshold;
};

export default function OurApp() {
  const isSmallScreen = isMobile();
  const isLargeScreen = isDesktop();

  const [t, i18n] = useTranslation();
  const our_app_phrases = t('our_app.phrases', {
    returnObjects: true,
  });

  console.log(our_app_phrases);

  return (
    <div className="container aboutPage mt-lg-5">
      <div className="row">
        {isSmallScreen ? (
          <>
            <FirstImage />
            <FirstSection phrases={our_app_phrases.slice(0, 2)} />
            <SecondImage />
            <SecondSection phrases={our_app_phrases.slice(0, 2)} />
          </>
        ) : (
          <>
            <FirstSection phrases={our_app_phrases.slice(0, 2)} />

            <FirstImage />
            <SecondImage />
            <SecondSection phrases={our_app_phrases.slice(0, 2)} />
          </>
        )}
      </div>
    </div>
  );
}

const FirstSection = ({ phrases }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div
      dir={language == 'en' ? 'ltr' : 'rtl'}
        className={`col-xl-6 col-lg-6 col-md-12 col-sm-6 mt-3 ${styles.first_section}`}
      >
        <div className="mx-3 text-right">
          <div className="px-md-5 text-right">
            {phrases.map((p, index) => (
              <p key={index} className="fs-5 px-md-5">
                {p}
              </p>
            ))}
          </div>
          <div className="btns-ourapp mt-5 mb-3 d-flex justify-content-center">
            <GetItInGP
              className="btnApp btnBlack pointer px-5 "
              label={t('button.getapp')}
            />
            <GetItInAS
              className="btnApp btnBlack pointer px-5 mx-3 "
              label={t('button.getapp')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const FirstImage = () => {
  const isSmallScreen = isMobile();

  return (
    <div
      className={`col-xl-6 col-lg-6 col-md-12 col-sm-6 text-center p-4  ${
        isSmallScreen ? 'mt-4' : ''
      }`}
    >
      <img
        className={`${styles.right_img} `}
        src="/ourApp/right.png"
        alt="app"
        height="350px"
      />
    </div>
  );
};

const SecondSection = ({ phrases }) => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div
        dir={language == 'en' ? 'ltr' : 'rtl'}
        className={`col-xl-6 col-lg-6 col-md-12 col-sm-6  p-4 ${styles.first_section}`}
      >
        <div className="mx-3 text-justify">
          <div className="px-md-5">
            {phrases.map((p, index) => (
              <p key={index} className="fs-5 px-md-5">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SecondImage = () => {
  const isSmallScreen = isMobile();

  return (
    <div
      className={`col-xl-6 col-lg-6 col-md-12 col-sm-6 text-center my-4  ${
        isSmallScreen ? 'mt-4' : ''
      }`}
    >
      <img
        className={`${styles.left_img} `}
        src="/ourApp/left.png"
        alt="app"
        height="350px"
      />
    </div>
  );
};
