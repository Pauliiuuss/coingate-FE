import React from 'react'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import CurrenctSelector from '../application/components/CurrencySelector'
import { fiatCurrencies, cryptoCurrencies } from '../application/utils/CurrencyTypes'
import { currencyConverterStore } from '../application/stores/CurrencyConverterStore'
import InputField from '../application/components/InputField'

const CurrencyConverter: NextPage = observer(() => {
  const [crypto, setCrypto] = useState('BTC')
  const [fiat, setFiat] = useState('EUR')
  const [input, setInput] = useState('')

  const {
    fetchCurrencyRates,
    isRatesInitialized,
    calculateAllAmounts,
    finalBinanceCalculations,
    finalCoingateCalculations,
    isAmountsCalculated,
    refetchCurrencyRates
  } = currencyConverterStore

  useEffect(() => {
      fetchCurrencyRates(fiat, crypto)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFiatSelect = (fiat: string) => {
    setFiat(fiat)
  }

  const onCryptoSelect = (crypto: string) => {
    setCrypto(crypto)
  }

  const onInput = (input: string) => {
    calculateAllAmounts(input)
    setInput(input)
  }

  useEffect(() => {
    if(isRatesInitialized) {
      fetchCurrencyRates(fiat, crypto)
    }
    console.log(finalCoingateCalculations + 'useefektas')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiat, crypto])


  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      columns={{xs: 4, sm: 8, md: 12}}
    >
      <Grid item>
        <InputField onInput={onInput} input={true}/>
        <CurrenctSelector menuItems={fiatCurrencies} onSelectChange={onFiatSelect}/>
      </Grid>
      <Grid item>
        <InputField calculatedAmount={finalCoingateCalculations} />
        <CurrenctSelector menuItems={cryptoCurrencies} onSelectChange={onCryptoSelect}/>
      </Grid>
    </Grid>
  )
})

export default CurrencyConverter
