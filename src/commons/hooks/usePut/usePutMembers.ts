import { useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";

export const usePutMembers = (setAdd: any, memberId: any) => {
  const onClickEdit = async (data: any) => {
    try {
      const response = await apiInstance.put(`/members/${memberId}`, {
        name: data.name,
        birthDate: data.birthDate,
        phone: data.phone,
        sex: data.sex,
        job: data.job,
        acqusitionFunnel: data.howToVisit,
        acquisitionFunnel: data.howToVisit,
      });
      console.log(data);
      setAdd(true);
      console.log(response.data); // Here you can handle the response
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return { onClickEdit };
};
