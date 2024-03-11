import CompanyInformation from "./CompanyInformation";
import BankAccountDetails from "./BankAccountDetails";
import ManagerInformation from "./ManagerInformation";
import SendOPT from "./SendOPT";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/join/Join.module.css";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { joinThunk, ResetSuccess } from "../../store/slices/join";
import LoadingSpinner from "./../LoadingSpinner";

const stepContentList = [
  {
    step_number: 0,
    name: "CompanyInformation",
    content: ({ handleNext, handleBack, joinValues, setJoinValues }) => (
      <CompanyInformation
        handleNext={handleNext}
        handleBack={handleBack}
        joinValues={joinValues}
        setJoinValues={setJoinValues}
      />
    ),
  },
  {
    step_number: 1,
    name: "BankAccountDetails",
    content: ({ handleNext, handleBack, joinValues, setJoinValues }) => (
      <BankAccountDetails
        handleNext={handleNext}
        handleBack={handleBack}
        joinValues={joinValues}
        setJoinValues={setJoinValues}
      />
    ),
  },
  {
    step_number: 2,
    name: "ManagerInformation",
    content: ({ handleNext, handleBack, joinValues, setJoinValues }) => (
      <ManagerInformation
        handleNext={handleNext}
        handleBack={handleBack}
        joinValues={joinValues}
        setJoinValues={setJoinValues}
      />
    ),
  },
];

const StepContent = ({
  formStep,
  handleBack,
  handleNext,
  joinValues,
  setJoinValues,
  resetFormStep,
}) => {
  const [t, i18n] = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { language } = i18n;
  const { join } = useSelector((state) => state);
  const { success } = join;

  useEffect(() => {
    if (success)
      setTimeout(() => {
        dispatch(ResetSuccess());
        // deleteCookie("joinInfo");
        // reset();
        resetFormStep();
      }, 5000);
  }, [success, dispatch, resetFormStep]);

  const renderNextBtn = () => {
    if (formStep >= MAX_STEP) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <button
          type="submit"
          className={`safqa-bgmain-gradient safqa-white-color ${
            !isValid && "opacity-50"
          } fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
          disabled={!isValid}
        >
          {isLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className={`safqa-bgmain-gradient safqa-white-color fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
          onClick={handleNext}
          // disabled={!isValid}
        >
          {t("links.next")}
        </button>
      );
    }
  };

  const onSubmit = (data) => {
    setCookie("joinInfo", JSON.stringify(data));
    dispatch(joinThunk(data));
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <div className="w-100">
      {stepContentList.map((step) => {
        if (formStep >= step.step_number)
          return (
            <section
              key={step.step_number}
              className={`${
                +formStep === step.step_number ? "d-block" : "d-none"
              } ${language == "ar" && "me-lg-5"}`}
              dir={language == "ar" ? "rtl" : "ltr"}
            >
              {step.content({
                handleNext,
                handleBack,
                joinValues,
                setJoinValues,
              })}
            </section>
          );
      })}
    </div>
    // </form>
  );
};

export default StepContent;
