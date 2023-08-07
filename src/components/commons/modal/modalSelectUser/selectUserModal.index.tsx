import * as S from "./selectUserModal.style";
import { Modal } from "antd";
import { Phone } from "../../../../commons/libraries/utils";

interface SelectUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  members: Member[];
  staffs: Staff[];
  select: boolean;
  onClickGetMemberId: (event: any) => void;
  onClickGetStaffId: (event: any) => void;
}

interface Member {
  id: string;
  name: string;
  phone: string;
}

interface Staff {
  id: string;
  name: string;
  phone: string;
}

export default function SelectUserModal({
  isVisible,
  onClose,
  members,
  staffs,
  select,
  onClickGetMemberId,
  onClickGetStaffId,
}: SelectUserModalProps) {
  return (
    <Modal
      title={!select ? "회원 선택" : "직원 선택"}
      visible={isVisible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      {!select ? (
        <>
          {members.map((member, index) => (
            <S.MemberBox
              key={index}
              id={member.id}
              onClick={onClickGetMemberId}
            >
              <S.SmileOut />
              <S.MemberTag>회원</S.MemberTag>
              <S.MemberName>{member.name}</S.MemberName>
              <S.MemberPhone>{Phone(member.phone)}</S.MemberPhone>
            </S.MemberBox>
          ))}
        </>
      ) : (
        <>
          {staffs.map((staff, index) => (
            <S.StaffBox key={index} id={staff.id} onClick={onClickGetStaffId}>
              <S.SmileOut />
              <S.StaffTag>직원</S.StaffTag>
              <S.StaffName>{staff.name}</S.StaffName>
              <S.StaffPhone>{Phone(staff.phone)}</S.StaffPhone>
            </S.StaffBox>
          ))}
        </>
      )}
    </Modal>
  );
}
