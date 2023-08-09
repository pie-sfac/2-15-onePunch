import * as S from "./ticketDetail.style";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { TicketType } from "../Ticket/Ticket";
import ModalConfirm from "../../../../commons/modal/modalConfirm/modalConfirm.index";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, MenuProps, Space } from "antd";
import ConvertTermUnit from "../../../../commons/converter/convertTermUnit";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";

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
      navigate("/centerTicketPage");
    } catch (error) {
      console.error(error);
    }
    console.log("수강권 삭제됐음");
    alert("삭제되었습니다");
    setShowDeleteModal(false);
  };

  // more 메뉴 관리
  const moreVertHandler = () => {
    setIsMoreVert(!isMoreVert);
  };

  const items: MenuProps["items"] = [
    {
      label: "편집",
      key: "0",
      onClick: () => {
        console.log("편집");
      },
    },
    {
      label: "판매 종료",
      key: "1",
      onClick: () => {
        setShowModal(true);
      },
    },

    {
      label: "수강권 삭제",
      key: "3",
      onClick: () => {
        setShowDeleteModal(true);
      },
    },
  ];

  return (
    <>
      <div style={{ display: showDeleteModal || showModal ? "none" : "block" }}>
        <S.TicketDetailHeader>
          <S.LeftOut onClick={() => navigate(-1)} />
          <S.Appbar>수강권 상세</S.Appbar>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space>
              <MoreOutlined
                style={{ marginLeft: "auto" }}
                onClick={moreVertHandler}
              />
            </Space>
          </Dropdown>
        </S.TicketDetailHeader>

        <S.Wrapper>
          <S.InnerBox>
            <S.Ticket_Title>{ticketDetail.title}</S.Ticket_Title>
            <S.Ticket_LessonType>
              {ConvertLessonType(ticketDetail.lessonType)}
            </S.Ticket_LessonType>
          </S.InnerBox>

          <S.InfoWrapper>
            <S.FlexRow>
              <S.Title>수강권 내용</S.Title>
              <S.Issued>
                수강권 부여내역
                <div>
                  <img src="/images/icons/Arrowmore_24px.png" alt="" />
                </div>
              </S.Issued>
            </S.FlexRow>

            <S.Ticket_Info key={ticketDetail.id}>
              <S.InnerBox>
                <S.InfoTitle>시간</S.InfoTitle>
                <S.StrongText>
                  {ticketDetail &&
                    ticketDetail.bookableLessons &&
                    ticketDetail.bookableLessons.length > 0 &&
                    ticketDetail.bookableLessons[0].duration}
                  분
                </S.StrongText>
              </S.InnerBox>
              <S.InnerBox>
                <S.InfoTitle>기본 횟수</S.InfoTitle>
                <S.StrongText>
                  {ticketDetail.defaultCount
                    ? `${ticketDetail.defaultCount}회`
                    : "무제한"}
                </S.StrongText>
              </S.InnerBox>
              <S.InnerBox>
                <S.InfoTitle>수강권 기간</S.InfoTitle>
                <S.StrongText>
                  {ticketDetail.defaultTerm
                    ? `${ticketDetail.defaultTerm}${ConvertTermUnit(
                        ticketDetail.defaultTermUnit
                      )}`
                    : "소진시 까지"}
                </S.StrongText>
              </S.InnerBox>
              <S.InnerBox>
                <S.InfoTitle>수강권 상태</S.InfoTitle>
                <S.StrongText>
                  {ticketDetail.isActive ? (
                    <span style={{ color: "#6691FF" }}>판매중</span>
                  ) : (
                    <span style={{ color: "red" }}>판매 종료</span>
                  )}
                </S.StrongText>
              </S.InnerBox>
            </S.Ticket_Info>
          </S.InfoWrapper>
        </S.Wrapper>
      </div>
      <>
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
      </>
      <>
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
      </>
    </>
  );
};

export default TicketDetail;
