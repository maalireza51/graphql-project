import { render } from '@testing-library/react';

import ProjectRow from './projectRow';

describe('ProjectRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectRow />);
    expect(baseElement).toBeTruthy();
  });
});
