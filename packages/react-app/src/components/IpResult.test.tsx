import { render, screen } from '@testing-library/react';
import { IpResult } from './IpResult';
import { IpResult as IpResultType } from '../types';

jest.mock('./TimezoneClockLive', () => ({
  TimezoneClockLive: ({ timezone }: { timezone: string }) => (
    <div data-testid="timezone-clock">
      Mock Clock for {timezone}
    </div>
  )
}));

describe('IpResult', () => {
  const mockResult: IpResultType = {
    country: 'US',
    timezone: 'America/New_York'
  };

  it('renders country flag with correct attributes', () => {
    render(<IpResult result={mockResult} />);

    const flagImage = screen.getByRole('img');
    expect(flagImage).toHaveAttribute('src', 'https://flagsapi.com/US/flat/32.png');
    expect(flagImage).toHaveAttribute('alt', 'US flag');
    expect(flagImage).toHaveAttribute('title', 'US flag');
    expect(flagImage).toHaveClass('flag');
  });

  it('handles different country codes correctly', () => {
    const jpResult: IpResultType = {
      country: 'JP',
      timezone: 'Asia/Tokyo'
    };

    render(<IpResult result={jpResult} />);

    const flagImage = screen.getByRole('img');
    expect(flagImage).toHaveAttribute('src', 'https://flagsapi.com/JP/flat/32.png');
    expect(flagImage).toHaveAttribute('alt', 'JP flag');
  });
});