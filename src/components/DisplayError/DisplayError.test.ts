import { test, describe, expect, vi, beforeEach } from 'vitest';
import { TGetMessagesArray, getErrorMessagesArray } from './DisplayError.utils';
import { TAtmErrorMessagesEnum } from '../../context/AtmContext.types';
import { formatCurrency } from '../../utils/utils';

const mockErrorMessages = {
  [TAtmErrorMessagesEnum.WithdrawAmountIsToBig]: vi.fn(),
};

vi.doMock('../../utils/errorMessages', () => ({
  mockErrorMessages,
}));

describe('getErrorMessagesArray', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should return an empty array when there is no error', () => {
    const input: TGetMessagesArray = {
      error: { type: 'noError' },
      accountBalance: 1000,
    };

    const result = getErrorMessagesArray(input);

    expect(result).toEqual([]);
  });

  test('should return the correct error message array when WithdrawAmountIsToBig error occurs', () => {
    const accountBalance = 1000;
    const withdrawAmount = 2000;

    const input: TGetMessagesArray = {
      error: { type: 'withdraw', message: TAtmErrorMessagesEnum.WithdrawAmountIsToBig, amount: withdrawAmount },
      accountBalance,
    };

    const mockErrorMessageReturn = [
      `The withdrawal amount ${formatCurrency(withdrawAmount)}`,
      `exceeds your account balance ${formatCurrency(accountBalance)}.`,
    ];

    mockErrorMessages[TAtmErrorMessagesEnum.WithdrawAmountIsToBig].mockReturnValue(mockErrorMessageReturn);

    const result = getErrorMessagesArray(input);

    expect(result).toEqual(mockErrorMessageReturn);
  });
});
