import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://223.130.161.221/api/v1",
});

export const refreshingToken = axios.create({
  baseURL: "http://223.130.161.221/api/v1",
});

export const apiLogin = axios.create({
  baseURL: "http://223.130.161.221/api/v1",
});

apiInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("tokenForAdmin");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let refreshing = false;
let refreshPromise: Promise<any> | null = null;

async function getNewTokenWithRefreshToken() {
  //local storage에서 refreshToken 읽어와서 변수에 담기
  const refreshToken: string | null = localStorage.getItem("refreshToken");

  // 이미 한 개의 토큰이 갱신 중이라면 다른 요청은 끝날 때까지 기다려!
  if (refreshing && refreshPromise) {
    await refreshPromise;
    return;
  }

  // 토큰 갱신 중이야
  refreshing = true;

  //토큰 갱신이 끝나면 새로운 프로미스 생성하기
  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      //이 refreshToken으로 새로운 accessToken 받아오기
      const response = await refreshingToken.post(
        "/tokens",
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      // 갱신 성공 시 완료 표시
      refreshing = false;
      resolve(response.data.accessToken);
    } catch (error) {
      console.error("Error while refreshing token", error);
      // 에러가 발생하더라도 갱신 작업 자체는 종료됨
      refreshing = false;
      reject(error);
    }
  });
  return refreshPromise;
}

// 1. AccessToken 만료 후 인가 요청 -> 2. 토큰 만료 에러 발생
apiInstance.interceptors.response.use(
  (response) => response, // 성공한 요청에 대한 응답을 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 새로운 accessToken 가져오기
      try {
        // 3. RefreshToken으로 AccessToken 재발급 요청
        const accessToken = await getNewTokenWithRefreshToken();

        // 4. 발급 받은 AccessToken을 localStorage에 재저장
        localStorage.setItem("tokenForAdmin", accessToken);

        // 5. 원래 요청의 인증 헤더를 업데이트하고 다시 시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await apiInstance(originalRequest);
      } catch (err) {
        console.error("토큰 갱신 중 오류 발생:", err);
        // 토큰 갱신에 실패하면 에러를 반환하고 재시도하지 않음
        return Promise.reject(err);
      }
    }

    // 에러가 다른 이유 때문이라면, 다음 핸들러에게 에러를 던진다
    return Promise.reject(error);
  }
);

export default apiInstance;
