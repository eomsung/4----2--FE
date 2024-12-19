import React from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "./TodoContext";
import "./TodoList.css";

function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="todo-list-block">
      {todos.length === 0 ? (
        <div className="no-todos-message">아직 습관이 없어요</div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} text={todo.text} />)
      )}
    </div>
  );
}

export default TodoList;
