import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const AddTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole('button', { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe('Todo', () => {
  it('should render 1 element when input and click add 1 time', async () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: 'Hello word' } });
    fireEvent.click(buttonElement);
    const todoElement = screen.getByText(/Hello word/i);
    expect(todoElement).toBeInTheDocument();
  });

  it('should render 3 element when input and click add 3 time', async () => {
    render(<MockTodo />);
    AddTask(['Hello word', 'Hello word 2', 'Hello word 3']);
    const todoElement = screen.getAllByTestId('todo-item');
    expect(todoElement.length).toBe(3);
  });

  it('task should not have completed class when initally rendered', async () => {
    render(<MockTodo />);
    AddTask(['Hello word']);
    const todoElement = screen.getByText(/Hello word/i);
    expect(todoElement).not.toHaveClass('todo-item-active')
  });

  it('task should have completed class when clicked', async () => {
    render(<MockTodo />);
    AddTask(['Hello word']);
    const todoElement = screen.getByText(/Hello word/i);
    fireEvent.click(todoElement);
    expect(todoElement).toHaveClass('todo-item-active')
  });
});
