import { Study } from "../component/Study";
import { useParams } from "react-router-dom";
import { getStudyItem } from "../api/studyService";
import { useEffect, useState } from "react";
import "./StudyPage.css";

export const StudyPage = () => {
  const { id } = useParams();
  const [studyItem, setStudyItem] = useState();

  useEffect(() => {
    const handleStudyItem = async () => {
      const studyitem = await getStudyItem(id);
      setStudyItem(studyitem);
    };

    handleStudyItem();
  }, [id]); // 의존성 배열에 id 추가

  return (
    <div className="study-page">
      {studyItem ? <Study item={studyItem}></Study> : "loading"}
    </div>
  );
};
