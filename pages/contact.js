import styles from "../styles/contact.module.css";
import ContactInfo from "../comps/ContactInfo";
import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  const [country, setCountry] = useState("ARE");

  return (
    <div>
      <img
        className={styles.contact}
        src="./contact/bg-contact.png"
        alt="bg-contact"
      />
      <div className="container">
        <div className={styles.main_container + " row"}>
          <div className="col-md-6 col-sm-12">
            <div
              data-aos="zoom-in"
              data-aos-offset="100"
              className={`${styles.lottieimg} `}
            >
              <div className={`align-middle ${styles.d_none}`}>
                <lottie-player
                  src="https://assets9.lottiefiles.com/packages/lf20_26c4bh4z.json"
                  background="transparent"
                  speed="1"
                  style={{
                    height: "350px",
                    // marginTop: "40px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  // loop
                  autoplay
                  data-aos="slide-right"
                  data-aos-offset="100"
                ></lottie-player>
              </div>
            </div>
          </div>
          <ContactInfo country={country} setCountry={setCountry} />
        </div>
      </div>
    </div>
  );
}
