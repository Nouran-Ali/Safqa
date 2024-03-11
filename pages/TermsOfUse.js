import styles from "../styles/termsAndPolicy.module.css";
import { useTranslation } from "react-i18next";
import { Collapse } from 'antd';

const { Panel } = Collapse;

function TermsOfUse() {
  const [t, i18n] = useTranslation();
  const { language } = i18n

  return (
    <div className={`container ${styles.TermsOfUse} mt-5 mb-5`} dir={language == 'ar' ? "rtl" : "ltr"}>
      <h3>{t('terms_and_conditions.title')}</h3>
      <p>{t('terms_and_conditions.description')}</p>
      <TermsOfUseAccordion />
      {/* <TermsPrev /> */}
    </div>
  );
}

export default TermsOfUse;



const TermsOfUseAccordion = () => {
  const [t, i18n] = useTranslation();
  const terms = t('terms', { returnObjects: true })

  return (
    <Collapse accordion>
      {
        terms.length && terms.map(({ title, head, items, nestedBody }, index) =>
          <Panel
            header={title}
            key={title}
          >
            <p>
              <ul>
                {head}
                {items.length > 0 && items.map((item, index) => <li key={index}>{item}</li>)}
                {nestedBody &&
                  <li>
                    {nestedBody.head}
                    <ul>
                      {nestedBody.items.length > 0 && items.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </li>

                }
              </ul>
            </p>
          </Panel>
        )
      }
    </Collapse>
  )
}
