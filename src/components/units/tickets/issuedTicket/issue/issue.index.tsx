import React, { useEffect, useState } from "react";
import * as S from "./issue.style";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { TicketType } from "../../centerTicket/Ticket/Ticket";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";
import ConvertTermUnit from "../../../../commons/converter/convertTermUnit";
import ServiceCounter from "../../centerTicket/serviceCounter/serviceCounter";
import useCounter from "../../../../../commons/hooks/Counter/useCounter";
import { Staff } from "../../../staff/list/staffList.index";

const Issue = () => {
  const navigate = useNavigate();
  // useCounter 훅 사용
  const { count, decrement, setCount } = useCounter();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticketDetail, setTicketDetail] = useState<TicketType>();
  // const [staffs, setStaffs] = useState<TicketType>();
  const [showStaffs, setShowStaffs] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);

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
        // console.log(response.data);
        setTicketDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ticketId]);

  const getStaffs = () => {
    useEffect(() => {
      apiInstance
        .get(`/staffs`)
        .then((response) => {
          console.log(response.data.datas);
          setStaffs(response.data.datas);
          setShowStaffs(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  };

  return (
    <>
      {showStaffs ? (
        <>
          <S.Searchbar>
            <S.LeftOut onClick={() => setShowStaffs(false)} />
            <S.Search />
          </S.Searchbar>
          {staffs.map((staff) => (
            <S.StaffsBox key={staff.id}>
              <div>
                <S.ProfileIcon
                  src="/images/icons/Profile_40px.png"
                  alt="Profile_40px"
                />
              </div>
              <S.StaffTag>직원</S.StaffTag>
              <S.StaffName>{staff.name}</S.StaffName>
              <S.Id>{staff.name}</S.Id>
              <S.Phone>{staff.phone}</S.Phone>
              <br />
            </S.StaffsBox>
          ))}
        </>
      ) : (
        ticketDetail && (
          <>
            <S.IssuedTicketHeader>
              <S.Appbar>
                <S.FlexRow>
                  <S.LeftOut onClick={() => navigate(-1)} />
                  <S.AppbarTitle>수강권 부여</S.AppbarTitle>
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
              <S.Form>
                <S.FlexColumn>
                  <S.Label>수강권명</S.Label>
                  <S.DisabledDiv>{ticketDetail.title}</S.DisabledDiv>
                </S.FlexColumn>
                <S.Label>유효기간</S.Label>
                <S.Input />

                <S.Label>수강권 기간</S.Label>
                <S.UnitWrapper>
                  <p>{ticketDetail.defaultTerm}</p>
                  <p>{ConvertTermUnit(ticketDetail.defaultTermUnit)}</p>
                </S.UnitWrapper>

                <S.Label>기본횟수</S.Label>
                <S.UnitWrapper>
                  <p>{ticketDetail.defaultCount}</p>
                  <p>회</p>
                </S.UnitWrapper>
                <S.Label>서비스 횟수</S.Label>
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
                <S.Staffs onClick={getStaffs}>선택하기 +</S.Staffs>
                <div>
                  <S.Button type="submit">완료</S.Button>
                </div>
              </S.Form>
            </S.Body>
          </>
        )
      )}
    </>
  );
};

export default Issue;
