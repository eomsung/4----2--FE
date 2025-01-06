import React from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "./TodoContext";
import "./TodoList.css";

function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="todo-list-block">
      {todos.length === 0 ? (
        <div className="no-todos-message">
          <p className="habitEmptyText">아직 습관이 없어요</p>
          <p className="habitEmptyText">목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} text={todo.text} todoId={todo.id} />
        ))
      )}
    </div>
  );
}

export default TodoList;
