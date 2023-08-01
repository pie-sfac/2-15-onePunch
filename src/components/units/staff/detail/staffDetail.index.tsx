import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useNavigate, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import * as S from "./staffDetail.style";
import ModalConfirm from "../../../commons/modal/modalConfirm/modalConfirm.index";
import ModalAlert from "../../../commons/modal/modalAlert/modalAlert.index";

type RoleType = {
  id: number;
  name: string;
};

type MemberType = {
  id: number;
  name: string;
  phone: string;
  sex: "MALE" | "FEMALE";
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
};

type PrivateTutorType = {
  id: number;
  name: string;
};

type PrescriptionReviewType = {
  id: number;
  privateTutor: PrivateTutorType;
  member: MemberType;
  rating: number;
  content: string;
  createdAt: string;
};

export type StaffType = {
  id: number;
  type: "ADMIN" | "STAFF";
  name: string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  loginId: string;
  memo: string;
  pwdChangeRequired: boolean;
  roles: RoleType[];
  members: MemberType[];
  lastLoginedAt: string;
  prescriptionReviews: PrescriptionReviewType[];
  message: string;
};

const StaffDetail: React.FC = () => {
  const navigate = useNavigate();
  const [staffDetail, setStaffDetail] = useState<StaffType | null>(null);
  const { id } = useParams<{ id: string }>();
  const staffId = parseInt(id!);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [IsStaffResignation, setIsStaffResignation] = useState(false);
  const [isResignationModalVisible, setIsResignationModalVisible] =
    useState(false);
  const [isChangePwModalVisible, setIsChangePwModalVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneChangePw, setIsDoneChangePw] = useState(false); // 비번 초기화 완료했냐

  // 모달 열림 핸들러
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫힘 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    apiInstance
      .get("/staffs/" + staffId)
      .then((response) => {
        setStaffDetail(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [staffId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // return <p>Error: {error.message}</p>;
  }
  /////////////////////////////////////
  // 직원 정보 수정 핸들러
  /////////////////////////////////////
  const HandleInfoEdit = () => {
    // console.log("click handle profile edit")
    console.log(staffId);
    navigate(`/staffPage/detail/${staffId}/edit`);
  };

  /////////////////////////////////////
  //직원 퇴사 처리 핸들러
  /////////////////////////////////////
  const handleStaffResignation = () => {
    console.log("handleStaffResignation");
    setIsResignationModalVisible(true);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    apiInstance
      .post(`/staffs/${staffId}/resign`)
      .then((response) => {
        setStaffDetail(response.data);
        console.log(response.data);
        console.log(response.data.message);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // setIsStaffResignation(true);
    setIsResignationModalVisible(false);
    setIsModalOpen(false);
    navigate(0);
    console.log("퇴사 처리되었습니다.");
  };
  const handleCancel = () => {
    setIsResignationModalVisible(false);
    setIsModalOpen(false);
    console.log("취소하셨습니다.");
  };

  /////////////////////////////////////
  // 비밀번호 초기화 핸들러
  /////////////////////////////////////
  const handleResetPassword = () => {
    console.log("handleResetPassword");
    setIsChangePwModalVisible(true);
    setIsModalOpen(true);
  };
  const handleConfirmChangePw = () => {
    setIsChangePwModalVisible(false);
    setIsModalOpen(false);
    setIsDoneChangePw(true);
    console.log("비밀번호가 초기화되었스비다");
  };

  const handleCancelChangePw = () => {
    setIsChangePwModalVisible(false);
    setIsModalOpen(false);
    console.log("취소하셨습니다.");
  };

  /////////////////////////////////////
  // 직원 역할 및 할당 가능 역할 조회 | 직원 역할 변경
  /////////////////////////////////////
  const handleChangeRole = () => {
    console.log("handleChangeRole.");
    apiInstance
      .get(`/staffs/${staffId}/change-role`)
      .then((response) => {
        // setStaffDetail(response.data);
        console.log(response.data);
        const data = response.data;
        // console.log(response.data.message);
        setRoles(data);
        data.currentRoleIds.forEach((id: any) => {
          const role = data.roles.find((role: any) => role.id === id);
          if (role) {
            console.log(role.name);
          }
        });
        navigate(`/staffPage/roles/${staffId}`)
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    staffDetail && (
      <>
        {isResignationModalVisible && (
          <ModalConfirm
            title="해당 직원을 퇴사 처리하시겠습니까?"
            message="퇴사 후, 해당 직원의 정보는 조회만 가능합니다."
            confirmText="예"
            cancelText="아니요"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        {isChangePwModalVisible && (
          <ModalConfirm
            title="해당 직원의 비밀번호를 초기화하시겠습니까?"
            message="이 작업은 되돌릴 수 없습니다."
            confirmText="예"
            cancelText="아니요"
            onConfirm={handleConfirmChangePw}
            onCancel={handleCancelChangePw}
          />
        )}
        {isDoneChangePw && (
          <ModalAlert
            title="비밀번호 초기화 완료"
            message="초기화된 비밀번호는 [0000]입니다."
            confirmText="확인"
            onConfirm={() => {
              setIsDoneChangePw(false);
              navigate(-1);
            }}
            onOut={() => {
              setIsDoneChangePw(false);
            }}
          />
        )}
        {/* 직원 정보, 개인 수업 회원, 만족도 후기, 메모 */}

        {/* 직원 정보 */}
        {/* <div style={{ display: isModalOpen ? "none" : "block" }}> */}
        <div
          style={{ display: isModalOpen || isDoneChangePw ? "none" : "block" }}
        >
          <div>
            <div style={{ border: "1px solid blue" }}>
              <div style={{ border: "1px solid black" }}>
                <p>직원 정보</p>
                <p>{staffDetail.createdAt} 등록</p>
              </div>
              <div style={{ border: "1px solid black" }}>
                <p onClick={handleChangeRole}>권한 설정</p>
                <p onClick={handleResetPassword}>비밀번호 초기화</p>
                <button onClick={handleStaffResignation}>직원 퇴사 처리</button>
              </div>
            </div>
            <div style={{ border: "1px solid blue" }}>
              <div>
                <img
                  src="/images/icons/Profile_edit.png"
                  alt="profilePic_edit"
                />
              </div>
              <div>
                <p>{staffDetail.name}</p>
                {/* <p>{staffDetail.name}</p> */}
                <p>알림메세지 관리 권한</p>
                <p>+3</p>
              </div>
              <br />
              <div>
                <p>{staffDetail.phone}</p>
              </div>
              <br />
              <div>
                <p>{staffDetail.loginId}</p>
              </div>
              <br />
              <div>
                <p>
                  {staffDetail.active ? (
                    "재직중"
                  ) : (
                    <span style={{ color: "red  " }}>퇴사</span>
                  )}
                </p>
              </div>
              <br />
              <div>
                <img
                  src="/images/icons/Edit.png"
                  alt="staff_edit"
                  onClick={HandleInfoEdit}
                />
              </div>
            </div>
          </div>

          {/* 개인 수업 회원 */}
          <div>
            <div style={{ border: "1px solid blue" }}>
              <div style={{ border: "1px solid black" }}>
                <p>개인 수업 회원</p>
                <p>{staffDetail.members.length}</p>
              </div>

              {/* 프로필이미지, 회원명, 성별, 유효기간, 잔여 횟수, 담당자, 최근방문일 */}
              {staffDetail.members.length !== 0 ? (
                <>
                  {staffDetail.members.map((member) => (
                    <div key={member.id}>
                      <S.AvatarOut icon={<UserOutlined size={23} />} />
                      <p>{member.name}</p>
                      <p>{member.sex}</p>
                      <p>유효 기간</p>
                      <p>잔여 횟수</p>
                      <p>{staffDetail.name}</p>
                      <p>{member.visitedAt}</p>
                      <br />
                    </div>
                  ))}
                  <div>
                    <button>더 보기 &gt; </button>
                  </div>
                </>
              ) : (
                <div>
                  <img
                    src="../../../../../public/images/icons/Empty_person.png"
                    alt="empty_person"
                  />
                  <p>배정된 회원이 없습니다.</p>
                </div>
              )}
            </div>

            <div style={{ border: "1px solid blue" }}>
              <div style={{ border: "1px solid black" }}>
                <p>만족도 후기</p>
                <p>{staffDetail.prescriptionReviews.length}</p>
              </div>

              {staffDetail.prescriptionReviews.length !== 0 ? (
                <>
                  {staffDetail.prescriptionReviews.map((review) => (
                    <div key={review.id}>
                      <S.AvatarOut icon={<UserOutlined size={23} />} />
                      <p>{review.member.name}</p>
                      <p>{review.member.phone}</p>
                      <p>별점: {review.rating}</p>
                      <p>만족도: {review.rating}</p>
                      <p>{review.privateTutor.name}</p>
                      <p>{review.createdAt}</p>
                      <br />
                    </div>
                  ))}
                  <div>
                    <button>더 보기 &gt; </button>
                  </div>
                </>
              ) : (
                <div>
                  <img
                    src="../../../../../public/images/icons/Empty_person.png"
                    alt="empty_person"
                  />
                  <p>아직 받은 후기가 없습니다 </p>
                </div>
              )}
            </div>

            <div style={{ border: "1px solid blue" }}>
              <div style={{ border: "1px solid black" }}>
                <p>메모</p>
              </div>
              <div>
                <textarea name="" id="" placeholder="권한 설정 필요"></textarea>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default StaffDetail;
