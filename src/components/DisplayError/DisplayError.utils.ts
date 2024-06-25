import { TAtmErrorMessagesEnum, TAtmError } from '../../context/AtmContext.types';
import { errorMessages } from '../../utils/errorMessages';

export type TGetMessagesArray = {
  error: TAtmError;
  accountBalance: number;
};

export const getErrorMessagesArray = ({ error, accountBalance }: TGetMessagesArray) => {
  if (error.type === 'noError') return [];

  switch (error.message) {
    case TAtmErrorMessagesEnum.WithdrawAmountIsToBig:
      return errorMessages[error.message]({ withdrawAmount: error.amount, accountBalance });
    default:
      return [];
    // possible to extend with other error messages
  }
};
