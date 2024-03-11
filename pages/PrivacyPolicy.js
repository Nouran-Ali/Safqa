import styles from "../styles/termsAndPolicy.module.css";
import { useTranslation } from "react-i18next";
import { Collapse } from 'antd';

const { Panel } = Collapse;

function PrivacyPolicy() {
  const [t, i18n] = useTranslation();
  const { language } = i18n

  return (
    <div
      className={`container ${styles.PrivacyPolicy} mt-5 mb-5`}
      dir={language == 'ar' ? "rtl" : "ltr"}
    >
      <PrivacyPolicyAccordion />
    </div>
  );
}

export default PrivacyPolicy;


const PrivacyPolicyAccordion = () => {
  const [t, i18n] = useTranslation();

  const policies = t('policy', { returnObjects: true })

  return (
    <Collapse accordion>
      {
        policies.length && policies.map(({ title, items }, index) =>
          <Panel
            header={title}
            key={title}
          >
            <p>
              <ol>
                {items.length > 0 && items.map((item, index) => <li key={index}>{item}</li>)}
              </ol>
            </p>
          </Panel>
        )
      }
    </Collapse>
  )
}
