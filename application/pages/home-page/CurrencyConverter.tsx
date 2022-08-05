import { Grid, MenuItem, Select, TextField } from '@mui/material'
import type { NextPage } from 'next'
import InputField from './components/InputField'
import { fiatCurrencies, cryptoCurrencies } from '../../utils/CurrencyTypes'

const CurrencyConverter: NextPage = () => {
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
        <InputField menuItems={fiatCurrencies} />
      </Grid>
      <Grid item>
        <InputField menuItems={cryptoCurrencies} />
      </Grid>
    </Grid>
  )
}

export default CurrencyConverter
