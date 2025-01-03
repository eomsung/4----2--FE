import React, { useState } from "react";
import { useTodo } from "./TodoContext";
import { MdDelete } from "react-icons/md";
import deleteLogo from "../img/assets/habitDeletelogo.svg";
import "./TodoModal.css";

const TodoModal = ({ onClose }) => {
  const { todos, addTodo, deleteTodo } = useTodo();
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText(""); // 입력값 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd(); // Enter 키를 누르면 handleAdd 호출
      e.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>습관 목록</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="modal-item">
              <div className="todo-text">{todo.text}</div>
              <button
                type="image"
                id="delHabit"
                src={deleteLogo}
                alt="삭제"
                onClick={() => deleteTodo(todo.id)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="modal-add">
          <input
            className="input-text"
            type="text"
            placeholder="추가할 습관 입력"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>{" "}
          {/* 취소 버튼 */}
          <button onClick={onClose}>수정 완료</button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
