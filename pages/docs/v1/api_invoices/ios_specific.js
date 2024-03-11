import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Ios_specific = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Prerequisites.IOS_SDK")} child={t("docs.iOS_Specific.iOS_Specific")} />
                <MainTitleNew title={t("docs.iOS_Specific.iOS_Specific")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.iOS_Specific.body1")}</p>
                    <p className='mt-2'>{t("docs.iOS_Specific.body2")}</p>
                    <p className='mt-2'>{t("docs.iOS_Specific.body3")}</p>
                    <div dir={language == "ar" ? "ltr" : "rtl"}>
                        <CodeSnippetCopy
                            title="XML"
                            code={
                                `<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    <key>NSAllowsArbitraryLoadsForMedia</key>
    <true/>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
</dict>
`}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Ios_specific