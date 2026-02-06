import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from '@/components/ui/Container';

describe('Container Component', () => {
  const defaultProps = {
    children: <div>Container Content</div>,
  };

  it('renders without crashing', () => {
    render(<Container {...defaultProps} />);
    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Container {...defaultProps} />);
    expect(screen.getByText('Container Content')).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    render(<Container {...defaultProps} />);
    const container = document.querySelector('.container');
    expect(container).toHaveClass('container');
  });

  it('renders simple text children', () => {
    render(<Container>Simple Text</Container>);
    expect(screen.getByText('Simple Text')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    const multipleChildren = [
      <div key="1">Child 1</div>,
      <div key="2">Child 2</div>,
      <div key="3">Child 3</div>,
    ];
    
    render(<Container>{multipleChildren}</Container>);
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    const complexChildren = (
      <>
        <header>Header</header>
        <main>Main Content</main>
        <footer>Footer</footer>
      </>
    );
    
    render(<Container>{complexChildren}</Container>);
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders nested components', () => {
    const nestedContent = (
      <div>
        <span>Nested</span>
        <strong>Bold Text</strong>
      </div>
    );
    
    render(<Container>{nestedContent}</Container>);
    
    expect(screen.getByText('Nested')).toBeInTheDocument();
    expect(screen.getByText('Bold Text')).toBeInTheDocument();
  });

  it('renders empty container', () => {
    render(<Container>{null}</Container>);
    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();
    expect(container?.children).toHaveLength(0);
  });

  it('ignores className prop (not implemented)', () => {
    render(<Container {...defaultProps} className="custom-class" />);
    const container = document.querySelector('.container');
    
    // Should only have the default class
    expect(container).toHaveClass('container');
    expect(container).not.toHaveClass('custom-class');
  });

  it('container structure is correct', () => {
    render(<Container {...defaultProps} />);
    const container = document.querySelector('.container');
    const childContent = screen.getByText('Container Content');
    
    expect(container).toBeInTheDocument();
    expect(container?.contains(childContent)).toBe(true);
  });

  it('works with props object spreading', () => {
    render(
      <Container {...defaultProps} data-testid="test-container" />
    );
    
    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();
    // Note: className prop is not used in the component implementation
  });
});