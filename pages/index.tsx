import React from 'react'
import { observer } from 'mobx-react'
import { Button, Grid, TextField } from '@mui/material'
import type { NextPage } from 'next'
import Exchange from '../application/components/Exchange/Exchange'

const CurrencyConverter: NextPage = observer(() => {

  return (
      <Grid
      container
      direction="row"
      justifyContent='center'
      spacing={2}
      columns={{xs: 4, sm: 8, md: 12}}
      marginTop='2rem'
      >
        <Exchange />
        <Grid
        item
        xs={4} sm={8} md={12}
        display='flex'
        justifyContent='center'
        >
          <Button
          size='large'
          variant='contained'
          color='success'
          href='https://coingate.com/lt'
          >BUY</Button>
        </Grid>
      </Grid>
  )
})

export default CurrencyConverter
