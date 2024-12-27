import React, { useState, useEffect } from "react";
import "./App.css";
import Logo from "./component/header";

function App() {
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

  return (
    <div className='fulll'>
      <Logo />
      <div className='full'>
        <button className='home'>홈 &nbsp; ❭</button>
        <button className='todayhome'>오늘의 습관 &nbsp;❭</button>
        <h2 className='roqkf'>연우의 개발공장</h2>
        <p className='point'>현재까지 획득한 포인트</p>
        <button className='pointButton'>🌱300획득</button>
        <div className='container'>
          {isInputVisible ? (
            <div className='time-input-container'>
              <input
                type='number'
                value={customMinutes}
                min='1'
                placeholder='분 입력'
                className='time-input'
                onChange={(e) => setCustomMinutes(Number(e.target.value))} // 입력값 반영
              />
              <button onClick={handleSetTime} className='set-button'>
                시간을 입력하고 <br /> 버튼을 눌러주세요.
              </button>
            </div>
          ) : (
            <>
              <h3 className='title'>오늘의 집중</h3>
              <button onClick={() => setIsInputVisible(true)} className='aa'>
                ⏱&nbsp;25:00
              </button>
              <div
                className='timer'
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
                className='BBB'
              >
                ⦷
              </button>
              {pauseMessage && (
                <div className='pause-message'>{pauseMessage}</div>
              )}
              <button onClick={() => setIsRunning(true)} className='btn'>
                ▶&nbsp;&nbsp;Start!&nbsp;&nbsp;&nbsp;
              </button>

              <button onClick={handleReset} className='button'>
                ↺
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
