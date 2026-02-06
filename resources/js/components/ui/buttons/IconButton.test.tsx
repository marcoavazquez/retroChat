import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from '@/components/ui/buttons/IconButton';

describe('IconButton Component', () => {
  const defaultProps = {
    children: '🔔',
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<IconButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<IconButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🔔');
  });

  it('has correct CSS class', () => {
    render(<IconButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('icon-button');
  });

  it('calls onClick when clicked', () => {
    render(<IconButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('handles multiple clicks', () => {
    render(<IconButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(3);
  });

  it('renders with complex children', () => {
    const complexChildren = (
      <div>
        <span>🔔</span>
        <span>Notifications</span>
      </div>
    );
    
    render(<IconButton onClick={defaultProps.onClick}>
      {complexChildren}
    </IconButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('🔔')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('works with emoji children', () => {
    render(<IconButton onClick={defaultProps.onClick}>🪟</IconButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🪟');
  });

  it('works with text children', () => {
    render(<IconButton onClick={defaultProps.onClick}>Menu</IconButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Menu');
  });

  it('works with icon component children', () => {
    const IconComponent = () => <span data-testid="icon">Icon</span>;
    
    render(<IconButton onClick={defaultProps.onClick}>
      <IconComponent />
    </IconButton>);
    
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('icon');
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button.contains(icon)).toBe(true);
  });
});