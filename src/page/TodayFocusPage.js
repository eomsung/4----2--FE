import React, { useState, useEffect } from "react";
import "./TodayFocusPage.css";
import { useParams } from "react-router-dom";
import { getStudyItem } from "../api/studyService";
import { useNavigate } from "react-router-dom";

export function TodayFocusPage() {
  const [timeLeft, setTimeLeft] = useState(1800); // 초기 타이머 시간
  const [isRunning, setIsRunning] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false); // 입력창 표시 여부
  const [customMinutes, setCustomMinutes] = useState(0); // 사용자 입력 시간
  const [pauseMessage, setPauseMessage] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // 음수로도 계속 감소
      }, 1000);
    }
    return () => clearInterval(timer); // 타이머 정리
  }, [isRunning]);

  // 시간 형식 변환
  const formatTime = (time) => {
    const absTime = Math.abs(time);
    const minutes = Math.floor(absTime / 60);
    const seconds = absTime % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return time < 0 ? `-${formattedTime}` : formattedTime;
  };

  // 시간 설정 처리
  const handleSetTime = () => {
    setTimeLeft(customMinutes * 60); // 입력된 시간을 초로 변환
    setIsInputVisible(false); // 입력창 숨김
    setIsRunning(false); // 타이머 멈춤
  };

  const handleReset = () => {
    setTimeLeft(0);
    setIsRunning(false);
    setIsInputVisible(false); // 입력창 숨김
  };

  //////
  const { id } = useParams();
  const [studyItem, setStudyItem] = useState({ nickname: "", studyname: "" });

  useEffect(() => {
    const handleStudyItem = async () => {
      const studyitem = await getStudyItem(id);
      setStudyItem(studyitem);
    };

    handleStudyItem();
  }, [id]); // 의존성 배열에 id 추가 이부분이 공통적으로 사용되는데 깔끔하게 하는 방법이 있는지 찾아보기기

  /////
  const navigate = useNavigate();

  const goToStudyListPage = () => {
    navigate("/");
  };

  const goToStudyHabitPage = () => {
    navigate(`/study/${id}/todo`);
  };
  /////

  return (
    <div className="fulll">
      <div className="full">
        <button className="home" onClick={goToStudyListPage}>
          홈 &nbsp; ❭
        </button>
        <button className="todayhome" onClick={goToStudyHabitPage}>
          오늘의 습관 &nbsp;❭
        </button>
        <h2 className="roqkf">{`${studyItem.nickname}의 ${studyItem.studyname}`}</h2>
        <p className="point-focus">현재까지 획득한 포인트</p>
        <button className="pointButton">🌱300획득</button>
        <div className="container-focus">
          {isInputVisible ? (
            <div className="time-input-container">
              <input
                type="number"
                value={customMinutes}
                min="1"
                placeholder="분 입력"
                className="time-input"
                onChange={(e) => setCustomMinutes(Number(e.target.value))} // 입력값 반영
              />
              <button onClick={handleSetTime} className="set-button">
                시간을 입력하고 <br /> 버튼을 눌러주세요.
              </button>
            </div>
          ) : (
            <>
              <h3 className="title">오늘의 집중</h3>
              <button onClick={() => setIsInputVisible(true)} className="aa">
                ⏱&nbsp;25:00
              </button>
              <div
                className="timer"
                style={{
                  color:
                    timeLeft < 0 ? "red" : timeLeft < 600 ? "red" : "black", // 글씨 색 변경
                }}
              >
                {formatTime(timeLeft)}
              </div>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setPauseMessage("🚨집중이 중단되었습니다.");
                  setTimeout(() => setPauseMessage(""), 5000);
                }}
                className="BBB"
              >
                ⦷
              </button>
              {pauseMessage && (
                <div className="pause-message">{pauseMessage}</div>
              )}
              <button onClick={() => setIsRunning(true)} className="btn">
                ▶&nbsp;&nbsp;Start!&nbsp;&nbsp;&nbsp;
              </button>

              <button onClick={handleReset} className="button">
                ↺
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodayFocusPage;
