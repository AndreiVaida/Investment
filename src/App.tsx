import './App.css';
import { InvestmentGrid } from './components/InvestmentGrid';
import { allianzInvestment } from './data/DefaultInvestments';

const App = () => {
  return (
    <div className="App ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h1>Investment</h1>
      <InvestmentGrid investment={allianzInvestment} />
    </div>
  );
}

export default App;
