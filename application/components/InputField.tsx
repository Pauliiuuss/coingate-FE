import { TextField } from "@mui/material"
import { FC } from "react"
import { observer } from 'mobx-react'

interface InputFieldProps {
    onInput?: (inputAmount: string) => void
    input?: boolean
    calculatedAmount?: string
}

const InputField: FC<InputFieldProps> = observer(props => {
    const { input, onInput, calculatedAmount } = props

    const onChange = (inputAmount: any) => {
        if(input) {
            onInput!(inputAmount)
        }
    }

    return (
        <>
            <TextField
            disabled={!input}
            onChange={e => onChange(e.target.value)}
            value={calculatedAmount}
            />
        </>
    )
})

export default InputField
