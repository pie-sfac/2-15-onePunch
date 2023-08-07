import axios from "axios";

export const apiBasic = axios.create({
    baseURL: "http://223.130.161.221/api/v1"
});

 const apiLogin = axios.create({
  baseURL: "http://223.130.161.221/api/v1"
});

apiBasic.interceptors.request.use(
  function (config) { 
    const token = localStorage.getItem("tokenForAdmin");
   if (token) {
    // console.log("여기는 config.headers",config.headers);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log( "config.headers[어써라이제이션]", config.headers["Authorization"])

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

async function getNewTokenWithRefreshToken() {
  //local storage에서 refreshToken 읽어와서 변수에 담기
  const refreshToken: string | null = localStorage.getItem("refreshToken");
  console.log("여기까지는 잘 왔니?")
  console.log("리프레쉬 토큰입니다",refreshToken);

  // refreshToken이 null이라면 에러를 던지거나 적절한 처리를 수행
  if (!refreshToken) {
    console.error("No refresh token found in local storage");
    throw new Error("No refresh token found");
  }

  try {
    //이 refreshToken으로 새로운 accessToken 받아오기
    const response = await apiBasic.post('/tokens', {
      refreshToken: refreshToken,
    },{
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      },
    });
    console.log("========response.data.accessToken입니다:",response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Error while refreshing token", error);
    throw error;
  }
}

const MAX_RETRY_COUNT = 3;  // 임계값 설정

apiBasic.interceptors.response.use(
  (response) => response, // 성공한 요청에 대한 응답을 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 초기값 설정. 만약 retryCount가 없으면 0으로 설정
    if (!originalRequest.retryCount) {
      originalRequest.retryCount = 0;
    }
    // 에러 상태가 401이면 토큰이 만료되었을 수 있음을 확인
    // '!originalRequest._retry' 갱신 후 재요청을 시도하는 것이 처음인지 아닌지 판단.
    // 만약 응답 코드가 401이고(인증 실패), 이전 토큰 갱신을 시도한 적이 없다면
    if (error.response.status === 401 && originalRequest.retryCount < MAX_RETRY_COUNT) {
      originalRequest.retryCount += 1;
      console.log("토큰이 만료여")
      //새로운 토큰을 이용한 요청이 또 다시 401을 반환한다면 어딘가 문제가 있다는 신호임.
      //그런 경우를 대비해서 _retry를 true로 설정함으로써 무한 재시도 루프에 빠지지 않게 함.
      //무한 루프 방지 방법임.
      // originalRequest._retry = true;

      // 새로운 accessToken 가져오기
      try {
        const accessToken = await getNewTokenWithRefreshToken();
      
      // 새 토큰을 로컬 스토리지에 저장
      localStorage.setItem("tokenForAdmin", accessToken);
      console.log("tokenForAdmin를 잘 저장했니?", accessToken);

      //원래 요청의 인증 헤더를 업데이트하고 다시 시도
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      console.log("헤더 업데이트를 잘 했니?", originalRequest.headers.Authorization);
      return apiBasic(originalRequest);
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
  
  export default apiLogin;

