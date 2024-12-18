import React, { useState } from "react";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";
import { TodoProvider } from "./TodoContext";
import "./TodoTemplate.css";

const TodoTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TodoProvider>
      <div className="todo-template-block">
        <TodoHead />
        <div className="list-nav">
            <h1 className="list-title">오늘의 습관</h1>
            <button className="edit-button" onClick={() => setIsModalOpen(true)}>
            목록 수정
            </button>
        </div>
        <TodoList />
        {isModalOpen && <TodoModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </TodoProvider>
  );
};

export default TodoTemplate;
