import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: fixed; /* 푸터를 항상 고정시킵니다. */
  background-color: white;
  bottom: 0; /* 화면의 아래쪽에 위치시킵니다. */
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #e6e6e6;
  z-index: 9999;
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 15px;
`;

export const Icon = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 11px;
  margin-top: 10px;
`;
