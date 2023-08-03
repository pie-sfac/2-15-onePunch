import * as S from "./consultingWrite.style";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Phone } from "../../../../commons/libraries/utils";
import { usePostCounseling } from "../../../../commons/hooks/usePosts/usePostCounseling";
import { useOnClickGetId } from "../../../../commons/hooks/event/useOnClickGetId";
import dayjs from "dayjs";

interface Staff {
  id: string;
  name: string;
  phone: string;
}
interface InfoType {
  counselor: {
    id: string;
    name: string;
  };
  client: {
    name: string;
    phone: string;
  };
  memo: string;
  startAt: string;
  endAt: string;
}

export default function ConsultingWrite(props: any) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [userName, setUserName] = useState("");
  const { scheduleId } = useParams();
  const [info, setInfo] = useState<InfoType | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [userId, setUserId] = useState("0");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [memo, setMemo] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  useEffect(() => {
    if (props.isEdit) {
      const getMemberInfo = async () => {
        const response = await apiInstance.get(
          `/schedules/counseling/${scheduleId}`
        );
        setInfo(response.data);
        setUserId(response.data.counselor.id);
        setUserName(response.data.counselor.name);
        setClientName(response.data.client.name);
        setClientPhone(response.data.client.phone);
        setMemo(response.data.memo);
        setStartAt(response.data.startAt);
        setEndAt(response.data.endAt);

        console.log(info);
      };
      getMemberInfo();
    }
  }, []);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setClientName(event.target.value);
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setClientPhone(event.target.value);
  };

  const onChangeMemo = (event: any) => {
    setMemo(event.target.value);
  };

  const onStartTimeChange = (value: any, dateString: string) => {
    setStartTime(dateString);
  };

  const onEndTimeChange = (value: any, dateString: string) => {
    setEndTime(dateString);
  };

  const onDayChange = (value: any, dateString: string) => {
    setDay(dateString);
  };

  const onClickSubmt = async () => {
    try {
      const response = await apiInstance.post("/schedules/counseling", {
        userId: Number(userId),
        clientName: clientName,
        clientPhone: clientPhone,
        memo: memo,
        startAt: `${day}T${startTime}`,
        endAt: `${day}T${endTime}`,
      });
      alert("일정을 등록했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data); // Here you can handle the response
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const onClickEdit = async () => {
    const updateUserInput: {
      userId?: any;
      clientName?: any;
      clientPhone?: any;
      memo?: any;
      startAt?: any;
      endAt?: any;
      counselingRecordContent?: any;
    } = {};

    if (userId !== "0") updateUserInput.userId = Number(userId);
    if (clientName !== "") updateUserInput.clientName = clientName;
    if (clientPhone !== "") updateUserInput.clientPhone = clientPhone;
    if (memo !== "") updateUserInput.memo = memo;
    if (startAt !== "" && day !== null && startTime !== null) {
      updateUserInput.startAt = `${day}T${startTime}`;
    } else {
      updateUserInput.startAt = info?.startAt;
    }

    if (endAt !== "" && day !== null && endTime !== null) {
      updateUserInput.endAt = `${day}T${endTime}`;
    } else {
      updateUserInput.endAt = info?.endAt;
    }
    try {
      const response = await apiInstance.put(
        `/schedules/counseling/${scheduleId}`,
        { ...updateUserInput }
      );
      alert("일정을 수정했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  // // 상담 등록 _ 커스텀 hooks
  // const {
  //   userId,
  //   setUserId,
  //   clientName,
  //   clientPhone,
  //   memo,
  //   startTime,
  //   endTime,
  //   day,
  //   onChangeName,
  //   onChangePhone,
  //   onChangeMemo,
  //   onStartTimeChange,
  //   onEndTimeChange,
  //   onDayChange,
  //   onClickSubmt,
  //   onClickEdit,
  // } = usePostCounseling(scheduleId);

  // 직원 상세 조회 _ 커스텀 hooks
  // const { onClickGetId } = useOnClickGetId(
  //   setUserId,
  //   setUserName,
  //   setIsVisible
  // );

  const onClickGetId: MouseEventHandler<HTMLDivElement> = async (event) => {
    try {
      const target = event.currentTarget;
      const postId = target.id;
      setUserId(postId);

      // 여기서 postId를 사용하여 해당 사용자의 이름을 가져오는 코드
      const response = await apiInstance.get(`/staffs/${postId}`);
      setUserName(response.data.name);
      console.log(postId);

      setIsVisible(false);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar");
  };

  const openModal = async () => {
    await apiInstance
      .get("/staffs?page=1&sort=createdAt%2CDesc")
      .then((response) => setStaffs(response.data.datas))
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/TemporaryLogin");
      });
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.OutBox onClick={handleOutBoxClick}>
            <S.LeftOut />
            <S.CreateScheduleText>
              일정 {props.isEdit ? "수정" : "생성"}
            </S.CreateScheduleText>
          </S.OutBox>
        </S.Header>
        <S.Body>
          <Modal
            title="담당 강사 선택"
            visible={isVisible}
            onOk={closeModal}
            onCancel={closeModal}
            footer={null}
          >
            {staffs.map((staff, index) => (
              <S.StaffBox key={index} id={staff.id} onClick={onClickGetId}>
                <S.SmileOut />
                <S.StaffTag>직원</S.StaffTag>
                <S.StaffName>{staff.name}</S.StaffName>
                <S.StaffPhone>{Phone(staff.phone)}</S.StaffPhone>
              </S.StaffBox>
            ))}
          </Modal>
          <S.ConsultingTitle>상담</S.ConsultingTitle>
          <S.Label>담당 강사 선택 </S.Label>

          {userId === "0" ? (
            <S.MemberChoiceButton onClick={openModal}>
              선택하기 +
            </S.MemberChoiceButton>
          ) : (
            <S.Box onClick={openModal}>
              <S.SmileOut />
              <S.Name>{userName}</S.Name>
            </S.Box>
          )}
          <S.Label>일자 선택</S.Label>
          <S.DateOut onChange={onDayChange} />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut onChange={onStartTimeChange} />
            <S.TimeOut onChange={onEndTimeChange} />
          </S.TimeBox>
          <S.Label>이름 </S.Label>
          <S.Text onChange={onChangeName} defaultValue={clientName} />
          <S.Label>역락처 </S.Label>
          <S.Text onChange={onChangePhone} defaultValue={clientPhone} />
          <S.Label>일정 메모</S.Label>
          <S.TextAreaOut
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            placeholder=""
            onChange={onChangeMemo}
            value={memo}
          />
        </S.Body>
        <S.Footer>
          <S.Button onClick={props.isEdit ? onClickEdit : onClickSubmt}>
            완료
          </S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}
