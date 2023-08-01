import { useEffect, useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";
import { useParams } from "react-router-dom";

interface ScheduleDetails {
  startAt?: string;
  endAt?: string;
  counselor?: Counselor;
  client?: Client;
  memo?: string;
}

interface Counselor {
  name: string;
}

interface Client {
  name: string;
  phone: string;
}

export const useGetFetchScheduleDetails = (scheduleId: string | undefined) => {
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleDetails>({});

  const fetchScheduleDetails = async () => {
    try {
      const response = await apiInstance.get(
        `/schedules/counseling/${scheduleId}`
      );
      setScheduleDetails(response.data);
      console.log(scheduleDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchScheduleDetails();
  }, []);

  return {
    scheduleDetails,
    setScheduleDetails,
    fetchScheduleDetails,
  };
};
