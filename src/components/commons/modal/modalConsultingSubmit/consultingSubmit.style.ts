import { SmileOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Modal } from "antd";

export const ModalOut = styled(Modal)`
  top: 30%;
  text-align: center;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const ConfirmButton = styled.button`
  background-color: #f4f4f4;
  border: none;
  border-radius: 4px;
  padding: 10px 50px;
  margin-top: 20px;
`;
