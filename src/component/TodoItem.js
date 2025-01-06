import React, { useState } from "react";
import "./TodoItem.css";
import { patchTodoList } from "../api/studyService";
import { useTodo } from "./TodoContext";
import { useParams } from "react-router-dom";

function TodoItem({ text, todoId }) {
  const { todos } = useTodo();
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === todoId);
  const currentDay = new Date().getDay();
  const [clicked, setClicked] = useState(todo.done[currentDay]);
  const handleClick = async () => {
    await patchTodoList(id, todoId, currentDay, !clicked);
    setClicked(!clicked); // 클릭 시 상태 토글
    console.log(clicked);
  };
  return (
    <div
      className={`todo-item-block ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}

export default TodoItem;
