import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Link, useNavigate } from "react-router-dom";
// import "./centerTicket.style.css";
import * as S from "./centerTicket.style";
import { Tabs, TabsProps } from "antd";

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

//////////////////////////////////
// 수강권 생성하기
//////////////////////////////////
const CenterTicket: React.FC = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  const navigate = useNavigate();

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

  // const Ticket: React.FC<{ ticket: TicketType }> = ({ ticket }) => (
  const Ticket: React.FC<TicketProps> = ({ ticket, onClick }) => (
    <S.Membership onClick={onClick}>
      <S.Contents>
        <S.Content>
          <S.Title>{ticket.title}</S.Title>
          <S.Info>
            <S.Text1>부여</S.Text1>
            <S.Text2>nn건</S.Text2>
          </S.Info>
        </S.Content>
        <S.Content>
          <S.Info>
            <S.Text1>수강권 횟수</S.Text1>
            <S.Text2>{ticket.defaultCount}회</S.Text2>
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
              {ticket.defaultTerm}
              {ticket.defaultTermUnit}
            </S.Text2>
          </S.Info>
        </S.Content>
      </S.Contents>

      <S.Contents>
        <S.Label2>
          <S.Text8>개인 수업 - 1:1</S.Text8>
        </S.Label2>

        <S.TicketImg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#EBF1FF" />
          <path
            d="M32 18V14C32 12.9 31.1 12 30 12H10C8.9 12 8.01 12.9 8.01 14V18C9.11 18 10 18.9 10 20C10 21.1 9.11 22 8 22V26C8 27.1 8.9 28 10 28H30C31.1 28 32 27.1 32 26V22C30.9 22 30 21.1 30 20C30 18.9 30.9 18 32 18ZM30 16.54C28.81 17.23 28 18.53 28 20C28 21.47 28.81 22.77 30 23.46V26H10V23.46C11.19 22.77 12 21.47 12 20C12 18.52 11.2 17.23 10.01 16.54L10 14H30V16.54Z"
            fill="#BFD1FF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.8672 15.8789L25.2812 17.293L21.0391 21.5352L19.625 22.9492L18.2109 21.5352L16.0859 19.4141L17.5 18L19.625 20.1211L23.8672 15.8789Z"
            fill="#BFD1FF"
          />
        </S.TicketImg>
      </S.Contents>
    </S.Membership>
  );

  // const items: TabsProps["items"] = [
  //   {
  //     key: "1",
  //     label: `Tab 1`,
  //     children: `Content of Tab Pane 1`,
  //   },
  //   {
  //     key: "2",
  //     label: `Tab 2`,
  //     children: `Content of Tab Pane 2`,
  //   },
  //   {
  //     key: "3",
  //     label: `Tab 3`,
  //     children: `Content of Tab Pane 3`,
  //   },
  // ];
  return (
    <>
      <S.Wrapper>
        <S.Ticketheader>
          <S.CenterTitle>센터 수강권</S.CenterTitle>
          <Link to="/centerTicketPage/createTicket">
            <S.Button>+ 수강권 추가</S.Button>
          </Link>
        </S.Ticketheader>
        {/*  */}
        {/* <Tabs defaultActiveKey="1" items={items} /> */}
        {/*  */}
        <S.Tab>
          <S.Text>
            <S.SellState>판매중(3)</S.SellState>
          </S.Text>
          <S.Text2>
            <S.SellState>판매 종료 (2)</S.SellState>
          </S.Text2>
        </S.Tab>
        {/* 티켓리스트 */}
        <S.TicketList>
          {tickets &&
            tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                onClick={() => ticketDetailHandler(ticket.id)}
              />
            ))}
        </S.TicketList>
      </S.Wrapper>
    </>
  );
};

export default CenterTicket;
