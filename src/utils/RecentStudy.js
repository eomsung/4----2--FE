import { getStudyItemId } from "../api/studyService";

const RECENTKEY = "recentKey";
const MAXNUM = 3;
export const saveRecentStudy = (study) => {
  try {
    const storedStudy = JSON.parse(localStorage.getItem(RECENTKEY)) || [];
    let newStudy = storedStudy.filter((item) => item.id !== study.id);

    newStudy.unshift(study); // 최신순으로 배치치

    localStorage.setItem(RECENTKEY, JSON.stringify(newStudy));
  } catch (error) {
    console.error("recent store is failed:", error);
  }
};

export const getRecentStudies = () => {
  const storedStudy = JSON.parse(localStorage.getItem(RECENTKEY)) || [];
  return storedStudy.slice(0, MAXNUM);
};

export const deleteRecentStudy = (id) => {
  try {
    const RecentStudy = JSON.parse(localStorage.getItem(RECENTKEY)) || [];

    const updatedStudy = RecentStudy.filter((item) => item.id !== id);

    localStorage.setItem(RECENTKEY, JSON.stringify(updatedStudy));
  } catch (error) {
    console.error("Error deleting recent study:", error);
  }
};

export const validateRecentStudies = async () => {
  try {
    const recentStudy = JSON.parse(localStorage.getItem(RECENTKEY)) || [];
    const validStudyIds = await getStudyItemId();
    // console.log(validStudyIds);
    const filteredStudy = recentStudy.filter((study) =>
      validStudyIds.some((item) => item.id === study.id)
    );

    localStorage.setItem(RECENTKEY, JSON.stringify(filteredStudy));

    // console.log("Recent studies validated!");
  } catch (error) {
    console.error("Error validating recent studies:", error);
  }
};
