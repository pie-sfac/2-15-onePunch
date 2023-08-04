import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";

export const usePostCounseling = (
  userId: any,
  clientName: any,
  clientPhone: any,
  memo: any,
  day: any,
  startTime: any,
  endTime: any
) => {
  const navigate = useNavigate();
  const onClickSubmit = async () => {
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

  return {
    onClickSubmit,
  };
};
