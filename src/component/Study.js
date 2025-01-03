import "./Study.css";
import { Link, useParams } from "react-router-dom";
import sticker_empty from "../img/assets/sticker_empty.svg";
import EmojiPicker from "emoji-picker-react";
import React, { useState, useRef } from "react";
export const Study = ({ item, todo }) => {
  return (
    <div className="study">
      <div className="study-wrap">
        <StudyTop item={item} />
        <StudyBottom todo={todo} />
      </div>
    </div>
  );
};

const StudyTop = ({ item }) => {
  const { id } = useParams();

  const [showPicker, setShowPicker] = useState(false);
  const buttonRef = useRef(null); // 버튼의 위치를 참조하기 위해 사용

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  return (
    <div className="study-top">
      <div className="study-menu">
        <div className="emoji-container">
          <button ref={buttonRef} onClick={togglePicker}>
            추가
          </button>
          {showPicker && (
            <div
              className="emoji-picker-wrapper"
              style={{
                position: "absolute",
                top: `${buttonRef.current?.getBoundingClientRect().bottom}px`,
                left: `${buttonRef.current?.getBoundingClientRect().left}px`,
              }}
            >
              <EmojiPicker />
            </div>
          )}
        </div>

        <div className="study-menu-buttons">
          <div>공유하기</div>
          <div>|</div>
          <div>수정하기</div>
          <div>|</div>
          <div>스터디 삭제하기</div>
        </div>
      </div>
      <div className="study-container">
        <div className="study-tilte-box">
          <div className="study-tilte">{`${item.nickname}의 ${item.studyname}`}</div>
          <div className="study-tilte-buttons">
            <Link to={`/study/${id}/todo`} className="study-tilte-button">
              오늘의 습관
            </Link>
            <Link to={`/study/${id}/focus`} className="study-tilte-button">
              오늘의 집중
            </Link>
          </div>
        </div>
        <div className="study-content">
          <div className="study-description">
            <div className="study-content-subtitle">소개</div>
            <div>{item.description}</div>
          </div>
          <div className="study-point">
            <div className="study-content-subtitle">현재까지 흭득한 포인트</div>
            <div>{`${item.point}P 흭득`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudyBottom = ({ todo }) => {
  const isEmptyObject =
    todo && typeof todo === "object" && Object.keys(todo).length === 0;
  const todoValues = Object.values(todo || {});
  return (
    <div>
      {!isEmptyObject ? (
        <div className="study-bottom">
          <div style={{ fontWeight: 800, fontSize: "24px" }}>습관 기록표</div>
          <div className="study-bottom-wrap">
            <div className="week">
              <p>월</p>
              <p>화</p>
              <p>수</p>
              <p>목</p>
              <p>금</p>
              <p>토</p>
              <p>일</p>
            </div>
            <div className="study-bottom-container">
              {todoValues.map((habit, index) => (
                <div key={index} className="habit-container">
                  <div className="habit">{habit.text}</div>
                  <div className="skicker">
                    <img src={sticker_empty} alt="sticker_empty" />
                    <img src={sticker_empty} alt="sticker_empty" />
                    <img src={sticker_empty} alt="sticker_empty" />
                    <img src={sticker_empty} alt="sticker_empty" />
                    <img src={sticker_empty} alt="sticker_empty" />
                    <img src={sticker_empty} alt="sticker_empty" />
                    <img src={sticker_empty} alt="sticker_empty" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="study-bottom">
          <div style={{ fontWeight: 800, fontSize: "24px" }}>습관 기록표</div>
          <div className="no-habit">
            아직 습관이 없어요
            <br /> 오늘의 습관에서 습관을 생성해보세요
          </div>
        </div>
      )}
    </div>
  );
};
