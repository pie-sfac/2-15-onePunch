import { useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";

export const usePostMembers = (setAddName: any, setAdd: any) => {
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
      setAddName(data.name);
      setAdd(true);
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const onClickSubmit = (data: any) => {
    postMembers(data);
  };

  return { onClickSubmit };
};
