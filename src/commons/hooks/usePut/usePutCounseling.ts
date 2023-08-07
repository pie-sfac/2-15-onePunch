import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";

export const usePutCounseling = (
  userId: any,
  clientName: any,
  clientPhone: any,
  memo: any,
  day: any,
  startTime: any,
  endTime: any,
  startAt: any,
  info: any,
  endAt: any,
  scheduleId: any
) => {
  const navigate = useNavigate();
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
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  return { onClickEdit };
};
