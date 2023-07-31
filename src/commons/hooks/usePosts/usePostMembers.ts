import { useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";

export const usePostMembers = () => {
  const [add, setAdd] = useState(false);
  const [addName, setAddName] = useState("");

  const postMembers = async (data: any) => {
    try {
      await apiInstance.post("/members", {
        name: data.name,
        birthDate: data.birthDate,
        phone: data.phone,
        sex: data.sex,
        job: data.job,
        acqusitionFunnel: data.howToVisit,
        acquisitionFunnel: data.howToVisit,
      });
      console.log(data);
      setAddName(data.name);
      setAdd(true);
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const onSubmit = (data: any) => {
    postMembers(data); // 이 함수로 data 전송
  };

  return { onSubmit, add, addName, setAdd };
};
