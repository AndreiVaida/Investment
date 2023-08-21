import { evaluate } from 'mathjs';
import { Investment, Performance } from "../models/Investment"

export const computePerformances = (investment: Investment, years: number[]): Performance[] =>
    years.map(year => {
        const performance: Performance = {
            year: year,
            investedMoney: computeInvestedMoney(investment, year),
            totalBalance: 0,
            profit: 0
        };
        performance.totalBalance = computeTotalBalance(investment, year);
        performance.profit = performance.totalBalance - performance.investedMoney;
        return performance;
    })

const computeInvestedMoney = (investment: Investment, year: number): number =>
    investment.monthlyInvestment * 12 * year;

const computeTotalBalance = (investment: Investment, year: number): number =>
    arrayOf(year).reduce((totalBalance, year) => {
        const yearBalanceBeforeProfit = addYearInvestmentToBalance(investment, totalBalance);
        return evaluate(`${yearBalanceBeforeProfit} + ${investment.yearlyReturnPercent}%`);
    }, 0)

const arrayOf = (n: number): number[] => Array.from(Array(n).keys());

const addYearInvestmentToBalance = (investment: Investment, startYearBallance: number): number =>
    arrayOf(12).reduce((yearBalance, month) => {
        let monthInvestment = investment.substractFilingFee(investment.monthlyInvestment, yearBalance);
        monthInvestment = monthInvestment - investment.monthlyFee;
        return yearBalance + monthInvestment;
    }, startYearBallance)
