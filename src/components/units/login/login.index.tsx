import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from '../../../commons/api/axios';
import { Container, Title, Logo, InputField, ButtonContainer, Button, LinkText } from './login.styles';

const Login: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  //아이디, 비번 상태값 변경될 때마다 잘 찍히고 있는지 확인
useEffect(() => {
  console.log('Username: ', Username);
  console.log('Password: ', Password);
}, [Username, Password]);

  const onChangeUsername = (event:ChangeEvent<HTMLInputElement>)=>{
    setUsername(event.target.value)
  }
  const onChangePassword = (event:ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value)
  }

  const onSubmitHandler = async(e: any) => {
    e.preventDefault();
     // Basic Authentication을 위한 header 설정
      const auth = 'Basic ' + btoa(Username + ':' + Password);
      // 1. POST /api/v1/auth/login 로그인 요청
      await axios.post('/admins/login', 
      {
        username: Username,
        password: Password,
      }, 
      {
        headers: {
          'Authorization': auth
        }
      })
    // 2. 로그인 성공 시, 서버로부터 Access, Refresh Token을 Response로 전달 받고 해당 토큰을 로컬 스토리지에 저장
    .then ((response)=>{
      console.log("======로그인 성공=======");
      console.log(response.data);
      console.log("======로그인 성공=======");

      localStorage.setItem('token', response.data.accessToken);
      console.log(response.data.accessToken);
      alert("로그인 성공!")
  })
  .catch((error)=>{
    console.log('=========로그인 실패==========');
    console.log(error);
    console.log('=========로그인 실패==========');
    alert("로그인 실패...")
  });
  }

  const renderContent = () => {
    if (isAdmin) {
      return (
        <Container>
          <Title>관리자 로그인</Title>
          <InputField type="text" placeholder="아이디" onChange={onChangeUsername}/>
          <InputField type="password" placeholder="비밀번호" onChange={onChangePassword}/>
          <Button onClick={onSubmitHandler}>로그인</Button>
          <LinkText>아이디 찾기 / 비밀번호 찾기</LinkText>
          <LinkText>포인티 계정이 없으세요? 회원가입</LinkText>
        </Container>
      );
    } else {
      return (
        <Container>
          <Title>직원 로그인</Title>
          <InputField type="text" placeholder="아이디" onChange={onChangeUsername}/>
          <InputField type="password" placeholder="비밀번호" onChange={onChangePassword}/>
          <Button onClick={onSubmitHandler}>로그인</Button>
          <LinkText>아이디 찾기 / 비밀번호 찾기</LinkText>
          <LinkText>포인티 계정이 없으세요? 회원가입</LinkText>
          <p>team15</p>
          <p>team15!!</p>
        </Container>
      );
    }
  };

  return (
    <Container>
      <Logo>poinT</Logo>
      <ButtonContainer>
        <Button onClick={() => setIsAdmin(true)}>관리자 로그인</Button>
        <Button onClick={() => setIsAdmin(false)}>직원 로그인</Button>
      </ButtonContainer>
      {renderContent()}
    </Container>
  );
};

export default Login;