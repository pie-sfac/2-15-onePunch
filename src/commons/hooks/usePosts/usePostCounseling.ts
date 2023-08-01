import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";

export const usePostCounseling = (scheduleId: string | undefined) => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [userId, setUserId] = useState("0");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [memo, setMemo] = useState("");

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
    if (
      clientName === "" &&
      clientPhone === "" &&
      memo === "" &&
      day === null &&
      startTime === null &&
      endTime === null
    ) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    const updateScheduleInput: {
      userId?: number;
      clientName?: string;
      clientPhone?: string;
      memo?: string;
      startAt?: string;
      endAt?: string;
    } = {};

    if (userId !== "0") updateScheduleInput.userId = Number(userId);
    if (clientName !== "") updateScheduleInput.clientName = clientName;
    if (clientPhone !== "") updateScheduleInput.clientPhone = clientPhone;
    if (memo !== "") updateScheduleInput.memo = memo;
    if (day !== null && startTime !== null)
      updateScheduleInput.startAt = `${day}T${startTime}`;
    if (day !== null && endTime !== null)
      updateScheduleInput.endAt = `${day}T${endTime}`;

    try {
      const response = await apiInstance.put(
        `/schedules/counseling/${scheduleId}`,
        updateScheduleInput
      );
      alert("일정을 수정했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return {
    userId,
    setUserId,
    clientName,
    clientPhone,
    memo,
    startTime,
    endTime,
    day,
    onChangeName,
    onChangePhone,
    onChangeMemo,
    onStartTimeChange,
    onEndTimeChange,
    onDayChange,
    onClickSubmt,
    onClickEdit,
  };
};
