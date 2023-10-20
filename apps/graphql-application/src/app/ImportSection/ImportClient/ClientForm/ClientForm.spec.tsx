import { render } from '@testing-library/react';

import ClientForm from './ClientForm';

describe('ClientForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientForm />);
    expect(baseElement).toBeTruthy();
  });
});
