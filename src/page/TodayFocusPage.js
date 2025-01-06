import React, { useState, useEffect } from "react";
import "./TodayFocusPage.css";
import { useParams } from "react-router-dom";
import { getStudyItem, patchStudyPoint } from "../api/studyService"; // patchStudyPoint 임포트
import { useNavigate } from "react-router-dom";
import ic_point from "../img/assets/ic_point.svg";
export function TodayFocusPage() {
  const INITIAL_TIME = 1800; // 초기 타이머 시간 (30분)
  const POINT_INCREMENT = 3; // 포인트 증가량
  let point_cnt = 0;

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME); // 초기 타이머 시간
  const [isRunning, setIsRunning] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false); // 입력창 표시 여부
  const [customMinutes, setCustomMinutes] = useState(""); // 사용자 입력 시간 (빈 문자열로 초기화)
  const [pauseMessage, setPauseMessage] = useState("");
  const [myPoint, setPoint] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime - 1 < 0) {
            // timeLeft가 0보다 작아지면 실행
            point_cnt++;

            handleTimeOut();
            return INITIAL_TIME; // 초기값으로 복귀
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // 타이머 정리
  }, [isRunning]);

  const handleTimeOut = async () => {
    setIsRunning(false); // 타이머 멈춤
    setPoint((prevPoint) => {
      if (point_cnt > 0) {
        point_cnt = 0;
        return prevPoint;
      }
      const newPoint = prevPoint + POINT_INCREMENT; // 포인트 증가
      // 포인트 업데이트 후 서버에 반영
      patchStudyPoint(studyItem.id, newPoint); // 서버로 포인트 업데이트
      return newPoint;
    });
  };

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
    setTimeLeft(Number(customMinutes) * 60); // 입력된 시간을 초로 변환
    setIsInputVisible(false); // 입력창 숨김
    setIsRunning(false); // 타이머 멈춤
  };

  const handleReset = () => {
    setTimeLeft(INITIAL_TIME);
    setIsRunning(false);
    setIsInputVisible(false); // 입력창 숨김
  };

  useEffect(() => {
    if (isInputVisible) {
      setCustomMinutes(""); // 입력값 초기화 (빈 문자열로 설정)
      const inputElement = document.querySelector(".time-input");
      if (inputElement) {
        inputElement.focus(); // input 태그에 focus
      }
    }
  }, [isInputVisible]);

  ////// Study API 데이터 로드 ///////
  const { id } = useParams();
  const [studyItem, setStudyItem] = useState({
    nickname: "",
    studyname: "",
    point: 0,
  });

  useEffect(() => {
    const handleStudyItem = async () => {
      const studyitem = await getStudyItem(id);
      setStudyItem(studyitem);
      setPoint(studyitem.point); // 초기 포인트 설정
    };

    handleStudyItem();
  }, [id]); // 의존성 배열에 id 추가

  ///// Navigation 처리 /////
  const navigate = useNavigate();

  const goToStudyListPage = () => {
    navigate("/");
  };

  const goToStudyHabitPage = () => {
    navigate(`/study/${id}/todo`);
  };

  ///// Return JSX /////
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
        <button className="pointButton">
          <img src={ic_point} alt="ic_point" />
          {myPoint}획득
        </button>
        <div className="container-focus">
          {isInputVisible ? (
            <div className="time-input-container">
              <input
                type="number"
                value={customMinutes}
                min="1"
                placeholder="분 입력"
                className="time-input"
                onChange={(e) =>
                  setCustomMinutes(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                } // 입력값 반영
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
