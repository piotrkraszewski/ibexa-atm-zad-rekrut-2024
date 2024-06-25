import { formatCurrency } from '../utils/utils';
import ATMKeyboard from './AtmKeyboard/AtmKeyboard';
import { useAtmContext } from '../context/AtmContext';
import { DisplayError } from './DisplayError/DisplayError';
import { ActionButtonsContainer } from './Buttons/ActionButtonsContainer/ActionButtonsContainer';
import './Atm.scss';

export function Atm() {
  const { accountBalance } = useAtmContext();

  return (
    <>
      <p className="account-balance">
        Balance: <span data-testid="account-balance__value">{formatCurrency(accountBalance)}</span>
      </p>
      <ActionButtonsContainer />
      <DisplayError />
      <ATMKeyboard />
    </>
  );
}
