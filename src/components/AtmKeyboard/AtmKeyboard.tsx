import { KeyboardButton } from '../Buttons/KeyboardButton/KeyboardButton';
import { formatCurrency } from '../../utils/utils';
import { useAtmContext } from '../../context/AtmContext';
import './AtmKeyboard.scss';

const atmNumberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const ATMKeyboard = () => {
  const { displayedValue, setDisplayedValue } = useAtmContext();

  const handleButtonClick = (value: string) => {
    setDisplayedValue((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setDisplayedValue('');
  };

  return (
    <div className="atm-keyboard">
      <div className="display" data-testid={'display'}>
        {formatCurrency(displayedValue)}
      </div>
      <div className="buttons">
        {atmNumberKeys.map((atmNumberKey) => (
          <KeyboardButton key={atmNumberKey} buttonName={atmNumberKey} onButtonClick={handleButtonClick} />
        ))}
        <KeyboardButton buttonName={'Clear'} onButtonClick={handleClear} />
      </div>
    </div>
  );
};

export default ATMKeyboard;
