import "./VerifyPasswordModal.css";
import { useState } from "react";
import pwIconOn from "./../img/btn_visibility_on.png";
import pwIconOff from "./../img/btn_visibility_off.png";

const VerifyPasswordModal = ({
  key,
  modalRef,
  item,
  btnText,
  handleModalClose,
  onSubmit,
}) => {
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validatePassword = () => {
    if (item.password !== inputPassword)
      return "🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.";
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const nextErrorMsg = validatePassword();
    if (nextErrorMsg) {
      setErrorMsg(() => nextErrorMsg);
    } else {
      onSubmit();
    }
  };

  const handleCancelClick = () => {
    handleModalClose();
    setInputPassword("");
    setErrorMsg("");
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <dialog className="VerifyPasswordModal" ref={modalRef}>
      <button className="modal-cancel-button" onClick={handleCancelClick}>
        나가기
      </button>
      <h3>{`${item.nickname}의 ${item.studyname}`}</h3>
      <p>권한이 필요해요!</p>
      <form method="dialog">
<<<<<<< HEAD
        <label htmlFor={`password-${key}`}>비밀번호</label>
=======
        <label htmlFor="password">비밀번호</label>
>>>>>>> 7b1a7f510308a80ce345179b45deb1a5a4a29719
        <input
          type={showPassword ? "text" : "password"}
          id={`password-${key}`}
          name="password"
          value={inputPassword}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해 주세요"
        />
        <img
          src={showPassword ? pwIconOn : pwIconOff}
          className="btn-showPassword"
          onClick={handlePasswordToggle}
          alt="password show icon"
        />
        <button
          className="modal-button"
          onClick={handleButtonClick}
          data-content={btnText}
        >
          {btnText}
        </button>
      </form>
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </dialog>
  );
};

export default VerifyPasswordModal;
