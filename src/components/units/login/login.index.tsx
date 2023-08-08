import React from "react";
import React, { useState } from 'react';
import { Tabs, TabsProps } from "antd";
import { useForm } from "react-hook-form";
import apiLogin from "../../../commons/api/apiLogin";
import * as S from "./login.styles.ts";
import { useRecoilState } from "recoil";
import {
  accessTokenStateForAdmin,
  accessTokenStateForStaffs,
} from "../../../commons/stores";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  Username: string;
  Password: string;
  CenterCode: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [, setTokenForAdmin] = useRecoilState(accessTokenStateForAdmin);
  const [, setTokenForStaffs] = useRecoilState(accessTokenStateForStaffs);
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  // 관리자 로그인 버튼이 파란색으로 바뀌는 조건을 체크하는 함수
  const isAdminLoginButtonDisabled =
    watch("Username")?.length > 0 && watch("Password")?.length > 0;

  // 직원 로그인 버튼이 파란색으로 바뀌는 조건을 체크하는 함수
  const isStaffLoginButtonDisabled =
    watch("Username")?.length > 0 &&
    watch("Password")?.length > 0 &&
    watch("CenterCode")?.length > 0;

  //관리자 토큰
  //input에 모든 값이 들어오면 로그인 클릭 가능 함수
  const isAdminLoginButtonDisabled = watch('Username')?.length > 0 && watch('Password')?.length > 0;
  const isStaffLoginButtonDisabled = watch('Username')?.length > 0 && watch('Password')?.length > 0 && watch('CenterCode')?.length > 0;

  //눈 icon 클릭 시 비밀번호 text로 변경
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

//관리자 토큰

  //사용자 로그인
  //1. 로그인 해서 AccessToken 받아오기
  const onSubmitHandlerForAdmin = async (data: IFormInput) => {
    // Basic Authentication을 위한 header 설정
    const auth = "Basic " + btoa(data.Username + ":" + data.Password);
    // POST /api/v1/auth/login 로그인 요청
    await apiLogin
      .post(
        "/admins/login",
        {},
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("tokenForAdmin", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        //2. accessToken globalState에 저장하기
        setTokenForAdmin(response.data.accessToken);
        alert("로그인 성공!");

      console.log("accessToken : ", response.data.accessToken);
      console.log("refreshToken: ", response.data.refreshToken);
      navigate("/Home");
    })
    .catch((error)=>{
      console.log('로그인 실패:', error);
      alert("로그인 실패...")
    });
  }

  //스태프 토큰
  const onSubmitHandlerForStaffs = async (data: IFormInput) => {
    // Basic Authentication을 위한 header 설정
    const auth = "Basic " + btoa(data.Username + ":" + data.Password);
    // POST /api/v1/auth/login 로그인 요청
    await apiLogin
      .post(
        "/admins/login",
        {
          username: data.Username,
          password: data.Password,
          centerCode: parseInt(data.CenterCode),
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("tokenForStaffs", response.data.accessToken);
        setTokenForStaffs(response.data.accessToken);
        alert("로그인 성공!");
      })
      .catch((error) => {
        console.log("로그인 실패:", error);
        alert("로그인 실패...");
      });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `관리자 로그인`,
      children: (
        <form onSubmit={handleSubmit(onSubmitHandlerForAdmin)}>
          <S.InputBox>아이디</S.InputBox>
          <S.InputField {...register("Username")} type="text" />
          <S.InputBox>비밀번호</S.InputBox>
          <S.InputField {...register("Password")} type="password" />
          <S.Button type="submit" disabled={!isAdminLoginButtonDisabled}>
            로그인
          </S.Button>
        </form>
      ),
    },
    {
      key: "2",
      label: `직원 로그인`,
      children: (
        <form onSubmit={handleSubmit(onSubmitHandlerForStaffs)}>
          <S.InputBox>아이디</S.InputBox>
          <S.InputField {...register("Username")} type="text" />
          <S.InputBox>비밀번호</S.InputBox>
          <S.InputField {...register("Password")} type="password" />
          <S.InputBox>센터코드</S.InputBox>
          <S.InputField {...register("CenterCode")} type="string" />
          <S.Button type="submit" disabled={!isStaffLoginButtonDisabled}>
            로그인
          </S.Button>
        </form>
      ),
    },
  ];
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

  const items: TabsProps['items'] = [
  {
    key: '1',
    label: `관리자 로그인`,
    children: 
          <form onSubmit={handleSubmit(onSubmitHandlerForAdmin)}>
            <S.InputBox>아이디</S.InputBox>
            <S.InputField {...register("Username")} type="text" />
            <S.InputBox>비밀번호</S.InputBox>
            <S.InputWrapper>
            <S.InputField {...register("Password")} type={isPasswordVisible ? "text" : "password"} />
              <S.Icon src={isPasswordVisible ? "/images/icons/Visibility_off.png" : "/images/icons/Visibility_on.png"} 
                alt="눈 icon" 
                onClick={togglePasswordVisibility}/>
            </S.InputWrapper>
            <S.Button type="submit" disabled={!isAdminLoginButtonDisabled}>로그인</S.Button>
          </form>
    ,
  },
  {
    key: '2',
    label: `직원 로그인`,
    children: 
          <form onSubmit={handleSubmit(onSubmitHandlerForStaffs)}>
            <S.InputBox>아이디</S.InputBox>
            <S.InputField {...register("Username")} type="text"/>
            <S.InputBox>비밀번호</S.InputBox>
            <S.InputWrapper>
            <S.InputField {...register("Password")} type={isPasswordVisible ? "text" : "password"} />
              <S.Icon src={isPasswordVisible ? "/images/icons/Visibility_off.png" : "/images/icons/Visibility_on.png"} 
                alt="눈 icon" 
                onClick={togglePasswordVisibility}/>
            </S.InputWrapper> 
            <S.InputBox>센터코드</S.InputBox>
            <S.InputField {...register("CenterCode")} type="string" />
            <S.Button type="submit" disabled={!isStaffLoginButtonDisabled}>로그인</S.Button>
          </form>
  ,
  },
];

  return (
    <S.Container>
      <S.Logo src="/images/icons/Poin T.png" alt="포인티 로고" />
      <Tabs defaultActiveKey="1" items={items} />
    </S.Container>
  );
};

export default Login;
