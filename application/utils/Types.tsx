import { AxiosResponse } from "axios"

export interface CurrencyService {
    fetchBinanceCurrencyRates(params: CurrencyRatesRequest): Promise<AxiosResponse<any, any>>
    fetchCoingateCurrencyRates(params: CurrencyRatesRequest): Promise<AxiosResponse<any, any>>
}

export interface CurrencyRatesRequest {
    currency1?: string
    currency2?: string
}
