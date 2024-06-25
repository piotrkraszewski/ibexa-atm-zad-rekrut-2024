import { useAtmContext } from '../../../context/AtmContext';
import { TAtmErrorMessagesEnum } from '../../../context/AtmContext.types';
import { ActionButtonProps } from './ActionButton.types';

export const useOnActionButtonClick = () => {
  const { accountBalance, setAccountBalance, displayedValue, setDisplayedValue, setError } = useAtmContext();

  const onActionButtonClick = ({ type }: ActionButtonProps) => {
    setError({ type: 'noError' });

    switch (type) {
      case 'deposit': {
        const balanceAfterDeposit = accountBalance + Number(displayedValue);
        setAccountBalance(balanceAfterDeposit);
        return setDisplayedValue('');
      }
      case 'withdraw': {
        const remaningBalance = accountBalance - Number(displayedValue);

        if (remaningBalance < 0) {
          setError({
            type: 'withdraw',
            message: TAtmErrorMessagesEnum.WithdrawAmountIsToBig,
            amount: Number(displayedValue),
          });
        } else {
          const balanceAfterWithdraw = accountBalance - Number(displayedValue);
          setAccountBalance(balanceAfterWithdraw);
        }

        return setDisplayedValue('');
      }
    }
  };

  return { onActionButtonClick };
};
