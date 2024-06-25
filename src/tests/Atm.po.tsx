import { getByTestId, render } from '@testing-library/react';
import { AtmContextController } from '../context/AtmContextController';
import { expect } from 'vitest';
import { Atm } from '../components/Atm';
import { formatCurrency } from '../utils/utils';
import userEvent from '@testing-library/user-event';
import { errorMessages } from '../utils/errorMessages';
import { TGetMessagesArray } from '../components/DisplayError/DisplayError.utils';

export class AtmPO {
  private elements: {
    keyboardButtonOne: HTMLElement;
    keyboardButtonZero: HTMLElement;
    depositButton: HTMLElement;
    withdrawButton: HTMLElement;
    display: HTMLElement;
    currentAccountBalance: HTMLElement;
    errorMessagesContainer?: HTMLElement;
  };

  protected constructor(protected container: HTMLElement) {
    this.elements = {
      get keyboardButtonOne() {
        return getByTestId(container, 'keyboard-button__1');
      },
      get keyboardButtonZero() {
        return getByTestId(container, 'keyboard-button__0');
      },
      get depositButton() {
        return getByTestId(container, 'action-button__deposit');
      },
      get withdrawButton() {
        return getByTestId(container, 'action-button__withdraw');
      },
      get display() {
        return getByTestId(container, 'display');
      },
      get currentAccountBalance() {
        return getByTestId(container, 'account-balance__value');
      },
      get errorMessagesContainer() {
        try {
          return getByTestId(container, 'error-messages');
        } catch (error) {
          return undefined;
        }
      },
    };
  }

  static render(initAccountBalance: number) {
    const { container } = render(
      <AtmContextController initAccountBalance={initAccountBalance}>
        <Atm />
      </AtmContextController>
    );

    return new AtmPO(container as HTMLElement);
  }

  expectAccountBalanceToBe(value: number) {
    expect(this.elements.currentAccountBalance.textContent).toBe(formatCurrency(value));
  }

  expectDisplayedValueToBe(value: string | number) {
    expect(this.elements.display.textContent).toBe(formatCurrency(value.toString()));
  }

  getErrorMessages() {
    if (!this.elements.errorMessagesContainer) return undefined;

    const paragraphs = this.elements.errorMessagesContainer.querySelectorAll('p.error-message');
    const messagesArray = Array.from(paragraphs).map((p) => p.textContent);
    return messagesArray;
  }

  expectErrorMessagesToBe({ error, accountBalance }: TGetMessagesArray) {
    const messagesArray = this.getErrorMessages();
    if (error.type === 'noError') return expect(messagesArray).toEqual(undefined);

    expect(messagesArray).toEqual(errorMessages[error?.message]({ withdrawAmount: error.amount, accountBalance }));
  }

  async clickKeyboardButtonOne() {
    await userEvent.click(this.elements.keyboardButtonOne);
  }

  async clickKeyboardButtonZero() {
    await userEvent.click(this.elements.keyboardButtonZero);
  }

  async clickDepositButton() {
    await userEvent.click(this.elements.depositButton);
  }

  async clickWithdrawButton() {
    await userEvent.click(this.elements.withdrawButton);
  }
}
