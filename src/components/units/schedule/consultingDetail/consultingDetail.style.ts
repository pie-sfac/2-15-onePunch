import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Progress } from "antd";

export const Wrapper = styled.div``;

export const LeftOut = styled(LeftOutlined)``;

export const AvatarOut = styled(Avatar)``;

export const Header = styled.header`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
`;

export const OutBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px 10px;
`;

export const OutBoxTime = styled.p`
  margin-left: 2vw;
  font-size: 16px;
`;

export const TitleBox = styled.div`
  height: 100px;
  padding: 20px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
`;

export const ConsultationTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
`;

export const Body = styled.div`
  padding: 10px 20px;
`;

export const CIWrapper = styled.div``;

export const CIBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  align-items: center;
  justify-content: space-evenly;
  font-size: 12px;
`;

export const Label = styled.p`
  font-weight: 700;
`;

export const CI = styled.p``;

export const PMWrapper = styled.div`
  padding: 40px 0px;
`;
export const PMemoWrapper = styled.div`
  margin-top: 30px;
`;

export const PMTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const PMBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 20px 10px;
`;

export const PMITie = styled.div`
  margin-left: 10px;
`;

export const PMName = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 700;
`;

export const PMPhone = styled.p`
  font-size: 14px;
`;

export const PMSBTie = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Button = styled.button`
  border: 1px solid #e7e7e7;
  padding: 0px 12px;
  color: #6691ff;
  border-radius: 10px;
  font-size: 12px;
  height: 31px;
  margin-left: 5px;
`;

export const PMemoMBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 20px 10px;
  font-size: 14px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Viewport의 높이를 100%로 설정해 모든 화면을 채우게 합니다 */
`;

export const Loading = styled(Progress)`
  width: 300px;
`;
