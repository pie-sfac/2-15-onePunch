import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RecoilRoot } from "recoil";
import GlobalStyles from "./commons/styles/global";
import Calendar from "./pages/schedulePage/calendar";
import ClassWrite from "./pages/schedulePage/classWrite";
import ConsultingWrite from "./pages/schedulePage/consultingWrite";
// import Tickets from "./components/units/tickets/centerTicket/test__centerTicket.index";
import Login from "./components/units/login/login.index";
import TemporaryLogin from "./pages/temporaryLoginPage/index";
import CreateTicket from "./components/units/tickets/centerTicket/createTicket";
import CenterTicket from "./components/units/tickets/centerTicket/centerTicket.index";

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/TemporaryLogin" element={<TemporaryLogin />} />
            <Route path="/schedulePage/calendar" element={<Calendar />} />
            <Route path="/schedulePage/classWrite" element={<ClassWrite />} />
            <Route
              path="/schedulePage/consultingWrite"
              element={<ConsultingWrite />}
            />
            <Route path="/LoginPage"  element={<Login />} />

            {/* 센터 티켓 */}
            <Route path="/centerTicketPage" element={<CenterTicket />} />
            <Route path="/centerTicketPage/createTicket" element={<CreateTicket />} />
            
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
export default App;
