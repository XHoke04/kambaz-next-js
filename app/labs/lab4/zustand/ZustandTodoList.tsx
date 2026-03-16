"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const todos = useTodoStore((state) => state.todos);
  const todo = useTodoStore((state) => state.todo);
  const setTodo = useTodoStore((state) => state.setTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <div id="wd-zustand-todo-list" className="w-50">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex gap-3 align-items-center">
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <Button variant="warning" onClick={updateTodo}>
            Update
          </Button>
          <Button variant="success" onClick={addTodo}>
            Add
          </Button>
        </ListGroupItem>
        {todos.map((item) => (
          <ListGroupItem
            key={item.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{item.title}</span>
            <div className="d-flex gap-3">
              <Button onClick={() => setTodo(item)}>Edit</Button>
              <Button variant="danger" onClick={() => deleteTodo(item.id)}>
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
