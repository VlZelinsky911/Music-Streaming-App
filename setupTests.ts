import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { config } from 'dotenv';
import path from 'path';
import { vi } from 'vitest';

vi.mock('../../../../../lib/supabaseClient', () => {
  return {
    supabase: {
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { user: { id: '123', email: 'test@example.com' } },
          error: null,
        }),
      },
    },
  };
});

config({ path: path.resolve(__dirname, '.env.test') });

afterEach(() => {
  cleanup();
});
