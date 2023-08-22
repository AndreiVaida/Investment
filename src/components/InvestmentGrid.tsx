import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { Investment, Performance, ComplexInvestment, ComplexPerformance, InvestmentWithWithdrawFees, PerformanceWithWithdrawFees, ComplexVsManualPerformance } from '../models/Investment';

export type InvestmentGridProps = {
    investment: Investment
}

export type ComplexInvestmentGridProps = {
    investment: ComplexInvestment
}

export type InvestmentGridWithMultipleWithdrawFeesProps = {
    investment: InvestmentWithWithdrawFees
}

export type ComplexVsManualPerformanceProps = {
    complexVsManualPerformances: ComplexVsManualPerformance[]
}

const currencyFormatter = (amount: number): string => {
    var integerAmount = amount.toFixed(0);
    var formatted = integerAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} Lei`;
}

const profitCellClassRules = {
    'profit-cell': (params: any) => params.value > 0,
    'loss-cell': (params: any) => params.value <= 0,
    'right-border': (params: any) => !['complex_totalProfit', 'manual_totalProfit1', 'manual_totalProfit2', 'manual_totalProfit3'].includes(params.colDef.field),
    'bold-text': (params: any) => params.colDef.field.includes("Difference"),
}

const currencyColumnProperties = (field: string) => ({ width: 150, type: 'rightAligned', valueFormatter: (params: any) => currencyFormatter(params.data[field]) });
const smallCurrencyColumnProperties = (field: string) => ({ ...currencyColumnProperties(field), width: 125 });
  
export const InvestmentGrid = (props: InvestmentGridProps) => {
    const [rowData, setRowData] = useState<Performance[]>(props.investment.performances);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'year', width: 80 },
        { ...currencyColumnProperties("investedMoney"), field: 'investedMoney', headerClass: 'less-important', cellStyle: {color: 'grey'} },
        { ...currencyColumnProperties("balance"), field: 'balance' },
        { ...currencyColumnProperties("profit"), field: 'profit', cellClassRules: profitCellClassRules }
    ]);

    return (
        <>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </>
    )
}

export const ComplexInvestmentGrid = (props: ComplexInvestmentGridProps) => {
    const [rowData, setRowData] = useState<ComplexPerformance[]>(props.investment.performances);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'year', width: 80 },

        { ...currencyColumnProperties("investedMoneyInBonds"), field: 'investedMoneyInBonds', headerClass: 'less-important', cellStyle: {color: 'grey'} },
        { ...currencyColumnProperties("bondsBalance"), field: 'bondsBalance' },
        { ...currencyColumnProperties("bondsProfit"), field: 'bondsProfit', cellClassRules: profitCellClassRules },

        { ...currencyColumnProperties("investedMoneyInStockMarket"), field: 'investedMoneyInStockMarket', headerClass: 'less-important', cellStyle: {color: 'grey'} },
        { ...currencyColumnProperties("stockMarketBalance"), field: 'stockMarketBalance' },
        { ...currencyColumnProperties("stockMarketProfit"), field: 'stockMarketProfit', cellClassRules: profitCellClassRules },

        { ...currencyColumnProperties("totalBalance"), field: 'totalBalance' },
        { ...currencyColumnProperties("totalProfit"), field: 'totalProfit', cellClassRules: profitCellClassRules }
    ]);

    return (
        <>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                headerHeight={40}>
            </AgGridReact>
        </>
    )
}

export const InvestmentGridWithMultipleWithdrawFees = (props: InvestmentGridWithMultipleWithdrawFeesProps) => {
    const [rowData, setRowData] = useState<PerformanceWithWithdrawFees[]>(props.investment.performances);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'year', width: 80 },
        { ...currencyColumnProperties("investedMoney"), field: 'investedMoney', headerClass: 'less-important', cellStyle: {color: 'grey'} },
        { ...currencyColumnProperties("balance"), field: 'balance', headerName:"Total Balance -1%" },
        { ...currencyColumnProperties("profit"), field: 'profit', headerName:"Profit -1%", cellClassRules: profitCellClassRules },
        { ...currencyColumnProperties("balance2"), field: 'balance2', headerName:"Total Balance -4,7%" },
        { ...currencyColumnProperties("profit2"), field: 'profit2', headerName:"Profit -4,7%", cellClassRules: profitCellClassRules },
        { ...currencyColumnProperties("balance3"), field: 'balance3', headerName:"Total Balance -10%" },
        { ...currencyColumnProperties("profit3"), field: 'profit3', headerName:"Profit -10%", cellClassRules: profitCellClassRules }
    ]);

    return (
        <>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                headerHeight={40}>
            </AgGridReact>
        </>
    )
}

export const ComplexInvestmentGridVsManualMultipleWithdrawFees = (props: ComplexVsManualPerformanceProps) => {
    const [rowData, setRowData] = useState<ComplexVsManualPerformance[]>(props.complexVsManualPerformances);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'year', width: 55, pinned: 'left' },
        { ...smallCurrencyColumnProperties("investedMoney"), field: 'investedMoney', headerClass: 'less-important', cellStyle: {color: 'grey'} },

        { ...smallCurrencyColumnProperties("complex_bondsBalance"), field: 'complex_bondsBalance', headerName:"Allianz Bonds Balance" },
        { ...smallCurrencyColumnProperties("manual_bondsBalance"), field: 'manual_bondsBalance' },
        { ...smallCurrencyColumnProperties("bondsBalanceDifference"), field: 'bondsBalanceDifference', cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },

        { ...smallCurrencyColumnProperties("complex_stockMarketBalance"), field: 'complex_stockMarketBalance', headerName:"Allianz Stock Market Balance" },
        { ...smallCurrencyColumnProperties("manual_stockMarketBalance1"), field: 'manual_stockMarketBalance1', headerName:"Stock Balance -1%" },
        { ...smallCurrencyColumnProperties("stockBalanceDifference1"), field: 'stockBalanceDifference1', headerName:"Stock Balance Difference -1%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
        { ...smallCurrencyColumnProperties("manual_stockMarketBalance2"), field: 'manual_stockMarketBalance2', headerName:"Stock Balance -4,7%" },
        { ...smallCurrencyColumnProperties("stockBalanceDifference2"), field: 'stockBalanceDifference2', headerName:"Stock Balance Difference -4,7%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
        { ...smallCurrencyColumnProperties("manual_stockMarketBalance3"), field: 'manual_stockMarketBalance3', headerName:"Stock Balance -10%" },
        { ...smallCurrencyColumnProperties("stockBalanceDifference3"), field: 'stockBalanceDifference3', headerName:"Stock Balance Difference -10%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },

        { ...smallCurrencyColumnProperties("complex_totalBalance"), field: 'complex_totalBalance', headerName:"Allianz Total Balance" },
        { ...smallCurrencyColumnProperties("manual_totalBalance1"), field: 'manual_totalBalance1', headerName:"Manual Total Balance -1%" },
        { ...smallCurrencyColumnProperties("totalBalanceDifference1"), field: 'totalBalanceDifference1', headerName:"Total Balance Difference -1%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
        { ...smallCurrencyColumnProperties("manual_totalBalance2"), field: 'manual_totalBalance2', headerName:"Manual Total Balance -4,7%" },
        { ...smallCurrencyColumnProperties("totalBalanceDifference2"), field: 'totalBalanceDifference2', headerName:"Total Balance Difference -4,7%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
        { ...smallCurrencyColumnProperties("manual_totalBalance3"), field: 'manual_totalBalance3', headerName:"Manual Total Balance -10%" },
        { ...smallCurrencyColumnProperties("totalBalanceDifference3"), field: 'totalBalanceDifference3', headerName:"Total Balance Difference -10%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },

        { ...smallCurrencyColumnProperties("complex_totalProfit"), field: 'complex_totalProfit', cellClassRules: profitCellClassRules, headerName:"Allianz Total Profit" },
        { ...smallCurrencyColumnProperties("manual_totalProfit1"), field: 'manual_totalProfit1', headerName:"Manual Total Profit -1%", cellClassRules: profitCellClassRules },
        { ...smallCurrencyColumnProperties("totalProfitDifference1"), field: 'totalProfitDifference1', headerName:"Total Profit Difference -1%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
        { ...smallCurrencyColumnProperties("manual_totalProfit2"), field: 'manual_totalProfit2', headerName:"Manual Total Profit -4,7%", cellClassRules: profitCellClassRules },
        { ...smallCurrencyColumnProperties("totalProfitDifference2"), field: 'totalProfitDifference2', headerName:"Total Profit Difference -4,7%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
        { ...smallCurrencyColumnProperties("manual_totalProfit3"), field: 'manual_totalProfit3', headerName:"Manual Total Profit -10%", cellClassRules: profitCellClassRules },
        { ...smallCurrencyColumnProperties("totalProfitDifference3"), field: 'totalProfitDifference3', headerName:"Total Profit Difference -10%", cellClassRules: profitCellClassRules, headerClass: 'bold-text-header' },
    ]);

    return (
        <>
            <AgGridReact
                rowData={rowData}
                // @ts-ignore
                columnDefs={columnDefs}
                headerHeight={50}>
            </AgGridReact>
        </>
    )
}
