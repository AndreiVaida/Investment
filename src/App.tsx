import './App.css';
import { ComplexInvestmentGrid, ComplexInvestmentGridVsManualMultipleWithdrawFees, InvestmentGrid, InvestmentGridWithMultipleWithdrawFees } from './components/InvestmentGrid';
import { basicAllianzInvestment, complexVsManualPerformances, detailedAllianzInvestment, manualBondsInvestment, manualStockMarketInvestment } from './data/DefaultInvestments';

const App = () => {
  return (
    <div className="App ag-theme-balham" style={{ height: 250, width: "100%" }}>
      <h3>500 Lei / month</h3>

      <h2>Allianz Țiriac: Dinamic Invest - basic estimation</h2>
      <div style={{textAlign: 'left', margin: 'auto', width: '30%'}}>
        5% average yearly return <br/>
        Mothly fee: 13,5 Lei <br/>
        Filling fee depending on total balance: <br/>
        &emsp;  5% ≤ 6.000 Lei <br/>
        &emsp;  4,5% ≤ 10.500 Lei <br/>
        &emsp;  4% ≤ 15.000 Lei <br/>
        &emsp;  3,5% ≤ 30.000 Lei <br/>
        &emsp;  3% ≤ 90.000 Lei <br/>
        &emsp;  2,5% &gt; 90.000 Lei
      </div>

      <InvestmentGrid investment={basicAllianzInvestment} />

      <h2>Allianz Țiriac: Dinamic Invest - detailed estimation (bonds and stock separately)</h2>
      250 Lei in Bonds + 250 Lei in Stock monthly investment <br/>
      Bonds: 4% average yearly return <br/>
      Stock Market: 10% average yearly return
      <ComplexInvestmentGrid investment={detailedAllianzInvestment} />

      <h2>Strategy executed personally - Bonds</h2>
      250 Lei monthly investment <br/>
      4% average yearly return <br/>
      Filling fee (bank transfer &lt;1.000 Lei): 2,5 Lei
      <InvestmentGrid investment={manualBondsInvestment} />

      <h2>Strategy executed personally - Stock Market</h2>
      <div style={{textAlign: 'left', margin: 'auto', width: '30%'}}>
        250 Lei monthly investment <br/>
        10% average yearly return <br/>
        Filling fee (bank transfer &lt;1.000 Lei): 2,5 Lei <br/>
        Transaction fee from TradeVille: 0,65% <br/>
        Transaction fee from government 2023: <br/>
        &emsp;  1% if you sell after 1 year <br/>
        &emsp;  3% if you sell before 1 year <br/>
        Transaction fee from government 20xx: 10% ?
      </div>
      <InvestmentGridWithMultipleWithdrawFees investment={manualStockMarketInvestment} />

      <h2>Complex Allianz vs Strategy executed personally</h2>
      <ComplexInvestmentGridVsManualMultipleWithdrawFees complexVsManualPerformances={complexVsManualPerformances} />
    </div>
  );
}

export default App;
