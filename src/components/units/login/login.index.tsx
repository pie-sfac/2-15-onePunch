import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Container, Title, Logo, InputField, ButtonContainer, Button, LinkText } from './login.styles';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../commons/stores';

const Login: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  //리코일 사용하기
  //1. atom.js 파일을 생성하고 저장할 atom을 정의한다.
  //2. 이제 Login 컴포넌트에서 이 atom을 사용하여 'accessToken' 저장 가능
  //3. 저장하기 위해 useRecoilState hook 사용
  const [token, setToken] = useRecoilState(accessTokenState);
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
      await axios.post('http://223.130.161.221/api/v1/admins/login', 
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
      //token을 localstorage에 저장한 것처럼 위 seToken에 담아줌. 
      //이제 전역에서 호출해서 사용 가능
      setToken(response.data.accessToken);
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
          <p>team15</p>
          <p>team15!!</p>
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