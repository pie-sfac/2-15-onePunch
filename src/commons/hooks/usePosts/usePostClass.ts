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
  endTime: any,
  setIsSubmitModalVisible: any
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
      setIsSubmitModalVisible(true); // 모달 표시
    } catch (error: any) {
      console.error(error.response.data.message); // Handle error
      alert(error.response.data.message);
    }
  };

  return { onClickSubmit };
};
