import {FC} from 'react'
import { MenuItem, Select, TextField } from "@mui/material"

export interface InputFieldProps {
    menuItems: string[]
}

const InputField: FC<InputFieldProps> = props => {
    const { menuItems } = props

    return (
        <>
        <TextField></TextField>
            <Select>
                {menuItems.map((item) => (
                    <MenuItem value={item} key={item}>{item.toUpperCase()}</MenuItem>
                ))}
            </Select>
        </>
    )
}

export default InputField