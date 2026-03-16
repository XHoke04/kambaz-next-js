"use client";

import { useDispatch } from "react-redux";
import { Button, ListGroupItem } from "react-bootstrap";
import { Todo } from "./types";
import { deleteTodo, setTodo } from "./todosReducer";

type TodoItemProps = { todo: Todo };

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem key={todo.id}>
      <Button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
      <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
        Edit
      </Button>
      {todo.title}
    </ListGroupItem>
  );
}
