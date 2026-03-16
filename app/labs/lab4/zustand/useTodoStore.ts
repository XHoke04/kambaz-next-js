import { create } from "zustand";

type Todo = {
  id: string;
  title: string;
};

interface TodoState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },
  setTodo: (todo) => set({ todo }),
  addTodo: () =>
    set((state) => ({
      todos: [
        ...state.todos,
        { ...state.todo, id: new Date().getTime().toString() },
      ],
      todo: { id: "-1", title: "" },
    })),
  updateTodo: () =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === state.todo.id ? state.todo : item,
      ),
      todo: { id: "-1", title: "" },
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    })),
}));
