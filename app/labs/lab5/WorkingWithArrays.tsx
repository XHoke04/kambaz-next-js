"use client";

import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "Task 1",
    description: "Todo 1",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex align-items-center gap-2">
        <FormControl
          id="wd-todo-id"
          className="w-25"
          value={todo.id}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-retrieve-todo-by-id"
          className="btn btn-primary"
          href={`${API}/${todo.id}`}
        >
          Get Todo by ID
        </a>
      </div>
      <hr />
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />
      <h4>Removing from an Array</h4>
      <div className="d-flex align-items-center gap-2">
        <FormControl
          id="wd-remove-todo-id"
          className="w-25"
          value={todo.id}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-remove-todo"
          className="btn btn-primary"
          href={`${API}/${todo.id}/delete`}
        >
          Remove Todo with ID = {todo.id}
        </a>
      </div>
      <hr />
      <h4>Updating an Item in an Array</h4>
      <div className="d-flex align-items-center gap-2">
        <FormControl
          id="wd-update-todo-id"
          className="w-25"
          value={todo.id}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl
          id="wd-update-todo-title"
          className="w-50"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a
          id="wd-update-todo"
          className="btn btn-primary"
          href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
        >
          Update Todo
        </a>
      </div>
      <hr />
      <h4>On Your Own</h4>
      <div className="d-flex align-items-center gap-2">
        <FormControl
          id="wd-update-todo-description"
          className="w-50"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <a
          id="wd-update-todo-description-link"
          className="btn btn-primary"
          href={`${API}/${todo.id}/description/${encodeURIComponent(
            todo.description
          )}`}
        >
          Describe Todo ID = {todo.id}
        </a>
      </div>
      <div className="d-flex align-items-center gap-2 mt-2">
        <FormCheck
          id="wd-update-todo-completed"
          label="Completed"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
        <a
          id="wd-update-todo-completed-link"
          className="btn btn-primary"
          href={`${API}/${todo.id}/completed/${todo.completed}`}
        >
          Complete Todo ID = {todo.id}
        </a>
      </div>
      <hr />
    </div>
);}
