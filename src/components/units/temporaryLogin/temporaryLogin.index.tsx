import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";

export default function LoginNewPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const handleLogin = async () => {
    try {
      const basicAuth = "Basic " + btoa(username + ":" + password);

      const response = await axios.post(
        "http://223.130.161.221/api/v1/admins/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      console.log(response.data.accessToken);

      if (response.data.accessToken === undefined) {
        alert("로그인에 실패했습니다! 다시 시도해 주세요!");
        return;
      }
      setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      alert("로그인에 성공했습니다!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <h1 style={{ fontSize: "20px", margin: "20px 0px" }}>임시 로그인</h1>
      <p>아이디</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>비밀번호</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        style={{
          border: "1px solid black",
          margin: "20px 0px",
          height: "40px",
        }}
      >
        로그인
      </button>
      <p style={{ margin: "20px 0px" }}>team15</p>
      <p>team15!!</p>
    </div>
  );
}
