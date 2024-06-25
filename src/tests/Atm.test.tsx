import { test, describe, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { AtmPO } from './Atm.po';
import { TAtmErrorMessagesEnum } from '../context/AtmContext.types';

describe('Atm', () => {
  beforeEach(() => {
    cleanup();
  });

  const initAccountBalance = 1000;

  test('renders app with balance 1000', async () => {
    const atmPO = AtmPO.render(initAccountBalance);
    atmPO.expectAccountBalanceToBe(initAccountBalance);
  });

  test('deposits 100 to current balance 1000', async () => {
    const atmPO = AtmPO.render(initAccountBalance);

    const addedAmount = 100;

    await atmPO.clickKeyboardButtonOne();
    await atmPO.clickKeyboardButtonZero();
    await atmPO.clickKeyboardButtonZero();

    atmPO.expectDisplayedValueToBe(addedAmount);

    await atmPO.clickDepositButton();

    atmPO.expectDisplayedValueToBe(''); // display value cleared
    atmPO.expectAccountBalanceToBe(initAccountBalance + addedAmount);
  });

  test('withdraw 100 when current balance is 1000', async () => {
    const atmPO = AtmPO.render(initAccountBalance);

    const withdrawAmount = 100;

    await atmPO.clickKeyboardButtonOne();
    await atmPO.clickKeyboardButtonZero();
    await atmPO.clickKeyboardButtonZero();

    atmPO.expectDisplayedValueToBe(withdrawAmount);

    await atmPO.clickWithdrawButton();

    atmPO.expectDisplayedValueToBe('');
    atmPO.expectAccountBalanceToBe(initAccountBalance - withdrawAmount);
    atmPO.expectErrorMessagesToBe({
      error: {
        type: 'noError',
      },
      accountBalance: initAccountBalance,
    });
  });

  test('withdraw 1100 when current balance is 1000', async () => {
    const atmPO = AtmPO.render(initAccountBalance);

    const withdrawAmount = 1100;

    await atmPO.clickKeyboardButtonOne();
    await atmPO.clickKeyboardButtonOne();
    await atmPO.clickKeyboardButtonZero();
    await atmPO.clickKeyboardButtonZero();

    atmPO.expectDisplayedValueToBe(withdrawAmount);

    await atmPO.clickWithdrawButton();

    atmPO.expectDisplayedValueToBe('');
    atmPO.expectAccountBalanceToBe(initAccountBalance); // balance should't change
    atmPO.expectErrorMessagesToBe({
      error: {
        type: 'withdraw',
        message: TAtmErrorMessagesEnum.WithdrawAmountIsToBig,
        amount: withdrawAmount,
      },
      accountBalance: initAccountBalance,
    });
  });
});
