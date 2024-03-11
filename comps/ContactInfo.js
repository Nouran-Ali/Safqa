import styles from "../styles/contact.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import CallIcon from "@mui/icons-material/Call";
import { useState, useEffect } from "react";
import {
  WhatsappLinkIcon,
  FacebookLinkIcon,
  InstagramLinkIcon,
  TwitterLinkIcon,
} from "./SocialLinks";
import { useTranslation } from "react-i18next";

const list_of_contacts = [
  {
    name: "KWT",
    src: "./KWT.png",
    head: "K.W.T",
    location:
      "Abdullah Al-Mubarak Street - Al-Humaidhiya Tower - Seventh Floor",
    emails: ["info@safqapay.com", "support@safqapay.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  },
  {
    name: "ARE",
    src: "./ARE.png",
    head: "A.R.E",
    location: "Al - Al Barsha - Dubai - United Arab Emirates",
    emails: ["info@safqapay.com", "support@safqapay.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  },
  {
    name: "KSA",
    src: "./SAU.png",
    head: "K.S.A",
    emails: ["info@safqapay.com", "support@safqapay.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  },
];

const list_of_contacts_AR = [
  {
    name: "KWT",
    src: "./KWT.png",
    head: "الكويت",
    location: "شارع عبدالله المبارك - برج الحميضية - الدور السابع",
    emails: ["info@safqapay.com", "support@safqapay.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  },
  {
    name: "ARE",
    src: "./ARE.png",
    head: "الامارات",
    location: "Al - البرشاء - البرشاء 1 - دبي - الإمارات العربية المتحدة",
    emails: ["info@safqapay.com", "support@safqapay.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  },
  {
    name: "KSA",
    src: "./SAU.png",
    head: "السعودية",
    emails: ["info@safqapay.com", "support@safqapay.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  },
];

const ContactInfo = ({ country, setCountry }) => {
  // const [country, setCountry] = useState();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const [contact, setContact] = useState({
    name: "QAT",
    src: "./QAT.png",
    head: "Q.A.T",
    location: "Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit",
    emails: ["qat@safqa.com", "qat2@safqa.com"],
    phone: "+9743233923212",
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/%2B201010932484",
    },
  });

  useEffect(() => {
    if (country) {
      language == "en"
        ? list_of_contacts.map((contact) => {
            if (contact.name === country) {
              setContact(contact);
            }
          })
        : list_of_contacts_AR.map((contact) => {
            if (contact.name === country) {
              setContact(contact);
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const handleClickFlag = (e) => {
    const country = e.target.alt;
    setCountry(country);
  };

  return (
    <>
      {/* {country === "ARE" ? ( */}

      {
        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className={
            styles.info +
            " justify-content-center align-items-center col-lg-6 col-sm-12 mx-auto mt-5"
          }
          dir={language == "ar" ? "rtl" : "ltr"}
        >
          <div className="">
            <div className="d-flex justify-content-start mb-5">
              <img
                src="../flags/ARE.png"
                width="70px"
                className={`cursor-pointer rounded-1 mx-3  ${
                  country.toLowerCase() === "are" && "shadow-primary"
                } `}
                alt="ARE"
                onClick={(e) => handleClickFlag(e)}
              />
              {/* <img
                src="../flags/KWT.png"
                width="70px"
                className={`cursor-pointer rounded-1 mx-3 ${
                  country.toLowerCase() === "kwt" && "shadow-primary"
                }`}
                alt="KWT"
                onClick={(e) => handleClickFlag(e)}
              />
              <img
                src="../flags/SAU.png"
                width="70px"
                className={`cursor-pointer rounded-1 mx-3 ${
                  country.toLowerCase() === "ksa" && "shadow-primary"
                }`}
                alt="KSA"
                onClick={(e) => handleClickFlag(e)}
              /> */}
            </div>
            <h1 className={`${styles.head} safqa-black-color`}>
              {contact.head}
            </h1>
            <div className={`${styles.body} safqa-darkgrey2-color`}>
              <div
                className={` ${styles.body_location} ${
                  language == "ar" && styles.body_location_AR
                } d-flex align-items-start`}
              >
                {contact.location && (
                  <>
                    <LocationOnIcon />
                    <p>{contact.location}</p>
                  </>
                )}
              </div>
              <div
                className={` ${styles.body_email} ${
                  language == "ar" && styles.body_email_AR
                } align-items-start`}
              >
                {contact.emails.map((email) => (
                  <div className="mb-3" key={email}>
                    <LocalPostOfficeIcon />
                    <span className="mx-2">{email}</span>
                  </div>
                ))}
              </div>
              {/* <div className={` ${styles.body_phone} ${language == "ar" && styles.body_phone_AR} d-flex align-items-start`}>
                <CallIcon />
                <p>{contact.phone}</p>
              </div> */}
            </div>
            <div className={`${styles.flag_icons}`}>
              {/* FACEBOOK LINK */}
              <FacebookLinkIcon src={contact.social_links.facebook} />
              <br />
              {/* INSTAGRAM LINK */}
              <InstagramLinkIcon src={contact.social_links.instagram} />
              <br />
              {/* TWITTER LINK */}
              <TwitterLinkIcon src={contact.social_links.twitter} />
              <br />
              {/* WHATSAPP LINK */}
              {/* <WhatsappLinkIcon src={contact.social_links.whatsapp} /> */}
            </div>
          </div>
        </div>
      }

      {/* ) : (
        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          className={
            styles.info +
            " justify-content-center align-items-center col-md-6 col-sm-12 mx-auto"
          }
        >
          <div className="mx-5">
            <h1 className={`${styles.head} fs-2`}>Soon</h1>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ContactInfo;
