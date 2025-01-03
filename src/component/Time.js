import React, { useState, useEffect } from "react";

function Time() {
  const [timer, setTimer] = useState("00:00:00");

  const currentTimer = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
    const date = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");

    setTimer(
      `${year}-${month}-${date}일 오후${hours % 12}:${minutes}:${seconds}`
    );
  };

  useEffect(() => {
    const interval = setInterval(currentTimer, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(interval);
  }, []);

  return <div>{timer}</div>;
}

export default Time;
