import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Modal, Progress, Skeleton } from "antd";

export const Wrapper = styled.div``;

export const LeftOut = styled(LeftOutlined)``;

export const AvatarOut = styled(Avatar)`
  margin-right: 10px;
`;

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

export const OutBoxName = styled.p`
  margin-left: 1vw;
  font-size: 16px;
`;

export const Body = styled.div`
  padding: 10px 20px;
`;

export const CIWrapper = styled.div``;

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

export const ClassTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
`;

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

export const PMTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const PMBox = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 10px;
`;

export const PMIBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

export const PMITie = styled.div``;

export const PMName = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 700;
`;

export const PMPhone = styled.p`
  font-size: 14px;
`;

export const PMBTie = styled.div`
  margin-left: auto;
`;

export const AbsenceButton = styled.button<{ isPresent?: boolean }>`
  padding: 8px 15px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isPresent ? "#6691FF" : "defaultColor"};
  border: ${(props) =>
    props.isPresent ? "1px solid #4779FC;" : "1px solid #cfcfcf;"};
  color: ${(props) => (props.isPresent ? "white" : "black")};
`;

export const AttendanceButton = styled.button<{ isAbsent?: boolean }>`
  padding: 8px 15px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  margin-left: 5px;
  background-color: ${(props) => (props.isAbsent ? "#FE7B72" : "defaultColor")};
  border: ${(props) =>
    props.isAbsent ? "1px solid #DE291D;" : "1px solid #cfcfcf;"};
  color: ${(props) => (props.isAbsent ? "white" : "black")};
`;

export const Line = styled.div`
  border-top: 1px solid #e7e7e7;
`;

export const PMSBox = styled.div`
  padding: 20px 30px;
`;

export const PMSTie = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 15px;
`;

export const PMSLabel = styled.p`
  width: 85px;
`;

export const PMS = styled.p`
  font-weight: 700;
`;

export const PMSBTie = styled.div``;

export const RecordButton = styled.button`
  border: 1px solid #e7e7e7;
  padding: 8px 12px;
  color: #6691ff;
  border-radius: 10px;
  margin-right: 10px;
`;

export const ReportButton = styled.button`
  border: 1px solid #e7e7e7;
  padding: 8px 12px;
  color: #6691ff;
  border-radius: 10px;
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

export const Modals = styled(Modal)`
  top: 40%;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

export const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const ModalText = styled.p`
  margin: 20px 0px;
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
