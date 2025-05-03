import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { describe, it, vi } from 'vitest';
import EmailFormIN from './EmailFormIN';

// Простий мок роутера
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Простий мок supabase
vi.mock('../../../../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: null, session: null },
        error: null,
      }),
    },
  },
}));

// Мок хука
vi.mock('../../../../../hooks/useProfileSetupOnLogin', () => ({
  default: () => {},
}));

describe('EmailForm', () => {
  it('renders the form fields', () => {
    render(<EmailFormIN />);
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<EmailFormIN />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('allows entering email and password', () => {
    render(<EmailFormIN />);
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput).toHaveValue('test@email.com');
    expect(passwordInput).toHaveValue('123456');
  });
});
