import { TextField } from "@mui/material"
import { FC } from "react"
import { observer } from 'mobx-react'
import { useFormik } from "formik"

interface InputFieldProps {
    onInput?: (inputAmount: string) => void
    input?: boolean
    calculatedAmount?: string
}

const InputField: FC<InputFieldProps> = observer(props => {
    const { input, onInput, calculatedAmount } = props

    const onChange = (inputAmount: any) => {
        onInput!(inputAmount)
    }

    // const formik = useFormik({
    //     initialValues: {
    //         calculatedAmount: calculatedAmount
    //     },
    //     onSubmit: () => {},
    // });

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
