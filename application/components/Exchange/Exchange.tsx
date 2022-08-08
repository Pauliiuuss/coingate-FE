/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { currencyConverterStore } from "../../stores/CurrencyConverterStore"
import { cryptoCurrencies, fiatCurrencies } from "../../utils/CurrencyTypes"
import BarChart from "../BarChart/BarChart"
import CurrencySelector from "../CurrencySelector/CurrencySelector"
import InputField from "../InputField/InputField"

const Exchange = observer(() => {
    const [input, setInput] = useState('')

    const {
      fetchCurrencyRates,
      calculateAllAmounts,
      finalCoingateCalculations,
      finalBinanceCalculations,
      refetchOnFiatChange,
      refetchOnCryptoChanges,
    } = currencyConverterStore
  
    useEffect(() => {
        fetchCurrencyRates(fiatCurrencies[0], cryptoCurrencies[0])
    }, [])
  
    const onFiatSelect = (fiat: string) => {
      refetchOnFiatChange(fiat, input)
    }
  
    const onCryptoSelect = (crypto: string) => {
      refetchOnCryptoChanges(crypto, input)
    }
  
    const onInput = (input: string) => {
      calculateAllAmounts(input)
      setInput(input)
    }

    return (
        <>
            <Grid
            item
            >
                <InputField onInput={onInput} input={true}/>
                <CurrencySelector menuItems={fiatCurrencies} onSelectChange={onFiatSelect}/>
            </Grid>
            <Grid
            item
            >
                <InputField calculatedAmount={finalCoingateCalculations}/>
                <CurrencySelector menuItems={cryptoCurrencies} onSelectChange={onCryptoSelect}/>
            </Grid>
            <BarChart
            coingateAmount={finalCoingateCalculations}
            binanceAmount={finalBinanceCalculations}
            />
        </>
    )
})

export default Exchange