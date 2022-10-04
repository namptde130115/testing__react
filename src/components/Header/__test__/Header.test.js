import { render, screen } from '@testing-library/react';
import Header from '../Header';

it('should render same text passed into title prop', async () => {
  render(<Header title='Hello word' />);
  const headingElement = screen.getByText(/Hello word/i);
  expect(headingElement).toBeInTheDocument();
});

it('should render tag heading', async () => {
  render(<Header title='Hello word' />);
  const headingElement = screen.getByRole('heading', { name: 'Hello word' });
  expect(headingElement).toBeInTheDocument();
});

it('should render tag has title prop inside h3', async () => {
  render(<Header title='Hello word' />);
  const headingElement = screen.getByTitle('Header');
  expect(headingElement).toBeInTheDocument();
});

it('should get test id', async () => {
  render(<Header title='Hello word' />);
  const headingElement = screen.getByTestId('header-1');
  expect(headingElement).toBeInTheDocument();
});

//find by
it('should get findby', async () => {
  render(<Header title='Hello word' />);
  const headingElement = await screen.findByText(/Hello word/i);
  expect(headingElement).toBeInTheDocument();
});
