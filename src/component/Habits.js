import React, { useState } from "react";
import "./Habits.css";
import deleteLogo from "./img/habitDeletelogo.svg";

function Habits({ habits, setHabits, toggleModal }) {
  const [localHabits, setLocalHabits] = useState([...habits]); // 모달에서 임시로 관리할 습관 리스트

  // 습관 추가 함수
  const addHabit = () => {
    setLocalHabits([...localHabits, ""]);
  };

  // 습관 삭제 함수
  const deleteHabit = (index) => {
    setLocalHabits(localHabits.filter((_, i) => i !== index));
  };

  // 습관 수정 함수
  const updateHabit = (index, value) => {
    const updatedHabits = [...localHabits];
    updatedHabits[index] = value;
    setLocalHabits(updatedHabits);
  };

  const saveHabits = () => {
    setHabits(localHabits); // 부모 컴포넌트 상태 업데이트
    toggleModal(); // 모달 닫기
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 id="page-title">습관 목록</h2>
        <div className="modal-habitsBox">
          {localHabits.map((habit, index) => (
            <div key={index} className="habit-item">
              <input
                type="text"
                value={habit}
                onChange={(e) => updateHabit(index, e.target.value)}
              />
              <input
                type="image"
                id="delHabit"
                src={deleteLogo}
                alt="삭제"
                onClick={() => deleteHabit(index)}
              />
            </div>
          ))}
        </div>
        <button id="plus-btn" onClick={addHabit}>
          +
        </button>
        <div className="modal-buttons">
          <button id="cancel" onClick={toggleModal}>
            취소
          </button>
          <button id="save" onClick={saveHabits}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default Habits;
