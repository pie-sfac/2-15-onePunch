import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Link, useNavigate } from "react-router-dom";
// import "./centerTicket.style.css";
import * as S from "./centerTicket.style";
import { Tabs, TabsProps } from "antd";
import ConvertTermUnit from "../../../commons/converter/convertTermUnit";

//
interface BookableLesson {
  id: number;
  type: string;
  title: string;
  duration: number;
  maxGroupMember: number;
}

//
export interface TicketType {
  id: number;
  title: string;
  lessonType: string;
  defaultCount: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isActive: boolean;
  maxServiceCount: number;
  issuedTicketCount: number;
  bookableLessons: BookableLesson[];
}

//
interface TicketProps {
  ticket: TicketType;
  onClick: () => void;
}

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
  // Ticket 컴포넌트
  ///////////////////////////////////////
  const Ticket: React.FC<TicketProps> = ({ ticket, onClick }) => (
    <S.Membership onClick={onClick}>
      <S.Contents>
        <S.Content>
          <S.Title>{ticket.title}</S.Title>
          <S.Info>
            <S.Text1>부여</S.Text1>
            <S.Text2>{ticket.issuedTicketCount}건</S.Text2>
          </S.Info>
        </S.Content>
        <S.Content>
          <S.Info>
            <S.Text1>수강권 횟수</S.Text1>
            <S.Text2>
              {ticket.defaultCount !== null
                ? `${ticket.defaultCount}회`
                : "무제한"}
            </S.Text2>
          </S.Info>
          <S.Info>
            <S.Text1>수업 시간</S.Text1>
            <S.Text2>
              {ticket.bookableLessons.length > 0 &&
                ticket.bookableLessons[0].duration}
              분
            </S.Text2>
          </S.Info>
          <S.Info>
            <S.Text1>수강권 기간</S.Text1>
            <S.Text2>
              {ticket.defaultTerm !== null
                ? `${ticket.defaultTerm}${ConvertTermUnit(
                    ticket.defaultTermUnit
                  )}`
                : "소진시 까지"}
            </S.Text2>
          </S.Info>
        </S.Content>
      </S.Contents>

      <S.Contents>
        <S.Label2>
          <S.Text8>개인 수업 - 1:1</S.Text8>
        </S.Label2>

        <S.TicketImg src="/images/icons/Tiket_ac.png" alt="Tiket_ac" />
      </S.Contents>
    </S.Membership>
  );

  ///////////////////////////////////////
  // 탭 컨텐츠 설정 파트
  ///////////////////////////////////////
  // isActive 값에 따라 티켓 분류
  const activeTickets = tickets.filter((ticket) => ticket.isActive);
  const inactiveTickets = tickets.filter((ticket) => !ticket.isActive);

  // 탭 컨텐츠 렌더링
  const renderTickets = (ticketsArray: TicketType[]) => (
    <S.TicketList>
      {ticketsArray.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          onClick={() => ticketDetailHandler(ticket.id)}
        />
      ))}
    </S.TicketList>
  );

  // items에 두 개의 탭 정의
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `판매중(${activeTickets.length})`,
      children: renderTickets(activeTickets),
    },
    {
      key: "2",
      label: `판매 종료 (${inactiveTickets.length})`,
      children: renderTickets(inactiveTickets),
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
        <Tabs style={{marginLeft: "10px"}} defaultActiveKey="1" items={items} />
      </S.Wrapper>
    </>
  );
};

export default CenterTicket;
