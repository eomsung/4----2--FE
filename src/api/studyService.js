const BASE_URL = "http://localhost:3100";

export const getStudyListItem = async ({
  page = 1,
  pageSize = 3,
  orderBy = "recent",
  keyword = "",
}) => {
  try {
    if (!Number.isInteger(page) || page < 1) {
      throw new Error("Invalid page");
    }
    if (!Number.isInteger(pageSize) || pageSize < 1) {
      throw new Error("Invalid pageSize");
    }
    const res = await fetch(
      `${BASE_URL}/study?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }

    return res.json();
  } catch (e) {
    console.log(e.message);
    return { list: [], totalCount: 0 };
  }
};

export const getStudyItem = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/study/${id}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
      // 원래 페이지로 돌아가게?
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
};
