// import React, { useState } from "react";
// import { MdAdd } from "react-icons/md";
// import { useTodo } from "./TodoContext"; // TodoContext에서 가져오기
// import "./TodoCreate.css"; // CSS 파일을 import

// function TodoCreate() {
//   const [open, setOpen] = useState(false);
//   const [inputText, setInputText] = useState(""); // 입력값을 관리하는 상태
//   const { addTodo } = useTodo(); // TodoContext에서 addTodo 가져오기

//   const onToggle = () => setOpen(!open);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputText.trim()) {
//       addTodo(inputText); // 할 일 추가
//       setInputText(""); // 입력 값 초기화
//       setOpen(false); // 폼 닫기
//     }
//   };

//   return (
//     <>
//       {open && (
//         <div className="insert-form-positioner">
//           <form className="insert-form" onSubmit={handleSubmit}>
//             <input
//               className="input"
//               autoFocus
//               placeholder="할 일을 입력 후, Enter를 누르세요"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)} // 입력값 관리
//             />
//             <button type="submit">추가하기</button>
//           </form>
//         </div>
//       )}
//       <button
//         className={`circle-button ${open ? "open" : ""}`}
//         onClick={onToggle}
//       >
//         <MdAdd />
//       </button>
//     </>
//   );
// }

// export default TodoCreate;
