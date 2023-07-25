import * as S from "./ticketDetail.style";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { TicketType } from "../centerTicket.index";

const TicketDetail: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  // console.log('ticketDetail page')
  // console.log(id)
  const ticketId = parseInt(id!); // URL의 id를 숫자로 변환합니다.
  const [ticketDetail, setTicketDetail] = useState<TicketType | null>(null);
  const [isMoreVert, setIsMoreVert ] = useState(false)
  
  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await apiInstance.get("/tickets/" + ticketId);
        setTicketDetail(response.data);
        console.log("response.data");
        console.log(response.data);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isNaN(ticketId)) {
      // console.log("integer변환 안됨")
      console.log("fetchTicketDetail실행됨");
      fetchTicketDetail();

      // console.log("ticketDetail");
      // console.log(ticketDetail);
    }
  }, [id, ticketId]);

  if (!ticketDetail) {
    return <p>Loading...</p>;
  }

  const goToPrev = () => {
    navigate("/centerTicketPage");
  };

  const moreVertHandler =() =>{
    setIsMoreVert(true)
  }

  return (
    <div>
      <S.Header>
        <S.OutBox>
          <S.LeftOut onClick={goToPrev} />
          <S.ticketDetailAppbar>수강권 상세</S.ticketDetailAppbar>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={moreVertHandler}
          >
            <path
              d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
              fill="#505050"
            />
            <path
              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              fill="#505050"
            />
            <path
              d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z"
              fill="#505050"
            />
          </svg>
          {isMoreVert && <div className="menu">
            <div className="menu2">
              <div className="text">편집</div>
            </div>

            <div className="menu2">
              <div className="text">판매 종료</div>
            </div>

            <div className="menu2">
              <div className="text">수강권 삭제</div>
            </div>
          </div>}
          
        </S.OutBox>
      </S.Header>
      <S.Wrapper>
        <S.SecondBar>
          <S.TicketTitle>{ticketDetail.title}</S.TicketTitle>
          <S.Label>
            <S.LabelText>개인 수업 - 1:1</S.LabelText>
          </S.Label>
        </S.SecondBar>
        <S.Div>
          <S.Title>수강권 내용</S.Title>
          <S.IssuedBtn>수강권 부여내역</S.IssuedBtn>
        </S.Div>
        <S.Membership>
          <S.Content>
            <S.Info>
              <S.Text1>시간</S.Text1>
              <S.Text2>
                {ticketDetail.bookableLessons.length > 0 &&
                  ticketDetail.bookableLessons[0].duration}
                분
              </S.Text2>
            </S.Info>
            <S.Info>
              <S.Text1>기본 횟수</S.Text1>
              <S.Text2>{ticketDetail.defaultCount}회</S.Text2>
            </S.Info>
            <S.Info>
              <S.Text1>수강권 기간</S.Text1>
              <S.Text2>
                {ticketDetail.defaultTerm} {ticketDetail.defaultTermUnit}
              </S.Text2>
            </S.Info>
            <S.Info>
              <S.Text1>수강권 상태</S.Text1>
              <S.Text2>
                {ticketDetail.isActive ? "판매중" : "판매 중지"}
              </S.Text2>
            </S.Info>
          </S.Content>
        </S.Membership>
      </S.Wrapper>
    </div>
  );
};

export default TicketDetail;
