export const calculateAmounts = (input: string, currencyPrice: number): string => {
    const calculatedAmount: number = +input / currencyPrice
    return calculatedAmount.toString()
}
