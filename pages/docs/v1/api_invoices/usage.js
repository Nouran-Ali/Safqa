import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Usage = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Prerequisites.IOS_SDK")} child={t("docs.Usage.Usage")} />
                <MainTitleNew title={t("docs.Usage.Usage")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <ol type='1'>
                        <li>{t("docs.Usage.body1")}</li>
                        <img src='/docs/v1/5.png' width="800px" className='mt-3 mb-4' />
                        <p className='text-center'> {t("docs.Usage.Step1")}</p>

                        <img src='/docs/v1/6.png' width="800px" className='mt-2 mb-4' />
                        <p className='text-center'>{t("docs.Usage.Step2")}</p>

                        <img src='/docs/v1/7.png' width="800px" className='mt-2 mb-4' />
                        <p className='text-center'>{t("docs.Usage.Step3")}</p>

                        <li className='mb-3'>{t("docs.Usage.body2")}</li>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="AppDelegate"
                                code={
                                    `import MFSDK
`}
                            />
                        </div>
                    </ol>
                </div>

            </div>
        </>
    )
}

export default Usage