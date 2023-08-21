import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Investment, Performance, ComplexInvestment, ComplexPerformance, InvestmentWithWithdrawFees, PerformanceWithWithdrawFees } from '../models/Investment';

export type InvestmentGridProps = {
    investment: Investment
}

export type ComplexInvestmentGridProps = {
    investment: ComplexInvestment
}

export type InvestmentGridWithMultipleWithdrawFeesProps = {
    investment: InvestmentWithWithdrawFees
}

const currencyFormatter = (amount: number): string => {
    var integerAmount = amount.toFixed(0);
    var formatted = integerAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} Lei`;
}

const profitCellClassRules = {
    'profit-cell': (params: any) => params.value > 0,
    'loss-cell': (params: any) => params.value <= 0,
}

const currencyColumnProperties = (field: string) => ({ width: 150, type: 'rightAligned', valueFormatter: (params: any) => currencyFormatter(params.data[field]) });
  
export const InvestmentGrid = (props: InvestmentGridProps) => {
    const [rowData, setRowData] = useState<Performance[]>(props.investment.performances);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'year', width: 80 },
        { ...currencyColumnProperties("investedMoney"), field: 'investedMoney', headerClass: 'less-important', cellStyle: {color: 'grey'} },
        { ...currencyColumnProperties("totalBalance"), field: 'totalBalance' },
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
        { ...currencyColumnProperties("totalBalance"), field: 'totalBalance', headerName:"Total Balance -1%" },
        { ...currencyColumnProperties("totalBalance2"), field: 'totalBalance2', headerName:"Total Balance -3%" },
        { ...currencyColumnProperties("totalBalance3"), field: 'totalBalance3', headerName:"Total Balance -10%" },
        { ...currencyColumnProperties("profit"), field: 'profit', headerName:"Profit -1%", cellClassRules: profitCellClassRules },
        { ...currencyColumnProperties("profit2"), field: 'profit2', headerName:"Profit -3%", cellClassRules: profitCellClassRules },
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
