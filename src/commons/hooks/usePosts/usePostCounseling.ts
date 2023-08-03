import { useState, ChangeEvent, useEffect } from "react";
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

  useEffect(() => {
    const getMemberInfo = async () => {
      const response = await apiInstance.get(
        `/schedules/counseling/${scheduleId}`
      );
      setUserId(response.data.counselor.id);
      // Add the below lines
      setClientName(response.data.clientName);
      setClientPhone(response.data.clientPhone);
      setMemo(response.data.memo);
      setStartTime(response.data.startAt);
      setEndTime(response.data.endAt);
      setDay(response.data.day);
      getMemberInfo();
    };
  }, []);

  const onClickEdit = async () => {
    try {
      const response = await apiInstance.put(
        `/schedules/counseling/${scheduleId}`,
        {
          userId: Number(userId),
          clientName: clientName,
          clientPhone: clientPhone,
          memo: memo,
          startAt: `${day}T${startTime}`,
          endAt: `${day}T${endTime}`,
        }
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
