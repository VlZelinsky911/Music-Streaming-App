import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, Mock } from 'vitest';
import Header from './header';
import { supabase } from '../../lib/supabaseClient';

// === Мокання supabase.auth.getUser ===
const getUserMock = vi.fn();

vi.mock('../../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: getUserMock,
    },
  },
}));

// === Моки всіх внутрішніх компонентів ===
vi.mock('next/link', () => ({
  default: ({ children }: any) => children,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mocked'} />,
}));

vi.mock('../auth/loading/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock('./SearchBar/SearchBar', () => ({
  default: () => <div data-testid="searchbar">SearchBar</div>,
}));

vi.mock('./UserMenu/UserMenu', () => ({
  default: () => <div data-testid="usermenu">UserMenu</div>,
}));

vi.mock('./Navigation/navigation', () => ({
  default: () => <div data-testid="navigation">Navigation</div>,
}));

vi.mock('./MobileMenu/MobileMenu', () => ({
  default: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="mobilemenu">
        MobileMenu
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

// === Тести ===
describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading screen initially', async () => {
    getUserMock.mockImplementation(() => new Promise(() => {})); // pending
    render(<Header />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows SearchBar and no Navigation when not logged in', async () => {
    getUserMock.mockResolvedValue({ data: null, error: null });

    render(<Header />);
    await waitFor(() => {
      expect(screen.getByTestId('searchbar')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
  });


	// Мокаємо функцію getUser
	vi.mock('../../lib/supabaseClient', () => ({
		supabase: {
			auth: {
				getUser: vi.fn()
			}
		}
	}));

	it('opens and closes MobileMenu', async () => {
		getUserMock.mockResolvedValue({ data: { user: { id: '1' } }, error: null });

		render(<Header />);
		await waitFor(() => {
			expect(screen.getByTestId('searchbar')).toBeInTheDocument();
		});

		expect(screen.queryByTestId('mobilemenu')).not.toBeInTheDocument();

		fireEvent.click(screen.getByTestId('menu-button'));
		await waitFor(() => {
			expect(screen.getByTestId('mobilemenu')).toBeInTheDocument();
		});

		fireEvent.click(screen.getByRole('button', { name: 'Close' }));
		await waitFor(() => {
			expect(screen.queryByTestId('mobilemenu')).not.toBeInTheDocument();
		});
	});
});
