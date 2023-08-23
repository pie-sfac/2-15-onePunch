import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import * as S from "./staffRoles.style";
import { LeftOutlined } from "@ant-design/icons";
import ModalAlert from "../../../commons/modal/modalAlert/modalAlert.index";

interface AssignableRoles {
  currentRoleIds: number[];
  roles: { id: number; name: string; description: string }[];
}

const StaffRoles: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const staffId = parseInt(id!);
  const [rolesData, setRolesData] = useState<AssignableRoles | null>(null);
  const [checkedRoles, setCheckedRoles] = useState<number[]>([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 해당 staff의 역할id 가져옴
  useEffect(() => {
    apiInstance
      .get(`/staffs/${staffId}/change-role`)
      .then((response) => {
        // setStaffDetail(response.data);

        const data = response.data;
        setRolesData(data);
        setCheckedRoles(data.currentRoleIds);
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  // 클릭 시 checkedRoles 업데이트
  const onCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    roleId: number
  ) => {
    if (e.target.checked) {
      setCheckedRoles([...checkedRoles, roleId]);
    } else {
      setCheckedRoles(checkedRoles.filter((id) => id !== roleId));
    }
  };

  // 폼 전송
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiInstance
      .post(`/staffs/${staffId}/change-role`, { roleIds: checkedRoles })
      .then((response) => {});
  };

  return (
    <>
      {showModal ? (
        <ModalAlert
          title="저장 완료"
          message=""
          confirmText="확인"
          onConfirm={() => navigate("/staffPage/list")}
          onOut={() => navigate("/staffPage/list")}
        />
      ) : (
        <>
          <S.RoleHeader>
            <LeftOutlined onClick={() => navigate(-1)} />
            <S.Appbar>권한 설정</S.Appbar>
          </S.RoleHeader>
          <S.Wrapper>
            <div>
              <S.Title>역할 설정</S.Title>
            </div>
            <div>
              <S.SubTitle>역할 선택 (중복선택 가능)</S.SubTitle>
              <S.Text>
                센터에서 설정한 역할을 등록하려는 직원에게 부여합니다.
              </S.Text>
            </div>

            <form onSubmit={onSubmitHandler}>
              <S.CheckBoxWrapper>
                <S.CheckBox
                  id="general"
                  type="checkbox"
                  defaultChecked
                  hidden
                />
                <label htmlFor="general">
                  <S.Selected isSelected={true}>
                    <S.Role>일반 직원 (기본)</S.Role>
                    <S.Text>가장 기존적인 권한만 소유하고 있습니다.</S.Text>
                  </S.Selected>
                </label>
              </S.CheckBoxWrapper>
              {rolesData?.roles.map((role) => (
                <S.CheckBoxWrapper key={role.id}>
                  <S.CheckBox
                    className="hidden peer"
                    id={role.id.toString()}
                    type="checkbox"
                    value={role.id}
                    onChange={(e) => onCheckHandler(e, role.id)}
                    hidden
                  />
                  <label htmlFor={role.id.toString()}>
                    <S.Selected
                      isSelected={checkedRoles.includes(role.id)} // currentRoleIds에 role.id가 있는지 확인
                    >
                      <S.Role>{role.name}</S.Role>
                      <S.Text>{role.description}</S.Text>
                    </S.Selected>
                  </label>
                </S.CheckBoxWrapper>
              ))}
              <S.BtnWrapper>
                <S.backBtn type="button" onClick={() => navigate(-1)}>
                  뒤로
                </S.backBtn>
                <S.submitBtn type="submit" onClick={() => setShowModal(true)}>
                  완료
                </S.submitBtn>
              </S.BtnWrapper>
            </form>
          </S.Wrapper>
        </>
      )}
    </>
  );
};

export default StaffRoles;
