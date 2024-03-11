import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";

export default function JoinStepper({ formStep }) {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const steps = [
    {
      labelEn: "Company information",
      labelAr: "معلومات الشركة",
    },
    {
      labelEn: "Bank Account Details",
      labelAr: "تفاصيل الحساب المصرفي",
    },
    {
      labelEn: "Company Manager User Login Information",
      labelAr: "معلومات تسجيل دخول مستخدم مدير الشركة",
    },
  ];

  return (
    <div
      className={`d-flex w-100 ${
        language == "en" ? "justify-content-center" : "justify-content-end"
      }`}
    >
      <Stepper
        activeStep={formStep}
        alternativeLabel
        className="stepper mb-5 mt-3 mx-4 "
        dir={language == "ar" ? "rtl" : "ltr"}
      >
        {steps.map((step) => (
          <Step
            className={language == "ar" ? "MuiStepConnector-root-rtl" : ""}
            key={step.labelEn}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#2D5571", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "black", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#2D5571", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "black", // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white", // circle's number (ACTIVE)
              },
              "& .css-qivjh0-MuiStepLabel-label.MuiStepLabel-alternativeLabel":
                {
                  fontSize: "11px",
                },
            }}
          >
            <StepLabel sx={{ fontSize: "11px" }}>
              {language === "en" ? step.labelEn : step.labelAr}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
