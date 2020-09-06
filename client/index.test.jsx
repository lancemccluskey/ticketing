import { render, screen } from '@testing-library/react';
import LandingPage from './pages/index';

describe('<LandingPage />', () => {
  it('renders without crashing', () => {
    render(<LandingPage />);

    expect(screen.queryByText('Tickets')).toBeInTheDocument();
  })
});
