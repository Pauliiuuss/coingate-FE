/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Grid, TextField } from '@mui/material'
import type { NextPage } from 'next'
import CurrencySelector from '../application/components/CurrencySelector'
import { fiatCurrencies, cryptoCurrencies } from '../application/utils/CurrencyTypes'
import { currencyConverterStore } from '../application/stores/CurrencyConverterStore'
import InputField from '../application/components/InputField'
import { useFormik } from 'formik'

const CurrencyConverter: NextPage = observer(() => {
  const [crypto, setCrypto] = useState('BTC')
  const [fiat, setFiat] = useState('EUR')
  const [input, setInput] = useState('')

  const {
    fetchCurrencyRates,
    calculateAllAmounts,
    finalBinanceCalculations,
    finalCoingateCalculations,
    refetchFiatRates,
    refetchCryptoRates,
    coingateCurrencyRate,
    binanceCurrencyRate,
    finalCoingateCalculated,
  } = currencyConverterStore

  useEffect(() => {
      fetchCurrencyRates(fiat, crypto)
  }, [])

  const onFiatSelect = (fiat: string) => {
    refetchFiatRates(fiat, input)
    setFiat(fiat)
  }

  const onCryptoSelect = (crypto: string) => {
    refetchCryptoRates(crypto, input)
    setCrypto(crypto)
  }

  const onInput = (input: string) => {
    calculateAllAmounts(input)
    setInput(input)
  }

  // const formik = useFormik({
  //   initialValues: {
  //       calculatedAmount: ''
  //   },
  //   onSubmit: () => {formik.initialValues.calculatedAmount = finalCoingateCalculations},
  // });

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
          <CurrencySelector menuItems={fiatCurrencies} onSelectChange={onFiatSelect}/>
        </Grid>
        <Grid item>
          <TextField value={finalCoingateCalculations} disabled/>
          <CurrencySelector menuItems={cryptoCurrencies} onSelectChange={onCryptoSelect}/>
      </Grid>
    </Grid>
  )
})

export default CurrencyConverter
