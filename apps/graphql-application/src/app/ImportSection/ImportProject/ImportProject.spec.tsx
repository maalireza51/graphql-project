import { render } from '@testing-library/react';

import ImportProject from './ImportProject';

describe('ImportProject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImportProject />);
    expect(baseElement).toBeTruthy();
  });
});
