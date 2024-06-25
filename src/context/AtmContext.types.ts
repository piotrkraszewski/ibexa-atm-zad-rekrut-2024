import { Dispatch, SetStateAction } from 'react';

export enum TAtmErrorMessagesEnum {
  'WithdrawAmountIsToBig',
}

export type TAtmError =
  | { type: 'noError' }
  | {
      type: 'withdraw';
      message: TAtmErrorMessagesEnum.WithdrawAmountIsToBig;
      amount: number;
    }; // possible to extend with other error messages

export type AtmContextValue = {
  accountBalance: number;
  setAccountBalance: Dispatch<SetStateAction<number>>;
  displayedValue: string;
  setDisplayedValue: Dispatch<SetStateAction<string>>;
  error: TAtmError;
  setError: Dispatch<SetStateAction<TAtmError>>;
};
