import { ReactNode, useMemo, useState } from 'react';
import { AtmContext } from './AtmContext';
import { AtmContextValue, TAtmError } from './AtmContext.types';

type AtmContextControllerProps = {
  children: ReactNode;
  initAccountBalance: number;
};

export function AtmContextController({ children, initAccountBalance }: AtmContextControllerProps) {
  const [accountBalance, setAccountBalance] = useState(initAccountBalance);
  const [displayedValue, setDisplayedValue] = useState('');
  const [error, setError] = useState<TAtmError>({ type: 'noError' });

  const value: AtmContextValue = useMemo(
    () => ({
      accountBalance,
      setAccountBalance,
      displayedValue,
      setDisplayedValue,
      error,
      setError,
    }),
    [accountBalance, displayedValue, error]
  );

  return <AtmContext.Provider value={value}>{children}</AtmContext.Provider>;
}
