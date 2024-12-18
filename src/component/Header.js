import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../img/assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const goToStudyListPage = () => {
    navigate("/");
  };

  const goToStudyCreatePage = () => {
    navigate("/StudyCreate");
  };

  return (
    <header className="header">
      <div className="header-logo" onClick={goToStudyListPage}>
        <img src={logo} alt="공부의 숲 로고" />
      </div>
      <button
        id="header-button"
        // 우선순위 이슈로 버튼 디자인 미작동에 따른 id 설정
        className="header-button"
        onClick={goToStudyCreatePage}
      >
        스터디 만들기
      </button>
    </header>
  );
};

export default Header;
