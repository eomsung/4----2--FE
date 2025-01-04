import { useEffect, useState } from "react";
import { getStudyListItem } from "../api/studyService.js";
import { StudyRecentList } from "../component/StudyRecentList.js";
import { StudyList } from "../component/StudyList.js";
import "./StudyListPage.css";
import { getRecentStudies } from "../utils/RecentStudy.js";
const DEFAULTPAGE = 1;
const DEFAULTPAGESIZE = 6;
const DEFAULTORDER = "recent";
export const StudyListPage = () => {
  const [studyItems, setStudyItems] = useState({ list: [] });
  const [studyRecentItems, setStudyRecentItems] = useState({ list: [] });
  const [studyPageSize, setStudyPageSize] = useState(DEFAULTPAGESIZE);
  const [order, setOrder] = useState(DEFAULTORDER);
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    handleLoadRecentStudy();
  }, [studyItems]);

  useEffect(() => {
    handleLoadStudy({
      page: DEFAULTPAGE,
      pageSize: studyPageSize,
      orderBy: order,
      keyword: keyword,
    });
  }, [order, keyword, studyPageSize, totalCount]);

  const handleLoadStudy = async (Options) => {
    let data = await getStudyListItem(Options);
    setTotalCount(data.totalCount);
    setStudyItems(data);
  };

  const handleLoadRecentStudy = async () => {
    const recentStudy = getRecentStudies();
    setStudyRecentItems({ list: recentStudy });
  };

  return (
    <div className="study-list-page">
      <StudyRecentList items={studyRecentItems.list || []}></StudyRecentList>
      <StudyList
        items={studyItems.list || []}
        handleKeyword={setKeyword}
        handleOrder={setOrder}
        pageSize={studyPageSize}
        handlePageSize={setStudyPageSize}
        totalCount={totalCount}
      ></StudyList>
    </div>
  );
};
