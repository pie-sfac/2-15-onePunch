import { useEffect, useState } from "react";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./centerTicket.style";
import { Tabs, TabsProps } from "antd";
import Ticket, { TicketType } from "../Ticket/Ticket";
import RenderTickets from "../renderTickets/renderTickets";

//////////////////////////////////
// 로그인 후 수강권 목록 가져오기
//////////////////////////////////
const getTickets = async (): Promise<TicketType[]> => {
  try {
    const response = await apiInstance.get("/tickets");
    const tickets: TicketType[] = response.data.tickets; // 수정된 부분
    console.log(tickets);
    return tickets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const CenterTicket: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  // 티켓 상세보기
  const ticketDetailHandler = async (id: number): Promise<any> => {
    console.log("id: ", id);
    try {
      // const response = await apiInstance.get("/tickets/" + id);
      // const ticketDetail = response.data;
      // console.log(ticketDetail);
      navigate(`/centerTicketPage/ticketDetail/${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  ///////////////////////////////////////
  // 탭 컨텐츠 설정 파트
  ///////////////////////////////////////
  // isActive 값에 따라 티켓 분류
  const activeTickets = tickets.filter((ticket) => ticket.isActive);
  const inactiveTickets = tickets.filter((ticket) => !ticket.isActive);

  // items에 두 개의 탭 정의
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `판매중(${activeTickets.length})`,
      children: (
        <RenderTickets
          ticketsArray={activeTickets}
          onTicketClick={ticketDetailHandler}
        />
      ),
    },
    {
      key: "2",
      label: `판매 종료 (${inactiveTickets.length})`,
      children: (
        <RenderTickets
          ticketsArray={inactiveTickets}
          onTicketClick={ticketDetailHandler}
        />
      ),
    },
  ];

  return (
    <>
      <S.Wrapper>
        <S.Ticketheader>
          <S.CenterTitle>센터 수강권</S.CenterTitle>
          <Link to="/centerTicketPage/createTicket">
            <S.Button>+ 수강권 추가</S.Button>
          </Link>
        </S.Ticketheader>
        <Tabs
          style={{ marginLeft: "10px" }}
          defaultActiveKey="1"
          items={items}
        />
      </S.Wrapper>
    </>
  );
};

export default CenterTicket;
