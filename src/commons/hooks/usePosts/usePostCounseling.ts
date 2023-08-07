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
  endTime: any,
  setIsSubmitModalVisible: any
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
      setIsSubmitModalVisible(true); // 모달 표시
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return {
    onClickSubmit,
  };
};
