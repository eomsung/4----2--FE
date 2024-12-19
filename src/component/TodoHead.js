import React from "react";
import Time from "./Time.js";
import "./TodoHead.css"; // CSS 파일을 import

function TodoHead() {
  return (
    <div className="todo-head-block">
      <h1>연우의 개발공장</h1>
      <p className="text">현재 시간</p>
      <p className="current-time">
        <Time />
      </p>
    </div>
  );
}

export default TodoHead;
