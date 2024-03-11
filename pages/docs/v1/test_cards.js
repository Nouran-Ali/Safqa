import React from 'react'
import { LinkHierarchy, MainTitleNew, NoteText } from '../../../comps/docs/v1/DocsV1Components';
import styles from "../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Test_cards = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    
    const data = [
        {
            payment: t("docs.Test_cards.Master"),
            numbers: {
                items: [
                    "5123450000000008",
                    "2223000000000007",
                    "5313581000123430",
                ]
            },
            date: {
                items: [
                    "05 / 21",
                    "05 / 21",
                    "05 / 18",
                ]
            },
            password: {
                items: [
                    "100",
                    "100",
                    "123",
                ]
            },
            result: " ",
        },
        {
            payment: t("docs.Test_cards.VISA"),
            numbers: {
                items: [
                    "4508750015741019",
                    "4012000033330026",
                    "4005550000000001",
                    "4557012345678902",
                ]
            },

            date: {
                items: [
                    "05 / 21",
                    "05 / 21",
                    "05 / 18",
                    "05 / 18",
                ]
            },

            password: {
                items: [
                    "100",
                    "100",
                    "123",
                    "123",
                ]
            },
            result: " ",
        },
        {
            payment: t("docs.Test_cards.KNet"),
            numbers: "888888 0000000001",
            date: "09 / 21",
            password: t("docs.Test_cards.Any_PIN"),
            result: t("docs.Test_cards.CAPTURED"),
        },
        {
            payment: t("docs.Test_cards.Benefit"),
            numbers: {
                items: [
                    "4600410123456789",
                    "4550120123456789",
                    "4889780123456789",
                    "4415550123456789",
                    "4575550123456789",
                    "4845550123456789",
                    "4895550123456789",
                ]
            },

            date: t("docs.Test_cards.Any_value"),

            password: t("docs.Test_cards.Any"),
            result: {
                items: [
                    t("docs.Test_cards.Benefit_results.1"),
                    t("docs.Test_cards.Benefit_results.2"),
                    t("docs.Test_cards.Benefit_results.3"),
                    t("docs.Test_cards.Benefit_results.4"),
                    t("docs.Test_cards.Benefit_results.5"),
                    t("docs.Test_cards.Benefit_results.6"),
                    t("docs.Test_cards.Benefit_results.7"),
                ]
            },
        },
        {
            payment: t("docs.Test_cards.AMEX"),
            numbers: {
                items: [
                    "3456 7890 1234 564",
                    "371449635398431",
                ]
            },

            date: {
                items: [
                    "05 / 21",
                    "05 / 21",
                ]
            },

            password: {
                items: [
                    "1234",
                    "1234",
                ]
            },

            result: " ",
        },
        {
            payment: {
                items: [
                    t("docs.Test_cards.SADAD"),
                    t("docs.Test_cards.Master"),
                    t("docs.Test_cards.VISA"),
                ]
            },

            numbers: {
                items: [
                    t("docs.Test_cards.arun123"),
                    "5271045423029111",
                    "4012001037141112",
                ]
            },

            date: {
                items: [
                    t("docs.Test_cards.Any_value"),
                    t("docs.Test_cards.Any_value"),
                    "01 / 22",
                ]
            },
            password: {
                items: [
                    "Aa123456",
                    t("docs.Test_cards.Any_Pin"),
                    "684",
                ]
            },

            result: t("docs.Test_cards.SADAD_result"),
        },
        {
            payment: t("docs.Test_cards.QPay"),

            numbers: "4215375500883243",

            date: "06 / 20",

            password: t("docs.Test_cards.Any_Pin"),
            result: " ",
        },
        {
            payment: t("docs.Test_cards.Apple_Pay"),
            numbers: "5204247750001497",
            date: "11 / 22",
            password: "111",
            result: " ",
        },
    ]

    const data2 = [
        {
            response: "0",
            description: t("docs.Test_cards.Transaction_Approved"),
            amount: "XXX.000",
        },
        {
            response: "1",
            description: t("docs.Test_cards.Transaction"),
            amount: "XXX.010",
        },
        {
            response: "2",
            description: t("docs.Test_cards.Transaction_declined"),
            amount: "XXX.005",
        },
        {
            response: "3",
            description: t("docs.Test_cards.No_reply"),
            amount: "XXX.068",
        },
        {
            response: "4",
            description: t("docs.Test_cards.Card"),
            amount: "XXX.033",
        },
        {
            response: "5",
            description: t("docs.Test_cards.Insufficient"),
            amount: "XXX.051",
        },
    ]

    return (
        <>
            <div dir={language=="ar" ? "rtl" : "ltr"} className={`${styles.test_cards}`}>
                <MainTitleNew title={t("docs.Test_cards.Test_cards")} />
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Test_cards.body1")}</p>
                    <hr />
                    <p>{t("docs.Test_cards.body2")}</p>
                    <p className='mt-2'>{t("docs.Test_cards.body3")}</p>
                    <div className="table-responsive">
                        <table className={`table table-striped text-center mt-3 ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.Payment_Gateway")}</th>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.Card_Number_Account")}</th>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.Expiry_Date_mmyy")}</th>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.CVV_PIN_Password")}</th>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.Result")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((data) => (
                                        <tr key={data.payment}>

                                            <td className={`${styles.first} safqa_table_padding`}>
                                                {
                                                    data.payment?.items ? <>
                                                        {
                                                            data.payment.items.map(payment => <p>{payment}</p>)
                                                        }
                                                    </>
                                                        :
                                                        data.payment
                                                }
                                            </td>
                                            <td className='safqa_table_padding'>
                                                {
                                                    data.numbers?.items ? <>
                                                        {
                                                            data.numbers.items.map(number => <p>{number}</p>)
                                                        }
                                                    </>
                                                        :
                                                        data.numbers
                                                }
                                            </td>
                                            <td className='safqa_table_padding'>
                                                {
                                                    data.date?.items ? <>
                                                        {
                                                            data.date.items.map(date => <p>{date}</p>)
                                                        }
                                                    </>
                                                        :
                                                        data.date
                                                }
                                            </td>

                                            <td className='safqa_table_padding'>
                                                {
                                                    data.password?.items ? <>
                                                        {
                                                            data.password.items.map(password => <p>{password}</p>)
                                                        }
                                                    </>
                                                        :
                                                        data.password
                                                }
                                            </td>

                                            <td className='safqa_table_padding'>
                                                {
                                                    data.result?.items ? <>
                                                        {
                                                            data.result.items.map(result => <p style={{ width: "300px" }}>{result}</p>)
                                                        }
                                                    </>
                                                        :
                                                        data.result
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <NoteText text={t("docs.Test_cards.note")} />
                    <div className="table-responsive">
                        <table className={`table table-striped mt-3 ${styles.tableTwo}`}>
                            <thead>
                                <tr>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.QSI")}</th>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.Description")}</th>
                                    <th scope="col" className='safqa_table_padding'>{t("docs.Test_cards.Amount")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data2.map((data) => (
                                        <tr>
                                            <td className='text-center'>{data.response}</td>
                                            <td className='safqa_table_padding'>{data.description}</td>
                                            <td className='safqa_table_padding'>{data.amount}</td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Test_cards
