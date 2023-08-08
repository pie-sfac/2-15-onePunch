import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import * as S from "./issuedTicketList.style";
import { Tabs } from "antd";
import { TabsProps } from "antd";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";
import ConvertDate from "../../../../commons/converter/convertDate";
import ModalConfirm from "../../../../commons/modal/modalConfirm/modalConfirm.index";

export interface IssuedTicket {
  availableReservationCount: number;
  canceledAt: string;
  createdAt: string;
  defaultCount: 20;
  defaultTerm: 20;
  defaultTermUnit: "DAY" | "WEEK" | "MONTH" | "YEAR";
  endAt: string;
  id: number;
  isCanceled: boolean;
  isSuspended: boolean;
  lessonType: "SINGLE" | "DUET" | "TRIPLE" | "GROUP";
  remainingCount: number;
  serviceCount: number;
  startAt: string;
  suspendedAt: string;
  title: String;
  updatedAt: string;
  privateTutor: PrivateTutor;
}

export interface PrivateTutor {
  createdAt: string;
  id: number;
  isActive: boolean;
  lastLoginedAt: string;
  loginId: string;
  name: string;
  phone: string;
  type: "STAFF" | "ADMIN";
  updatedAt: string;
}

const IssuedTicketList = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const [issuedTickets, setIssuedTickets] = useState<IssuedTicket[]>([]);
  // 탭 나누기 위한 이용중/종료됨 수강권
  const activeTickets = issuedTickets.filter((ticket) => !ticket.isCanceled);
  const inactiveTickets = issuedTickets.filter((ticket) => ticket.isCanceled);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showUnsuspendModal, setShowUnsuspendModal] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(Number);

  // issued tickets list 가져오기
  useEffect(() => {
    apiInstance
      .get(`/members/${memberId}/issued-tickets`)
      .then((response) => {
        console.log(response.data.issuedTickets);
        setIssuedTickets(response.data.issuedTickets);
      })
      .catch((error) => {
        console.log(error); 
      });
  }, [showSuspendModal, showUnsuspendModal, showCancelModal]);

  // issuedTicketInfo가 변경될 때마다 콘솔에 찍어보기
  // useEffect(() => {
  //   console.log("issuedTicketInfo", issuedTickets);
  // }, [issuedTickets]);

  // 수강권 일시 중단
  const handleSuspend = (issuedTicketId: number) => {
    // console.log("handleSuspension");
    console.log(issuedTicketId);

    apiInstance
      .post(`/issued-tickets/${issuedTicketId}/suspend`, issuedTicketId)
      .then((response) => {
        console.log(response.data);
        setIsSuspended(true);
        setShowSuspendModal(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // 수강권 재진행
  const handleUnsuspend = (issuedTicketId: number) => {
    console.log(issuedTicketId);

    apiInstance
      .post(`/issued-tickets/${issuedTicketId}/unsuspend`, issuedTicketId)
      .then((response) => {
        console.log(response.data);
        setIsSuspended(false);
        setShowUnsuspendModal(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // 수강권 환불
  const handleCancel = (issuedTicketId: any) => {
    console.log(issuedTicketId);

    apiInstance
      .post(`/issued-tickets/${issuedTicketId}/refund`, issuedTicketId)
      .then((response) => {
        console.log(response.data);
        setIsCanceled(true);
        setShowCancelModal(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // 수강권 양도
  const handleTransfer = () => {
    console.log("handleTransfer");
  };

  const handleIssuedTicketDetail = (issuedTicketId: any) => {
    // console.log(issuedTicketId.target.key);
    navigate(`/issued-tickets/${issuedTicketId}`);
  };

  // 탭 컨텐츠 렌더링
  const renderTickets = (ticketsArray: IssuedTicket[]) => (
    <>
      {ticketsArray.map((ticket) => (
        <S.TicketBox key={ticket.id} isCanceled={!!ticket.canceledAt}>
          <S.Ticket_Info onClick={() => handleIssuedTicketDetail(ticket.id)}>
            <S.Ticket_Info_Top>
              <div>
                <S.Ticket_Title
                  isSuspended={!!ticket.suspendedAt}
                  isCanceled={!!ticket.canceledAt}
                >
                  {ticket.title}
                </S.Ticket_Title>
                <S.Ticket_LessonType
                  isSuspended={!!ticket.suspendedAt}
                  isCanceled={!!ticket.canceledAt}
                >
                  {ConvertLessonType(ticket.lessonType)}
                </S.Ticket_LessonType>
                {ticket.suspendedAt ? (
                  <>
                    <span style={{ color: "red" }}>
                      {ConvertDate(ticket.suspendedAt)} 일시중단
                    </span>
                  </>
                ) : (
                  ticket.canceledAt && (
                    <>
                      <span style={{ color: "#AEAEAE" }}>
                        {ConvertDate(ticket.canceledAt)} 환불
                      </span>
                    </>
                  )
                )}
              </div>
              <S.Ticket_IconWrapper>
                {ticket.suspendedAt ? (
                  <>
                    <S.Ticket_Icon
                      src="/images/icons/Tiket_in.png"
                      alt="Tiket_in"
                    />
                  </>
                ) : ticket.canceledAt ? (
                  <>
                    <S.Ticket_Icon
                      src="/images/icons/Tiket_dis.png"
                      alt="Tiket_ac"
                    />
                  </>
                ) : (
                  <>
                    <S.Ticket_Icon
                      src="/images/icons/Tiket_ac.png"
                      alt="Tiket_ac"
                    />
                  </>
                )}
              </S.Ticket_IconWrapper>
            </S.Ticket_Info_Top>
            <S.Ticket_Info_Bottom
              isSuspended={!!ticket.suspendedAt}
              isCanceled={!!ticket.canceledAt}
            >
              <S.Ticket_Count>
                <S.greyText>잔여 횟수</S.greyText>
                {ticket.availableReservationCount ? (
                  <>{ticket.availableReservationCount}회</>
                ) : (
                  "무제한"
                )}
              </S.Ticket_Count>
              <S.Ticket_Term>
                <S.greyText>유효 기간</S.greyText>
                {ConvertDate(ticket.startAt)} - {ConvertDate(ticket.endAt)}
              </S.Ticket_Term>
            </S.Ticket_Info_Bottom>
          </S.Ticket_Info>

          <S.TicketMenu
            isSuspended={!!ticket.suspendedAt}
            isCanceled={!!ticket.canceledAt}
          >
            {ticket.suspendedAt ? (
              <>
                <S.Suspension
                  disabled={!!ticket.canceledAt}
                  onClick={() => {
                    setSelectedTicketId(ticket.id);
                    setShowUnsuspendModal(true);
                  }}
                >
                  수강권 재진행
                </S.Suspension>
              </>
            ) : (
              <>
                <S.Suspension
                  disabled={!!ticket.suspendedAt || !!ticket.canceledAt}
                  onClick={() => {
                    setSelectedTicketId(ticket.id);
                    setShowSuspendModal(true);
                  }}
                >
                  수강권 일시중단
                </S.Suspension>
              </>
            )}
            <S.Transfer onClick={handleTransfer}>수강권 양도</S.Transfer>
            <S.Refund
              disabled={!!ticket.canceledAt}
              onClick={() => {
                setSelectedTicketId(ticket.id);
                setShowCancelModal(true);
              }}
            >
              환불
            </S.Refund>
          </S.TicketMenu>
        </S.TicketBox>
      ))}
    </>
  );

  // items에 두 개의 탭 정의
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `이용중(${activeTickets.length})`,
      children: renderTickets(activeTickets),
    },
    {
      key: "2",
      label: `종료됨(${inactiveTickets.length})`,
      children: renderTickets(inactiveTickets),
    },
  ];

  const handleShowActiveTicketList = () => {
    navigate(`/${memberId}/tickets/ActiveTicketList`);
  };

  return (
    <>
      {!showSuspendModal && !showUnsuspendModal && !showCancelModal && (
        <>
          <S.IssuedTicketHeader>
            <S.Appbar>
              <S.FlexRow>
                <S.LeftOut
                  onClick={() =>
                    navigate(`/memberPage/memberDetail/${memberId}`)
                  }
                />
                <S.AppbarTitle>수강권</S.AppbarTitle>
              </S.FlexRow>
              <S.Issue onClick={handleShowActiveTicketList}>부여하기</S.Issue>
            </S.Appbar>
          </S.IssuedTicketHeader>
          <S.Body>
            <S.Title>수강권</S.Title>
            <Tabs
              style={{ marginLeft: "10px" }}
              defaultActiveKey="1"
              items={items}
            />
          </S.Body>
        </>
      )}

      {showSuspendModal && (
        <ModalConfirm
          title="수강권 일시 중단"
          message="해당 수강권을 일시 중단하시겠습니까?
          기존 예약이 취소되고,
          신규 예약이 제한됩니다."
          confirmText="예, 일시 중단"
          cancelText="아니요"
          onConfirm={() => {
            handleSuspend(selectedTicketId);
          }}
          onCancel={() => setShowSuspendModal(false)}
        />
      )}
      {showUnsuspendModal && (
        <ModalConfirm
          title="수강권 재진행"
          message="해당 수강권을 재진행하시겠습니까?
          일시 중단이 해제됩니다."
          confirmText="예, 재진행"
          cancelText="아니요"
          onConfirm={() => handleUnsuspend(selectedTicketId)}
          onCancel={() => setShowUnsuspendModal(false)}
        />
      )}
      {showCancelModal && (
        <ModalConfirm
          title="수강권 환불"
          message="해당 수강권을 환불하시겠습니까? 기존의 일정이 취소되고, 
          해당 수강권이 종료 처리 됩니다."
          confirmText="환불하기"
          cancelText="아니요"
          onConfirm={() => handleCancel(selectedTicketId)}
          onCancel={() => setShowCancelModal(false)}
        />
      )}
    </>
  );
};

export default IssuedTicketList;
