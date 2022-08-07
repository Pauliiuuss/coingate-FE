import { observable, action, computed } from 'mobx'
import { CurrencyService, CurrencyRatesRequest } from '../utils/Types'
import { currencyService } from '../services/CurrencyService'
import { calculateAmounts } from '../utils/calculateAmounts.utils'

export class CurrencyConverterStoreImpl {
    @observable binanceCurrencyRate: number = 0
    @observable coingateCurrencyRate: number = 0
    @observable lastRequestParams: CurrencyRatesRequest = {}

    service: CurrencyService = currencyService

    fetchCurrencyRates = async (fiat: string, crypto: string) => {
        this.setLastRequestParams(crypto, fiat)

            const binanceResult = await this.service.fetchBinanceCurrencyRates(this.lastRequestParams)
            
            const coingateResult = await this.service.fetchCoingateCurrencyRates(this.lastRequestParams)
    
            this.handleBinanceResult(binanceResult)
            this.handleCoingateResult(coingateResult)
    }

    refetchFiatRates = async (fiat: string, input: string) => {
            await this.fetchCurrencyRates(fiat, this.lastRequestParams.currency1!)
            this.calculateAllAmounts(input)
    }

    refetchCryptoRates = async (crypto: string, input: string) => {
            await this.fetchCurrencyRates(this.lastRequestParams.currency2!, crypto)
            this.calculateAllAmounts(input)
    }

    @action setLastRequestParams = (currency1: string, currency2: string) => {
        this.lastRequestParams = {
            ...this.lastRequestParams,
            currency1,
            currency2
        }
    }

    @action handleBinanceResult = (result: any) => {
        this.binanceCurrencyRate = result.price
    }

    @action handleCoingateResult = (result: any) => {
        this.coingateCurrencyRate = result.data
    }

    @computed get binanceRates(): number {
        return this.binanceCurrencyRate
    }

    @computed get coingateRates(): number {
        return this.coingateCurrencyRate
    }

    @observable finalBinanceCalculated: string = ''
    @observable finalCoingateCalculated: string = ''

    calculateAllAmounts = (input: string) => {
        const binanceResult = calculateAmounts(input, this.binanceRates)
        const coingateResult = calculateAmounts(input, this.coingateCurrencyRate)

        this.handleBinanceCalculatedResult(binanceResult)
        this.handleCoingateCalculatedResult(coingateResult)
    }


    
    @action handleBinanceCalculatedResult = (result: string) => {
        this.finalBinanceCalculated = result
    }

    @action handleCoingateCalculatedResult = (result: string) => {
        console.log(result)
        this.finalCoingateCalculated = result
        console.log(this.finalCoingateCalculated)
    }

    @computed get finalBinanceCalculations(): string {
        return this.finalBinanceCalculated
    }

    @computed get finalCoingateCalculations(): string {
        console.log(this.finalCoingateCalculated + 'finalcalc')
        return this.finalCoingateCalculated
    }

}

export const currencyConverterStore = new CurrencyConverterStoreImpl()
