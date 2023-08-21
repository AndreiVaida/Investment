export type Investment = {
    monthlyInvestment: number,
    substractFilingFee: SubstractFee,
    monthlyFee: number,
    yearlyReturnPercent: number,
    substractWithdrawFee: SubstractFee,
    performances: Performance[]
}

export type Performance = {
    year: number,
    investedMoney: number,
    totalBalance: number,
    profit: number
}

export type SubstractFee = (amount: number, totalBalance: number) => number;