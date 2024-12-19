import "./Study.css";
import { Link, useParams } from "react-router-dom";
export const Study = ({ item }) => {
  return (
    <div className="study">
      <div className="study-wrap">
        <StudyTop item={item} />
        <StudyBottom />
      </div>
    </div>
  );
};

const StudyTop = ({ item }) => {
  const { id } = useParams();
  return (
    <div className="study-top">
      <div className="study-menu">
        <div>tag</div>
        <div className="study-menu-buttons">
          <div>공유하기</div>
          <div>|</div>
          <div>수정하기</div>
          <div>|</div>
          <div>스터디 삭제하기</div>
        </div>
      </div>
      <div className="study-container">
        <div className="study-tilte-box">
          <div className="study-tilte">{`${item.nickname}의 ${item.studyname}`}</div>
          <div className="study-tilte-buttons">
            <Link to={`/study/${id}/todo`} className="study-tilte-button">
              오늘의 습관
            </Link>
            <div className="study-tilte-button">오늘의 집중</div>
          </div>
        </div>
        <div className="study-content">
          <div className="study-description">
            <div className="study-content-subtitle">소개</div>
            <div>{item.description}</div>
          </div>
          <div className="study-point">
            <div className="study-content-subtitle">현재까지 흭득한 포인트</div>
            <div>{`${item.point}P 흭득`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudyBottom = () => {
  return (
    <div className="study-bottom">
      <div style={{ fontWeight: 800, fontSize: "24px" }}>습관 기록표</div>
      <div className="no-habit">
        아직 습관이 없어요
        <br /> 오늘의 습관에서 습관을 생성해보세요
      </div>
    </div>
  );
};
