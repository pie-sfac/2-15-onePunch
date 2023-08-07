import styled from "@emotion/styled";

export const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const ModalText = styled.p`
  margin: 20px 0px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const ModalNegativeButton = styled.button`
  width: 45%;
  padding: 12px 0px;
  background-color: #f4f4f4;
  border-radius: 4px;
`;

export const ModalPositiveButton = styled.button`
  width: 45%;
  padding: 12px 0px;
  background-color: #2d62ea;
  color: white;
  border-radius: 4px;
`;
