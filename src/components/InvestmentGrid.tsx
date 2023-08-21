import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Investment, Performance, ComplexInvestment, ComplexPerformance } from '../models/Investment';

export type InvestmentGridProps = {
    investment: Investment
}

export type ComplexInvestmentGridProps = {
    investment: ComplexInvestment
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
