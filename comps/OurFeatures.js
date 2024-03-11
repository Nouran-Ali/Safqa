import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { TitleCircle } from "./utils";
import styles from "../styles/home/OurFeatures.module.css";

const OurFeatures = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  SwiperCore.use([Autoplay]);
  const [innerWidth, setInnerWidth] = useState();

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const slidesList = [
    {
      title: "NOTIFICATIONS",
      body: "Get notified on your mobile device through instant message alerts, giving sound to your transactions.",
      src: "/home/features/notification.png",
      title_ar: "إشعارات",
      body_ar:
        "احصل على إشعارات على جهازك المحمول من خلال خاصية تنبيهات الرسائل الفورية. اجعل لمعاملاتك صوتا.",
    },
    {
      title: "INSTANT DEPOSIT",
      body: "Get the deposits generated from your sales with SAFQA instant Deposit within 24 hours.",
      src: "/home/features/arrow.png",
      title_ar: "الإيداع الفوري",
      body_ar:
        "احصل على الودائع الناتجة عن مبيعاتك من خلال خدمة صفقة للإيداع الفوري في غضون 24 ساعة.",
    },
    {
      title: "CUSTOMIZABLE SMS",
      body: "Customizable messages through SMS, email, or WhatsApp to request payments with the push of a button in any language and many feature options.",
      src: "/home/features/sms.png",
      title_ar: "الرسائل القصيرة القابلة للتخصيص",
      body_ar:
        "عبارة عن رسائل قابلة للتخصيص سواء عبر الرسائل القصيرة أو البريد الالكتروني أو واتس اب من أجل طلب المدفوعات بضغطة زر، بأي لغة شئت،   ومن خلال عدة خيارات.",
    },
    {
      title: "Real time control panel",
      body: "With Safqa’s dashboard and integration tools, you can accurately track all your financial reports, make real-time decisions for your business, and analyze every business process for your business.",
      src: "/home/features/controlPanel.png",
      title_ar: "لوحة تحكم في الوقت الحقيقي",
      body_ar:
        "باستخدام لوحة القيادة وأدوات التكامل الخاصة مع صفقة، يمكنك تتبع جميع تقاريرك المالية بدقة واتخاذ قرارات في الوقت الفعلي لعملك وتحليل كل عملية تجارية لعملك.",
    },
    {
      title: "CUSTOMER SUPPORT",
      body: "Safqa team provides support that never stop as it offers 24/7 full-function support to clients in order to resolve any ongoing issue and to enjoy our services.",
      src: "/home/features/customerSupport.png",
      title_ar: "دعم العملاء",
      body_ar:
        "يوفر فريق صفقة لعملائه الكرام دعما كامل الوظائف على مدار الساعة وطيلة أيام الأسبوع بغية حل أي مشكلة قائمة لتمكينك من الاستمتاع بخدماتنا دون توقف.",
    },
    {
      title: "Quick merges",
      body: "Safqa provides your business with fast integrations to optimize all your financial transactions. We make it easy to integrate with different tools and APIs to help your business grow and develop.",
      src: "/home/features/clock.png",
      title_ar: "عمليات دمج سريعة",
      body_ar:
        "توفر صفقة لعملك عمليات تكامل سريعة لتحسين يوفر موقع صفقة لعملك عمليات تكامل سريعة لتحسين جميع معاملانك المالية. نجعل من السهل التكامل مع الأدوات المختلفة وواجهات برمجة التطبيقات لمساعدة عملك على النمو والتطور.",
    },
    {
      title: "Fraud Risk Management",
      body: "Safqa enables you to identify factitious purchase orders and high-risk payments by analyzing false details and past order history. Whatever  the type of fraud, Safqa guarantees you secure financial transactions.",
      src: "/home/features/security.png",
      title_ar: "إدارة مخاطر الاحتيال",
      body_ar:
        "يمكنك صفقة من تحديد أوامر الشراء الوهمية والمدفوعات عالية المخاطر من خلال تحليل التفاصيل الخاطئة وسجل تاريخ الطلبات السابقة. لذا فمهما كان نوع الاحتيال، تضمن لك منصة صفقة معاملات مالية آمنة.",
    },
    // new additions
    {
      title: "An eco-friendly process",
      body: "Safqa’s process enables you to hold less paper while having a secure and personalized business transactions that align with environmental protection.",
      src: "/home/features/security.png",
      title_ar: "منظومة صديقة للبيئة",
      body_ar:
        "يسمح نظام صفقة بإتمام معاملات تجارية آمنة ومخصصة تتماشى مع حماية البيئة، وذلك بتقليل اللجوء إلى استخدام الورق.",
    },
    {
      title: "Convenience",
      body: "Using Safqa’s plateform you can pay Online for goods and services from the comfort of your own home and everywhere you are.",
      src: "/home/features/security.png",
      title_ar: "وسائل الراحة",
      body_ar:
        "من خلال منصة صفقة، وأنت في بيتك أو حيثما كنت، يمكنك الدفع عبر الأنترنيت مقابل أي سلعة أو خدمة.",
    },
    {
      title: "Cost-effective",
      body: "Safqa online payments have lower transaction fees comparatively to the traditional payment method, so that you can save business money in the long run.",
      src: "/home/features/security.png",
      title_ar: "منصة توفيرية بامتياز",
      body_ar:
        "تتمتع معاملات الدفع الالكتروني في صفقة برسوم تحويل أقل مقارنة مع الطرق التقليدية للدفع، وهو ما يتيح لك توفير المال على المدى البعيد.",
    },
    {
      title: "Widespread coverage",
      body: "In addition to local coverage in more than 40 countries, Safqa’s website permits you to execute payments worldwide in over 120 currencies.",
      src: "/home/features/security.png",
      title_ar: "تغطية واسعة النطاق",
      body_ar:
        "علاوة على التغطية المحلية في أزيد من 40 دولة، يتيح لك موقع صفقة أداء أو استلام المدفوعات عبر الأنترنيت في جميع أقطار العالم وبأكثر من 120 عملة.",
    },
    {
      title: "Detailed reports and data analysis",
      body: "With Safqa, you can benefit from detailed analytical reports on the developpement of your transactions, making it easier for you to achieve more gains.",
      src: "/home/features/security.png",
      title_ar: "تقارير تحليلية مفصلة للبيانات",
      body_ar:
        "يمكنك الاستفادة مع صفقة من تقارير تحليلية مفصلة حول تطور معاملاتك، مما يسهل تحقيق المزيد من الأرباح.",
    },
    {
      title: "Price transparency",
      body: "Clarity and transparency of pricing is one of the mainand important creteria relied upon by Safqa to get its customers trust. In Safqa, we present our prices clearly, as well as we have no hidden fees. On the other hand, pricing is determineted according to the nature of each customer’s business and the risks associates to it.",
      src: "/home/features/security.png",
      title_ar: "شفافية الأسعار",
      body_ar:
        "يشكل وضوح وشفافية الأسعار أحد المعايير الرئيسية التي نعتمد عليها لكسب ثقة عملائنا، لذا نقدم لكم أسعارنا بشكل جليّ لا غبار عليه. إضافة إلى ذلك، في صفقة لا مجال لأية رسوم خفية، إذ يتم تحديد السعر وفقا لطبيعة نشاط كل عميل، من جهة، ثم طبيعة المخاطر المرتبطة به من أخرى.",
    },
    {
      title: "Various payment options",
      body: "With Safqa plateform you can provide your customer with multiple payment choices or options such as: online wallet, product link, débit/credit cards, Safqa payment gateway…",
      src: "/home/features/security.png",
      title_ar: "خيارات دفع متعددة",
      body_ar:
        "باستخدامك لمنصة صفقة يمكنك توفير خيارات دفع متعددة لعملائك، مثل: المحفظة الالكترونية، رابط المنتج، بطاقات الخصم/ الائتمان، بوابة صفقة للدفع، وغيرها.",
    },
  ];

  return (
    <div className="features mt-5 position-relative">
      <div className="container">
        <h2 className="position-relative text-center mt-5 fw-bold text-uppercase">
          {language == "en" ? (
            <>
              <span className="safqa-darkgrey2-color">
                {t("ourfeatures.our")}{" "}
              </span>
              {t("ourfeatures.title")}
            </>
          ) : (
            <span className="safqa-darkgrey2-color">
              {t("ourfeatures.title")}{" "}
            </span>
          )}

          <TitleCircle className="features-circle" />
        </h2>

        <div className="slide mt-5">
          <div className="text-center">
            <Swiper
              spaceBetween={50}
              slidesPerView={innerWidth < 900 ? 1 : 3}
              loop={true}
              autoplay={{
                delay: 3000,
              }}
            >
              {slidesList.map(({ src, title, title_ar, body, body_ar }) => (
                <SwiperSlide key={title}>
                  <div className={`card mx-auto p-4 rounded-5 grab`}>
                    <div className="card-body">
                      <div className={`bg_icon rounded-circle mx-auto p-3`}>
                        <img
                          src={src}
                          alt={i18n.language == "ar" ? title_ar : title}
                          width="40px"
                        />
                      </div>
                      <h5 className="card-title mt-3 text-uppercase">
                        {i18n.language == "ar" ? title_ar : title}
                      </h5>
                      <p className="card-text fs-5">
                        {i18n.language == "ar" ? body_ar : body}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <img
        className={`${styles.bgFeatures} position-absolute`}
        src="/home/features/bgFeature.png"
        alt="bgFeatures"
        width="25%"
      />
      <img
        className={styles.pointsFeatures}
        src="/home/features/Points.png"
        alt="bgFeatures"
        width="200px"
      />
    </div>
  );
};

const SlideCard = ({ src, title, body }) => {
  return (
    <SwiperSlide className="col-xl-12 col-lg-4 col-md-12 col-sm-12">
      <div className="card p-4 rounded-5">
        <div className="card-body">
          <div className="bg-icon rounded-circle mx-auto p-3">
            <img src={src} alt={title} width="40px" />
          </div>
          <h5 className="card-title mt-3">{title}</h5>
          <p className="card-text fs-5">{body}</p>
        </div>
      </div>
    </SwiperSlide>
  );
};
export default OurFeatures;
