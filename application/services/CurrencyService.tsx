import axios from "axios";
import { CurrencyRatesRequest, BinanceRatesResponse } from "../utils/Types";

class CurrencyService {

    fetchBinanceCurrencyRates(request: CurrencyRatesRequest) {
        const result = axios.get('https://api.binance.com/api/v3/ticker/price', {
            params: {symbol: `${request.currency1}${request.currency2}`}
        })
        return result
    }

    fetchCoingateCurrencyRates(request: CurrencyRatesRequest) {
        
        const result = axios.get(`https://api.coingate.com/v2/rates/merchant/${request.currency1}/${request.currency2}`, {
            headers: {
                // 'access-control-allow-methods': 'GET, HEAD, OPTIONS',
                // 'access-control-allow-origin': '*',
                // 'cache-control': 'no-cache, no-store, must-revalidate'
            }
        })
        return result
    }
}

export const currencyService = new CurrencyService()
