import "./StudyRecentList.css";
import { StudyItem } from "./StudyItem.js";
export const StudyRecentList = ({ items }) => {
  const isStudyListEmpty = items.length === 0;
  return (
    <div className="study-list">
      <div className="study-list-wrap">
        <p className="recent-study">최근 조회한 스터디</p>
        <div className="study-list-box">
          {!isStudyListEmpty ? (
            items.map((item, index) => (
              <div key={index} item={item}>
                <StudyItem item={item}></StudyItem>
              </div>
            ))
          ) : (
            <div className="study-list-empty">
              <p style={{ padding: "13rem" }}>아직 조회한 스터디가 없어요요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
