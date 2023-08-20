// CancelModal.js

import * as S from "./style";

export default function CancelModal(setIsVisible: any, onClickCancel: any) {
  return (
    <S.ModalWrapper>
      <S.ModalTitle>수업 일정 취소</S.ModalTitle>
      <S.ModalText>취소를 진행하시겠습니까?</S.ModalText>
      <S.ModalButtonWrapper>
        <S.ModalNegativeButton onClick={() => setIsVisible(false)}>
          아니요
        </S.ModalNegativeButton>{" "}
        <S.ModalPositiveButton onClick={onClickCancel}>
          예
        </S.ModalPositiveButton>
      </S.ModalButtonWrapper>
    </S.ModalWrapper>
  );
}
