import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import EmailForm from './EmailForm';
import { supabase } from '../../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../../../../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  },
}));

describe('EmailForm', () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push });
  });

  it('renders email input and button', () => {
    render(<EmailForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('shows error if email is empty on submit', async () => {
    render(<EmailForm />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('shows error if email is already registered', async () => {
    // @ts-ignore
    supabase.single.mockResolvedValue({
      data: { id: '123' },
      error: null,
    });

    render(<EmailForm />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'test@email.com' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/this email is already registered/i)).toBeInTheDocument();
    });
  });

  it('redirects to password page if email is new', async () => {
    // @ts-ignore
    supabase.single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }, // No match found, valid case
    });

    render(<EmailForm />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'new@email.com' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/sign-up/password');
    });
  });

  it('shows generic error if supabase returns unexpected error', async () => {
    // @ts-ignore
    supabase.single.mockResolvedValue({
      data: null,
      error: { code: '500', message: 'Internal Server Error' },
    });

    render(<EmailForm />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'error@email.com' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
