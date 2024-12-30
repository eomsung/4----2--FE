const RECENTKEY = "recentKey";
const MAXNUM = 3;
export const saveRecentStudy = (study) => {
  try {
    const storedStudy = JSON.parse(localStorage.getItem(RECENTKEY)) || [];
    let newStudy = storedStudy.filter((item) => item.id !== study.id);

    newStudy.unshift(study); // 최신순으로 배치치

    if (newStudy.length > MAXNUM) {
      newStudy = newStudy.slice(0, MAXNUM);
    }

    localStorage.setItem(RECENTKEY, JSON.stringify(newStudy));
  } catch (error) {
    console.error("recent store is failed:", error);
  }
};

export const getRecentStudies = () => {
  return JSON.parse(localStorage.getItem(RECENTKEY)) || [];
};
