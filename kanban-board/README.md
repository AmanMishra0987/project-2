# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})

## Technologies Used
 React: JavaScript library for building user interfaces.
TypeScript: Typed superset of JavaScript for safer and more predictable code.
CSS: Styling for the Kanban board and its components.
localStorage: Used to persist the tasks data across page refreshes.


## Usage
Add Task: Click the "Add Task" button in any column to create a new task.
Drag & Drop: Drag tasks from one column to another to update their status.
Persistence: Refresh the page, and the tasks will persist in the same columns, thanks to localStorage


## Code Structure
src/: Contains the main application code.
KanbanBoard.tsx: The main component for rendering the Kanban board and handling task interactions.
KanbanBoard.css: Styles for the Kanban board.


## Notes
The task IDs are generated using Date.now(), so they are guaranteed to be unique within a session.
Tasks are stored in localStorage under the key kanbanColumns. You can check your browser’s storage to see how the data is stored.


## Contributing
Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Open a pull request.