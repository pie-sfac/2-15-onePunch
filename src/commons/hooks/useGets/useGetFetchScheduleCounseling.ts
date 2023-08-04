import apiInstance from "../../apiInstance/apiInstance";

export const useGetFetchScheduleCounseling = (
  scheduleId: any,
  setInfo: any,
  setUserId: any,
  setUserName: any,
  setClientName: any,
  setClientPhone: any,
  setMemo: any,
  setStartAt: any,
  setEndAt: any
) => {
  const getMemberInfo = async () => {
    const response = await apiInstance.get(
      `/schedules/counseling/${scheduleId}`
    );
    setInfo(response.data);
    setUserId(response.data.counselor.id);
    setUserName(response.data.counselor.name);
    setClientName(response.data.client.name);
    setClientPhone(response.data.client.phone);
    setMemo(response.data.memo);
    setStartAt(response.data.startAt);
    setEndAt(response.data.endAt);
  };
  return { getMemberInfo };
};
