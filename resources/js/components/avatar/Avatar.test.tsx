import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from '@/components/avatar/Avatar';

describe('Avatar Component', () => {
  const defaultProps = {
    url: 'https://example.com/avatar.jpg',
  };

  it('renders without crashing', () => {
    render(<Avatar {...defaultProps} />);
    const avatar = document.querySelector('.avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    render(<Avatar {...defaultProps} />);
    const avatar = document.querySelector('.avatar');
    expect(avatar).toHaveClass('avatar');
  });

  it('renders img element with correct src', () => {
    render(<Avatar {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultProps.url);
  });

  it('renders img element with correct alt text', () => {
    render(<Avatar {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Avatar');
  });

  it('structure is correct', () => {
    render(<Avatar {...defaultProps} />);
    
    const avatarContainer = document.querySelector('.avatar');
    const img = screen.getByRole('img');
    
    expect(avatarContainer).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(avatarContainer?.contains(img)).toBe(true);
  });

  it('renders with different URL formats', () => {
    const urls = [
      'https://example.com/avatar.png',
      'https://example.com/avatar.webp',
      'https://example.com/avatar.gif',
      '/local-avatar.jpg',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    ];

    urls.forEach(url => {
      const { unmount } = render(<Avatar url={url} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', url);
      unmount();
    });
  });

  it('renders with pravatar URL (like in the actual app)', () => {
    const pravatarUrl = 'https://i.pravatar.cc/150?u=1';
    render(<Avatar url={pravatarUrl} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', pravatarUrl);
  });

  it('renders with empty string URL', () => {
    render(<Avatar url="" />);
    const img = screen.getByRole('img');
    // The component should render even with empty URL
    expect(img).toBeInTheDocument();
  });

  it('renders with special characters in URL', () => {
    const specialUrl = 'https://example.com/avatar-123_abc.jpg?size=150&format=webp';
    render(<Avatar url={specialUrl} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', specialUrl);
  });

  it('img element has no additional attributes', () => {
    render(<Avatar {...defaultProps} />);
    const img = screen.getByRole('img');
    
    // Should only have src and alt attributes
    expect(img.attributes.length).toBe(2);
    expect(img).toHaveAttribute('src');
    expect(img).toHaveAttribute('alt');
  });

  it('container div has no additional attributes', () => {
    render(<Avatar {...defaultProps} />);
    const avatar = document.querySelector('.avatar');
    
    // Should only have class attribute
    expect(avatar?.attributes.length).toBe(1);
    expect(avatar).toHaveClass('avatar');
  });
});