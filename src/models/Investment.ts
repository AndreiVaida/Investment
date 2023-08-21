export type Investment = {
    monthlyInvestment: number,
    substractFilingFee: SubstractFee,
    monthlyFee: number,
    yearlyReturnPercent: number,
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

export type InvestmentWithWithdrawFees = Investment & {
    substractWithdrawFeeVariants: SubstractFee[],
    performances: PerformanceWithWithdrawFees[]
}

export type PerformanceWithWithdrawFees = Performance & {
    totalBalance2: number,
    totalBalance3: number,
    profit2: number,
    profit3: number
}

export type YearlyReturn = {
    name: string,
    percent: number
}

export type SubstractFee = (amount: number, totalBalance?: number) => number;