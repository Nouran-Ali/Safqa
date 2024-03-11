import styles from "../../../styles/Dashboard/Create.module.css";
// import { MagicBtn } from "../../Buttons";
import { MagicRadioInput, MagicInput, SafqaCheckBox, SafqaInput, SafqaInputWithoutRegister, SafqaInputCopy } from "../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import CopyToClipboard from "../CopyToClipboard";
import { MagicBtn, MagicBtnProps } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getApiKey } from "../../../store/slices/integrationSlice";
import { CodeSnippetCopy } from "../../docs/v1/DocsV1Components";


const ApiKeySetting = () => {
  const { api_key, isLoading, success } = useSelector(state => state.integration)
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch()

  const generateApiKey = () => {
    dispatch(getApiKey())
  }

  return (
    <>
      <div className={` ${styles.CreateNewAdresse} ${language == "ar" && "w-100"}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className={`row ${language == "ar" && "me-3"}`}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <CodeSnippetCopy
              code={api_key}
              title={t("dashboard.token")}
            />

            {/* <SafqaInputCopy
              label={t("dashboard.token")}
              name="api_key"
              type="text"
              value={api_key}
              required
              disabled
            /> */}
          </div>
          {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <CopyToClipboard
              copyText={api_key}
              title={t("dashboard.copy")}
            />
          </div> */}
          <MagicBtnProps type="button" onClick={generateApiKey} label={t("dashboard.generate")} isLoading={isLoading}/>
        </div>
      </div>
    </>
  );
};

export default ApiKeySetting;
