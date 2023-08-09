import * as S from "../modalConfirm/modalConfirm.style";

interface ModalAlertProps {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onOut: () => void;
}

// 공동으로 사용할 모달창
const ModalAlert: React.FC<ModalAlertProps> = ({
  title,
  message,
  confirmText,
  onConfirm,
  onOut,
}) => {
  return (
    <>
      <S.ModalBody>
        <S.ModalWrapper>
          <S.Icon src="/images/icons/Close_24px.png" onClick={onOut} />
          <S.Contents>
            <S.Top>
              <S.Txt>
                <S.Title>{title}</S.Title>
                <S.Message>{message}</S.Message>
              </S.Txt>
            </S.Top>

            <S.BtnWrapper>
              <S.OutBtn onClick={onConfirm}>{confirmText}</S.OutBtn>
            </S.BtnWrapper>
          </S.Contents>
        </S.ModalWrapper>
      </S.ModalBody>
    </>
  );
};

export default ModalAlert;
