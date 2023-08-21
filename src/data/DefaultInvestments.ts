import {evaluate} from 'mathjs';
import { Investment, Performance } from '../models/Investment';
import { computePerformances } from '../services/InvestmentService';

const investmentYears = [1, 10, 20, 30, 40, 50];

const allianzFillingFeeFunction = (amount: number, totalBalance: number): number => {
    const feePercent = totalBalance <= 6000 ? 5
                     : totalBalance <= 10500 ? 4.5
                     : totalBalance <= 15000 ? 4
                     : totalBalance <= 30000 ? 3.5
                     : totalBalance <= 90000 ? 3
                     : 2.5;
    return evaluate(`${amount} - ${feePercent}%`);
}

const allianzMeanFillingFeeFunction = (amount: number, totalBalance: number): number => {
    const feePercent = 4;
    return evaluate(`${amount} - ${feePercent}%`);
}

export const allianzInvestment: Investment = {
    monthlyInvestment: 500,
    substractFilingFee: allianzFillingFeeFunction,
    monthlyFee: 13.5,
    yearlyReturnPercent: 5,
    substractWithdrawFee: (amount) => amount,
    performances: []
}
allianzInvestment.performances = computePerformances(allianzInvestment, investmentYears);