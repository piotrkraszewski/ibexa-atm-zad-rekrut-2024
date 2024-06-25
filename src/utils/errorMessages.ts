import { TAtmErrorMessagesEnum } from '../context/AtmContext.types';
import { formatCurrency } from './utils';

export const errorTypesMessages = {
  withdraw: 'Withdrawing error',
};

export const errorMessages = {
  [TAtmErrorMessagesEnum.WithdrawAmountIsToBig]: ({
    withdrawAmount,
    accountBalance,
  }: {
    withdrawAmount: number;
    accountBalance: number;
  }) => [
    `The withdrawal amount ${formatCurrency(withdrawAmount)}`,
    `exceeds your account balance ${formatCurrency(accountBalance)}.`,
  ],
  // possible to extend with other error messages
};
