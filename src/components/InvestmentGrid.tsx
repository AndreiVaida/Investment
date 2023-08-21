import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Investment, Performance } from '../models/Investment';

export type InvestmentGridProps = {
    investment: Investment
}

export const InvestmentGrid = (props: InvestmentGridProps) => {
    const [rowData, setRowData] = useState<Performance[]>(props.investment.performances);

    const currencyFormatter = (amount: number): string => {
        var integerAmount = amount.toFixed(0);
        var formatted = integerAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formatted} Lei`;
    }

    const profitCellClassRules = {
        'profit-cell': (params: any) => params.value > 0,
        'loss-cell': (params: any) => params.value <= 0,
    }

    const currencyColumnProperties = (field: string) => ({ type: 'rightAligned', valueFormatter: (params: any) => currencyFormatter(params.data[field]) });
    const [columnDefs, setColumnDefs] = useState([
        { field: 'year' },
        { ...currencyColumnProperties("investedMoney"), field: 'investedMoney' },
        { ...currencyColumnProperties("totalBalance"), field: 'totalBalance' },
        { ...currencyColumnProperties("profit"), field: 'profit', cellClassRules: profitCellClassRules }
    ]);

    return (
        <>
            <div style={{textAlign:"left"}}>
                <div>Monthly investment: {currencyFormatter(props.investment.monthlyInvestment)}</div>
                <div>Filling fee: TODO</div>
                <div>Monthly fee: TODO</div>
                <div>withdraw fee: TODO</div>
            </div>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </>
    )
}
