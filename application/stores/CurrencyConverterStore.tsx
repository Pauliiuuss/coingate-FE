import { observable, action, toJS } from 'mobx'
import { CurrencyRatesRequest, CurrencyService } from '../utils/Types'
import { currencyService } from '../services/CurrencyService'

export class CurrencyConverterStore {
    @observable binanceCurrencyRatesLoading: boolean = false
    @observable coingateCurrencyRatesLoading: boolean = false
    @observable currencyRatesLoaded: boolean = false
    @observable binanceCurrencyRate: number | undefined
    @observable coingateCurrencyRate: number | undefined

    currencyService: CurrencyService

    constructor (service: CurrencyService) {
        this.currencyService = service
    }

    fetchCurrencyRates = async (request: CurrencyRatesRequest) => {
        this.binanceCurrencyRatesLoading = true
        this.coingateCurrencyRatesLoading = true

        try {
            const binanceResult = await currencyService.fetchBinanceCurrencyRates(request)
            const coingateResult = await currencyService.fetchCoingateCurrencyRates(request)

            this.handleBinanceResult(binanceResult)
            this.handleCoingateResult(coingateResult)

            this.currencyRatesLoaded = true

        } finally {
            this.binanceCurrencyRatesLoading = false
            this.coingateCurrencyRatesLoading = false
        }
    }

    @action handleBinanceResult = (result: any) => {
        this.binanceCurrencyRate = result
    }

    @action handleCoingateResult = (result: any) => {
        this.coingateCurrencyRate = result
    }
}