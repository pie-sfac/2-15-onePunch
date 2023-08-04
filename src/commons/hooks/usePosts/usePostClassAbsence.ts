import apiInstance from "../../apiInstance/apiInstance";

export const usePostClassAbsence = (
  attendanceHistoryId: any,
  fetchScheduleDetails: any,
  setIsVisible: any
) => {
  const onClickAbsence = async () => {
    try {
      await apiInstance.post(
        `/attendance-histories/${attendanceHistoryId}/check-present`
      );

      fetchScheduleDetails();
      setIsVisible(false);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  return { onClickAbsence };
};
