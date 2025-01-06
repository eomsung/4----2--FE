import "./Study.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import sticker_empty from "../img/assets/sticker_empty.svg";
import EmojiPicker from "emoji-picker-react";
import React, { useState, useRef } from "react";
import { createEmoticon } from "../api/studyService";
import ic_smilce from "../img/assets/ic_smile.svg";
import ic_point from "../img/assets/ic_point.svg";
import ic_plus from "../img/assets/ic_plus.svg";
import VerifyPasswordModal from "./VerifyPasswordModal";

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
  const nav = useNavigate();

  const [showPicker, setShowPicker] = useState(false);
  const [showMoreEmoji, setShowMoreEmoji] = useState(false);
  const buttonRef = useRef(null);
  const emojiRef = useRef(null);
  const modalsRef = useRef({
    edit: null,
    todo: null,
    focus: null,
    delete: null,
  });
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleMoreEmoji = () => {
    setShowMoreEmoji(!showMoreEmoji);
  };

  const handleEmoticonClick = async (e) => {
    await createEmoticon(id, e.emoji);
  };

  const handleModalShow = (key) => {
    const modal = modalsRef.current[key];
    if (modal) {
      modal.showModal();
    } else {
      console.warn(`${key} modal does not exist!`);
    }
  };

  const handleModalClose = (key) => {
    const modal = modalsRef.current[key];
    if (modal) {
      modal.close();
    } else {
      console.warn(`${key} modal does not exist!`);
    }
  };

  const handleModalEditSubmit = () => {
    nav(`/study/${item.id}/edit`);
  };

  const handleModalTodoSubmit = () => {
    //'오늘의 습관' 클릭 -> 제출 버튼시 동작 작성
  };

  const handleModalFocusSubmit = () => {
    //'오늘의 집중' 클릭 -> 제출 버튼시 동작 작성
  };

  const handleModalDeleteSubmit = () => {
    //'스터디 삭제하기' 클릭 -> 제출 버튼시 동작 작성
  };

  return (
    <div className="study-top">
      <VerifyPasswordModal
        modalRef={(ref) => (modalsRef.current.edit = ref)}
        item={item}
        btnText={"수정하러 가기"}
        handleModalClose={() => handleModalClose("edit")}
        onSubmit={handleModalEditSubmit}
      />
      <VerifyPasswordModal
        modalRef={(ref) => (modalsRef.current.todo = ref)}
        item={item}
        btnText={"오늘의 습관으로 가기"}
        handleModalClose={() => handleModalClose("todo")}
        onSubmit={handleModalTodoSubmit}
      />
      <VerifyPasswordModal
        modalRef={(ref) => (modalsRef.current.focus = ref)}
        item={item}
        btnText={"오늘의 집중으로 가기"}
        handleModalClose={() => handleModalClose("focus")}
        onSubmit={handleModalFocusSubmit}
      />
      <VerifyPasswordModal
        modalRef={(ref) => (modalsRef.current.delete = ref)}
        item={item}
        btnText={"삭제하기"}
        handleModalClose={() => handleModalClose("delete")}
        onSubmit={handleModalDeleteSubmit}
      />
      <div className="study-menu">
        <div className="emoji-container">
          <div className="tag-box ">
            {item.Emoticon &&
              item.Emoticon.slice(0, 3).map((emoticon, index) => (
                <div key={index} className="tag tag-text">
                  {`${emoticon.emoticons} ${emoticon.count}`}
                </div>
              ))}
            {item.Emoticon.length > 3 && (
              <button
                ref={emojiRef}
                onClick={toggleMoreEmoji}
                className="tag tag-text"
              >
                <img src={ic_plus} alt="ic_plus" />
                {item.Emoticon.length - 3}..
              </button>
            )}
            {showMoreEmoji && (
              <div
                className="more-Emoji-wrapper"
                style={{
                  position: "absolute",
                  right: `${
                    window.innerWidth -
                    emojiRef.current?.getBoundingClientRect().right -
                    20
                  }px`,
                }}
              >
                <div className="more-Emoji-container">
                  {item.Emoticon.length > 3 &&
                    item.Emoticon.slice(3, item.Emoticon.length).map(
                      (emoticon, index) => (
                        <div key={index} className="tag tag-text">
                          {`${emoticon.emoticons} ${emoticon.count}`}
                        </div>
                      )
                    )}
                </div>
              </div>
            )}
          </div>
          <button
            ref={buttonRef}
            onClick={togglePicker}
            className="emoticon-button"
          >
            <img src={ic_smilce} alt="ic_smilce"></img>
            추가
          </button>
          {showPicker && (
            <div
              className="emoji-picker-wrapper"
              style={{
                position: "absolute",
                left: `${buttonRef.current?.getBoundingClientRect().left}px`,
              }}
            >
              <EmojiPicker onEmojiClick={handleEmoticonClick} />
            </div>
          )}
        </div>

        <div className="study-menu-buttons">
          <div>공유하기</div>
          <div>|</div>
          <div onClick={() => handleModalShow("edit")}>수정하기</div>
          <div>|</div>
          <div onClick={() => handleModalShow("delete")}>스터디 삭제하기</div>
        </div>
      </div>
      <div className="study-container">
        <div className="study-tilte-box">
          <div className="study-tilte">{`${item.nickname}의 ${item.studyname}`}</div>
          <div className="study-tilte-buttons">
            <div
              className="study-tilte-button"
              onClick={() => handleModalShow("todo")}
            >
              오늘의 습관
            </div>
            <div
              className="study-tilte-button"
              onClick={() => handleModalShow("focus")}
            >
              오늘의 집중
            </div>
          </div>
        </div>
        <div className="study-content">
          <div className="study-description">
            <div className="study-content-subtitle">소개</div>
            <div>{item.description}</div>
          </div>
          <div className="study-point">
            <div className="study-content-subtitle">현재까지 흭득한 포인트</div>
            <div className="point point-text">
              <img src={ic_point} alt="ic_point" />
              {`${item.point}P 흭득`}
            </div>
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
