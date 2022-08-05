import { TextField } from "@mui/material"
import { FC } from "react"

export interface InputFieldProps {
    onInput?: (inputAmount: string) => void
    input?: boolean
    calculatedAmount?: string
}

const InputField: FC<InputFieldProps> = props => {
    const { input, onInput, calculatedAmount } = props

    const onChange = (inputAmount: any) => {
        onInput!(inputAmount)
    }

    return (
        <>
            <TextField
            disabled={!!calculatedAmount}
            onChange={onInput && (e => onChange(e.target.value))}
            value={calculatedAmount && calculatedAmount}
            />
        </>
    )
}

export default InputField
