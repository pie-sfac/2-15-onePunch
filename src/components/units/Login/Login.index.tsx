import React, { useState } from 'react';

enum ModalType {
  AdminLogin = 'adminLogin',
  EmployeeLogin = 'employeeLogin',
}

// currentModal 상태와 setCurrentModal 함수를 useState 훅을 사용하여 초기화
const Login: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);

  // 모달 열기 함수
  const openModal = (modalType: ModalType) => {
    setCurrentModal(modalType);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setCurrentModal(null);
  };

  // 모달 내용 렌더링 함수
  const renderModalContent = () => {
    switch (currentModal) {
      case ModalType.AdminLogin:
        // 관리자 로그인 모달 내용
        return (
          <div>
            <h2>관리자 로그인</h2>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <button>로그인</button>
            <p>아이디 찾기 / 비밀번호 찾기</p>
            <p>포인티 계정이 없으세요? 회원가입</p>
          </div>
        );
      case ModalType.EmployeeLogin:
        // 직원 로그인 모달 내용
        return (
          <div>
            <h2>직원 로그인</h2>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <button>로그인</button>
            <p>아이디 찾기 / 비밀번호 찾기</p>
            <p>포인티 계정이 없으세요? 회원가입</p>
          </div>
        );
      default:
        return null; // 기본값은 null을 반환하여 모달이 열리지 않은 상태를 나타냄
    }
  };
  return(
    <>
    {/* 관리자 로그인 버튼 */}
       <button onClick={() => openModal(ModalType.AdminLogin)}>관리자 로그인</button>
    {/* 직원 로그인 버튼 */}  
      <button onClick={() => openModal(ModalType.EmployeeLogin)}>직원 로그인</button>
     
    {/* 모달이 열려 있는 경우에만 모달 영역을 렌더링 */}
      {currentModal && (
        <div>
          {/* 모달 외부 클릭 시 모달 닫기 */}
          <div onClick={closeModal} className="modal-overlay" />
          {/* 모달 내용 */}
          <div className="modal-content">{renderModalContent()}</div>
        </div>
      )}
    </>
  );
};
export default Login;
