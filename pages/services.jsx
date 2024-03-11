import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { style } from '@mui/system';
import styles from './../styles/services.module.scss';

const Services = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
      <div className={styles.services}>
        {/* services init */}
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            {language == 'en' ? (
              <>
                <span className="safqa-darkgrey-color">
                  {t('servicespage.safqa')}
                </span>{' '}
                {t('servicespage.services')}
              </>
            ) : (
              <>
                {t('servicespage.services')}{' '}
                <span className="safqa-darkgrey-color">
                  {t('servicespage.safqa')}
                </span>
              </>
            )}
          </h2>
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <div
                data-aos="slide-right"
                data-aos-offset="100"
                dir={language == 'ar' ? 'rtl' : 'ltr'}
              >
                <h2 className={`${styles.header} safqa-text-primary`}>
                  {t('services.title')}
                </h2>
                <p className={`${styles.paragraph} fs-5`}>{t('services.p')}</p>
              </div>
              <div>
                {/* here is the cut rope imgs  */}
                <img
                  src="/sevices/line-left-services.png"
                  width="750px"
                  className={
                    styles.lineLeftServices + ' position-absolute start-0 mt-5'
                  }
                />
              </div>
            </div>
            <div
              className={
                styles.animationSevices + ' col-md-6 col-xs-12 mx-auto'
              }
            >
              <lottie-player
                src="https://assets4.lottiefiles.com/packages/lf20_p8wkegtg.json"
                background="transparent"
                speed="1"
                style={{
                  width: '350px',
                  height: '353px',
                  marginTop: '-100px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                loop
                autoplay
                data-aos="slide-left"
                data-aos-offset="100"
              ></lottie-player>
              <img
                src="/sevices/line-right-services.png"
                width="250px"
                className={
                  styles.lineRightServices + ' position-absolute end-0'
                }
              />
            </div>
          </div>
        </div>

        {/* Start Services Content */}

        {/* Two services */}
        <div className="container">
          <div className={'row mt-5'}>
            <div className={styles.invoices + ' col-md-6 col-xs-12'}>
              <div data-aos="slide-right" data-aos-offset="100">
                <ServiceCard
                  header={t('services.ServiceCard1.header')}
                  body={[t('services.ServiceCard1.body')]}
                  icon={
                    <img
                      src="/sevices/services-one.png"
                      className="w-100 mx-auto d-flex"
                    />
                  }
                  number={'1'}
                />
              </div>
              {/* Here is the square shapes */}
              {/* <div>
                <img
                  src="/sevices/first-shape.png"
                  className={
                    styles.servicesImages + ' position-absolute start-0 mt-4'
                  }
                  width="160px"
                />
              </div> */}
            </div>

            <div className={styles.POS + ' col-md-6 col-xs-12'}>
              <div data-aos="slide-left" data-aos-offset="100">
                <ServiceCard
                  header={t('services.ServiceCard3.header')}
                  body={[
                    t('services.ServiceCard3.body.0'),
                    // t('services.ServiceCard3.body.1'),
                  ]}
                  icon={
                    <img
                      src="/sevices/services-three.png"
                      className="w-100 mx-auto d-flex"
                    />
                  }
                  number={'2'}
                />
              </div>
              <div>
                <img
                  src="/sevices/dots.png"
                  className={
                    styles.servicesImages + ' position-absolute start-0 mt-5'
                  }
                  width="120px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Three services */}
        <div className="container">
          <div className={'row'}>
            <div className={styles.payment_Gateway + ' col-md-6 col-xs-12'}>
              <div data-aos="slide-right" data-aos-offset="100">
                <ServiceCard
                  header={t('services.ServiceCard5.header')}
                  body={[
                    t('services.ServiceCard5.body.0'),
                    // t('services.ServiceCard5.body.1'),
                  ]}
                  icon={
                    <img
                      src="/sevices/services-five.png"
                      className="w-100 mx-auto d-flex"
                    />
                  }
                  number={'3'}
                />
              </div>
              <div className="mt-5">
                <img
                  src="/sevices/third-shape.png"
                  alt="third-shape"
                  className={styles.servicesImages + ' position-absolute end-0'}
                  width="160px"
                  style={{ marginTop: '-170px' }}
                />
              </div>
            </div>

            <div className={styles.GCC + ' col-md-6 col-xs-12'}>
              <div data-aos="slide-left" data-aos-offset="100">
                <ServiceCard
                  header={t('services.ServiceCard6.header')}
                  body={[
                    t('services.ServiceCard6.body.0'),
                  ]}
                  icon={
                    <img
                      src="/sevices/services-three.png"
                      className="w-100 mx-auto d-flex"
                    />
                  }
                  number={'4'}
                />
              </div>
            </div>
            {/* Here are the quadrants */}
            {/* <div>
              <img
                src="/sevices/dots.png"
                className={
                  styles.servicesImages + ' position-absolute start-0 mt-5'
                }
                width="120px"
              />
            </div> */}
          </div>
        </div>
      </div>
    );
}

const ServiceCard = ({ header, icon, body, number }) => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div className='px-5 mx-auto' dir={language == "ar" ? "rtl" : "ltr"}>
            <div className={styles.serviceCard}>
                <span className={`${styles.number} ${language == "ar" && "start-0"}`}>{number}</span>
                <div className={`${styles.iconContainer} safqa-lightlactic-bg`}>
                    <span className={`${styles.icon} safqa-lactic2-color`}>{icon}</span>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.header}>{header}</h3>
                    {
                        body?.map((item, index) => <p key={index} className={`${styles.body} fs-5`}>{item}</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Services;