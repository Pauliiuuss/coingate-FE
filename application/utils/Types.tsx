import { AxiosPromise } from "axios"

export interface CurrencyService {
    fetchBinanceCurrencyRates(params: CurrencyRatesRequest): Promise<AxiosPromise<any>>
    fetchCoingateCurrencyRates(params: CurrencyRatesRequest): Promise<AxiosPromise<any>>
}

export interface CurrencyRatesRequest {
    fiat: string
    crypto: string
}