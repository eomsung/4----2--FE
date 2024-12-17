import Study from "../component/Study";
import { useParams } from "react-router-dom";

export const StudyPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Study />
    </>
  );
};
