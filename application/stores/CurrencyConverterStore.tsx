import { observable, action, toJS, computed } from 'mobx'
import { CurrencyService } from '../utils/Types'
import { currencyService } from '../services/CurrencyService'
import { calculateAmounts } from '../utils/calculateAmounts.utils'

export class CurrencyConverterStoreImpl {
    @observable binanceCurrencyRatesLoading: boolean = false
    @observable coingateCurrencyRatesLoading: boolean = false
    @observable ratesInitialized: boolean = false
    @observable binanceCurrencyRate: number | undefined
    @observable coingateCurrencyRate: number | undefined
    @observable calculatedAmount: number | undefined

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
                currency1: crypto,
                currency2: fiat
            })

            this.handleBinanceResult(binanceResult)
            this.handleCoingateResult(coingateResult)

            this.ratesInitialized = true

        } finally {
            this.binanceCurrencyRatesLoading = false
            this.coingateCurrencyRatesLoading = false
        }
    }

    refetchCurrencyRates = async (fiat: string, crypto: string, input: string) => {
        await this.fetchCurrencyRates(fiat, crypto)
        await this.calculateAllAmounts(input)
    }

    @action handleBinanceResult = (result: any) => {
        this.binanceCurrencyRate = result.price
    }

    @action handleCoingateResult = (result: any) => {
        this.coingateCurrencyRate = result.data
    }

    @computed get isRatesInitialized(): boolean {
        return this.ratesInitialized
    }

    @observable finalBinanceCalculated: string = '0'
    @observable finalCoingateCalculated: string = '0'
    @observable amountsCalculated: boolean = false

    calculateAllAmounts = (input: string) => {
            this.calculateBinanceAmounts(input)
            this.calculateCoingateAmounts(input)

            this.amountsCalculated = true
    }

    @action calculateBinanceAmounts = (input: string) => {
            const result = calculateAmounts(input, this.binanceCurrencyRate!)
            this.handleBinanceCalculatedResult(result)
    }

    @action calculateCoingateAmounts = (input: string) => {
            const result = calculateAmounts(input, this.coingateCurrencyRate!)
            this.handleCoingateCalculatedResult(result)
    }

    @action handleBinanceCalculatedResult = (result: string) => {
        this.finalBinanceCalculated = result
    }

    @action handleCoingateCalculatedResult = (result: string) => {
        this.finalCoingateCalculated = result
    }

    @computed get finalBinanceCalculations(): string {
        return this.finalBinanceCalculated!
    }

    @computed get finalCoingateCalculations(): string {
        return this.finalCoingateCalculated!
    }

    @computed get isAmountsCalculated(): boolean {
        return this.amountsCalculated
    }

}

export const currencyConverterStore = new CurrencyConverterStoreImpl()
