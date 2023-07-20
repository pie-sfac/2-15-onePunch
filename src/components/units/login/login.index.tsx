import React, { useState } from 'react';
import styles from "./login.module.css"

const Login: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const renderContent = () => {
    if (isAdmin) {
      return (
        <div>
          <h2 className={styles.title}>관리자 로그인</h2>
          <input className={styles.inputField} type="text" placeholder="아이디" />
          <input className={styles.inputField} type="password" placeholder="비밀번호" />
          <button className={styles.loginButton}>로그인</button>
          <p className={styles.linkText}>아이디 찾기 / 비밀번호 찾기</p>
          <p className={styles.linkText}>포인티 계정이 없으세요? 회원가입</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className={styles.title}>직원 로그인</h2>
          <input className={styles.inputField} type="text" placeholder="아이디" />
          <input className={styles.inputField} type="password" placeholder="비밀번호" />
          <button className={styles.loginButton}>로그인</button>
          <p className={styles.linkText}>아이디 찾기 / 비밀번호 찾기</p>
          <p className={styles.linkText}>포인티 계정이 없으세요? 회원가입</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.logo}>poinT</h2>
      <div className={styles.loginButtonContainer}>
      <button onClick={() => setIsAdmin(true)} className={styles.loginButton}>관리자 로그인</button>
      <button onClick={() => setIsAdmin(false)} className={styles.loginButton}>직원 로그인</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Login;