import { render } from '@testing-library/react';
import { test, describe, expect } from 'vitest';
import { AtmContext } from './AtmContext';

describe('AtmContext', () => {
  test('is undefined by default', () => {
    const title = 'CONTEXT';

   const {getByTitle} = render(<AtmContext.Consumer>{(context) => <div title={title}>{typeof context}</div>}</AtmContext.Consumer>, {
      wrapper: ({ children }) => <>{children}</>,
    });

    expect(getByTitle(title).textContent).toBe('undefined');
  });
});
