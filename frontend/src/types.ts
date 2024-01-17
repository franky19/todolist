// src/types.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export interface AppState {
    todos: Todo[];
  }
  
  // Define action types
  export const ADD_TODO = 'ADD_TODO';
  export const TOGGLE_TODO = 'TOGGLE_TODO';
  