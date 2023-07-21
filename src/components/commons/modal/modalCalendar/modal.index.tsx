import { useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "./modal.styles";
import { Modal } from "antd";
import { modalState } from "../../../../commons/stores";
import { useNavigate } from "react-router-dom";

const ModalPage = () => {
  const navigate = useNavigate();
  const modalOpen = useRecoilValue(modalState);
  const setModalOpen = useSetRecoilState(modalState);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleClassWriteClick = () => {
    navigate("/schedulePage/classWrite");
    setModalOpen(false); // 모달 상태를 false로 변경합니다.
  };

  const handleConsultingWriteClick = () => {
    navigate("/schedulePage/consultingWrite");
    setModalOpen(false); // 모달 상태를 false로 변경합니다.
  };

  return (
    <>
      <S.ModalOut
        visible={modalOpen}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
      >
        <S.ModalWrapper>
          <S.Header>
            <S.Title>일정 생성</S.Title>
            <S.Label>일정을 생성해주세요. </S.Label>
          </S.Header>
          <S.Wrapper>
            <S.Main>
              <S.Box onClick={handleClassWriteClick}>
                <S.BoxTitle>개인 수업</S.BoxTitle>
                <S.BoxLabel>개인 수업 suppoting msg</S.BoxLabel>
                <S.GrayCircle />
              </S.Box>
              <S.Box onClick={handleConsultingWriteClick}>
                <S.BoxTitle>상담</S.BoxTitle>
                <S.BoxLabel>상담 suppoting msg</S.BoxLabel>
                <S.GrayCircle />
              </S.Box>
            </S.Main>
          </S.Wrapper>
        </S.ModalWrapper>
      </S.ModalOut>
    </>
  );
};

export default ModalPage;
