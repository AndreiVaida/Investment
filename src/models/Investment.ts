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
    balance: number,
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
    balance2: number,
    balance3: number,
    profit2: number,
    profit3: number
}

export type ComplexVsManualPerformance = {
    year: number,
    investedMoney: number,

    complex_bondsBalance: number,
    complex_bondsProfit: number,
    complex_stockMarketBalance: number,
    complex_stockMarketProfit: number,
    complex_totalBalance: number,
    complex_totalProfit: number
    
    manual_bondsBalance: number,
    manual_bondsProfit: number,
    manual_stockMarketBalance1: number,
    manual_stockMarketBalance2: number,
    manual_stockMarketBalance3: number,
    manual_stockMarketProfit1: number,
    manual_stockMarketProfit2: number,
    manual_stockMarketProfit3: number,
    manual_totalBalance1: number,
    manual_totalBalance2: number,
    manual_totalBalance3: number,
    manual_totalProfit1: number
    manual_totalProfit2: number
    manual_totalProfit3: number

    bondsBalanceDifference: number,
    bondsProfitDifference: number,

    stockBalanceDifference1: number,
    stockBalanceDifference2: number,
    stockBalanceDifference3: number,
    stockProfitDifference1: number,
    stockProfitDifference2: number,
    stockProfitDifference3: number,

    totalBalanceDifference1: number,
    totalBalanceDifference2: number,
    totalBalanceDifference3: number,
    totalProfitDifference1: number,
    totalProfitDifference2: number,
    totalProfitDifference3: number,
}

export type YearlyReturn = {
    name: string,
    percent: number
}

export type SubstractFee = (amount: number, totalBalance?: number) => number;