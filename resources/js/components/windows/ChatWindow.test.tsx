import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChatWindow } from '@/components/windows/ChatWindow';

describe('ChatWindow Component', () => {
  const defaultProps = {
    title: 'Test Window',
    children: <div>Window Content</div>,
  };

  it('renders without crashing', () => {
    render(<ChatWindow {...defaultProps} />);
    const chatWindow = document.querySelector('.chat-window');
    expect(chatWindow).toBeInTheDocument();
  });

  it('has correct CSS class for main container', () => {
    render(<ChatWindow {...defaultProps} />);
    const chatWindow = document.querySelector('.chat-window');
    expect(chatWindow).toHaveClass('chat-window');
  });

  it('renders title correctly', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByText('Test Window')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByText('Window Content')).toBeInTheDocument();
  });

  it('has correct structure with header and body', () => {
    render(<ChatWindow {...defaultProps} />);
    
    const chatWindow = document.querySelector('.chat-window');
    const header = document.querySelector('.chat-window-header');
    const body = document.querySelector('.chat-window-body');
    
    expect(chatWindow).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    
    expect(header?.parentElement).toBe(chatWindow);
    expect(body?.parentElement).toBe(chatWindow);
  });

  it('header contains the title', () => {
    render(<ChatWindow {...defaultProps} />);
    
    const header = document.querySelector('.chat-window-header');
    const title = screen.getByText('Test Window');
    
    expect(header).toBeInTheDocument();
    expect(header?.contains(title)).toBe(true);
  });

  it('body contains the children', () => {
    render(<ChatWindow {...defaultProps} />);
    
    const body = document.querySelector('.chat-window-body');
    const content = screen.getByText('Window Content');
    
    expect(body).toBeInTheDocument();
    expect(body?.contains(content)).toBe(true);
  });

  it('renders with different title types', () => {
    const titles = [
      'Simple Title',
      'Title with Numbers 123',
      'Title-with-Special-Characters!',
      'Title with spaces',
    ];

    titles.forEach(title => {
      const { unmount } = render(<ChatWindow title={title} children={null} />);
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with complex children', () => {
    const complexChildren = (
      <div>
        <h1>Complex Title</h1>
        <p>Complex paragraph content</p>
        <button>Action Button</button>
      </div>
    );

    render(<ChatWindow title="Complex Window" children={complexChildren} />);

    expect(screen.getByText('Complex Title')).toBeInTheDocument();
    expect(screen.getByText('Complex paragraph content')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('renders with multiple children', () => {
    const multipleChildren = [
      <div key="1">Child 1</div>,
      <div key="2">Child 2</div>,
      <div key="3">Child 3</div>,
    ];

    render(<ChatWindow title="Multiple Children" children={multipleChildren} />);

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('renders with null children', () => {
    render(<ChatWindow title="Empty Window" children={null} />);
    
    const chatWindow = document.querySelector('.chat-window');
    const body = document.querySelector('.chat-window-body');
    
    expect(chatWindow).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(body?.children).toHaveLength(0);
  });

  it('renders with empty string children', () => {
    render(<ChatWindow title="Empty String" children="" />);
    
    const chatWindow = document.querySelector('.chat-window');
    const body = document.querySelector('.chat-window-body');
    
    expect(chatWindow).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(body?.textContent).toBe('');
  });

  it('renders with long title', () => {
    const longTitle = 'This is a very long title that might wrap or be truncated depending on CSS styling';
    
    render(<ChatWindow title={longTitle} children={null} />);
    
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('renders with title containing HTML entities', () => {
    const titleWithEntities = 'Title & Special < Characters >';
    
    render(<ChatWindow title={titleWithEntities} children={null} />);
    
    expect(screen.getByText(titleWithEntities)).toBeInTheDocument();
  });

  it('header and body elements have correct classes', () => {
    render(<ChatWindow {...defaultProps} />);
    
    const header = document.querySelector('.chat-window-header');
    const body = document.querySelector('.chat-window-body');
    
    expect(header).toHaveClass('chat-window-header');
    expect(body).toHaveClass('chat-window-body');
  });

  it('complete structure is correct', () => {
    render(<ChatWindow {...defaultProps} />);
    
    const chatWindow = document.querySelector('.chat-window');
    const header = document.querySelector('.chat-window-header');
    const body = document.querySelector('.chat-window-body');
    const title = screen.getByText('Test Window');
    const content = screen.getByText('Window Content');
    
    // Check hierarchy
    expect(chatWindow?.contains(header)).toBe(true);
    expect(chatWindow?.contains(body)).toBe(true);
    expect(header?.contains(title)).toBe(true);
    expect(body?.contains(content)).toBe(true);
    
    // Check that there are exactly 2 direct children (header and body)
    expect(chatWindow?.children).toHaveLength(2);
    expect(chatWindow?.children[0]).toBe(header);
    expect(chatWindow?.children[1]).toBe(body);
  });
});