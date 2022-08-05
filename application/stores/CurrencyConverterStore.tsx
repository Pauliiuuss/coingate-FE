import { observable, action, toJS } from 'mobx'
import { CurrencyService } from '../utils/Types'
import { currencyService } from '../services/CurrencyService'
import { isCryptoKey } from 'util/types'

export class CurrencyConverterStoreImpl {
    @observable binanceCurrencyRatesLoading: boolean = false
    @observable coingateCurrencyRatesLoading: boolean = false
    @observable ratesInitialized: boolean = false
    @observable binanceCurrencyRate: number | undefined
    @observable coingateCurrencyRate: number | undefined

    service: CurrencyService = currencyService

    fetchCurrencyRates = async (fiat: string, crypto: string) => {
        this.binanceCurrencyRatesLoading = true
        this.coingateCurrencyRatesLoading = true

        try {
            const binanceResult = await this.service.fetchBinanceCurrencyRates({
                currency1: crypto,
                currency2: fiat
            })
             
            const coingateResult = await this.service.fetchCoingateCurrencyRates({
                currency1: fiat,
                currency2: crypto
            })

            // this.handleBinanceResult(binanceResult)
            this.handleCoingateResult(coingateResult)

            this.ratesInitialized = true

        } finally {
            this.binanceCurrencyRatesLoading = false
            this.coingateCurrencyRatesLoading = false
        }
    }

    @action handleBinanceResult = (result: any) => {
        this.binanceCurrencyRate = result.price
    }

    @action handleCoingateResult = (result: any) => {
        this.coingateCurrencyRate = result
    }
}

export const currencyConverterStore = new CurrencyConverterStoreImpl()
