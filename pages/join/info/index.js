import JoinStepper from "../../../comps/join/JoinStepper";
import StepContent from "../../../comps/join/StepContent";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stepUp, stepDown } from "../../../store/slices/join";
import { useDispatch } from "react-redux";
import axios, { AxiosGlobal } from "../../../lib/axios";
import StepImg from "../../../comps/join/StepImg";
import styles from "../../../styles/join/Join.module.css";
import { useRouter } from "next/router";
import { getBanks } from "../../../store/slices/bankSlice";

function JoinInfo() {
  const MAX_STEP = 3;
  const [formStep, setFormStep] = useState(0);
  const [joinValues, setJoinValues] = useState();
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  const handleBack = () => {
    if (formStep === 0) {
      router.push("/join/country");
    } else {
      setFormStep((cur) => cur - 1);
    }
  };

  const handleNext = (data) => {
    setJoinValues((currentValues) => ({ ...currentValues, ...data }));
    if (formStep >= MAX_STEP) {
      return;
    }
    setFormStep((cur) => cur + 1);
  };

  const resetFormStep = () => {
    setFormStep(0);
  };

  return (
    <div
      className={` ${styles.join + styles.Data + styles.CompanyInformation}`}
    >
      <div className="container">
        <div className="row d-flex">
          <div
            data-aos="slide-right"
            data-aos-offset="100"
            className="col-xl-4 col-lg-4 col-md-12 col-sm-12 "
          >
            <StepImg formStep={formStep} />
          </div>
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 ">
            <div className={`d-flex flex-wrap ${styles.bg_join}`}>
              <JoinStepper formStep={formStep} />
              <StepContent
                formStep={formStep}
                setFormStep={setFormStep}
                handleBack={handleBack}
                handleNext={handleNext}
                resetFormStep={resetFormStep}
                joinValues={joinValues}
                setJoinValues={setJoinValues}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinInfo;

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { cookies } = req;
  const { business_type_id, country_id } = cookies;
  const url = "/api/globalData";
  const res = await AxiosGlobal.get(url);
  const globalData = res.data;
  const business_types = globalData.business_type;
  const is_business_type_id_exists = business_types.find(
    (b) => b.id == business_type_id
  );

  const countries = globalData.country;
  const is_country_id_exists = countries.find((c) => c.id == country_id);

  if (!business_type_id || !is_business_type_id_exists) {
    return {
      redirect: {
        permanent: false,
        destination: "/join",
      },
    };
  } else if (!country_id || !is_country_id_exists) {
    return {
      redirect: {
        permanent: false,
        destination: "/join/country",
      },
    };
  } else {
    // const { data } = await AxiosJwt.get("/api/globalData");
    return {
      props: {
        //   globalData: data,
      }, // will be passed to the page component as props
    };
  }
}
