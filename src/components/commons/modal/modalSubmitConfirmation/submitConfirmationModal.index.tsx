import { useNavigate } from "react-router-dom";
import * as S from "./submitConfirmationModal.style";

interface SubmitConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SubmitConfirmationModal({
  isVisible,
  onClose,
}: SubmitConfirmationModalProps) {
  const navigate = useNavigate();
  return (
    <S.ModalOut
      title="수업 등록 완료"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <S.ModalContent>
        <p>수업 등록이 완료되었습니다.</p>
        <S.ConfirmButton
          onClick={() => {
            onClose();
            navigate("/schedulePage/calendar");
          }}
        >
          확인
        </S.ConfirmButton>
      </S.ModalContent>
    </S.ModalOut>
  );
}
