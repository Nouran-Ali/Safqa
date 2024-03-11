import Link from 'next/link';
import React from 'react'
import { CodeSnippetCopy, LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Sample_code_C = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language == "ar" ? "rtl" : "ltr"} className={`fs-5 text-dark ${styles.requirement}`}>
                <LinkHierarchy parent={t("docs.Rest_APIs.Rest_APIs")} child={t("docs.Sample_Code_C.Sample_Code_C")} />
                <MainTitleNew title={t("docs.Sample_Code_C.Sample_Code_C")} />
                <div dir={language == "ar" ? "ltr" : "rtl"}>
                    <CodeSnippetCopy
                        title="Create Rest API Invoices Iso - C#"
                        code={
                            `using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace SampleProject
{
    class Program
    {
        static void Main(string[] args)
        {
            //Getting Token value to access all other API calls
            var tokenResponse = GetToken();

            var invoiceResponseISO = CreateInvoiceISO(tokenResponse);

            //After Payment your will redirect to returnUrl along with paymentId value as a querystring like below
            //https://www.domainname.com/returnpagename?paymentId=4271987401183580
            //we have to send this paymentId as a request paramter (in querystring) to get transaction 

            var paymentId = "4271987401183580";

            var transactionsResponse = GetTransactions(tokenResponse, paymentId);

            Console.WriteLine();
            Console.ReadKey();

        }


        public static TokenResponse GetToken()
        {
            var client = new WebClient();
            var url = "https://apidemo.Safqa.com/Token";
            var userName = "demoApiuser@Safqa.com";
            var password = "Mf@12345678";

            var apiTokenRequestHeader = String.Format("grant_type=password&username={0}&password={1}",
               userName, password);

            var JsonResponse = client.UploadString(url, apiTokenRequestHeader);

            var response = JsonConvert.DeserializeObject<TokenResponse>(JsonResponse);

            DisplayRequestAndResponse("GetToken", apiTokenRequestHeader, JsonResponse);
            return response;
        }

        public static InvoiceResponseISO CreateInvoiceISO(TokenResponse tokenResponse)
        {
            //API URL: https://apidemo.Safqa.com/ApiInvoices/CreateInvoiceIso

            var invoiceItems = new List<InvoiceItemsCreate>();
            var client = new WebClient();
            var url = "https://apidemo.Safqa.com/ApiInvoices/CreateInvoiceIso";

            invoiceItems.Add(new InvoiceItemsCreate()
            {
                ProductId = null, // Should be null
                ProductName = "Product A",
                Quantity = 5,
                UnitPrice = 2
            });
            invoiceItems.Add(new InvoiceItemsCreate()
            {
                ProductId = null, // Should be null
                ProductName = "Product B",
                Quantity = 5,
                UnitPrice = 2
            });

            var totalInvoiceAmount = invoiceItems.Sum(x => x.Quantity * x.UnitPrice);

            var request = new InvoiceRequestISO()
            {
                InvoiceValue = totalInvoiceAmount,
                CustomerName = "CustomerName",
                CustomerEmail = "customername@email.com",// should pass Valid CustomerEmail
                CustomerMobile = "12345678",// should pass Valid mobile number
                CustomerReference = "Sample Reference Text",
                SendInvoiceOption = 4,
                InvoiceItemsCreate = invoiceItems,
                CallBackUrl = "https://www.domainname.com/returnpagename",
                Language = 2,
                CountryCodeId = 1,
                DisplayCurrencyIsoAlpha = "KWD",
                ErrorUrl = "https://www.domainname.com/errorpagename",
                ExpireDate = DateTime.Now.AddDays(3)
            };

            var JSON_Request = JsonConvert.SerializeObject(request);

            client.Headers.Add("Authorization", string.Format("Bearer {0}", tokenResponse.access_token));
            client.Headers.Add("Content-Type", "application/ json");

            var JSON_Response = client.UploadString(url, "POST", JSON_Request);

            var response = JsonConvert.DeserializeObject<InvoiceResponseISO>(JSON_Response);

            DisplayRequestAndResponse("Create Invoice ISO", JSON_Request, JSON_Response);

            return response;
        }

        public static TransactionResponse GetTransactions(TokenResponse tokenResponse,string paymentId)
        {

            var invoiceItems = new List<InvoiceItemsCreate>();
            var client = new WebClient();
            var url = string.Format("https://apidemo.Safqa.com/ApiInvoices/Transaction/{0}", paymentId);

            client.Headers.Add("Authorization", string.Format("Bearer {0}", tokenResponse.access_token));
            client.Headers.Add("Content-Type", "application/ json");

            var JSON_Response = client.DownloadString(url);

            var response = JsonConvert.DeserializeObject<TransactionResponse>(JSON_Response);

            DisplayRequestAndResponse("Get Transactions", url, JSON_Response);

            return response;
        }

        public static void DisplayRequestAndResponse(string method,string req,string res)
        {
            Console.WriteLine(string.Format("---------------------{0}-----------------------------", method));
            Console.WriteLine();
            Console.WriteLine(string.Format("Request  :{0}", req));
            Console.WriteLine();
            Console.WriteLine(string.Format("Response :{0}", res));
            Console.WriteLine();
        }
    }

    public class TokenResponse
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string expires_in { get; set; }
        public string userName { get; set; }
        public string issued { get; set; }
        public string expires { get; set; }
    }

    public class InvoiceItemsCreate
    {
        public int? ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class InvoiceItem
    {
        public string ProductName { get; set; }
        public string UnitPrice { get; set; }
        public string Quantity { get; set; }
        public string ExtendedAmount { get; set; }
    }

    public class TransactionResponse
    {
        public string InvoiceId { get; set; }
        public string InvoiceReference { get; set; }
        public string CreatedDate { get; set; }
        public string ExpireDate { get; set; }
        public decimal InvoiceValue { get; set; }
        public string Comments { get; set; }
        public string CustomerName { get; set; }
        public string CustomerMobile { get; set; }
        public string CustomerEmail { get; set; }
        public string TransactionDate { get; set; }
        public string PaymentGateway { get; set; }
        public string ReferenceId { get; set; }
        public string TrackId { get; set; }
        public string TransactionId { get; set; }
        public string PaymentId { get; set; }
        public string AuthorizationId { get; set; }
        public string OrderId { get; set; }
        public IList<InvoiceItem> InvoiceItems { get; set; }
        public int TransactionStatus { get; set; }
        public string Error { get; set; }
        public string PaidCurrency { get; set; }
        public string PaidCurrencyValue { get; set; }
        public string TransationValue { get; set; }
        public string CustomerServiceCharge { get; set; }
        public string DueValue { get; set; }
        public string Currency { get; set; }
    }

    public class InvoiceRequestISO
    {
        public decimal InvoiceValue { get; set; }
        public string CustomerName { get; set; }
        public string CustomerBlock { get; set; }
        public string CustomerStreet { get; set; }
        public string CustomerHouseBuildingNo { get; set; }
        public string CustomerCivilId { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerReference { get; set; }
        public string DisplayCurrencyIsoAlpha { get; set; }
        public int CountryCodeId { get; set; }
        public string CustomerMobile { get; set; }
        public string CustomerEmail { get; set; }
        public int SendInvoiceOption { get; set; }
        public IList<InvoiceItemsCreate> InvoiceItemsCreate { get; set; }
        public string CallBackUrl { get; set; }
        public int Language { get; set; }
        public DateTime ExpireDate { get; set; }
        public string ApiCustomFileds { get; set; }
        public string ErrorUrl { get; set; }
    }

    public class FieldsError
    {
        public string Name { get; set; }
        public string Error { get; set; }
    }

    public class PaymentMethod
    {
        public string PaymentMethodName { get; set; }
        public string PaymentMethodUrl { get; set; }
        public string PaymentMethodCode { get; set; }
    }

    public class InvoiceResponseISO
    {
        public int Id { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string RedirectUrl { get; set; }
        public IList<FieldsError> FieldsErrors { get; set; }
        public IList<PaymentMethod> PaymentMethods { get; set; }
        public string ApiCustomFileds { get; set; }
    }
}
`}
                    />
                </div>
            </div>
        </>
    )
}

export default Sample_code_C
