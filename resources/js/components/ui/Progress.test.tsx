import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Progress from '@/components/ui/Progress';

describe('Progress Component', () => {
  it('renders without crashing', () => {
    render(<Progress percent={50} />);
    const progress = document.querySelector('.progress');
    expect(progress).toBeInTheDocument();
  });

  it('has correct CSS class for container', () => {
    render(<Progress percent={50} />);
    const progress = document.querySelector('.progress');
    expect(progress).toHaveClass('progress');
  });

  it('has correct CSS class for progress bar', () => {
    render(<Progress percent={50} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveClass('progress-bar');
  });

  it('displays correct percentage text', () => {
    render(<Progress percent={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('sets correct width style based on percent', () => {
    render(<Progress percent={30} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '30%' });
  });

  it('handles 0 percent', () => {
    render(<Progress percent={0} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '0%' });
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles 100 percent', () => {
    render(<Progress percent={100} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '100%' });
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles decimal percentages', () => {
    render(<Progress percent={33.33} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '33.33%' });
    expect(screen.getByText('33.33%')).toBeInTheDocument();
  });

  it('handles small percentages', () => {
    render(<Progress percent={5} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '5%' });
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('handles large percentages (> 100)', () => {
    render(<Progress percent={150} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '150%' });
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('handles negative percentages', () => {
    render(<Progress percent={-10} />);
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveStyle({ width: '-10%' });
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('structure is correct', () => {
    render(<Progress percent={45} />);
    
    const progressContainer = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    const text = screen.getByText('45%');
    
    expect(progressContainer).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    
    expect(progressContainer?.contains(progressBar)).toBe(true);
    expect(progressBar?.contains(text)).toBe(true);
  });

  it('renders with common percentage values', () => {
    const commonValues = [0, 25, 50, 75, 100];
    
    commonValues.forEach(percent => {
      const { unmount } = render(<Progress percent={percent} />);
      
      const progressBar = document.querySelector('.progress-bar');
      expect(progressBar).toHaveStyle({ width: `${percent}%` });
      expect(screen.getByText(`${percent}%`)).toBeInTheDocument();
      
      unmount();
    });
  });

  it('renders with realistic progress values', () => {
    const realisticValues = [1, 10, 33, 66, 99];
    
    realisticValues.forEach(percent => {
      const { unmount } = render(<Progress percent={percent} />);
      
      const progressBar = document.querySelector('.progress-bar');
      expect(progressBar).toHaveStyle({ width: `${percent}%` });
      expect(screen.getByText(`${percent}%`)).toBeInTheDocument();
      
      unmount();
    });
  });
});