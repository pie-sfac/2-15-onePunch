import * as S from "./modalConfirm.style";

interface ModalConfirmProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: (issuedTicketId?: any) => void;
  onCancel: () => void | {};
}

// 공동으로 사용할 모달창
const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      
      <S.ModalBody>
        <S.ModalWrapper>
          <S.Icon src="/images/icons/Close_24px.png" onClick={onCancel} />

          <S.Contents>
            <S.Top>
              <S.Txt>
                <S.Title>{title}</S.Title>
                <S.Message>{message}</S.Message>
              </S.Txt>
            </S.Top>

            <S.BtnWrapper>
              <S.NoBtn onClick={onCancel}>{cancelText}</S.NoBtn>
              <S.YesBtn onClick={onConfirm}>{confirmText}</S.YesBtn>
            </S.BtnWrapper>
          </S.Contents>
        </S.ModalWrapper>
      </S.ModalBody>
    </>
  );
};

export default ModalConfirm;
