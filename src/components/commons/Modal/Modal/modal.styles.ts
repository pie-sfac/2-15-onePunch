import { CloseOutlined, CloseSquareOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  z-index: 9999;
`;

export const Wrapper = styled.div`
  width: 85vw;
  height: 70vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 35px 25px;
  border-radius: 10px;
`;

export const TitleWrapper = styled.div`
  display: flex;
`;

export const Header = styled.header``;

export const Title = styled.h1``;

export const Label = styled.p``;

export const Main = styled.main``;

export const Box = styled.div`
  width: 72vw;
  height: 25vh;
  background-color: white;
  border: 1px solid #cfcfcf;
  padding: 20px;
`;

export const BoxTitle = styled.h2`
  font-size: 14px;
  color: #1d1d1d;
`;

export const BoxLabel = styled.p`
  color: #505050;
  font-size: 12px;
`;

export const GrayCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #f4f4f4;
  border-radius: 30px;
  margin-left: auto;
  margin-top: auto;
`;
