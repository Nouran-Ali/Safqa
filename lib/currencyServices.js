import { AxiosGlobal } from "./axios"

export const convertCurrency = async ({ from, to, amount, setValue }) => {
    try {
        const { data } = await AxiosGlobal
            .get(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, {
                headers: { 'apikey': 'mCFAqSZGgfz1vYfLic62hcqbMHnZKm7G' }
            })
        setValue(data?.result)
    } catch (error) {
        console.log(error)
    }
}