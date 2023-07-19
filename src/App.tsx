import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/CalendarPage" element={<CalendarPage />} />
          {/* <Route path="/detail" element={<ZipDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/bookmark" element={<Bookmark />} />
          <Route path="/sidebar" element={<SidebarTest />} />
          <Route path="/viewreview" element={<ViewReview />} />
          <Route path="/newreview" element={<NewReview />} /> */}
          <Route path="/LoginPage"  element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
