"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type Todo = {
  id: string;
  title: string;
};

type TodosContextState = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });

  const addTodo = () => {
    setTodos([...todos, { ...todo, id: new Date().getTime().toString() }]);
    setTodo({ id: "-1", title: "" });
  };

  const updateTodo = () => {
    setTodos(todos.map((item) => (item.id === todo.id ? todo : item)));
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const value: TodosContextState = {
    todos,
    todo,
    setTodo,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};
