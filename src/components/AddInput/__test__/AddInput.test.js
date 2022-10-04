import { fireEvent, render, screen } from '@testing-library/react';
import AddInput from '../AddInput';

const mockSetTodos = jest.fn();

describe('AddInput', () => {
  it('should render add input component', async () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputElement = screen.getByTestId('addinput');
    expect(inputElement).toBeInTheDocument();
  });

  it('should render add input', async () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type in input', async () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, { target: { value: 'Hello word' } });
    expect(inputElement.value).toBe('Hello word');
  });

  it('should be empty input when click add button', async () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: 'Hello word' } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe('');
  });
});
