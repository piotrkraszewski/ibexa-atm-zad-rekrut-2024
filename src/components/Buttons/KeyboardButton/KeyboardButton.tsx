import './KeyboardButton.scss';

type KeyboardButtonProps<T extends string | undefined> = {
  buttonName: T;
  onButtonClick: (value: T) => void;
};

export const KeyboardButton = <T extends string | undefined>({ buttonName, onButtonClick }: KeyboardButtonProps<T>) => {
  return (
    <button onClick={() => onButtonClick(buttonName)} className="atm-button" data-testid={`keyboard-button__${buttonName}`}>
      {buttonName}
    </button>
  );
};
