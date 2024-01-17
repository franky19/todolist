// src/reducers.ts
import { ADD_TODO, TOGGLE_TODO, AppState } from './types';

const initialState: AppState = {
  todos: [],
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
