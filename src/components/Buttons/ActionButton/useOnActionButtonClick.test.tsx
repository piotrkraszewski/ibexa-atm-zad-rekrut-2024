import { renderHook, act } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import { useOnActionButtonClick } from './useOnActionButtonClick';
import { AtmContextValue, TAtmErrorMessagesEnum } from '../../../context/AtmContext.types';
import { AtmContext } from '../../../context/AtmContext';
import { ReactNode } from 'react';

const mockContext = {
  useAtmContext: vi.fn(),
};

vi.doMock('../../../context/AtmContext', () => ({
  mockContext,
}));

const setUpMockAtmContext = (overrides?: Partial<AtmContextValue>) => {
  const defaultContext: AtmContextValue = {
    accountBalance: 100,
    setAccountBalance: vi.fn(),
    displayedValue: '50',
    setDisplayedValue: vi.fn(),
    setError: vi.fn(),
    error: { type: 'noError' },
  };

  return { ...defaultContext, ...overrides };
};

type renderOnActionButtonClickHookProps = {
  accountBalance: number;
  displayedValue: string;
};

const renderOnActionButtonClickHook = ({ accountBalance, displayedValue }: renderOnActionButtonClickHookProps) => {
  const mockedContext = setUpMockAtmContext({ accountBalance, displayedValue });
  mockContext.useAtmContext.mockReturnValue(mockedContext);

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AtmContext.Provider value={mockedContext}>{children}</AtmContext.Provider>
  );

  const { result } = renderHook(() => useOnActionButtonClick(), {
    wrapper,
  });

  return { result, mockedContext };
};

describe('useOnActionButtonClick', () => {
  test('should handle deposit action', () => {
    const { result, mockedContext } = renderOnActionButtonClickHook({ accountBalance: 100, displayedValue: '50' });

    act(() => {
      result.current.onActionButtonClick({ type: 'deposit' });
    });

    expect(mockedContext.setAccountBalance).toHaveBeenCalledWith(150);
    expect(mockedContext.setDisplayedValue).toHaveBeenCalledWith('');
    expect(mockedContext.setError).toHaveBeenCalledWith({ type: 'noError' });
  });

  test('should handle withdraw action with enough funds in account', () => {
    const { result, mockedContext } = renderOnActionButtonClickHook({ accountBalance: 100, displayedValue: '50' });

    act(() => {
      result.current.onActionButtonClick({ type: 'withdraw' });
    });

    expect(mockedContext.setAccountBalance).toHaveBeenCalledWith(50);
    expect(mockedContext.setDisplayedValue).toHaveBeenCalledWith('');
    expect(mockedContext.setError).toHaveBeenCalledWith({ type: 'noError' });
  });

  test('should fail withdraw action because amount is to big', () => {
    const displayedValue = '150';
    const { result, mockedContext } = renderOnActionButtonClickHook({ accountBalance: 100, displayedValue });

    act(() => {
      result.current.onActionButtonClick({ type: 'withdraw' });
    });

    expect(mockedContext.setDisplayedValue).toHaveBeenCalledWith('');
    expect(mockedContext.setError).toHaveBeenCalledWith({
      type: 'withdraw',
      message: TAtmErrorMessagesEnum.WithdrawAmountIsToBig,
      amount: Number(displayedValue),
    });
  });
});
