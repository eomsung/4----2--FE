const BASE_URL = "http://localhost:3100";

export const getStudyItem = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
  });
  return res.json();
};
