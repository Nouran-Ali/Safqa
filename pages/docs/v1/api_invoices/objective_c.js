import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Objective_c = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Prerequisites.IOS_SDK")} child={t("docs.Objective_C.Objective_C")} />
                <MainTitleNew title={t("docs.Objective_C.Objective_C")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Objective_C.body1")} <Link href="#" className='safqa-link2-color'>{t("docs.Objective_C.here")}</Link> {t("docs.Objective_C.body2")}</p>
                    <p>{t("docs.Objective_C.body3")}</p>
                    <div dir={language == "ar" ? "ltr" : "rtl"}>
                        <CodeSnippetCopy
                            title="Objective-C"
                            code={
                                `#import <MFSDK/MFSDK-Swift.h>
`}
                        /></div>

                    <ul>
                        <li>{t("docs.Objective_C.body4")}</li>
                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Objective-C"
                                code={
                                    `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // set up your My Fatoorah Merchant details
    [[MFSettings shared] configureWithUsername:@"demoApiuser@Safqa.com" password:@"Mf@12345678" baseURL:@"https://apidemo.Safqa.com/"];
    
    // you can change color and title of nvgigation bar
    MFTheme* theme = [[MFTheme alloc] initWithNavigationTintColor:[UIColor whiteColor] navigationBarTintColor:[UIColor lightGrayColor] navigationTitle:@"Payment" cancelButtonTitle:@"Cancel"];
    [[MFSettings shared] setThemeWithTheme:theme];
    return YES;
}
`}
                            /></div>

                        <h3>{t("docs.Objective_C.body5")}</h3>
                        <p>{t("docs.Objective_C.body6")} </p>
                        <p>{t("docs.Objective_C.body7")}</p>
                        <img src='/docs/v1/8.jpg' width="800px" className='mt-2 mb-4' />
                        <div dir={language == "ar" ? "ltr" : "rtl"}>
                            <CodeSnippetCopy
                                title="Objective-C"
                                code={
                                    `#import "ViewController.h" 

 
 

@interface ViewController () 

 
 

@end 

 
 

@implementation ViewController 

 
 

- (void)viewDidLoad { 

[super viewDidLoad]; 

// Do any additional setup after loading the view. 

[[MFInvoiceCreateStatus shared] setDelegate:self]; 

} 

- (IBAction)payDidPress:(id)sender { 
  //1- Create invoice model like this:  
 /// - Parameters: 

    ///   - invoiceValue: Invoice amount the customer will pay 

    ///   - customerName: Your customer name  

    ///   - countryCode: Your country code  

    ///   - displayCurrency: Currency will be displayed for the user 

MFInvoice* invoice = [[MFInvoice alloc] initWithInvoiceValue:invoiceValue customerName: @"Test" countryCode: MFCountryKuwait displayCurrency:MFCurrencyKuwaiti_Dinar_KWD]; 
 //2- Create Card model with card info you get from the user: 
 
   /// - Parameters: 

    ///   - cardExpiryMonth: Card expiry month 2 digits 

    ///   - cardExpiryYear: Card expiry year 2 digits 

    ///   - cardSecurityCode: Card security code 3 digits  

    ///   - cardNumber: Card number   

MFCard * invoice = [[MFCard alloc] initWithCardExpiryMonth:: @"05" cardExpiryYear: @"21" cardSecurityCode: @"100" cardNumber: @"54123458888888889"]; 
 
//3- Pass them to createInvoice method and wait the response from the SDK : 
     

  /// - Parameters: 

    ///   - invoice: Invoice model 

    ///   - card: Card model 

    ///   - apiLanguage: Language you prefer for getting msg from the API 

[[MFPaymentRequest shared] createInvoiceWithInvoice:invoice card: card  apiLanguage:MFAPILanguageArabic]; 

 

} 

 
 
 
//*Note : to get response from the SDK you must implement this delegate  like this  

- (void)didInvoiceCreateFailWithError:(MFFailResponse * _Nonnull)error { 

NSLog( @"error:"); 

} 

 
 

- (void)didInvoiceCreateSucessWithTransaction:(MFTransaction * _Nonnull)transaction { 

NSLog( @"Success:"); 


} 

 
 

- (void)didPaymentCancel { 

NSLog( @"responseCode: -1"); 

NSLog(@"Error: Payment Cancelled"); 

} 

 
 
 

@end
`}
                            /></div>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Objective_c