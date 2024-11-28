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
    
   
    fireEvent.click(addButton);
    const input = window.prompt;  
    if (input) input('New Task');  
    
  
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });
});
