import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

export default function LoginNewPage() {
  const navigate = useNavigate();
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
      console.log(response.data.refreshToken);

      if (
        response.data.accessToken === undefined ||
        response.data.refreshToken === undefined
      ) {
        alert("로그인에 실패했습니다! 다시 시도해 주세요!");
        return;
      }
      setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken); // 추가된 부분

      navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          marginTop: "30%",
        }}
      >
        <img
          src="/images/icons/PoinT.png"
          alt=""
          style={{ width: "77px", margin: "auto" }}
        />
        <h1
          style={{
            fontSize: "14px",
            margin: "40px 0px 20px 0px",
            color: "#6691FF",
            fontWeight: "700",
          }}
        >
          관리자 로그인
        </h1>
        <p style={{ margin: "10px 0px", fontSize: "14px" }}>아이디</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px 10px",
            border: "1px solid #DBDBDB",
            borderRadius: "4px",
          }}
        />
        <p style={{ margin: "10px 0px", fontSize: "14px" }}>비밀번호</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px 10px",
            border: "1px solid #DBDBDB",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            border: "none",
            margin: "40px 0px",
            height: "60px",
            backgroundColor: "#2D62EA",
            color: "white",
            borderRadius: "4px",
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
