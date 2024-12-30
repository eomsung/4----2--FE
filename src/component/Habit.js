import React, { useState, useEffect } from "react";
import Time from "./Timer"; // Time 컴포넌트 import
import Habits from "./Habits";
import "./Habit.css";

function Habit() {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [habits, setHabits] = useState([
    // 습관 리스트 상태 관리
    "미라클모닝 6시 기상",
    "아침 챙겨 먹기",
    "React 스터디 책 1챕터 읽기",
    "스트레칭",
    "영양제 챙겨 먹기",
    "사이드 프로젝트",
    "물 2L 먹기",
  ]);
  const [isEmpty, setIsEmpty] = useState(false); // habits가 비었는지 여부를 상태로 관리

  // habits의 상태에 따라 isEmpty를 업데이트하는 useEffect
  useEffect(() => {
    setIsEmpty(habits.length === 0);
  }, [habits]);

  // 모달 열기/닫기 함수
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <div className="habit-top">
        <div className="habit-title">
          <h2>연우의 개발공장</h2>
          <div className="btns">
            <button>오늘의 집중 &gt;</button>
            <button>홈 &gt;</button>
          </div>
        </div>

        <div className="habit-time">
          <p id="time-title">현재 시간</p>
          <Time />
        </div>
      </div>

      <div className="habit-contents">
        <div className="contents-top">
          <p id="todays-habits">오늘의 습관</p>
          <button id="habit-control-btn" onClick={toggleModal}>
            목록 수정
          </button>
        </div>

        {/* 조건부 렌더링: habits 배열이 비어있으면 안내 문구를 출력 */}
        <div className={`habits-list ${isEmpty ? "Empty" : ""}`}>
          {isEmpty ? (
            <>
              <p className="habitEmptyText">아직 습관이 없어요</p>
              <p className="habitEmptyText">
                목록 수정을 눌러 습관을 생성해보세요
              </p>
            </>
          ) : (
            habits.map((habit, index) => (
              <p className="habit" key={index}>
                {habit}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Habits 컴포넌트 호출 */}
      {isModalOpen && (
        <Habits
          habits={habits}
          setHabits={setHabits}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

export default Habit;
