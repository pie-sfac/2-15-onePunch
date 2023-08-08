import React, { useState } from 'react';
import { Tabs, TabsProps } from "antd";
import { useForm } from 'react-hook-form';
// import  apiLogin from '../../../commons/api/apiLogin';
import * as S from "./login.styles.ts";
import { useRecoilState } from "recoil";
import {
  accessTokenStateForAdmin,
  accessTokenStateForStaffs,
} from "../../../commons/stores";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

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

  // 관리자 로그인 버튼이 파란색으로 바뀌는 조건을 체크하는 함수
  const isAdminLoginButtonDisabled =
    watch("Username")?.length > 0 && watch("Password")?.length > 0;

  // 직원 로그인 버튼이 파란색으로 바뀌는 조건을 체크하는 함수
  const isStaffLoginButtonDisabled =
    watch("Username")?.length > 0 &&
    watch("Password")?.length > 0 &&
    watch("CenterCode")?.length > 0;
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
        //2. accessToken globalState에 저장하기
        setTokenForAdmin(response.data.accessToken);
        alert("로그인 성공!");

        console.log("==============여기부터 response===========");
        console.log(response);
        console.log("==============여기까지 response===========");
        navigate("/schedulePage/calendar");
      })
      .catch((error) => {
        console.log("로그인 실패:", error);
        alert("로그인 실패...");
      });
  };

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

  return (
    <S.Container>
      <S.Logo src="/images/icons/Poin T.png" alt="포인티 로고" />
      <Tabs defaultActiveKey="1">
        <TabPane tab="관리자 로그인" key="1">
          <form onSubmit={handleSubmit(onSubmitHandlerForAdmin)}>
            <S.InputBox>아이디</S.InputBox>
            <S.InputField {...register("Username")} type="text" />
            <S.InputBox>비밀번호</S.InputBox>
            <S.InputField {...register("Password")} type="password" />
            <S.Button type="submit" disabled={!isAdminLoginButtonDisabled}>
              로그인
            </S.Button>
          </form>
        </TabPane>
        <TabPane tab="직원 로그인" key="2">
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
        </TabPane>
      </Tabs>
    </S.Container>
  );
};

export default Login;
