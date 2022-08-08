import { Grid } from "@mui/material"
import { observer } from "mobx-react"
import { FC } from "react"
import { getHighAmount, getLowerAmount } from "../../utils/highLowAmounts.utils"
import styles from './BarChart.module.css'

interface BarChartProps {
    coingateAmount: string
    binanceAmount: string
}

const BarChart: FC<BarChartProps> = observer(props => {
    const {coingateAmount, binanceAmount} = props

    console.log(coingateAmount)
    const checkIfNotEmpty: boolean = !!coingateAmount && !!binanceAmount
    const checkIfZero: boolean = +coingateAmount == 0 && +binanceAmount == 0
    const checkIfEquals: boolean = coingateAmount === binanceAmount

    const highAmount = checkIfNotEmpty ? getHighAmount(coingateAmount, binanceAmount) : 'Coingate: 0'
    const lowAmount = checkIfNotEmpty ? getLowerAmount(coingateAmount, binanceAmount) : 'Binance: 0'

    return (
        <Grid
        item
        xs={4} sm={8} md={12}
        display='flex'
        alignItems='center'
        flexDirection='column'
        >
            <div className={styles.coingateBar}>
                <div className={!checkIfNotEmpty || checkIfZero ? styles.barNotCalculated : checkIfEquals ? styles.barEquals : styles.barHigher} />
                    <p className={styles.coingateText}>{highAmount}</p>
            </div>
            <div className={styles.binanceBar}>
                <div className={!checkIfNotEmpty || checkIfZero ? styles.barNotCalculated : checkIfEquals ? styles.barEquals : styles.barLower} />
                <p className={styles.binanceText}>{lowAmount}</p>
            </div>
        </Grid>
    )
})

export default BarChart