import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudyCreatePage } from "./page/StudyCreatePage";
import { StudyListPage } from "./page/StudyListPage";
import { StudyPage } from "./page/StudyPage";
import { TodayFocusPage } from "./page/TodayFocusPage";
import { TodayHabitPage } from "./page/TodayHabitPage";
import TodoTemplate from "./page2/TodoTemplates"; // default export 확인 후 수정

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyListPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/:id" element={<StudyPage />} />
        <Route path="/create" element={<StudyCreatePage />}></Route>
        <Route path="/todo" element={<TodoTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
