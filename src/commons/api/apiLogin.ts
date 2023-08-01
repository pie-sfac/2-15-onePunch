import axios from "axios";

// export function api(requiredAuth: boolean = true){
//    if(requiredAuth){
//     return apiLogin;  
//    }
//    return apiBasic;
// }

const apiBasic = axios.create({
    baseURL: "http://223.130.161.221/api/v1"
});

export const apiLogin = axios.create({
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

apiBasic.interceptors.request.use(
    function (config) { 
      const token = localStorage.getItem("token");
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

