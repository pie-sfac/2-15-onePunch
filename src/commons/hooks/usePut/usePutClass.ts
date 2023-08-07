import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";

export const usePutClass = (
  startAt: any,
  day: any,
  startTime: any,
  info: any,
  endAt: any,
  endTime: any,
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
    updateUserInput.memo = "";
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
        `/schedules/private-lesson/${scheduleId}`,
        { ...updateUserInput }
      );
      alert("일정을 수정했습니다.");
      navigate("/schedulePage/calendar");
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return { onClickEdit };
};
