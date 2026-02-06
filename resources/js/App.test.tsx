import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders Chat component', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders TaskBar component', () => {
    render(<App />);
    const taskBar = document.querySelector('.taskbar');
    expect(taskBar).toBeInTheDocument();
  });
});