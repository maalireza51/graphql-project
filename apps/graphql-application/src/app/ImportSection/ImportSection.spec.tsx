import { render } from '@testing-library/react';

import ImportSection from './ImportSection';

describe('ImportSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImportSection />);
    expect(baseElement).toBeTruthy();
  });
});
