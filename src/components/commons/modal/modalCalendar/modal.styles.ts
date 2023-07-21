import styled from "@emotion/styled";
import { Modal } from "antd";

export const ModalOut = styled(Modal)``;

export const ModalWrapper = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
`;

export const Header = styled.header`
  margin-top: 4vh;
`;

export const Title = styled.h1`
  font-size: 16px;
`;

export const Label = styled.p`
  font-size: 14px;
`;

export const Main = styled.main``;

export const Box = styled.div`
  width: 72vw;
  height: 20vh;
  background-color: white;
  border: 1px solid #cfcfcf;
  padding: 20px;
  margin-top: 2vh;
  margin-bottom: 2vh;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    border-color: #4096ff;
  }
`;

export const BoxTitle = styled.h2`
  font-size: 16px;
  color: #1d1d1d;
`;

export const BoxLabel = styled.p`
  color: #505050;
  font-size: 14px;
`;

export const GrayCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #f4f4f4;
  border-radius: 30px;
  margin-left: auto;
  margin-top: 20%;
`;
