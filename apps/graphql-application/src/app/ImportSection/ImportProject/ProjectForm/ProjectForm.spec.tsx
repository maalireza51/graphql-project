import { render } from '@testing-library/react';

import ProjectForm from './ProjectForm';

describe('ProjectForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectForm />);
    expect(baseElement).toBeTruthy();
  });
});
