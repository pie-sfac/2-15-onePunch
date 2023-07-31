import { useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";

interface Member {
  id: string;
  name: string;
  sex: string;
  phone: string;
  birthDate: string;
}

export const useGetFetchMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState<number>(0);

  const fetchMembers = async (page: number) => {
    try {
      const response = await apiInstance.get(`/members?page=${page}&size=10`);
      console.log(response.data);
      setMembers(response.data.datas);
      setTotalMembers(response.data.meta.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    members,
    totalMembers,
    fetchMembers,
    setMembers,
  };
};
