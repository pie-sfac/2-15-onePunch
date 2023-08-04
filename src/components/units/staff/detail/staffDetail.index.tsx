import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import * as S from "./staffDetail.style";
import ModalConfirm from "../../../commons/modal/modalConfirm/modalConfirm.index";
import ModalAlert from "../../../commons/modal/modalAlert/modalAlert.index";
import { Dropdown, MenuProps, Space } from "antd";

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
  const [isMoreVert, setIsMoreVert] = useState(false);

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
        navigate(`/staffPage/roles/${staffId}`);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // more 메뉴 관리
  const moreVertHandler = () => {
    setIsMoreVert(!isMoreVert);
  };

  const items: MenuProps["items"] = [
    {
      label: "권한 설정",
      key: "0",
      onClick: () => {
        handleChangeRole();
      },
    },
    {
      label: "비밀번호 초기화",
      key: "1",
      onClick: () => {
        handleResetPassword();
      },
    },

    {
      label: "직원 퇴사 처리",
      key: "3",
      onClick: () => {
        handleStaffResignation();
      },
    },
  ];
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2); // 연도의 마지막 두 자리
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 달은 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }
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

        <S.StaffDetailHeader
          style={{
            display: isModalOpen || isDoneChangePw ? "none" : "",
          }}
        >
          <LeftOutlined onClick={() => navigate(-1)} />
          <S.Appbar>직원 목록 상세</S.Appbar>
        </S.StaffDetailHeader>

        <S.Wrapper
          style={{
            display: isModalOpen || isDoneChangePw ? "none" : "block",
            padding: "5px 15px",
          }}
        >
          <div>
            {/* <div> */}
            <S.Label>
              <S.StaffInfoMenu>
                <S.FlexRow>
                  <S.TitleText>직원 정보</S.TitleText>
                  <S.GreyText>
                    {formatDate(staffDetail.createdAt)} 등록
                  </S.GreyText>
                </S.FlexRow>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <Space>
                    <MoreOutlined
                      style={{ marginLeft: "auto" }}
                      onClick={moreVertHandler}
                    />
                  </Space>
                </Dropdown>
              </S.StaffInfoMenu>

              <S.StaffInfoWrapper>
                <S.StaffInfoTop>
                  <div>
                    <img
                      src="/images/icons/Profile_edit.png"
                      alt="profilePic_edit"
                    />
                  </div>
                  <S.StaffName>{staffDetail.name}</S.StaffName>
                  <S.Text>알림메세지 관리 권한</S.Text>
                  <S.Text>+3</S.Text>
                </S.StaffInfoTop>
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
                    style={{ marginLeft: "90%" }}
                  />
                </div>
              </S.StaffInfoWrapper>
            </S.Label>
            {/* </div> */}
          </div>
          {/* 개인 수업 회원 */}
          <div>
            <S.Label>
              <S.FlexRow>
                <S.TitleText>개인 수업 회원</S.TitleText>
                <S.TotalCount>{staffDetail.members.length}</S.TotalCount>
              </S.FlexRow>

              {/* 프로필이미지, 회원명, 성별, 유효기간, 잔여 횟수, 담당자, 최근방문일 */}

              {staffDetail.members.length !== 0 ? (
                <>
                  {staffDetail.members.map((member) => (
                    <S.MemberBox key={member.id}>
                      <S.AvatarOut icon={<UserOutlined size={23} />} />
                      <S.Name>{member.name}</S.Name>
                      <S.Sex>{member.sex === "FEMALE" ? "여" : "남"}</S.Sex>
                      <p>22.00.00 ~ 22.00.00</p>
                      <S.RightText>80회</S.RightText>
                      {/* <p>{staffDetail.name}</p> */}
                      <S.RightText>{formatDate(member.visitedAt)}</S.RightText>
                    </S.MemberBox>
                  ))}
                  <div style={{ textAlign: "center" }}>
                    <S.MoreBtn>더보기 &gt; </S.MoreBtn>
                  </div>
                </>
              ) : (
                <S.EmptyWrapper>
                  <S.EmptyIcon
                    src="/images/icons/Empty_person.png"
                    alt="empty_person"
                  />
                  <p>배정된 회원이 없습니다.</p>
                </S.EmptyWrapper>
              )}
            </S.Label>

            <S.Label>
              <S.FlexRow>
                <S.TitleText>만족도 후기</S.TitleText>
                <S.TotalCount>
                  {staffDetail.prescriptionReviews.length}
                </S.TotalCount>
              </S.FlexRow>

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
                  <div style={{ textAlign: "center" }}>
                    <S.MoreBtn>더보기 &gt; </S.MoreBtn>
                  </div>
                </>
              ) : (
                <S.EmptyWrapper>
                  <S.EmptyIcon
                    src="/images/icons/Empty_person.png"
                    alt="empty_person"
                  />
                  <p>아직 받은 후기가 없습니다 </p>
                </S.EmptyWrapper>
              )}
            </S.Label>

            <S.Label>
              <S.FlexRow>
                <S.TitleText>메모</S.TitleText>
              </S.FlexRow>
              <div style={{ textAlign: "center" }}>
                <S.Memo name="" id="" placeholder="권한 설정 필요"></S.Memo>
              </div>
            </S.Label>
          </div>
        </S.Wrapper>
      </>
    )
  );
};
export default StaffDetail;
