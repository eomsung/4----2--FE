import "./Study.css";

export const Study = ({ item }) => {
  return (
    <div className="study">
      <div>
        <div>tag</div>
        <div>공유하기</div>
        <div>수정하기</div>
        <div>스터디 삭제하기</div>
        <div>{`${item.nickname}의 ${item.studyname}`}</div>
        <div>오늘의 습관</div>
        <div>오늘의 집중</div>
        <div>소개</div>
        <div>{item.description}</div>
        <div>현재까지 흭득한 포인트</div>
        <div>{`${item.point}P 흭득`}</div>
      </div>
    </div>
  );
};
