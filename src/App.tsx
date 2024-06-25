import { AtmContextController } from './context/AtmContextController';
import { Atm } from './components/Atm';

function App() {
  return (
    <AtmContextController initAccountBalance={1000}>
      <Atm />
    </AtmContextController>
  );
}

export default App;
