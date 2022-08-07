import { FC } from "react"

interface BarChartProps {
    coingateAmount: string
    binanceAmount: string
}

const BarChart: FC<BarChartProps> = props => {
    const {} = props

    return (
        <div>
            <div>
                <div className='bar1'/>
            </div>
            <div>
                <div className='bar2'/>
            </div>
        </div>
    )
}

export default BarChart