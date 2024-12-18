import React, { useState } from "react";
import "./TodoItem.css";

function TodoItem({ text }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked); // 클릭 시 상태 토글
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