import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./commons/styles/global";
import Calendar from "./pages/ schedulePage/calendar";
import ClassWrite from "./pages/ schedulePage/classWrite";
import ConsultingWrite from "./pages/ schedulePage/consultingWrite";

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/schedulePage/calendar" element={<Calendar />} />
            <Route path="/schedulePage/classWrite" element={<ClassWrite />} />
            <Route
              path="/schedulePage/consultingWrite"
              element={<ConsultingWrite />}
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
export default App;
