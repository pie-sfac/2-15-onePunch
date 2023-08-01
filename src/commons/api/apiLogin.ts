import axios from "axios";

// export function api(requiredAuth: boolean = true){
//    if(requiredAuth){
//     return apiLogin;  
//    }
//    return apiBasic;
// }

export const apiBasic = axios.create({
    baseURL: "http://223.130.161.221/api/v1"
});

 const apiLogin = axios.create({
  baseURL: "http://223.130.161.221/api/v1"
});

//refreshToken을 이용하여 새로운 accessToken을 받아오는 함수
const REFRESH_ENDPOINT = "/tokens";

async function getNewTokenWithRefreshToken() {
  //local storage에서 refreshToken 가져와서 변수에 담기
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    //이 refreshToken으로 새로운 accessToken 받아오기
    const response = await apiLogin.post(REFRESH_ENDPOINT, {
      refreshToken: refreshToken,
    });
    console.log(response.data.accessToken)
    return response.data.accessToken;
  } catch (error) {
    console.error("Error while refreshing token", error);
    throw error;
  }
}

apiLogin.interceptors.response.use(
  (response) => response, // 성공한 요청에 대한 응답을 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    
    // 에러 상태가 401이면 토큰이 만료되었을 수 있음을 확인
    if (error.response.status === 401 && !originalRequest._retry) {
      
      // _retry를 true로 설정하여 무한 재시도 루프에 빠지지 않게 함.
      originalRequest._retry = true;

      // 새로운 accessToken 가져오기
      const accessToken = await getNewTokenWithRefreshToken();
      
      // 새 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", accessToken);

      //원래 요청의 인증 헤더를 업데이트하고 다시 시도
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiLogin(originalRequest);
    }

    // 에러가 다른 이유 때문이라면, 다음 핸들러에게 에러를 던진다
    return Promise.reject(error);
  }
);

apiBasic.interceptors.request.use(
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
  
  export default apiLogin;

