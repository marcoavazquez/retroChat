import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '@/app/Login';

// Mock the child components
vi.mock('@/components/avatar', () => ({
  Avatar: ({ url }: { url: string }) => <img data-testid="avatar" src={url} alt="User avatar" />,
}));

vi.mock('@/components/ui/Flex', () => ({
  Flex: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <div data-testid="flex" {...props}>{children}</div>
  ),
}));

vi.mock('@/components/ui/buttons', () => ({
  Button: ({ children, type, variant, onClick }: { 
    children: React.ReactNode; 
    type?: string; 
    variant?: string; 
    onClick?: () => void;
  }) => (
    <button data-testid="button" type={type} data-variant={variant} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/Form', () => ({
  Input: ({ label, value, onChange }: { 
    label: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div>
      <label>{label}</label>
      <input 
        data-testid="input" 
        value={value} 
        onChange={onChange} 
      />
    </div>
  ),
}));

describe('Login Component', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Login onLogin={mockOnLogin} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('flex')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders form element', () => {
    render(<Login onLogin={mockOnLogin} />);
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('renders Avatar with correct URL', () => {
    render(<Login onLogin={mockOnLogin} />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('src', 'https://i.pravatar.cc/150?u=1');
  });

  it('renders input with correct label', () => {
    render(<Login onLogin={mockOnLogin} />);
    expect(screen.getByText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders button with correct text and attributes', () => {
    render(<Login onLogin={mockOnLogin} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('Iniciar sesión');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('initializes with empty username state', () => {
    render(<Login onLogin={mockOnLogin} />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates username state when input value changes', () => {
    render(<Login onLogin={mockOnLogin} />);
    const input = screen.getByTestId('input');
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    expect(input).toHaveValue('testuser');
  });

  it('calls onLogin with username when form is submitted', () => {
    render(<Login onLogin={mockOnLogin} />);
    const form = document.querySelector('form');
    const input = screen.getByTestId('input');
    
    // Set username
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    // Submit form
    fireEvent.submit(form);
    
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith('testuser');
  });

  it('calls onLogin with empty string when form is submitted with no input', () => {
    render(<Login onLogin={mockOnLogin} />);
    const form = document.querySelector('form');
    
    // Submit form without typing anything
    fireEvent.submit(form);
    
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith('');
  });

  it('Flex component has correct props', () => {
    render(<Login onLogin={mockOnLogin} />);
    const flex = screen.getByTestId('flex');
    
    expect(flex).toHaveAttribute('alignitems', 'center');
    expect(flex).toHaveAttribute('justifycontent', 'center');
    expect(flex).toHaveAttribute('flexdirection', 'column');
    expect(flex).toHaveAttribute('gap', '2rem');
    expect(flex).toHaveAttribute('padding', '1rem');
  });

  it('renders all components in correct order', () => {
    render(<Login onLogin={mockOnLogin} />);
    const flex = screen.getByTestId('flex');
    
    expect(flex.children).toHaveLength(3);
    expect(flex.children[0]).toBe(screen.getByTestId('avatar'));
    expect(flex.children[1]).toBe(screen.getByTestId('input').parentElement);
    expect(flex.children[2]).toBe(screen.getByTestId('button'));
  });

  it('handles multiple input changes correctly', () => {
    render(<Login onLogin={mockOnLogin} />);
    const input = screen.getByTestId('input');
    
    fireEvent.change(input, { target: { value: 'a' } });
    expect(input).toHaveValue('a');
    
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(input).toHaveValue('ab');
    
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input).toHaveValue('abc');
  });
});