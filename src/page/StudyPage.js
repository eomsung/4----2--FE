import { useParams } from "react-router-dom";
import { getStudyItem } from "../api/studyService";
import { useEffect, useState } from "react";
import { Study } from "../component/Study";
import "./StudyPage.css";

export const StudyPage = () => {
  const { id } = useParams();
  const [studyItem, setStudyItem] = useState();

  useEffect(() => {
    handleStudyItem();
  }, [id]);

  const handleStudyItem = async () => {
    const studyitem = await getStudyItem(id);
    console.log(studyitem);
    setStudyItem(studyitem);
  };

  return (
    <div className="study-page">
      {studyItem ? <Study item={studyItem}></Study> : "loading"}
    </div>
  );
};
