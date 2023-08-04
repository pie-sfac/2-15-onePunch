import apiInstance from "../../apiInstance/apiInstance";

export const usePostClassAttendance = (
  attendanceHistoryId: any,
  fetchScheduleDetails: any,
  setIsVisible: any
) => {
  const onClickAttendance = async () => {
    try {
      await apiInstance.post(
        `/attendance-histories/${attendanceHistoryId}/check-absent`
      );
      fetchScheduleDetails();
      setIsVisible(false);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  return { onClickAttendance };
};
