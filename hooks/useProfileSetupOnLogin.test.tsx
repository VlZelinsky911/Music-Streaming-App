
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import useProfileSetupOnLogin from '../hooks/useProfileSetupOnLogin';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { renderHook } from '@testing-library/react';

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(),
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn(),
      insert: vi.fn(),
    })),
  },
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('useProfileSetupOnLogin (with Vitest)', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

 

  it('shows error and redirects if email not confirmed', async () => {
    const onAuthStateChangeMock = vi.fn((cb: any) => {
      cb('SIGNED_IN', { user: { id: '1' } });
      return { data: { subscription: { id: 'mock-id', callback: vi.fn(), unsubscribe: vi.fn() } } };
    });
    supabase.auth.onAuthStateChange = onAuthStateChangeMock;
    supabase.auth.getUser = vi.fn().mockResolvedValue({
      data: { user: { email_confirmed_at: null } },
      error: null,
    });

    renderHook(() => useProfileSetupOnLogin());
    await Promise.resolve();

    expect(toast.error).toHaveBeenCalledWith('Email not confirmed!');
    expect(mockPush).toHaveBeenCalledWith('/sign-in');
  });
});
