import React from "react";
import Time from "./Time.js";
import "./TodoHead.css"; // CSS 파일을 import

function TodoHead({ item }) {
  return (
    <div className="todo-head-block">
      <h1>{`${item.nickname}의 ${item.studyname}`}</h1>
      <p className="text">현재 시간</p>
      <div className="current-time">
        <Time />
      </div>
    </div>
  );
}

export default TodoHead;
