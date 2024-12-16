import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudyCreatePage } from "./page/StudyCreatePage";
import { StudyListPage } from "./page/StudyListPage";
import { StudyPage } from "./page/StudyPage";
import { TodayFocusPage } from "./page/TodayFocusPage";
import { TodayHabitPage } from "./page/TodayHabitPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyListPage />} />
        <Route path="/study/:id" element={<StudyPage />} />
        <Route path="/create" element={<StudyCreatePage />}>
          <Route path="focus" element={<TodayFocusPage />} />
          <Route path="habit" element={<TodayHabitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
