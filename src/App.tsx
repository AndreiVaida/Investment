import './App.css';
import { ComplexInvestmentGrid, InvestmentGrid } from './components/InvestmentGrid';
import { basicAllianzInvestment, detailedAllianzInvestment } from './data/DefaultInvestments';

const App = () => {
  return (
    <div className="App ag-theme-balham" style={{ height: 210, width: "100%" }}>
      <h3>500 lei / month</h3>

      <h2>Allianz Țiriac: Dinamic Invest - basic estimation</h2>
      5% average yearly return
      <InvestmentGrid investment={basicAllianzInvestment} />

      <h2>Allianz Țiriac: Dinamic Invest - detailed estimation (bonds and stock separately)</h2>
      Bonds: 4% average yearly return <br/>
      Stock Market: 10% average yearly return
      <ComplexInvestmentGrid investment={detailedAllianzInvestment} />
    </div>
  );
}

export default App;
