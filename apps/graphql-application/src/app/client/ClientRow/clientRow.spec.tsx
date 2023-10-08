import { render } from '@testing-library/react';

import ClientRow from './clientRow';

describe('ClientRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientRow />);
    expect(baseElement).toBeTruthy();
  });
});
