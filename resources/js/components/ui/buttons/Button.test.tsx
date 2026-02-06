import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/buttons/Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me',
  };

  it('renders without crashing', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('has correct CSS class for button', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
  });

  it('adds variant class when variant is provided', () => {
    render(<Button {...defaultProps} variant="primary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'primary');
  });

  it('adds secondary variant class', () => {
    render(<Button {...defaultProps} variant="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'secondary');
  });

  it('adds tertiary variant class', () => {
    render(<Button {...defaultProps} variant="tertiary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'tertiary');
  });

  it('passes through other HTML button attributes', () => {
    render(
      <Button 
        {...defaultProps} 
        type="submit" 
        disabled 
        data-testid="test-button"
      />
    );
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders complex children', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('works without variant prop', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    // Should not have variant-specific classes
    expect(button).not.toHaveClass('primary', 'secondary', 'tertiary');
  });
});