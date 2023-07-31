import { useState, useEffect } from "react";
import apiInstance from "../../apiInstance/apiInstance";

interface MemberDetails {
  name: string;
  phone: string;
  birthDate: string;
  job: string;
}

export const useGetFetchDetails = (memberId: string | undefined) => {
  const [memberDetails, setMemberDetails] = useState<MemberDetails>({
    name: "",
    phone: "",
    birthDate: "",
    job: "",
  });

  const fetchMemberDetails = async () => {
    if (!memberId) return;

    try {
      const response = await apiInstance.get(`/members/${memberId}`);
      setMemberDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  return {
    memberDetails,
    setMemberDetails,
    fetchMemberDetails,
  };
};
