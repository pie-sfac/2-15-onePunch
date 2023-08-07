import { MouseEventHandler, useState } from "react";
import apiInstance from "../../apiInstance/apiInstance";

export const useOnClickGetId = (
  setUserId: (userId: string) => void,
  setUserName: (userName: string) => void,
  setIsVisible: (isVisible: boolean) => void
) => {
  const onClickGetId: MouseEventHandler<HTMLDivElement> = async (event) => {
    try {
      const target = event.currentTarget;
      const postId = target.id;
      setUserId(postId);

      // 여기서 postId를 사용하여 해당 사용자의 이름을 가져오는 코드
      const response = await apiInstance.get(`/staffs/${postId}`);
      setUserName(response.data.name);
      setIsVisible(false);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return {
    onClickGetId,
  };
};
