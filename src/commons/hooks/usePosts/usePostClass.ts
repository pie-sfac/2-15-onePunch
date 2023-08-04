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

export const usePostClass = (
  userId: any,
  issuedTicketId: any,
  day: any,
  startTime: any,
  endTime: any
) => {
  const navigate = useNavigate();
  const onClickSubmit = async () => {
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

  return { onClickSubmit };
};
