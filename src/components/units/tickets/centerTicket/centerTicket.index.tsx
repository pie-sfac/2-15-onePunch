import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Link } from "react-router-dom";
import "./centerTicket.style.css";



//
interface BookableLesson {
  id: number;
  type: string;
  title: string;
  duration: number;
  maxGroupMember: number;
}

//
interface TicketType {
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

  const Ticket: React.FC<{ ticket: TicketType }> = ({ ticket }) => (
    <div className="membership2">
      <div className="contents">
        <div className="content">
          <div className="text3">{ticket.title}</div>
          <div className="text4">
            <div className="text7">부여</div>
            <span className="text6">nn건</span>
          </div>
        </div>
        <div className="content2">
          <div className="text4">
            <div className="text7">수강권 횟수</div>
            <div className="text6">{ticket.defaultCount}회</div>
          </div>
          <div className="text4">
            <div className="text7">수업 시간</div>
            <div className="text6">{ticket.bookableLessons.length > 0 && ticket.bookableLessons[0].duration}분</div>
          </div>
          <div className="text4">
            <div className="text7">수강권 기간</div>
            <div className="text6">
              {ticket.defaultTerm}
              {ticket.defaultTermUnit} 
            </div>
          </div>
        </div>
      </div>

      <div className="contents">
        <div className="label2">
          <div className="text8">개인 수업 - 1:1</div>
        </div>

        <svg
          className="tiket-ac"
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.8672 15.8789L25.2812 17.293L21.0391 21.5352L19.625 22.9492L18.2109 21.5352L16.0859 19.4141L17.5 18L19.625 20.1211L23.8672 15.8789Z"
            fill="#BFD1FF"
          />
        </svg>
      </div>
      {/* <div> */}
      {/* <p>id: {ticket.id}</p> */}
      {/* <p>title: {ticket.title}</p> */}
      {/* <p>lessonType: {ticket.lessonType}</p> */}
      {/* <p>defaultCount: {ticket.defaultCount}</p> */}
      {/* <p>defaultTerm: {ticket.defaultTerm}</p> */}
      {/* <p>defaultTermUnit: {ticket.defaultTermUnit}</p> */}
      {/* <p>isActive: {ticket.isActive && "true"}</p> */}
      {/* <p>maxServiceCount: {ticket.maxServiceCount}</p> */}
      {/* <p>issuedTicketCount: {ticket.issuedTicketCount}</p> */}
      {/* </div> */}
      </div>

    // ///////////////
  );

  return (
    <>
      {/* <NavBar /> */}
      <div>
        <div className="ticketheader">
          <p className="center_title">센터 수강권</p>
            <Link to="/centerTicketPage/createTicket">
              <button className="button" >+ 수강권 추가</button>
            </Link>
        </div>
        <div className="tab">
          <div className="text">
            <div className="_00">판매중(3)</div>
          </div>

          <div className="text2">
            <div className="_002">판매 종료 (2)</div>
          </div>
        </div>
        {/* 티켓리스트 */}
        <div className="parent">
          {tickets &&
            tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)}
        </div>
      </div>
    </>
  );
};

export default CenterTicket;
