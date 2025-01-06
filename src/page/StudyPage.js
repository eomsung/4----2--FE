import { Study } from "../component/Study";
import { useParams } from "react-router-dom";
import { getStudyItem, getTodoList } from "../api/studyService";
import { useEffect, useState } from "react";
import "./StudyPage.css";

export const StudyPage = () => {
  const { id } = useParams();
  const [studyItem, setStudyItem] = useState();
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    const handleStudyItem = async () => {
      const studyitem = await getStudyItem(id);
      setStudyItem(studyitem);
    };

    const handleTodoList = async () => {
      const todolist = await getTodoList(id);
      setTodoList(todolist);
    };

    handleStudyItem();
    handleTodoList();
  }, [id]); // 의존성 배열에 id만 추가

  return (
    <div className="study-page">
      {studyItem ? <Study item={studyItem} todo={todoList}></Study> : "loading"}
    </div>
  );
};
