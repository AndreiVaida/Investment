import { evaluate } from 'mathjs';
import { ComplexInvestment, ComplexPerformance, ComplexVsManualPerformance, Investment, InvestmentWithWithdrawFees, Performance, PerformanceWithWithdrawFees, SubstractFee } from "../models/Investment"

export const computePerformances = (investment: Investment, years: number[]): Performance[] =>
    years.map(year => {
        const performance: Performance = {
            year: year,
            investedMoney: computeInvestedMoney(investment.monthlyInvestment, year),
            balance: 0,
            profit: 0
        };
        performance.balance = computeTotalBalance(investment.yearlyReturnPercent,
                                                       investment.substractFilingFee,
                                                       investment.monthlyInvestment,
                                                       investment.monthlyFee,
                                                       year);
        performance.profit = performance.balance - performance.investedMoney;
        return performance;
    });

    const computeInvestedMoney = (monthlyInvestment: number, year: number): number =>
    monthlyInvestment * 12 * year;

const computeTotalBalance = (yearlyReturnPercent: number,
                             substractFilingFee: SubstractFee,
                             monthlyInvestment: number,
                             monthlyFee: number,
                             year: number,
                             withdrawFee?: SubstractFee): number => {
    const balance = arrayOf(year).reduce((totalBalance, year) => {
        const yearBalanceBeforeProfit = addYearInvestmentToBalance(substractFilingFee, monthlyInvestment, monthlyFee, totalBalance);
        return evaluate(`${yearBalanceBeforeProfit} + ${yearlyReturnPercent}%`);
    }, 0);

    return withdrawFee ? withdrawFee(balance) : balance;
}

const addYearInvestmentToBalance = (substractFilingFee: SubstractFee,
                                    monthlyInvestment: number,
                                    monthlyFee: number,
                                    startYearBallance: number): number =>
    arrayOf(12).reduce((yearBalance, month) => {
        let monthInvestment = substractFilingFee(monthlyInvestment, yearBalance);
        monthInvestment = monthInvestment - monthlyFee;
        return yearBalance + monthInvestment;
    }, startYearBallance)

export const computeComplexPerformances = (investment: ComplexInvestment, years: number[]): ComplexPerformance[] =>
    {
        const innerMonthlyInvestment = investment.monthlyInvestment / 2;
        const innerMonthlyFee = investment.monthlyFee / 2;

        return years.map(year => {
            const performance: ComplexPerformance = {
                year: year,

                investedMoneyInBonds: computeInvestedMoney(innerMonthlyInvestment, year),
                bondsBalance: 0,
                bondsProfit: 0,

                investedMoneyInStockMarket: computeInvestedMoney(innerMonthlyInvestment, year),
                stockMarketBalance: 0,
                stockMarketProfit: 0,

                totalBalance: 0,
                totalProfit: 0
            };

            const {bondsBalance, stockMarketBalance} = computeComplexTotalBalance(investment.bondsYearlyReturnPercent,
                investment.substractFilingFee,
                investment.monthlyInvestment,
                investment.monthlyFee,
                year)

            performance.bondsBalance = computeTotalBalance(investment.bondsYearlyReturnPercent,
                investment.substractFilingFee,
                innerMonthlyInvestment,
                innerMonthlyFee,
                year);
            performance.bondsProfit = performance.bondsBalance - performance.investedMoneyInBonds;

            performance.stockMarketBalance = computeTotalBalance(investment.stockYearlyReturnPercent,
                investment.substractFilingFee,
                innerMonthlyInvestment,
                innerMonthlyFee,
                year);
            performance.stockMarketProfit = performance.stockMarketBalance - performance.investedMoneyInStockMarket;

            performance.totalBalance = performance.bondsBalance + performance.stockMarketBalance;
            performance.totalProfit = performance.bondsProfit + performance.stockMarketProfit;
            return performance;
        });
    };

const computeComplexTotalBalance = (yearlyReturnPercent: number,
                                    substractFilingFee: SubstractFee,
                                    monthlyInvestment: number,
                                    monthlyFee: number,
                                    year: number): {bondsBalance: number, stockMarketBalance: number} =>
    arrayOf(year).reduce(({ bondsBalance, stockMarketBalance }, year) => {
        const { bondsYearBalanceBeforeProfit, stockMarketYearBalanceBeforeProfit } = addComplexYearInvestmentToBalance(substractFilingFee, monthlyInvestment, monthlyFee, bondsBalance, stockMarketBalance);
        return {
            bondsBalance: evaluate(`${bondsYearBalanceBeforeProfit} + ${yearlyReturnPercent}%`),
            stockMarketBalance: evaluate(`${stockMarketYearBalanceBeforeProfit} + ${yearlyReturnPercent}%`)
        };
    }, { bondsBalance: 0, stockMarketBalance: 0 })

const addComplexYearInvestmentToBalance = (substractFilingFee: SubstractFee,
                                           monthlyInvestment: number,
                                           monthlyFee: number,
                                           startYearBondsBallance: number,
                                           startYearStockMarketBallance: number): { bondsYearBalanceBeforeProfit: number, stockMarketYearBalanceBeforeProfit: number } =>
    arrayOf(12).reduce(({bondsYearBalanceBeforeProfit, stockMarketYearBalanceBeforeProfit}, month) => {
        let monthInvestment = substractFilingFee(monthlyInvestment, startYearBondsBallance + startYearStockMarketBallance);
        const innerMonthInvestment = (monthInvestment - monthlyFee) / 2;
        return {
            bondsYearBalanceBeforeProfit: bondsYearBalanceBeforeProfit + innerMonthInvestment,
            stockMarketYearBalanceBeforeProfit: stockMarketYearBalanceBeforeProfit + innerMonthInvestment
        }
    }, {bondsYearBalanceBeforeProfit: startYearBondsBallance, stockMarketYearBalanceBeforeProfit: startYearStockMarketBallance})

export const computePerformancesWithWithdrawFees = (investment: InvestmentWithWithdrawFees, years: number[]): PerformanceWithWithdrawFees[] =>
    years.map(year => {
        const performance: PerformanceWithWithdrawFees = {
            year: year,
            investedMoney: computeInvestedMoney(investment.monthlyInvestment, year),
            balance: 0,
            balance2: 0,
            balance3: 0,
            profit: 0,
            profit2: 0,
            profit3: 0
        };
        performance.balance = computeTotalBalance(investment.yearlyReturnPercent,
                                                       investment.substractFilingFee,
                                                       investment.monthlyInvestment,
                                                       investment.monthlyFee,
                                                       year,
                                                       investment.substractWithdrawFeeVariants[0]);
        performance.balance2 = computeTotalBalance(investment.yearlyReturnPercent,
                                                        investment.substractFilingFee,
                                                        investment.monthlyInvestment,
                                                        investment.monthlyFee,
                                                        year,
                                                        investment.substractWithdrawFeeVariants[1]);
        performance.balance3 = computeTotalBalance(investment.yearlyReturnPercent,
                                                        investment.substractFilingFee,
                                                        investment.monthlyInvestment,
                                                        investment.monthlyFee,
                                                        year,
                                                        investment.substractWithdrawFeeVariants[2]);
        performance.profit = performance.balance - performance.investedMoney;
        performance.profit2 = performance.balance2 - performance.investedMoney;
        performance.profit3 = performance.balance3 - performance.investedMoney;
        return performance;
    });


export const mergeAndComputeDifference = (years: number[], detailedAllianzInvestment: ComplexInvestment, manualBondsInvestment: Investment, manualStockMarketInvestment: InvestmentWithWithdrawFees): ComplexVsManualPerformance[] => {
    return years.map((year, index) => {
        const complexPerformance = detailedAllianzInvestment.performances[index];
        const manualBondsPrformance = manualBondsInvestment.performances[index];
        const manualStockPerformance = manualStockMarketInvestment.performances[index];

        const manual_totalBalance1 = manualBondsPrformance.balance + manualStockPerformance.balance;
        const manual_totalBalance2 = manualBondsPrformance.balance + manualStockPerformance.balance2;
        const manual_totalBalance3 = manualBondsPrformance.balance + manualStockPerformance.balance3;
        const manual_totalProfit1 = manualBondsPrformance.profit + manualStockPerformance.profit;
        const manual_totalProfit2 = manualBondsPrformance.profit + manualStockPerformance.profit2;
        const manual_totalProfit3 = manualBondsPrformance.profit + manualStockPerformance.profit3;

        const complexVsManualPerformance: ComplexVsManualPerformance = {
            year: year,
            investedMoney: complexPerformance.investedMoneyInBonds + complexPerformance.investedMoneyInStockMarket,

            complex_bondsBalance: complexPerformance.bondsBalance,
            complex_bondsProfit: complexPerformance.bondsProfit,
            complex_stockMarketBalance: complexPerformance.stockMarketBalance,
            complex_stockMarketProfit: complexPerformance.stockMarketProfit,
            complex_totalBalance: complexPerformance.totalBalance,
            complex_totalProfit: complexPerformance.totalProfit,

            manual_bondsBalance: manualBondsPrformance.balance,
            manual_bondsProfit: manualBondsPrformance.profit,
            manual_stockMarketBalance1: manualStockPerformance.balance,
            manual_stockMarketBalance2: manualStockPerformance.balance2,
            manual_stockMarketBalance3: manualStockPerformance.balance3,
            manual_stockMarketProfit1: manualStockPerformance.profit,
            manual_stockMarketProfit2: manualStockPerformance.profit2,
            manual_stockMarketProfit3: manualStockPerformance.profit3,
            manual_totalBalance1: manual_totalBalance1,
            manual_totalBalance2: manual_totalBalance2,
            manual_totalBalance3: manual_totalBalance3,
            manual_totalProfit1: manual_totalProfit1,
            manual_totalProfit2: manual_totalProfit2,
            manual_totalProfit3: manual_totalProfit3,

            bondsBalanceDifference: complexPerformance.bondsBalance - manualBondsPrformance.balance,
            bondsProfitDifference: complexPerformance.bondsProfit - manualBondsPrformance.profit,

            stockBalanceDifference1: complexPerformance.stockMarketBalance - manualStockPerformance.balance,
            stockBalanceDifference2: complexPerformance.stockMarketBalance - manualStockPerformance.balance2,
            stockBalanceDifference3: complexPerformance.stockMarketBalance - manualStockPerformance.balance3,
            stockProfitDifference1: complexPerformance.stockMarketProfit - manualStockPerformance.profit,
            stockProfitDifference2: complexPerformance.stockMarketProfit - manualStockPerformance.profit2,
            stockProfitDifference3: complexPerformance.stockMarketProfit - manualStockPerformance.profit3,

            totalBalanceDifference1: complexPerformance.totalBalance - manual_totalBalance1,
            totalBalanceDifference2: complexPerformance.totalBalance - manual_totalBalance2,
            totalBalanceDifference3: complexPerformance.totalBalance - manual_totalBalance3,
            totalProfitDifference1: complexPerformance.totalProfit - manual_totalProfit1,
            totalProfitDifference2: complexPerformance.totalProfit - manual_totalProfit2,
            totalProfitDifference3: complexPerformance.totalProfit - manual_totalProfit3,
        }

        return complexVsManualPerformance;
    });
}

const arrayOf = (n: number): number[] => Array.from(Array(n).keys());
