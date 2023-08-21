import { evaluate } from 'mathjs';
import { ComplexInvestment, ComplexPerformance, Investment, Performance, SubstractFee } from "../models/Investment"

export const computePerformances = (investment: Investment, years: number[]): Performance[] =>
    years.map(year => {
        const performance: Performance = {
            year: year,
            investedMoney: computeInvestedMoney(investment.monthlyInvestment, year),
            totalBalance: 0,
            profit: 0
        };
        performance.totalBalance = computeTotalBalance(investment.yearlyReturnPercent,
                                                       investment.substractFilingFee,
                                                       investment.monthlyInvestment,
                                                       investment.monthlyFee,
                                                       year);
        performance.profit = performance.totalBalance - performance.investedMoney;
        return performance;
    });

    const computeInvestedMoney = (monthlyInvestment: number, year: number): number =>
    monthlyInvestment * 12 * year;

const computeTotalBalance = (yearlyReturnPercent: number,
                             substractFilingFee: SubstractFee,
                             monthlyInvestment: number,
                             monthlyFee: number,
                             year: number): number =>
    arrayOf(year).reduce((totalBalance, year) => {
        const yearBalanceBeforeProfit = addYearInvestmentToBalance(substractFilingFee, monthlyInvestment, monthlyFee, totalBalance);
        return evaluate(`${yearBalanceBeforeProfit} + ${yearlyReturnPercent}%`);
    }, 0)

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

const arrayOf = (n: number): number[] => Array.from(Array(n).keys());


