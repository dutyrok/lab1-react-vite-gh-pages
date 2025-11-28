import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi, beforeAll, afterAll } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from './App'; 

const mockUsers = [
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    address: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: {
        lat: "-38.2386",
        lng: "57.2232"
      }
    },
    phone: "024-648-3804",
    website: "ambrose.net",
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models"
    }
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618"
      }
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    }
  }
];

beforeAll(() => {
	vi.mock('./components/downloadUsers', async () => {
		return {
			downloadUsers: vi.fn(() => new Promise((resolve) => {
				setTimeout(() => {
					resolve(mockUsers);
				}, 100)
			}))
		};
	});
});

afterAll(() => {
  vi.restoreAllMocks();
});

test('renders Vite and React logos', () => {
  render(<App />);

  // Предполагаем, что в вашем App.tsx есть изображения с alt-текстами "Vite logo" и "React logo"
  // Если ваш App.tsx сильно отличается от дефолтного, возможно, нужно будет изменить эти селекторы.
  const viteLogoElement = screen.getByAltText('Vite logo');
  const reactLogoElement = screen.getByAltText('React logo');

  expect(viteLogoElement).toBeInTheDocument();
  expect(reactLogoElement).toBeInTheDocument();
});

// Дополнительный тест, если в App.tsx есть текст "Vite + React"
test('renders "Vite + React" heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Vite \+ React/i); // Поиск текста с учетом регистра
  expect(headingElement).toBeInTheDocument();
});

test('check 2 records in the table', async () => {
  const user = userEvent.setup();
  render(<App />);

  const loadButton = screen.getByRole('button', { name: /load users/i });
  await user.click(loadButton);

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  }, { timeout: 110 });

  await waitFor(() => {
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);
  }, { timeout: 50 });
});

test('check Clementina DuBuque in the table', async () => {
  const user = userEvent.setup();
  render(<App />);

  const loadButton = screen.getByRole('button', { name: /load users/i });
  await user.click(loadButton);

  await waitFor(() => {
    expect(screen.getByText('Clementina DuBuque')).toBeInTheDocument();
  }, { timeout: 100 });

  expect(screen.getByText('Moriah.Stanton')).toBeInTheDocument();
  expect(screen.getByText('Rey.Padberg@karina.biz')).toBeInTheDocument();
  expect(screen.getByText('Lebsackbury')).toBeInTheDocument();
});

test('check "loading... " after button clicked', async () => {
  const user = userEvent.setup();
  render(<App />);

  const loadButton = screen.getByRole('button', { name: /load users/i });
  await user.click(loadButton);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(loadButton).toBeDisabled();

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  }, { timeout: 100 });
});

test('check no table before button clicked', () => {
  render(<App />);

  expect(screen.queryByRole('table')).not.toBeInTheDocument();
  expect(screen.queryByText('Users Table')).not.toBeInTheDocument();
});

test('should show table after loading data', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.queryByRole('table')).not.toBeInTheDocument();

  const loadButton = screen.getByRole('button', { name: /load users/i });
  await user.click(loadButton);

  await waitFor(() => {
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Users Table')).toBeInTheDocument();
  }, { timeout: 100 });
});

test('check all table headers correctly', async () => {
  const user = userEvent.setup();
  render(<App />);

  const loadButton = screen.getByRole('button', { name: /load users/i });
  await user.click(loadButton);

  await waitFor(() => {
    expect(screen.getByRole('table')).toBeInTheDocument();

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  }, { timeout: 100 });
});
