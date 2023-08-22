import {evaluate} from 'mathjs';
import { ComplexInvestment, ComplexVsManualPerformance, Investment, InvestmentWithWithdrawFees, SubstractFee } from '../models/Investment';
import { computeComplexPerformances, computePerformances, computePerformancesWithWithdrawFees, mergeAndComputeDifference } from '../services/InvestmentService';

const investmentYears = [1, 10, 20, 30, 40, 50];
const monthlyInvestment = 500;

const allianzFillingFeeFunction = (amount: number, totalBalance?: number): number => {
    const feePercent = totalBalance! <= 6000 ? 5
                     : totalBalance! <= 10500 ? 4.5
                     : totalBalance! <= 15000 ? 4
                     : totalBalance! <= 30000 ? 3.5
                     : totalBalance! <= 90000 ? 3
                     : 2.5;
    return evaluate(`${amount} - ${feePercent}%`);
}

const bankTransferFeeFunction =  (amount: number, totalBalance?: number): number => amount - 2.5

const getTradeVilleWithdrawFeeFunctions = (): SubstractFee[] => {
    const governmentWithdrawFeeFunction1 = (amount: number): number => {
        const amountAfterTradeVilleFee = evaluate(`${amount} - 0.65%`);
        return evaluate(`${amountAfterTradeVilleFee} - 1%`);
    };
    const governmentWithdrawFeeFunction2 = (amount: number): number => {
        const amountAfterTradeVilleFee = evaluate(`${amount} - 0.65%`);
        return evaluate(`${amountAfterTradeVilleFee} - 3%`);
    };
    const governmentWithdrawFeeFunction3 = (amount: number): number => {
        const amountAfterTradeVilleFee = evaluate(`${amount} - 0.65%`);
        return evaluate(`${amountAfterTradeVilleFee} - 10%`);
    };

    return [governmentWithdrawFeeFunction1, governmentWithdrawFeeFunction2, governmentWithdrawFeeFunction3]
};

export const basicAllianzInvestment: Investment = {
    monthlyInvestment: 500,
    substractFilingFee: allianzFillingFeeFunction,
    monthlyFee: 13.5,
    yearlyReturnPercent: 5,
    performances: []
}
basicAllianzInvestment.performances = computePerformances(basicAllianzInvestment, investmentYears);

export const detailedAllianzInvestment: ComplexInvestment = {
    monthlyInvestment: monthlyInvestment,
    substractFilingFee: allianzFillingFeeFunction,
    monthlyFee: 13.5,
    bondsYearlyReturnPercent: 4,
    stockYearlyReturnPercent: 10,
    performances: []
}
detailedAllianzInvestment.performances = computeComplexPerformances(detailedAllianzInvestment, investmentYears);

export const manualBondsInvestment: Investment = {
    monthlyInvestment: 250,
    substractFilingFee: bankTransferFeeFunction,
    monthlyFee: 0,
    yearlyReturnPercent: 4,
    performances: []
}
manualBondsInvestment.performances = computePerformances(manualBondsInvestment, investmentYears);

export const manualStockMarketInvestment: InvestmentWithWithdrawFees = {
    monthlyInvestment: 250,
    substractFilingFee: bankTransferFeeFunction,
    monthlyFee: 0,
    yearlyReturnPercent: 10,
    substractWithdrawFeeVariants: getTradeVilleWithdrawFeeFunctions(),
    performances: []
}
manualStockMarketInvestment.performances = computePerformancesWithWithdrawFees(manualStockMarketInvestment, investmentYears);

export const complexVsManualPerformances: ComplexVsManualPerformance[] = mergeAndComputeDifference(investmentYears, detailedAllianzInvestment, manualBondsInvestment, manualStockMarketInvestment);
