import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Flex } from '@/components/ui/Flex';

describe('Flex Component', () => {
  const defaultProps = {
    children: <div>Flex Content</div>,
  };

  it('renders without crashing', () => {
    render(<Flex {...defaultProps} />);
    const flex = document.querySelector('.flex');
    expect(flex).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Flex {...defaultProps} />);
    expect(screen.getByText('Flex Content')).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    render(<Flex {...defaultProps} />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveClass('flex');
  });

  it('applies justifyContent style', () => {
    render(<Flex {...defaultProps} justifyContent="center" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ justifyContent: 'center' });
  });

  it('applies alignItems style', () => {
    render(<Flex {...defaultProps} alignItems="flex-start" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ alignItems: 'flex-start' });
  });

  it('applies flexDirection style', () => {
    render(<Flex {...defaultProps} flexDirection="column" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ flexDirection: 'column' });
  });

  it('applies flexWrap style', () => {
    render(<Flex {...defaultProps} flexWrap="wrap" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ flexWrap: 'wrap' });
  });

  it('applies gap style', () => {
    render(<Flex {...defaultProps} gap="2rem" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ gap: '2rem' });
  });

  it('applies padding style', () => {
    render(<Flex {...defaultProps} padding="1rem" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ padding: '1rem' });
  });

  it('applies multiple styles correctly', () => {
    render(
      <Flex 
        {...defaultProps}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        gap="1rem"
        padding="2rem"
      />
    );
    
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '1rem',
      padding: '2rem',
    });
  });

  it('renders multiple children', () => {
    const multipleChildren = [
      <div key="1">Child 1</div>,
      <div key="2">Child 2</div>,
      <div key="3">Child 3</div>,
    ];
    
    render(<Flex>{multipleChildren}</Flex>);
    
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
    
    render(<Flex>{complexChildren}</Flex>);
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('works without any optional props', () => {
    render(<Flex {...defaultProps} />);
    const flex = document.querySelector('.flex');
    
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass('flex');
    // Should not have any inline styles
    expect(flex.getAttribute('style')).toBe(null);
  });

  it('applies flexWrap:nowrap style', () => {
    render(<Flex {...defaultProps} flexWrap="nowrap" />);
    const flex = document.querySelector('.flex');
    expect(flex).toHaveStyle({ flexWrap: 'nowrap' });
  });

  it('applies all justifyContent options', () => {
    const justifyContents = [
      'flex-start',
      'flex-end', 
      'center',
      'space-between',
      'space-around',
      'space-evenly'
    ] as const;

    justifyContents.forEach(justifyContent => {
      const { unmount } = render(<Flex {...defaultProps} justifyContent={justifyContent} />);
      const flex = document.querySelector('.flex');
      expect(flex).toHaveStyle({ justifyContent });
      unmount();
    });
  });

  it('applies all alignItems options', () => {
    const alignItems = [
      'flex-start',
      'flex-end',
      'center', 
      'stretch',
      'baseline'
    ] as const;

    alignItems.forEach(alignItems => {
      const { unmount } = render(<Flex {...defaultProps} alignItems={alignItems} />);
      const flex = document.querySelector('.flex');
      expect(flex).toHaveStyle({ alignItems });
      unmount();
    });
  });
});