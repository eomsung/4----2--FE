import "./StudyRecentList.css";
import { StudyItem } from "./StudyItem.js";
export const StudyRecentList = ({ items }) => {
  return (
    <div className="study-list">
      <div className="study-list-wrap">
        <p className="recent-study">최근 조회한 스터디</p>
        <div className="study-list-box">
          {items.map((item, index) => (
            <div key={index} item={item}>
              <StudyItem item={item}></StudyItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
