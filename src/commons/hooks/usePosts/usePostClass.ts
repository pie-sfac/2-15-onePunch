import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";
import { useState } from "react";
import moment from "moment";

interface Member {
  id: string;
  name: string;
  phone: string;
}

interface Staff {
  id: string;
  name: string;
  phone: string;
}

interface Ticket {
  id: string;
  title: string;
}

export const usePostClass = (scheduleId: string | undefined) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("0");
  const [issuedTicketId, setIssuedTicketId] =
    useState("수업(수강권)을 선택해 주세요.");
  const [day, setDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const onStartTimeChange = (value: any, date: any) => {
    setStartTime(date);
    console.log(date);
  };

  const onEndTimeChange = (value: any, date: any) => {
    setEndTime(date);
    console.log(date);
  };

  const onDayChange = (value: any, date: any) => {
    setDay(date);
    console.log(date);
  };

  const onClickSubmt = async () => {
    try {
      const response = await apiInstance.post("/schedules/private-lesson", {
        userId: Number(userId), // 변경할 필요가 있음
        issuedTicketId: Number(issuedTicketId),
        startAt: `${day}T${startTime}`,
        endAt: `${day}T${endTime}`,
      });
      alert("일정을 등록했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data); // Here you can handle the response
    } catch (error: any) {
      console.error(error.response.data.message); // Handle error
      alert(error.response.data.message);
    }
  };

  const onClickEdit = async () => {
    try {
      const response = await apiInstance.put(
        `/schedules/private-lesson/${scheduleId}`,
        {
          memo: "",
          startAt: `${day}T${startTime}`,
          endAt: `${day}T${endTime}`,
        }
      );
      alert("일정을 수정했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return {
    userId,
    setUserId,
    issuedTicketId,
    setIssuedTicketId,
    startTime,
    endTime,
    day,
    onStartTimeChange,
    onEndTimeChange,
    onDayChange,
    onClickSubmt,
    onClickEdit,
  };
};