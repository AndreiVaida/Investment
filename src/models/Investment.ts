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

export type ComplexInvestment = {
    monthlyInvestment: number,
    substractFilingFee: SubstractFee,
    monthlyFee: number,
    bondsYearlyReturnPercent: number,
    stockYearlyReturnPercent: number,
    performances: ComplexPerformance[]
}

export type ComplexPerformance = {
    year: number,
    
    investedMoneyInBonds: number,
    bondsBalance: number,
    bondsProfit: number,
    
    investedMoneyInStockMarket: number,
    stockMarketBalance: number,
    stockMarketProfit: number,
    
    totalBalance: number,
    totalProfit: number
}

export type YearlyReturn = {
    name: string,
    percent: number
}

export type SubstractFee = (amount: number, totalBalance: number) => number;