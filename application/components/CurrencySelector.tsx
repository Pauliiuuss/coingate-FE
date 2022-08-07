import { FC } from 'react'
import { MenuItem, Select } from "@mui/material"
import { observer } from 'mobx-react'

interface CurrencySelectorProps {
    menuItems: string[]
    onSelectChange: (currency: string) => void
}

const CurrencySelector: FC<CurrencySelectorProps> = observer(props => {
    const { menuItems, onSelectChange } = props

    const onSelect = (currency: any) => {
        onSelectChange(currency)
    }

    return (
        <>
            <Select
            id='currency-select'
            onChange={e => onSelect(e.target.value)}
            defaultValue={menuItems[0]}
            >
                {menuItems.map((item) => (
                    <MenuItem
                    value={item}
                    key={item}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </>
    )
})

export default CurrencySelector
