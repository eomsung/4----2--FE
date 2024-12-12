import { useState } from "react";
import "./StudyList.css";

const PAGENUMBER = 6;

export const StudyList = ({
  items,
  handleKeyword,
  handleOrder,
  page,
  handlePage,
  numPage,
}) => {
  return (
    <div className="study-list">
      <div className="study-list-wrap">
        <p className="recent-study">스터디 둘러보기</p>
        <StudySearchMenu
          handleKeyword={handleKeyword}
          handleOrder={handleOrder}
        ></StudySearchMenu>
        <div className="study-list-box">
          {items.map((item, index) => (
            <div key={index} item={item}>
              <StudyItem item={item}></StudyItem>
            </div>
          ))}
        </div>
        <PageButton
          page={page}
          handlePage={handlePage}
          numPage={numPage}
        ></PageButton>
      </div>
    </div>
  );
};

const StudyItem = ({ item }) => {
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

const StudySearchMenu = ({ handleKeyword, handleOrder }) => {
  const [value, setValue] = useState("");
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  const handleOrderChange = (e) => {
    handleOrder(e.target.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(value);
    handleKeyword(value);
  };
  return (
    <div className="submit-box">
      <form onSubmit={handlesubmit}>
        <input
          placeholder="검색"
          value={value}
          onChange={handleValueChange}
          className="study-input"
        ></input>
      </form>
      <select onChange={handleOrderChange} className="study-select">
        <option value="recent">최근순</option>
        <option value="older">오래된순</option>
      </select>
    </div>
  );
};

const PageButton = ({ page, handlePage, numPage }) => {
  const startPage = Math.floor((page - 1) / PAGENUMBER) * PAGENUMBER + 1;
  const endPage = Math.min(numPage, startPage + PAGENUMBER - 1);
  const maxPage = Math.ceil(numPage / PAGENUMBER);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPage) {
      handlePage(page);
    }
  };
  return (
    <div>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        {"<"}
      </button>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === maxPage}
      >
        {">"}
      </button>
    </div>
  );
};
