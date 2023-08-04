import { useNavigate } from "react-router-dom";
import apiInstance from "../../apiInstance/apiInstance";

export const usePostSchedulesCancel = (scheduleId: any) => {
  const navigate = useNavigate();
  const onClickCancel = async () => {
    try {
      const response = await apiInstance.post(
        `/schedules/${scheduleId}/cancel`
      );
      navigate("/schedulePage/calendar");
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  return { onClickCancel };
};
