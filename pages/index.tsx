import React from 'react'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Grid, MenuItem, Select, TextField } from '@mui/material'
import type { NextPage } from 'next'
import InputField from '../application/components/CurrencySelector'
import { fiatCurrencies, cryptoCurrencies } from '../application/utils/CurrencyTypes'
import { currencyConverterStore } from '../application/stores/CurrencyConverterStore'
import { useFormik } from 'formik'

const CurrencyConverter: NextPage = observer(() => {
  const [crypto, setCrypto] = useState('BTC')
  const [fiat, setFiat] = useState('EUR')
  const [init, setInit] = useState(false)

  const {
    fetchCurrencyRates,
    ratesInitialized
  } = currencyConverterStore

  useEffect(() => {
      fetchCurrencyRates(fiat, crypto)
      setInit(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFiatSelect = (fiat: string) => {
    setFiat(fiat.toUpperCase())
  }

  const onCryptoSelect = (crypto: string) => {
    setCrypto(crypto.toUpperCase())
  }

  useEffect(() => {
    if(ratesInitialized) {
      fetchCurrencyRates(fiat, crypto)
    }
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
        <InputField menuItems={fiatCurrencies} onSelectChange={onFiatSelect}/>
      </Grid>
      <Grid item>
        <InputField menuItems={cryptoCurrencies} onSelectChange={onCryptoSelect}/>
      </Grid>
    </Grid>
  )
})

export default CurrencyConverter
