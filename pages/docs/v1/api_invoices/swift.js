import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Swift = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Prerequisites.IOS_SDK")} child={t("docs.Swift.Swift")} />
                <MainTitleNew title={t("docs.Swift.Swift")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Swift.body1")} <Link href="#" className='safqa-link2-color'>{t("docs.Swift.here")} </Link> {t("docs.Swift.Swift")}</p>
                    <ul>
                        <li>{t("docs.Swift.body3")}</li>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="AppDelegate"
                                code={
                                    `func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey:     // Override point for customization after application launch.
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    // Setup your My Fatoorah Merchant details
    MFSettings.shared.configure(username: "demoApiuser@Safqa.com", password: "Mf@12345678", baseURL: "https://apidemo.Safqa.com/")
            
    // You can change title and color of navigation bar, also title and color of dismiss button
    let them = MFTheme(navigationTintColor: .white, navigationBarTintColor: .lightGray, navigationTitle: "Payment", cancelButtonTitle: "Cancel")
    
    MFSettings.shared.setTheme(theme: them)
    
    return true
}
`}
                            />
                        </div>

                        <h3>{t("docs.Swift.body4")}</h3>
                        <p>{t("docs.Swift.body5")}</p>
                        <p>{t("docs.Swift.Swift")}</p>
                        <img src='/docs/v1/8.jpg' width="800px" className='mt-2 mb-4' />

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Swift"
                                code={
                                    `//1- Create invoice model like this:  

/// - Parameters: 

///   - invoiceValue: Invoice amount the customer will pay 

///   - customerName: Your customer name  

///   - countryCode: Your country code  

///   - displayCurrency: Currency will be displayed for the user 

let invoice = MFInvoice(invoiceValue: 20, customerName: "Test", countryCode: .kuwait, displayCurrency: .Kuwaiti_Dinar_KWD) 


//2- Create Card model with card info you get from the user: 

/// - Parameters: 

///   - cardExpiryMonth: Card expiry month 2 digits 

///   - cardExpiryYear: Card expiry year 2 digits 

///   - cardSecurityCode: Card security code 3 digits  

///   - cardNumber: Card number   


let card = MFCard(cardExpiryMonth: "05", cardExpiryYear: "21", cardSecurityCode: "100",cardNumber: "54123458888888889") 


//3- Pass them to createInvoice method and wait the response from the SDK : 
    

/// - Parameters: 

///   - invoice: Invoice model 

///   - card: Card model 

///   - apiLanguage: Language you prefer for getting msg from the API 

MFPaymentRequest.shared.createInvoice(invoice: invoice, card: card, apiLanguage: .english)
`}
                            />
                        </div>

                        <p>{t("docs.Swift.note")}</p>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Swift"
                                code={
                                    `//MFOrder status Delegate methods  

extension ViewController : MFInvoiceCreateStatusDelegate {  

func didInvoiceCreateSucess(transaction: MFTransaction) {  

print( "Success")  

print("result: \(transaction)")  

}  

func didInvoiceCreateFail(error: MFFailResponse) {  

print("responseCode: \(error.statusCode)")  

print( "Error: \(error.errorDescription)")  

}  

func didPaymentCancel() {  

print("Error: Payment Cancelled")  

}  

}
`}
                            />
                        </div>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Swift