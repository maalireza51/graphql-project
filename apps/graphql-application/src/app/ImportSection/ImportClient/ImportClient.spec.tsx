import { render } from '@testing-library/react';

import ImportClient from './ImportClient';

describe('ImportClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImportClient />);
    expect(baseElement).toBeTruthy();
  });
});
