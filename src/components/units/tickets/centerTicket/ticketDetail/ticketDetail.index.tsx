import * as S from "./ticketDetail.style";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { TicketType } from "../centerTicket.index";
import ModalConfirm from "../../../../commons/modal/modalAlert/modalConfirm.index";

const TicketDetail: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const ticketId = parseInt(id!); // URL의 id를 숫자로 변환합니다.
  const [ticketDetail, setTicketDetail] = useState<TicketType | null>(null);
  const [isMoreVert, setIsMoreVert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 티켓 상세 정보 가져옴
  const fetchTicketDetail = useCallback(async () => {
    try {
      const response = await apiInstance.get("/tickets/" + ticketId);
      setTicketDetail(response.data);
      console.log("response.data");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [ticketId]);

  useEffect(() => {
    if (!isNaN(ticketId)) {
      console.log("fetchTicketDetail실행됨");
      fetchTicketDetail();
      // console.log("ticketDetail");
      // console.log(ticketDetail);
    }
  }, [id, ticketId, fetchTicketDetail]);
  if (!ticketDetail) {
    return <p>Loading...</p>;
  }

  const goToPrev = () => {
    navigate("/centerTicketPage");
  };

  // 그 메뉴 관리...
  const moreVertHandler = () => {
    setIsMoreVert(!isMoreVert);
  };

  // 수강권 판매 중지
  const handleConfirm = async () => {
    // alert("확인버튼");
    try {
      await apiInstance.post("/tickets/" + ticketId + "/deactivate");
      fetchTicketDetail();
    } catch (error) {
      console.error(error);
    }
    console.log("판매중지됐나");
    console.log(ticketDetail.isActive);
    setShowModal(false); // 확인버튼 클릭 시 모달을 숨기게 설정
  };

  const handleCancel = () => {
    // alert("취소되었습니다.");
    setShowModal(false); // 취소버튼 클릭 시 모달을 숨기게 설정
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    console.log("수강권 삭제합니다");

    try {
      await apiInstance.delete("/tickets/" + ticketId);
      navigate("/centerTicketPage")
    } catch (error) {
      console.error(error);
    }
    console.log("수강권 삭제됐음");
    alert("삭제되었습니다");
    setShowDeleteModal(false);
  };
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
          {isMoreVert && (
            <div className="menu">
              <div className="menu2">
                <div className="text">편집</div>
              </div>

              <div className="menu2">
                <button className="text" onClick={() => setShowModal(true)}>
                  판매 종료
                </button>
              </div>

              <div className="menu2">
                <button
                  className="text"
                  onClick={() => setShowDeleteModal(true)}
                >
                  수강권 삭제
                </button>
              </div>
            </div>
          )}
        </S.OutBox>
      </S.Header>
      <S.Wrapper>
        {showModal && (
          <ModalConfirm
            title="수강권 판매 종료"
            message="해당 수강권을 판매 종료하시겠습니까? 새로운 회원에게 부여할 수 없습니다."
            confirmText="확인"
            cancelText="취소"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        {showDeleteModal && (
          <ModalConfirm
            title="수강권 삭제"
            message="수강권을 삭제하시겠습니까?"
            confirmText="확인"
            cancelText="취소"
            onConfirm={handleDelete}
            onCancel={handleCancel}
          />
        )}
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
                {ticketDetail &&
                  ticketDetail.bookableLessons &&
                  ticketDetail.bookableLessons.length > 0 &&
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
                {ticketDetail.isActive ? (
                  "판매중"
                ) : (
                  <span style={{ color: "red" }}>판매 종료</span>
                )}
              </S.Text2>
            </S.Info>
          </S.Content>
        </S.Membership>
      </S.Wrapper>
    </div>
  );
};

export default TicketDetail;
