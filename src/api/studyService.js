const BASE_URL = "http://localhost:3100";

export const getStudyItem = async ({
  page = 1,
  pageSize = 3,
  orderBy = "recent",
  keyword = "",
}) => {
  const res = await fetch(
    `${BASE_URL}/study?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
