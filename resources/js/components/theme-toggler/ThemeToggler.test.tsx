import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggler } from '@/components/theme-toggler/ThemeToggler';

// Mock IconButton
vi.mock('@/components/ui/buttons/IconButton', () => ({
  IconButton: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="icon-button" onClick={onClick}>{children}</button>
  ),
}));

// Mock the image imports
vi.mock('@/../images/icons/sun.png', () => ({
  default: 'sun.png',
}));

vi.mock('@/../images/icons/moon.webp', () => ({
  default: 'moon.webp',
}));

describe('ThemeToggler Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document.documentElement.dataset.theme
    document.documentElement.dataset.theme = '';
  });

  it('renders without crashing', () => {
    render(<ThemeToggler />);
    // The component renders after useEffect, but we can check the DOM directly
    expect(document.documentElement.dataset.theme).toBeDefined();
  });

  it('sets initial theme based on localStorage when available', () => {
    const localStorageGetItemSpy = vi.spyOn(localStorage, 'getItem').mockReturnValue('dark');
    const localStorageSetItemSpy = vi.spyOn(localStorage, 'setItem');

    render(<ThemeToggler />);

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('theme');
    expect(document.documentElement.dataset.theme).toBe('dark');
    
    localStorageGetItemSpy.mockRestore();
    localStorageSetItemSpy.mockRestore();
  });

  it('sets light theme when no saved theme and system prefers light', () => {
    const localStorageGetItemSpy = vi.spyOn(localStorage, 'getItem').mockReturnValue(null);
    const localStorageSetItemSpy = vi.spyOn(localStorage, 'setItem');

    render(<ThemeToggler />);

    expect(document.documentElement.dataset.theme).toBe('light');
    
    localStorageGetItemSpy.mockRestore();
    localStorageSetItemSpy.mockRestore();
  });

  it('toggles theme when button is clicked', () => {
    const localStorageGetItemSpy = vi.spyOn(localStorage, 'getItem').mockReturnValue('light');
    const localStorageSetItemSpy = vi.spyOn(localStorage, 'setItem');

    render(<ThemeToggler />);

    const button = screen.getByTestId('icon-button');
    
    // Verify initial state
    expect(document.documentElement.dataset.theme).toBe('light');
    
    // Click to toggle
    fireEvent.click(button);
    
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('theme', 'dark');
    
    localStorageGetItemSpy.mockRestore();
    localStorageSetItemSpy.mockRestore();
  });
});