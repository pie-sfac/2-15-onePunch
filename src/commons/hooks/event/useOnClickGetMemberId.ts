import { MouseEventHandler } from "react";
import apiInstance from "../../apiInstance/apiInstance";

export const useOnClickGetMemberId = (
  setMemberId: (userId: string) => void,
  setIssuedTicketId: (userId: string) => void,
  setMemberName: (userName: string) => void,
  setIsVisible: (isVisible: boolean) => void,
  setIssuedTickets: (isVisible: any) => void
) => {
  const onClickGetMemberId: MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    try {
      // 회원 아이디 가지고 오기
      const target = event.currentTarget;
      const postId = target.id;
      setMemberId(postId);

      // 회원 선택 시, 초기 수업(수강권) 선택값으로 변경
      setIssuedTicketId("수업(수강권)을 선택해 주세요.");

      // 여기서 postId를 사용하여 해당 사용자의 이름을 가져오는 코드
      const responsed = await apiInstance.get(`/members/${postId}`);
      setMemberName(responsed.data.name);

      // 회원 아이디에 해당하는 이슈티켓 목록 가지고 오기
      const response = await apiInstance.get(
        `/members/${postId}/issued-tickets`
      );
      setIssuedTickets(response.data.issuedTickets);
      setIsVisible(false);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  return {
    onClickGetMemberId,
  };
};
