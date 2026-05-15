import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => {
    const React = require('react');

    return {
      MemoryRouter: ({ children }) => <>{children}</>,
      BrowserRouter: ({ children }) => <>{children}</>,
      NavLink: ({ children, to, className }) => {
        const computedClassName =
          typeof className === 'function' ? className({ isActive: false }) : className;

        return (
          <a href={to} className={computedClassName}>
            {children}
          </a>
        );
      },
      Navigate: () => null,
      Route: () => null,
      Routes: ({ children }) => <>{children}</>,
    };
  },
  { virtual: true }
);

test('renders octofit dashboard heading', () => {
  render(<App />);

  expect(screen.getByText(/octofit activity dashboard/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /users/i }).length).toBeGreaterThan(0);
});
