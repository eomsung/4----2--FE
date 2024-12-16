import { useState } from "react";
import "./StudyList.css";
import { StudyItem } from "./StudyItem.js";

export const StudyList = ({
  items,
  handleKeyword,
  handleOrder,
  pageSize,
  handlePageSize,
  totalCount,
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
          pageSize={pageSize}
          handlePageSize={handlePageSize}
          totalCount={totalCount}
        ></PageButton>
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
        <option value="recent">최근 순</option>
        <option value="oldest">오래된 순</option>
        <option value="highestPoint">많은 포인트 순</option>
        <option value="lowestPoints">적은 포인트 순</option>
      </select>
    </div>
  );
};

const PageButton = ({ pageSize, handlePageSize, totalCount }) => {
  const handlePageChange = (pageSize) => {
    handlePageSize(pageSize);
  };
  return (
    <div className="button-section">
      <button
        className="see-more-button"
        onClick={() => handlePageChange(pageSize + 6)}
        disabled={totalCount <= pageSize}
      >
        더보기
      </button>
    </div>
  );
};
