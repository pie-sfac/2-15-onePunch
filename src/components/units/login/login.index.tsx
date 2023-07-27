import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import apiLogin from '../../../commons/api/apiLogin';
import * as S from "./login.styles.ts";
import { useRecoilState } from 'recoil';
import { accessTokenStateForAdmin, accessTokenStateForStaffs } from '../../../commons/stores';

interface IFormInput {
  Username: string;
  Password: string;
  CenterCode: string;
}

const Login: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [, setTokenForAdmin] = useRecoilState(accessTokenStateForAdmin);
  const [, setTokenForStaffs] = useRecoilState(accessTokenStateForStaffs);
  const { register, handleSubmit } = useForm<IFormInput>();

//관리자 토큰
  const onSubmitHandlerForAdmin = async(data: IFormInput) => {
    // Basic Authentication을 위한 header 설정
    const auth = 'Basic ' + btoa(data.Username + ':' + data.Password);
    // POST /api/v1/auth/login 로그인 요청
    await apiLogin.post('/admins/login', 
    {
      username: data.Username,
      password: data.Password,
    }, 
    {
      headers: {
        'Authorization': auth
      }
    })
    .then ((response)=>{
      localStorage.setItem('tokenForAdmin', response.data.accessToken);
      setTokenForAdmin(response.data.accessToken);
      alert("로그인 성공!")
    })
    .catch((error)=>{
      console.log('로그인 실패:', error);
      alert("로그인 실패...")
    });
  }

//스태프 토큰
  const onSubmitHandlerForStaffs = async(data: IFormInput) => {
    // Basic Authentication을 위한 header 설정
    const auth = 'Basic ' + btoa(data.Username + ':' + data.Password);
    // POST /api/v1/auth/login 로그인 요청
    await apiLogin.post('/admins/login', 
    {
      username: data.Username,
      password: data.Password,
      centerCode : parseInt(data.CenterCode),
    }, 
    {
      headers: {
        'Authorization': auth
      }
    })
    .then ((response)=>{
      localStorage.setItem('tokenForStaffs', response.data.accessToken);
      setTokenForStaffs(response.data.accessToken);
      alert("로그인 성공!")
    })
    .catch((error)=>{
      console.log('로그인 실패:', error);
      alert("로그인 실패...")
    });
  }

  const renderContent = () => {
    if (isAdmin) {
      return (
        <form onSubmit={handleSubmit(onSubmitHandlerForAdmin)}>
          <S.Title>관리자 로그인</S.Title>
          <S.InputField {...register("Username")} type="text" placeholder="아이디" />
          <S.InputField {...register("Password")} type="password" placeholder="비밀번호" />
          <S.Button type="submit">로그인</S.Button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmitHandlerForStaffs)}>
          <S.Title>직원 로그인</S.Title>
          <S.InputField {...register("Username")} type="text" placeholder="아이디" />
          <S.InputField {...register("Password")} type="password" placeholder="비밀번호" />
          <S.InputField {...register("CenterCode")} type="number" placeholder="센터코드" />
          <S.Button type="submit">로그인</S.Button>
        </form>
      );
    }
  };

  return (
    <S.Container>
      <S.Logo>poinT</S.Logo>
      <S.ButtonContainer>
        <S.Button onClick={() => setIsAdmin(true)}>관리자 로그인</S.Button>
        <S.Button onClick={() => setIsAdmin(false)}>직원 로그인</S.Button>
      </S.ButtonContainer>
      {renderContent()}
    </S.Container>
  );
};

export default Login;