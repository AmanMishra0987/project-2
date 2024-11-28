import React, { useState, useEffect } from 'react';
import './App.css';

type Task = {
  id: number;
  title: string;
};

type Column = {
  name: string;
  items: Task[];
};

type Columns = {
  todo: Column;
  inProgress: Column;
  done: Column;
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>({
    todo: { name: 'To Do', items: [] },
    inProgress: { name: 'In Progress', items: [] },
    done: { name: 'Done', items: [] },
  });

  
  useEffect(() => {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);
      
      if (parsedColumns.todo && parsedColumns.inProgress && parsedColumns.done) {
        setColumns(parsedColumns);
      }
    }
  }, []);

  
  useEffect(() => {
    
    if (columns.todo.items.length > 0 || columns.inProgress.items.length > 0 || columns.done.items.length > 0) {
      localStorage.setItem('kanbanColumns', JSON.stringify(columns));
    }
  }, [columns]);

  const handleAddTask = (columnId: keyof Columns) => {
    const taskTitle = prompt('Enter task title');
    if (taskTitle) {
      const newItem: Task = { id: Date.now(), title: taskTitle };
      const updatedColumn = [...columns[columnId].items, newItem];
      setColumns({
        ...columns,
        [columnId]: { ...columns[columnId], items: updatedColumn },
      });
    }
  };

  
  const handleDragStart = (e: React.DragEvent, item: Task, columnId: keyof Columns) => {
    e.dataTransfer.setData('item', JSON.stringify({ item, columnId }));
  };

  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  
  const handleDrop = (e: React.DragEvent, columnId: keyof Columns) => {
    const { item, columnId: sourceColumnId } = JSON.parse(
      e.dataTransfer.getData('item')
    );

   
    const sourceColumn = columns[sourceColumnId as keyof Columns];
    const targetColumn = columns[columnId];

    if (sourceColumnId !== columnId) {
      
      const updatedSourceItems = sourceColumn.items.filter(
        (task: Task) => task.id !== item.id
      );

      
      const updatedTargetItems = [...targetColumn.items, item];

      setColumns({
        ...columns,
        [sourceColumnId as keyof Columns]: { ...sourceColumn, items: updatedSourceItems },
        [columnId]: { ...targetColumn, items: updatedTargetItems },
      });
    }
  };

  return (
    <div className="kanban-board">
      {Object.keys(columns).map((columnId) => {
        const column = columns[columnId as keyof Columns];
        return (
          <div
            className="column"
            key={columnId}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId as keyof Columns)}
          >
            <h3>{column.name}</h3>
            <button onClick={() => handleAddTask(columnId as keyof Columns)}>
              Add Task
            </button>
            <div className="task-list">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, columnId as keyof Columns)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
