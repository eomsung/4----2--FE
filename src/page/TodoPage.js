import React, { useState } from "react";
import TodoHead from "../component/TodoHead";
import TodoList from "../component/TodoList";
import TodoModal from "../component/TodoModal";
import { TodoProvider } from "../component/TodoContext";
import "./TodoPage.css";

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
