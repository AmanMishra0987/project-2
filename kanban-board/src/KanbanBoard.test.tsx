import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import KanbanBoard from './App.tsx'

describe('KanbanBoard', () => {
  test('renders without crashing', () => {
    render(<KanbanBoard />);
    expect(screen.getByText(/To Do/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
  });

  test('adds a new task to a column', () => {
    render(<KanbanBoard />);
    const addButton = screen.getByText(/Add Task/i);
    
    // Simulate a user adding a task
    fireEvent.click(addButton);
    const input = window.prompt;  // Mock the prompt
    if (input) input('New Task');  // Simulate the user entering a task name
    
    // Check if the task appears in the To Do column
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });
});
