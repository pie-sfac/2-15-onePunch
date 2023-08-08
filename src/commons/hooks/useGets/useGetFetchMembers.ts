import { useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";
import { useNavigate } from "react-router-dom";

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

export const useGetFetchClassMembers = (
  setMembers: any,
  setIsVisible: any,
  setSelect: any,
  currentPage: any
) => {
  const navigate = useNavigate();
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const fetchPage = async (page: number) => {
    try {
      const response = await apiInstance.get(`/members?page=${page}&size=10`);
      setMembers(response.data.datas);
      setTotalMembers(response.data.meta.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  const openModalMember = async () => {
    fetchPage(currentPage);
    setIsVisible(true);
    setSelect(false);
  };

  return {
    openModalMember,
    fetchPage,
    totalMembers,
  };
};
