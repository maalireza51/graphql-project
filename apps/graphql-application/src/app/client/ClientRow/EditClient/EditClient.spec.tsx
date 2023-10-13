import { render } from '@testing-library/react';

import EditClient from './EditClient';

describe('EditClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditClient />);
    expect(baseElement).toBeTruthy();
  });
});
