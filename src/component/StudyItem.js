export const StudyItem = ({ item }) => {
  const currentTime = new Date();
  const createdAt = new Date(item.createdAt);
  const timeDiff = currentTime - createdAt;
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return (
    <div className="study-item-box">
      <div className="study-item-text-wrap">
        <div className="study-item-text-box">
          <div className="study-item-header">
            <div className="study-item-tilte">
              {`${item.nickname}의${item.studyname}`}
              <p className="point">{`${item.point}P 흭득`}</p>
            </div>
            <p className="date">{`${days}일째 진행 중`}</p>
          </div>
          <div>{item.description}</div>
        </div>
        <div className="tag-box">
          <div className="tag">tag1</div>
          <div className="tag">tag2</div>
          <div className="tag">tag3</div>
        </div>
      </div>
    </div>
  );
};
