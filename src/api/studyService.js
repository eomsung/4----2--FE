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
    // 커서 기반으로 디벨롭
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

export const createStudyGroup = async (studyGroupData) => {
  try {
    const response = await fetch(`${BASE_URL}/study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studyGroupData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating study group:", error.message);
    throw error;
  }
};

export const getTodoList = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/study/${id}/todo`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const createTodoList = async (id, text) => {
  try {
    const response = await fetch(`${BASE_URL}/study/${id}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error creating study group:", e.message);
    throw e;
  }
};

export const createManyTodoList = async (id, todos) => {
  try {
    const response = await fetch(`${BASE_URL}/study/${id}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error creating study group:", e.message);
    throw e;
  }
};

export const deleteTodoList = async (studyId, todoId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/study/${studyId}/todo/${todoId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error delete study group:", e.message);
    throw e;
  }
};

export const deleteManyTodoList = async (studyId) => {
  try {
    const response = await fetch(`${BASE_URL}/study/${studyId}/todo`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error delete study group:", e.message);
    throw e;
  }
};

export const patchTodoList = async (studyId, todoId, dayIndex, done) => {
  try {
    const response = await fetch(
      `${BASE_URL}/study/${studyId}/todo/${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dayIndex: dayIndex, done: done }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error patching study group:", e.message);
    throw e;
  }
};

// studyService.js

export const patchStudyPoint = async (studyGroupId, newPoint) => {
  try {
    const response = await fetch(`${BASE_URL}/study/${studyGroupId}/point`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ point: newPoint }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // 성공적으로 포인트가 업데이트된 데이터를 반환
  } catch (error) {
    console.error("Error updating study point:", error.message);
    throw error;
  }
};

export const createEmoticon = async (id, emoticonData) => {
  try {
    const response = await fetch(`${BASE_URL}/study/${id}/emoticon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emoticon: emoticonData }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating study group:", error.message);
    throw error;
  }
};
