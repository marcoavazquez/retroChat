import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChatMessages from '@/app/ChatMessages';
import { Message } from '@/types/chat';

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'Alice',
    message: 'Hello there!',
    timestamp: 1234567890,
  },
  {
    id: '2',
    user: 'Bob',
    message: 'How are you?',
    timestamp: 1234567891,
  },
  {
    id: '3',
    user: 'Alice',
    message: 'I am doing well, thanks!',
    timestamp: 1234567892,
  },
];

describe('ChatMessages Component', () => {
  const mockUser = 'Alice';

  it('renders without crashing', () => {
    render(<ChatMessages user={mockUser} messages={[]} />);
    const messagesContainer = document.querySelector('.chat-messages');
    expect(messagesContainer).toBeInTheDocument();
  });

  it('renders empty messages container when no messages', () => {
    render(<ChatMessages user={mockUser} messages={[]} />);
    const messagesContainer = document.querySelector('.chat-messages');
    expect(messagesContainer).toBeInTheDocument();
    expect(messagesContainer?.children).toHaveLength(0);
  });

  it('renders all messages correctly', () => {
    render(<ChatMessages user={mockUser} messages={mockMessages} />);
    
    expect(screen.getAllByText('Alice')).toHaveLength(2);
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
    expect(screen.getByText('1234567891')).toBeInTheDocument();
    
    expect(screen.getByText('I am doing well, thanks!')).toBeInTheDocument();
    expect(screen.getByText('1234567892')).toBeInTheDocument();
  });

  it('renders messages in correct order', () => {
    render(<ChatMessages user={mockUser} messages={mockMessages} />);
    
    const messageContainers = document.querySelectorAll('.chat-messages > div');
    expect(messageContainers).toHaveLength(3);
    
    expect(messageContainers[0]).toHaveTextContent('AliceHello there!1234567890');
    expect(messageContainers[1]).toHaveTextContent('BobHow are you?1234567891');
    expect(messageContainers[2]).toHaveTextContent('AliceI am doing well, thanks!1234567892');
  });

  it('renders correct number of message containers', () => {
    render(<ChatMessages user={mockUser} messages={mockMessages} />);
    
    const messageContainers = document.querySelectorAll('.chat-messages > div');
    expect(messageContainers).toHaveLength(3);
  });

  it('has correct CSS class', () => {
    render(<ChatMessages user={mockUser} messages={mockMessages} />);
    const messagesContainer = document.querySelector('.chat-messages');
    expect(messagesContainer).toBeInTheDocument();
  });

  it('displays single message correctly', () => {
    const singleMessage: Message[] = [{
      id: 'single',
      user: 'TestUser',
      message: 'Single message test',
      timestamp: 9999999999,
    }];

    render(<ChatMessages user={mockUser} messages={singleMessage} />);
    
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('Single message test')).toBeInTheDocument();
    expect(screen.getByText('9999999999')).toBeInTheDocument();
    
    const messageContainers = document.querySelectorAll('.chat-messages > div');
    expect(messageContainers).toHaveLength(1);
  });
});