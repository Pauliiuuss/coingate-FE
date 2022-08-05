import {FC} from 'react'
import { MenuItem, Select, TextField } from "@mui/material"

export interface CurrencySelectorProps {
    menuItems: string[]
    onSelectChange: (currency: string) => void
}

const CurrencySelector: FC<CurrencySelectorProps> = props => {
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
}

export default CurrencySelector
