import styled from "@emotion/styled";
import { Input } from "antd";
const { TextArea } = Input;

export const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const ModalText = styled.p`
  margin: 20px 0px;
`;

export const TextAreaOut = styled(TextArea)`
  margin-top: 3vh;
`;

// 취소 및 저장 버튼을 둘러싸는 컨테이너
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
`;

// 취소 버튼
export const CancelButton = styled.button`
  background-color: white;
  padding: 8px 15px;
  cursor: pointer;
  width: 46%;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
`;

// 저장 버튼
export const SaveButton = styled.button`
  background-color: #6691ff;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  width: 46%;
  border-radius: 4px;
`;
