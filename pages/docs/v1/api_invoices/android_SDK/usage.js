import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Usage = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Getting_Started.Android_SDK")} child={t("docs.Usage_Android_SDK.Usage")} />
                <MainTitleNew title={t("docs.Usage_Android_SDK.Usage")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <h3 className='text-dark'>{t("docs.Usage_Android_SDK.title1")}</h3>
                    <ol type='1'>
                        <li> {t("docs.Usage_Android_SDK.list1")}</li>
                        <li>{t("docs.Usage_Android_SDK.list2")} </li>
                        <li>{t("docs.Usage_Android_SDK.list3")} </li>
                        <li>{t("docs.Usage_Android_SDK.list4")} </li>
                        <li>{t("docs.Usage_Android_SDK.list5")} </li>

                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Kotlin"
                                code={
                                    `implementation fileTree(dir: 'libs', include: ['*.aar'])
implementation 'com.google.code.gson:gson:2.8.5'
implementation "com.squareup.retrofit2:retrofit:2.3.0"
implementation "com.squareup.retrofit2:converter-gson:2.3.0"
`}
                            />
                        </div>
                        <li>{t("docs.Usage_Android_SDK.note1")}</li>
                    </ol>

                    <h3 className='text-dark'>{t("docs.Usage_Android_SDK.title2")}</h3>
                    <p>{t("docs.Usage_Android_SDK.body1")} </p>

                    {/* <img src='/docs/v1/10.jpg' width="800px" className='mt-2 mb-4' /> */}

                    <div dir={language == "ar" ? "ltr" : "rtl"}>
                        <CodeSnippetCopy
                            title="Kotlin"
                            code={
                                `//1- Create invoice model like this:  

/// - Parameters: 

///   - invoiceValue: Invoice amount the customer will pay 

///   - customerName: Your customer name  

///   - countryCode: Your country code  

///   - displayCurrency: Currency will be displayed for the user 

val invoiceModel = InvoiceModel(20.0, "Test", Country.KUWAIT,  
CurrencyISO.Kuwaiti_Dinar_KWD) 


//2- Create Card model with card info you get from the user: 

/// - Parameters: 

///   - cardExpiryMonth: Card expiry month 2 digits 

///   - cardExpiryYear: Card expiry year 2 digits 

///   - cardSecurityCode: Card security code 3 digits  

///   - cardNumber: Card number   


val mfCardModel = MFCardModel("05", "21", "100", "2223000000000007") 

//3- Pass them to createInvoice method and wait the response from the SDK : 
 

/// - Parameters: 

///   - invoice: Invoice model 

///   - card: Card model 

///   - apiLanguage: Language you prefer for getting msg from the API 

MFSDK.createInvoice(this, generateInvoiceModel(), mfCardModel, "en")
`}
                        />
                    </div>

                    <div dir={language == "ar" ? "ltr" : "rtl"}>
                        <CodeSnippetCopy
                            title="Java"
                            code={
                                `InvoiceModel invoiceModel = new InvoiceModel(20.0, "Test", Country.KUWAIT, CurrencyISO.Kuwaiti_Dinar_KWD); 

 
MFCardModel mfCardModel = new MFCardModel("05", "21", "100", "2223000000000007"); 

 
MFSDK.createInvoice(this, invoiceModel, mfCardModel, "en");
`}
                        />
                    </div>

                    <p>{t("docs.Usage_Android_SDK.note2")} </p>

                    <div dir={language == "ar" ? "ltr" : "rtl"}>
                        <CodeSnippetCopy
                            title="Kotlin"
                            code={
                                `class MainActivity : AppCompatActivity(), MFSDKListener{ 

  

    override fun onSuccess(transactionResponseModel: TransactionResponseModel) { 

     val text = "Success\n\nResponse:\n\n" + Gson().toJson(transactionResponseModel) 

     Log.d(TAG, text) 

 } 



 override fun onFailed(statusCode: Int, error: String) { 

     val text = "Failed: $statusCode\n\nError Message:\n\n$error" 

     Log.d(TAG, text) 

 } 



 override fun onCanceled(error: String) { 

     Log.d(TAG, error) 

 } 

}
`}
                        />
                    </div>

                    <div dir={language == "ar" ? "ltr" : "rtl"}>
                        <CodeSnippetCopy
                            title="Java"
                            code={
                                `public class MainActivity extends AppCompatActivity implements MFSDKListener{ 

 
    @Override 
    
    public void onSuccess(@NotNull TransactionResponseModel transactionResponseModel) { 
    
    String text = "Success\n\nResponse:\n\n" + new Gson().toJson(transactionResponseModel); 
    
    Log.d(TAG, text); 
    
    } 
    
     
     
    
    @Override 
    
    public void onFailed(int i, @NotNull String s) { 
    
    String text = "Failed: $statusCode\n\nError Message:\n\n$error"; 
    
    Log.d(TAG, text); 
    
    } 
    
     
     
    
    @Override 
    
    public void onCanceled(@NotNull String error) { 
    
    Log.d(TAG, error); 
    
    } 
    
    }
`}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Usage