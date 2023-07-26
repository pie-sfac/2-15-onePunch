import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./commons/styles/global";
import Calendar from "./pages/schedulePage/calendar";
import ClassWrite from "./pages/schedulePage/classWrite";
import ConsultingWrite from "./pages/schedulePage/consultingWrite";
// import Tickets from "./components/units/tickets/centerTicket/test__centerTicket.index";
import Login from "./components/units/login/login.index";
import TemporaryLogin from "./pages/temporaryLoginPage/index";

import LayoutHeader from "./components/commons/layout/header/LayoutHeader.index";
import LayoutFooter from "./components/commons/layout/footer/LayoutFooter.index";
import CenterTicket from "./components/units/tickets/centerTicket/centerTicket.index";
import ClassDetailPage from "./pages/schedulePage/classDetail";
import ConsultingDetailPage from "./pages/schedulePage/consultingDetail/index";
import MemberList from "./pages/memberPage/list/index";
import MemberAdd from "./pages/memberPage/add/index";
import TicketDetailPage from "./pages/ticketPage/centerTicket/ticketDetail";
import CreateTicketPage from "./pages/ticketPage/centerTicket/createTicket";
import MemberDetailPage from "./pages/memberPage/detail/index";
import Home from "./components/units/home/home.index";



const MainLayout = ({ children }) => (
  <>
    <LayoutHeader />
    {children}
    <LayoutFooter />
  </>
);

const PlainLayout = ({ children }) => <>{children}</>;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/TemporaryLogin"
            element={
              <MainLayout>
                <TemporaryLogin />
              </MainLayout>
            }
          />
          <Route
            path="/Home"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/schedulePage/calendar"
            element={
              <MainLayout>
                <Calendar />
              </MainLayout>
            }
          />
          <Route
            path="/schedulePage/classWrite"
            element={
              <PlainLayout>
                <ClassWrite />
              </PlainLayout>
            }
          />

          <Route
            path="/schedulePage/classDetail/:scheduleId"
            element={
              <PlainLayout>
                <ClassDetailPage />
              </PlainLayout>
            }
          />
          <Route
            path="/schedulePage/consultingWrite"
            element={
              <PlainLayout>
                <ConsultingWrite />
              </PlainLayout>
            }
          />
          <Route
            path="/schedulePage/consultingDetail/:scheduleId"
            element={
              <PlainLayout>
                <ConsultingDetailPage />
              </PlainLayout>
            }
          />

          <Route
            path="/memberPage/list"
            element={
              <MainLayout>
                <MemberList />
              </MainLayout>
            }
          />

          <Route
            path="/memberPage/add"
            element={
              <PlainLayout>
                <MemberAdd />
              </PlainLayout>
            }
          />

          <Route
            path="/memberPage/memberDetail/:memberId"
            element={
              <PlainLayout>
                <MemberDetailPage />
              </PlainLayout>
            }
          />

          <Route
            path="/LoginPage"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />

          {/* 센터 티켓 */}
          <Route
            path="/centerTicketPage"
            element={
              <PlainLayout>
                <CenterTicket />
              </PlainLayout>
            }
          />
          <Route
            path="/centerTicketPage/createTicket"
            element={<CreateTicketPage />}
          />
          <Route
            path="/centerTicketPage/ticketDetail/:id"
            element={<TicketDetailPage />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
