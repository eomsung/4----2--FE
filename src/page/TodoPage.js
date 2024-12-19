import React, { useState, useEffect } from "react";
import TodoHead from "../component/TodoHead";
import TodoList from "../component/TodoList";
import TodoModal from "../component/TodoModal";
import { TodoProvider } from "../component/TodoContext";
import "./TodoPage.css";
import { useParams } from "react-router-dom";
import { getStudyItem } from "../api/studyService";
const TodoTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const [studyItem, setStudyItem] = useState();

  useEffect(() => {
    const handleStudyItem = async () => {
      const studyitem = await getStudyItem(id);
      setStudyItem(studyitem);
    };

    handleStudyItem();
  }, [id]); // 의존성 배열에 id 추가 이부분이 공통적으로 사용되는데 깔끔하게 하는 방법이 있는지 찾아보기기

  return (
    <TodoProvider>
      <div className="todo-template-block">
        {studyItem ? <TodoHead item={studyItem} /> : "loading"}
        <div className="list-nav">
          <h1 className="list-title">오늘의 습관</h1>
          <button className="edit-button" onClick={() => setIsModalOpen(true)}>
            목록 수정
          </button>
        </div>
        <TodoList />
        {isModalOpen && <TodoModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </TodoProvider>
  );
};

export default TodoTemplate;
