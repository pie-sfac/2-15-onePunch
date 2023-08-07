import React, { useEffect, useState } from "react";
import * as S from "./issue.style";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { TicketType } from "../Ticket/Ticket";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";
import ConvertTermUnit from "../../../../commons/converter/convertTermUnit";
import ServiceCounter from "../serviceCounter/serviceCounter";
import useCounter from "../../../../../commons/hooks/Counter/useCounter";
import { Staff } from "../../../staff/list/staffList.index";
import { DatePickerProps } from "antd";
import ModalAlert from "../../../../commons/modal/modalAlert/modalAlert.index";

// TicketIssue에 필요한 request body type 설정
interface TicketIssueReq {
  memberIds: number[];
  serviceCount: number;
  privateTutorId: number;
  startAt: string;
  endAt: string;
}

const Issue = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const memberIdNum = parseInt(memberId!);
  // useCounter 훅 사용
  const { count, decrement, setCount } = useCounter();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticketDetail, setTicketDetail] = useState<TicketType>();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [privateTutorId, setPrivateTutorId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // 티켓 상세 정보 렌더링될 때 서비스횟수 setCount 초기 값 설정
  useEffect(() => {
    if (ticketDetail) {
      setCount(ticketDetail.maxServiceCount || 0);
    }
  }, [ticketDetail]);

  const increment = () => {
    // maxServiceCount가 있고, count가 그 값보다 작을 때만 증가시킴.
    if (
      ticketDetail?.maxServiceCount !== undefined &&
      count < ticketDetail.maxServiceCount
    ) {
      setCount(count + 1);
    }
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력된 값이 maxServiceCount보다 크지 않도록 함.
    const newValue = Math.min(
      Number(event.target.value),
      ticketDetail?.maxServiceCount || Infinity
    );
    setCount(newValue);
  };

  // 티켓 상세 정보 가져오기
  useEffect(() => {
    apiInstance
      .get(`/tickets/${ticketId}`)
      .then((response) => {
        console.log(response.data);
        setTicketDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ticketId]);

  // 직원 목록 가져오기
  useEffect(() => {
    apiInstance
      .get(`/staffs`)
      .then((response) => {
        console.log(response.data.datas);
        setStaffs(response.data.datas);
        // setShowStaffs(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 직원 목록을 option으로 넣기
  const options = staffs.map((staff) => ({
    value: staff.id,
    label: `${staff.name} (${staff.phone})`,
  }));

  // start - end date 선택 설정
  const onSelectStartDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setStartAt(dateString);
  };
  const onSelectEndDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setEndAt(dateString);
  };

  // 부여할 수강권 formData api 전송
  const handleIssueTicket = (event: React.FormEvent<HTMLFormElement>) => {
    const formData: TicketIssueReq = {
      memberIds: [memberIdNum],
      serviceCount: count,
      privateTutorId: privateTutorId,
      startAt: startAt,
      endAt: endAt,
    };
    event.preventDefault();
    console.log(formData);

    apiInstance
      .post(`/tickets/${ticketId}/issue`, formData)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.message);
        setShowModal(true);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      {showModal ? (
        <ModalAlert
          title="수강권 부여 완료"
          message="선택하신 수강권의 부여가 
          완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            setShowModal(false);
            navigate(`/members/${memberId}/issued`);
          }}
          onOut={() => {
            setShowModal(false);
            false;
          }}
        />
      ) : (
        ticketDetail && (
          <>
            <S.IssuedTicketHeader>
              <S.Appbar>
                <S.FlexRow>
                  <S.LeftOut onClick={() => navigate(-1)} />
                  <S.AppbarTitle>수강권 상세</S.AppbarTitle>
                </S.FlexRow>
              </S.Appbar>
            </S.IssuedTicketHeader>
            <S.Body>
              <S.TitleWrapper>
                <S.Title>{ticketDetail.title}</S.Title>
                <S.LessonType>
                  {ConvertLessonType(ticketDetail.lessonType)}
                </S.LessonType>
              </S.TitleWrapper>
              <S.Form onSubmit={handleIssueTicket}>
                <S.FlexColumn>
                  <S.Label>수강권명</S.Label>
                  <S.DisabledDiv>{ticketDetail.title}</S.DisabledDiv>
                </S.FlexColumn>
                <S.Label>유효기간</S.Label>
                <S.DatePickerWrapper>
                  <S.DatePick onChange={onSelectStartDate} />
                  <S.DatePick
                    onChange={onSelectEndDate}
                    disabled={!ticketDetail.defaultTerm}
                  />
                </S.DatePickerWrapper>
                <S.Label>수강권 기간</S.Label>
                <S.UnitWrapper>
                  {ticketDetail.defaultTerm ? (
                    <>
                      <p>{ticketDetail.defaultTerm}</p>
                      <p>{ConvertTermUnit(ticketDetail.defaultTermUnit)}</p>
                    </>
                  ) : (
                    "무기한"
                  )}
                </S.UnitWrapper>

                <S.Label>기본횟수</S.Label>
                <S.UnitWrapper>
                  {ticketDetail.defaultCount ? (
                    <>
                      <p>{ticketDetail.defaultCount}</p>
                      <p>회</p>
                    </>
                  ) : (
                    "무제한"
                  )}
                </S.UnitWrapper>
                <S.Label>서비스 횟수</S.Label>
                <S.GreyExplain>
                  서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다.
                </S.GreyExplain>
                <div style={{ width: "90%" }}>
                  <ServiceCounter
                    onDecrement={decrement}
                    onIncrement={increment}
                    onChange={handleCountChange}
                    value={count}
                    disabled={!ticketDetail.defaultCount}
                  />
                </div>
                <S.Label>담당강사</S.Label>
                <S.FormSelect
                  showSearch
                  placeholder="직원 이름을 검색하세요"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={options}
                  size={"large"}
                  onChange={(value: any) => setPrivateTutorId(value)}
                />
                <S.Button type="submit">완료</S.Button>
              </S.Form>
            </S.Body>
          </>
        )
      )}
    </>
  );
};

export default Issue;
