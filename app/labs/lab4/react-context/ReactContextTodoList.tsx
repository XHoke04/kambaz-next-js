"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } =
    useTodos()!;

  return (
    <div id="wd-react-context-todo-list" className="w-50">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex gap-2 align-items-center">
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
            <div className="d-flex gap-2">
              <Button onClick={() => setTodo(item)}>Edit</Button>
              <Button variant="danger" onClick={() => deleteTodo(item.id)}>
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
