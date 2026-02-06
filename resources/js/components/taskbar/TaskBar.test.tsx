import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskBar } from '@/components/taskbar/TaskBar';

// Mock the child components
vi.mock('@/components/theme-toggler', () => ({
  ThemeToggler: () => <div data-testid="theme-toggler">Theme Toggler</div>,
}));

vi.mock('@/components/ui/Flex', () => ({
  Flex: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <div data-testid="flex" {...props}>{children}</div>
  ),
}));

vi.mock('@/components/ui/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@/components/ui/buttons', () => ({
  IconButton: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="icon-button" onClick={onClick}>{children}</button>
  ),
}));

describe('TaskBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<TaskBar />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('flex')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggler')).toBeInTheDocument();
  });

  it('has correct CSS class for footer', () => {
    render(<TaskBar />);
    const footer = document.querySelector('footer.taskbar');
    expect(footer).toBeInTheDocument();
  });

  it('renders window icon button', () => {
    render(<TaskBar />);
    const iconButton = screen.getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveTextContent('🪟');
  });

  it('renders ThemeToggler component', () => {
    render(<TaskBar />);
    expect(screen.getByTestId('theme-toggler')).toBeInTheDocument();
  });

  it('Flex component has correct props', () => {
    render(<TaskBar />);
    const flex = screen.getByTestId('flex');
    expect(flex).toHaveAttribute('justifycontent', 'space-between');
    expect(flex).toHaveAttribute('alignitems', 'center');
    expect(flex).toHaveAttribute('gap', '1rem');
  });

  it('TaskBar is a footer element', () => {
    render(<TaskBar />);
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('taskbar');
  });

  it('Container wraps Flex and its children', () => {
    render(<TaskBar />);
    const container = screen.getByTestId('container');
    const flex = screen.getByTestId('flex');
    
    expect(container).toBeInTheDocument();
    expect(flex).toBeInTheDocument();
    expect(container.contains(flex)).toBe(true);
  });

  it('renders both children in correct order', () => {
    render(<TaskBar />);
    const flex = screen.getByTestId('flex');
    const iconButton = screen.getByTestId('icon-button');
    const themeToggler = screen.getByTestId('theme-toggler');
    
    expect(flex.children).toHaveLength(2);
    expect(flex.children[0]).toBe(iconButton);
    expect(flex.children[1]).toBe(themeToggler);
  });

  it('icon button has empty onClick handler', () => {
    render(<TaskBar />);
    const iconButton = screen.getByTestId('icon-button');
    
    // Should not throw when clicked (has empty function)
    expect(() => {
      iconButton.click();
    }).not.toThrow();
  });
});