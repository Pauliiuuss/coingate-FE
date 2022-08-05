import axios from "axios";
import { CurrencyRatesRequest } from "../utils/Types";

class CurrencyService {

    fetchBinanceCurrencyRates(request: CurrencyRatesRequest) {
        const result = axios.get('https://api.binance.com/sapi/v1/margin/priceIndex', {
            params: {
                symbol: `${request.fiat}${request.crypto}`
            }
        })
        return result
    }

    fetchCoingateCurrencyRates(request: CurrencyRatesRequest) {
        const result = axios.get(`https://api.coingate.com/v2/rates/merchant/${request.fiat}/${request.crypto}`)
        return result
    }
}

export const currencyService = new CurrencyService()