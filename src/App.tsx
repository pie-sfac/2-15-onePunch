import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./commons/styles/global";
import Calendar from "./pages/schedulePage/calendar";
import ClassWrite from "./pages/schedulePage/classWrite";
import ConsultingWrite from "./pages/schedulePage/consultingWrite";
import Login from "./components/units/login/login.index";
import TemporaryLogin from "./pages/temporaryLoginPage/index";
import LayoutHeader from "./components/commons/layout/header/LayoutHeader.index";
import LayoutFooter from "./components/commons/layout/footer/LayoutFooter.index";
import CenterTicket from "./components/units/tickets/centerTicket/list/centerTicket.index";
import ClassDetailPage from "./pages/schedulePage/classDetail";
import ConsultingDetailPage from "./pages/schedulePage/consultingDetail/index";
import MemberList from "./pages/memberPage/list/index";
import MemberAdd from "./pages/memberPage/add/index";
import TicketDetailPage from "./pages/ticketPage/centerTicket/detail";
import CreateTicketPage from "./pages/ticketPage/centerTicket/create";
import MemberDetailPage from "./pages/memberPage/detail/index";
import Home from "./components/units/home/home.index";
import StaffListPage from "./pages/staffPage/list/index";
import StaffAdd from "./components/units/staff/add/staffAdd.index";
import StaffDetail from "./components/units/staff/detail/staffDetail.index";
import StaffEditPage from "./pages/staffPage/edit";
import StaffRolesPage from "./pages/staffPage/roles";
import MemberEdit from "./pages/memberPage/edit/index";
import ConsultingEdit from "./pages/schedulePage/consultingEdit/index";
import ClassEdit from "./pages/schedulePage/classEdit/index";
import IssuedTicketListPage from "./pages/ticketPage/issuedTicket/list";
import IssuedTicketDetailPage from "./pages/ticketPage/issuedTicket/detail";
import ActiveTicketListPage from "./pages/ticketPage/centerTicket/activeTicket";
import IssuePage from "./pages/ticketPage/issuedTicket/issue";
import TicketEditPage from "./pages/ticketPage/centerTicket/edit";
import IssuedHistoryPage from "./pages/ticketPage/centerTicket/issuedHistory";

const MainLayout = ({ children }: any) => (
  <>
    <LayoutHeader />
    {children}
    <LayoutFooter />
  </>
);

const PlainLayout = ({ children }: any) => <>{children}</>;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PlainLayout>
                <TemporaryLogin />
              </PlainLayout>
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
            path="/schedulePage/class/:scheduleId/edit"
            element={
              <PlainLayout>
                <ClassEdit />
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
            path="/schedulePage/counseling/:scheduleId/edit"
            element={
              <PlainLayout>
                <ConsultingEdit />
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
            path="/memberPage/:memberId/edit"
            element={
              <PlainLayout>
                <MemberEdit />
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
              <PlainLayout>
                <Login />
              </PlainLayout>
            }
          />

          {/* 센터 티켓 */}
          <Route
            path="/centerTicketPage"
            element={
              <MainLayout>
                <CenterTicket />
              </MainLayout>
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
          <Route
            path="/centerTicketPage/:ticketId/edit"
            element={
              <PlainLayout>
                <TicketEditPage />
              </PlainLayout>
            }
          />
          <Route
            path="/centerTicketPage/:ticketId/issuedHistory"
            element={
              <PlainLayout>
                <IssuedHistoryPage />
              </PlainLayout>
            }
          />
          {/* IssuedTicket */}
          <Route
            path="/members/:memberId/issued"
            element={
              <PlainLayout>
                <IssuedTicketListPage />
              </PlainLayout>
            }
          />
          <Route
            path="/issued-tickets/:issuedTicketId"
            element={
              <PlainLayout>
                <IssuedTicketDetailPage />
              </PlainLayout>
            }
          />
          <Route
            path="/:memberId/tickets/ActiveTicketList"
            element={
              <PlainLayout>
                <ActiveTicketListPage />
              </PlainLayout>
            }
          />
          <Route
            path="/:memberId/tickets/:ticketId/issue"
            element={
              <PlainLayout>
                <IssuePage />
              </PlainLayout>
            }
          />

          {/* 직원 관리 */}

          <Route
            path="/staffPage/list"
            element={
              <MainLayout>
                <StaffListPage />
              </MainLayout>
            }
          />
          <Route
            path="/staffPage/add"
            element={
              <PlainLayout>
                <StaffAdd />
              </PlainLayout>
            }
          />
          <Route
            path="/staffPage/detail/:id"
            element={
              <PlainLayout>
                <StaffDetail />
              </PlainLayout>
            }
          />
          <Route
            path="/staffPage/detail/:id/edit"
            element={
              <PlainLayout>
                <StaffEditPage />
              </PlainLayout>
            }
          />
          <Route
            path="/staffPage/roles/:id"
            element={
              <PlainLayout>
                <StaffRolesPage />
              </PlainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
