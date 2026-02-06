import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chat from '@/app/Chat';

// Mock child components to focus on testing Chat component logic
vi.mock('@/components/windows', () => ({
  ChatWindow: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid={`chat-window-${title.toLowerCase().replace(' ', '-')}`}>{children}</div>
  ),
}));

vi.mock('./Login', () => ({
  default: ({ onLogin }: { onLogin: (username: string) => void }) => (
    <div data-testid="login">
      <button onClick={() => onLogin('testuser')}>Login</button>
    </div>
  ),
}));

vi.mock('./ModelSelector', () => ({
  default: ({ user }: { user: string }) => (
    <div data-testid="model-selector">User: {user}</div>
  ),
}));

vi.mock('./LLM', () => ({
  default: ({ user }: { user: string }) => (
    <div data-testid="llm">User: {user}</div>
  ),
}));

vi.mock('@/components/ui/Flex', () => ({
  Flex: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <div data-testid="flex" {...props}>{children}</div>
  ),
}));

describe('Chat Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders chat interface with proper structure', () => {
    render(<Chat />);
    
    expect(screen.getByTestId('flex')).toBeInTheDocument();
    expect(screen.getByTestId('chat-window-model-selector')).toBeInTheDocument();
    expect(screen.getByTestId('chat-window-chat')).toBeInTheDocument();
    expect(screen.getByTestId('model-selector')).toBeInTheDocument();
    expect(screen.getByTestId('llm')).toBeInTheDocument();
  });

  it('displays correct username in child components', () => {
    render(<Chat />);
    
    expect(screen.getAllByText('User: Anonimo')).toHaveLength(2); // ModelSelector and LLM
  });

  it('applies correct Flex props', () => {
    render(<Chat />);
    
    const flex = screen.getByTestId('flex');
    expect(flex).toHaveAttribute('gap', '1rem');
    expect(flex).toHaveAttribute('justifycontent', 'space-between');
    expect(flex).toHaveAttribute('flexwrap', 'wrap');
  });
});