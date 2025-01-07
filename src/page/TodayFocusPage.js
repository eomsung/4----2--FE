import React, { useState, useEffect } from "react";
import "./TodayFocusPage.css";
import { useParams } from "react-router-dom";
import { getStudyItem, patchStudyPoint } from "../api/studyService";
import { useNavigate } from "react-router-dom";
import ic_point from "../img/assets/ic_point.svg";

export function TodayFocusPage() {
  const INITIAL_TIME = 1800; // 초기 타이머 시간 (30분)
  const POINT_INCREMENT = 3; // 포인트 증가량

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [warningMessage, setWarningMessage] = useState(""); // 경고 메시지 상태 추가
  const [pauseMessage, setPauseMessage] = useState("");
  const [myPoint, setPoint] = useState(0);
  const [pointCnt, setPointCnt] = useState(0);

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

  const handleSetTime = () => {
    if (Number(customMinutes) >= 10) {
      setTimeLeft(Number(customMinutes) * 60);
      setWarningMessage(""); // 경고 메시지 초기화
      setIsInputVisible(false);
      setIsRunning(false);
      setPauseMessage("");
    } else {
      setWarningMessage("⛔ 10분 이상을 입력해야 합니다.");
    }
  };

  const handleReset = () => {
    setTimeLeft(INITIAL_TIME);
    setIsRunning(false);
    setIsInputVisible(false);
  };

  useEffect(() => {
    if (isInputVisible) {
      setCustomMinutes("");
      const inputElement = document.querySelector(".time-input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isInputVisible]);

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
      setPoint(studyitem.point);
    };

    handleStudyItem();
  }, [id]);

  const navigate = useNavigate();

  const goToStudyListPage = () => {
    navigate(`/study/${id}`);
  };

  const goToStudyHabitPage = () => {
    navigate(`/study/${id}/todo`);
  };
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime - 1 < 0) {
            // studyItem이 유효한지 확인
            if (studyItem && studyItem.id) {
              setIsRunning(false); // 타이머 멈춤
              setPoint((prevPoint) => {
                if (pointCnt > 0) {
                  setPointCnt(1);
                  return prevPoint;
                }
                const newPoint = prevPoint + POINT_INCREMENT; // 포인트 증가
                // 포인트 업데이트 후 서버에 반영
                const id = studyItem.id;

                patchStudyPoint(id, newPoint);

                return newPoint;
              });
            }
            return INITIAL_TIME; // 초기값으로 복귀
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // 타이머 정리
  }, [isRunning, pointCnt, studyItem]); // studyItem도 의존성에 포함

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime - 1 < 0) {
            // studyItem이 유효한지 확인
            if (studyItem && studyItem.id) {
              setIsRunning(false); // 타이머 멈춤
              setPoint((prevPoint) => {
                if (pointCnt > 0) {
                  setPointCnt(1);
                  return prevPoint;
                }
                const newPoint = prevPoint + POINT_INCREMENT; // 포인트 증가
                // 포인트 업데이트 후 서버에 반영
                const id = studyItem.id;

                patchStudyPoint(id, newPoint);

                return newPoint;
              });
            }
            return INITIAL_TIME; // 초기값으로 복귀
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // 타이머 정리
  }, [isRunning, pointCnt, studyItem]); // studyItem도 의존성에 포함

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
                }
              />
              <button onClick={handleSetTime} className="set-button">
                시간을 입력하고 <br /> 버튼을 눌러주세요.
              </button>
              {warningMessage && (
                <div className="warning-message">{warningMessage}</div>
              )}
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
                    timeLeft < 0 ? "red" : timeLeft < 600 ? "red" : "black",
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
