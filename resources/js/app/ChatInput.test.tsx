import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatInput from '@/app/ChatInput';

describe('ChatInput Component', () => {
  const defaultProps = {
    value: '',
    disabled: false,
    onChange: vi.fn(),
    onSend: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ChatInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    render(<ChatInput {...defaultProps} />);
    const container = document.querySelector('.chat-input');
    expect(container).toBeInTheDocument();
  });

  it('renders textarea with correct initial value', () => {
    render(<ChatInput {...defaultProps} value="initial message" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('initial message');
  });

  it('renders button with correct text', () => {
    render(<ChatInput {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Enviar');
  });

  it('calls onChange when textarea value changes', () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.change(textarea, { target: { value: 'new message' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSend when button is clicked', () => {
    render(<ChatInput {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(defaultProps.onSend).toHaveBeenCalledTimes(1);
  });

  it('disables textarea when disabled prop is true', () => {
    render(<ChatInput {...defaultProps} disabled={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('disables button when disabled prop is true', () => {
    render(<ChatInput {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('enables textarea and button when disabled prop is false', () => {
    render(<ChatInput {...defaultProps} disabled={false} />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    expect(textarea).not.toBeDisabled();
    expect(button).not.toBeDisabled();
  });

  it('does not call onSend when button is clicked but disabled', () => {
    render(<ChatInput {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(defaultProps.onSend).not.toHaveBeenCalled();
  });

  it('handles multiple onChange events', () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.change(textarea, { target: { value: 'first' } });
    fireEvent.change(textarea, { target: { value: 'second' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(2);
  });

  it('handles multiple onSend events', () => {
    render(<ChatInput {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(defaultProps.onSend).toHaveBeenCalledTimes(2);
  });

  it('renders with empty value when value prop is empty string', () => {
    render(<ChatInput {...defaultProps} value="" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('');
  });
});