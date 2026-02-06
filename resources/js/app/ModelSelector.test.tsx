import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModelSelector from '@/app/ModelSelector';

// Mock the child components
vi.mock('@/components/avatar', () => ({
  Avatar: ({ url }: { url: string }) => <img data-testid="avatar" src={url} alt="User avatar" />,
}));

vi.mock('@/components/ui/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@/components/ui/Flex', () => ({
  Flex: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <div data-testid="flex" {...props}>{children}</div>
  ),
}));

describe('ModelSelector Component', () => {
  const mockUser = 'TestUser';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ModelSelector user={mockUser} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('flex')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    render(<ModelSelector user={mockUser} />);
    const modelSelector = document.querySelector('.model-selector');
    expect(modelSelector).toBeInTheDocument();
  });

  it('displays user name in h1 tag', () => {
    render(<ModelSelector user={mockUser} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockUser);
  });

  it('displays subtitle "Selecciona un modelo"', () => {
    render(<ModelSelector user={mockUser} />);
    expect(screen.getByText('Selecciona un modelo')).toBeInTheDocument();
  });

  it('renders Avatar with correct URL', () => {
    render(<ModelSelector user={mockUser} />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('src', 'https://i.pravatar.cc/150?u=1');
  });

  it('renders all model categories', () => {
    render(<ModelSelector user={mockUser} />);
    
    expect(screen.getByText('Modelo locales (2)')).toBeInTheDocument();
    expect(screen.getByText('Open AI (5)')).toBeInTheDocument();
    expect(screen.getByText('Gemini (2)')).toBeInTheDocument();
    expect(screen.getByText('Anthropic (3)')).toBeInTheDocument();
  });

  it('renders correct number of local models', () => {
    render(<ModelSelector user={mockUser} />);
    
    expect(screen.getByText('Qwen2.5-0.5B-Instruct')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('renders correct number of Open AI models', () => {
    render(<ModelSelector user={mockUser} />);
    
    expect(screen.getByText('gpt-3.5-turbo')).toBeInTheDocument();
    expect(screen.getAllByText('gpt-4o-mini')).toHaveLength(3);
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
  });

  it('renders correct Gemini models', () => {
    render(<ModelSelector user={mockUser} />);
    
    expect(screen.getByText('gemini-1.5-flash')).toBeInTheDocument();
    expect(screen.getByText('gemini-2.0-flash')).toBeInTheDocument();
  });

  it('renders correct Anthropic models', () => {
    render(<ModelSelector user={mockUser} />);
    
    expect(screen.getAllByText('claude-3-5-sonnet')).toHaveLength(2);
    expect(screen.getByText('claude-3-5-haiku')).toBeInTheDocument();
  });

  it('has header and section elements', () => {
    render(<ModelSelector user={mockUser} />);
    
    const header = document.querySelector('header');
    const section = document.querySelector('section');
    
    expect(header).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });

  it('Flex component has correct gap prop', () => {
    render(<ModelSelector user={mockUser} />);
    
    const flex = screen.getByTestId('flex');
    expect(flex).toHaveAttribute('gap', '1rem');
  });

  it('structures content correctly with proper hierarchy', () => {
    render(<ModelSelector user={mockUser} />);
    
    const modelSelector = document.querySelector('.model-selector');
    const header = modelSelector?.querySelector('header');
    const section = modelSelector?.querySelector('section');
    
    expect(header).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(header?.contains(screen.getByTestId('flex'))).toBe(true);
    expect(section?.contains(screen.getByTestId('container'))).toBe(true);
  });
});