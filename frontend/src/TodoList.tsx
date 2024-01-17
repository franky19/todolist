// src/TodoList.tsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addTodo, toggleTodo } from './actions';
import { AppState, Todo, ADD_TODO, TOGGLE_TODO } from './types';

interface TodoListProps {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, addTodo, toggleTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
  };

  return (
    <div>
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => handleToggleTodo(todo.id)}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: (text: string) => dispatch(addTodo(text)),
  toggleTodo: (id: number) => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
