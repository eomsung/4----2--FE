import React from "react";
import Time from "./Time.js";
import "./TodoHead.css"; // CSS 파일을 import
import { useNavigate } from "react-router-dom";

function TodoHead({ item }) {
  const navigate = useNavigate();

  const goToStudyListPage = () => {
    navigate("/");
  };

  return (
    <div className="todo-head-block">
      <h1>{`${item.nickname}의 ${item.studyname}`}</h1>
      <div className="todo-head-contents">
        <div>
          <p className="text">현재 시간</p>
          <div className="current-time">
            <Time />
          </div>
        </div>
        <div className="btns">
          <button>오늘의 집중 &gt;</button>
          <button onClick={goToStudyListPage}>홈 &gt;</button>
        </div>
      </div>
    </div>
  );
}

export default TodoHead;
