import * as S from "./style";

export default function ConsultationRecordModal(
  setIsVisible: any,
  setMemo: any
) {
  return (
    <>
      <S.ModalTitle>상담 기록</S.ModalTitle>
      <S.ModalText>회원님과 나눈 내용을 자유롭게 작성해 보세요.</S.ModalText>
      <S.TextAreaOut
        showCount
        maxLength={1000}
        style={{ height: 280, resize: "none" }}
        placeholder=""
        onChange={(event: any) => setMemo(event.target.value)}
      />
      <S.ButtonContainer>
        <S.CancelButton onClick={() => setIsVisible(false)}>
          취소
        </S.CancelButton>
        <S.SaveButton>저장</S.SaveButton>
      </S.ButtonContainer>
    </>
  );
}
