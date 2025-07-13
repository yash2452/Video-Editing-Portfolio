// Adding unit tests for the main components to ensure they function correctly.
import { render, screen } from '@testing-library/react';
import Index from '../pages/Index';
import Hero from '../components/Hero';
import Projects from '../components/Projects';

test('renders Index page', () => {
  render(<Index />);
  const linkElement = screen.getByText(/some text in index/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Hero component', () => {
  render(<Hero />);
  const heroElement = screen.getByText(/some text in hero/i);
  expect(heroElement).toBeInTheDocument();
});

test('renders Projects component', () => {
  render(<Projects />);
  const projectsElement = screen.getByText(/some text in projects/i);
  expect(projectsElement).toBeInTheDocument();
});
