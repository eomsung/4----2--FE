import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudyCreatePage } from "./page/StudyCreatePage";
import { StudyListPage } from "./page/StudyListPage";
import { StudyPage } from "./page/StudyPage";
import { TodayFocusPage } from "./page/TodayFocusPage";
// import { TodayFocusPage } from "./page/TodayFocusPage";
import TodoPage from "./page/TodoPage"; // default export 확인 후 수정
import Header from "./component/Header";
import { StudyEditPage } from "./page/StudyEditPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StudyListPage />} />
        <Route path="study">
          <Route path=":id" element={<StudyPage />}></Route>
          <Route path=":id/edit" element={<StudyEditPage />} />
          <Route path=":id/todo" element={<TodoPage />} />
          <Route path=":id/focus" element={<TodayFocusPage />} />
        </Route>
        <Route path="/studyCreate" element={<StudyCreatePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
