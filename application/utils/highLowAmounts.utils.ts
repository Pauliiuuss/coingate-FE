export const getHighAmount = (coingate: string, binance: string): string => {
    const higher: string = coingate >= binance ? `Coingate: ${coingate}` : `Binance: ${binance}`
    return higher
}

export const getLowerAmount = (coingate: string, binance: string): string => {
    const lower: string = coingate < binance ? `Coingate: ${coingate}` : `Binance: ${binance}`
    return lower
}
