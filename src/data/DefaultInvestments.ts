import {evaluate} from 'mathjs';
import { ComplexInvestment, Investment } from '../models/Investment';
import { computeComplexPerformances, computePerformances } from '../services/InvestmentService';

const investmentYears = [1, 10, 20, 30, 40, 50];
const monthlyInvestment = 500;

const allianzFillingFeeFunction = (amount: number, totalBalance: number): number => {
    const feePercent = totalBalance <= 6000 ? 5
                     : totalBalance <= 10500 ? 4.5
                     : totalBalance <= 15000 ? 4
                     : totalBalance <= 30000 ? 3.5
                     : totalBalance <= 90000 ? 3
                     : 2.5;
    return evaluate(`${amount} - ${4}%`);
}

export const basicAllianzInvestment: Investment = {
    monthlyInvestment: 500,
    substractFilingFee: allianzFillingFeeFunction,
    monthlyFee: 13.5,
    yearlyReturnPercent: 5,
    substractWithdrawFee: (amount) => amount,
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
