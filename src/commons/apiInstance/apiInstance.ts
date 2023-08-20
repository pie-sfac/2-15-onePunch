import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://223.130.161.221/api/v1",
});

export const refreshingToken = axios.create({
  baseURL: "https://223.130.161.221/api/v1",
});

export const apiLogin = axios.create({
  baseURL: "https://223.130.161.221/api/v1",
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

// 1. AccessToken 만료 후 인가 요청
// 2. 토큰 만료 에러가 발생했는지 체크
// 3. RefreshToken으로 AccessToken 재발급 요청
// 4. 발급 받은 AccessToken을  재저장
// 5. 방금 실패했던 쿼리 재시도

let refreshing = false;
let refreshPromise: Promise<any> | null = null;

async function getNewTokenWithRefreshToken() {
  //local storage에서 refreshToken 읽어와서 변수에 담기
  const refreshToken: string | null = localStorage.getItem("refreshToken");
  console.log("여기까지는 잘 왔니?");
  console.log("리프레쉬 토큰입니다", refreshToken);

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
      console.log("갱신에 성공했습니다!!", refreshing);
    } catch (error) {
      console.error("Error while refreshing token", error);
      // 에러가 발생하더라도 갱신 작업 자체는 종료됨
      refreshing = false;
      reject(error);
      console.log("에러가 발생했습니다!!", refreshing);

      // 에러 메시지나 코드를 확인하여 리프레쉬 토큰이 만료된 경우 판단
      //    if (typeof error === 'object' && error !== null && 'response' in error && error.response.status === 404) {
      //     alert("세션이 만료되었습니다. 다시 로그인해주세요."); // 사용자에게 알림
      //     localStorage.setItem("lastVisitedPage", window.location.href); // 현재 페이지 URL 저장
      //     window.location.href = '/LoginPage'; // 로그인 페이지로 리디렉션
      //     return;
      // }
    }
  });
  return refreshPromise;
}

// 로그인 성공 후 원래 페이지로 리디렉션
// function redirectToLastVisitedPage() {
//   const lastVisitedPage = localStorage.getItem("lastVisitedPage");
//   if (lastVisitedPage) {
//       window.location.href = lastVisitedPage;
//       localStorage.removeItem("lastVisitedPage"); // 저장된 URL 삭제
//   }
// }

// apiLogin.post('/admins/login', credentials).then(response => {
//   localStorage.setItem("tokenForAdmin", response.data.accessToken);
//   redirectToLastVisitedPage();
// });

// 1. AccessToken 만료 후 인가 요청 -> 2. 토큰 만료 에러 발생
apiInstance.interceptors.response.use(
  (response) => response, // 성공한 요청에 대한 응답을 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 에러 상태가 401이면 토큰이 만료되었을 수 있음을 확인
    // '!originalRequest._retry' 갱신 후 재요청을 시도하는 것이 처음인지 아닌지 판단.
    // 만약 응답 코드가 401이고(인증 실패), 이전 토큰 갱신을 시도한 적이 없다면
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("토큰이 만료여");
      //새로운 토큰을 이용한 요청이 또 다시 401을 반환한다면 어딘가 문제가 있다는 신호임.
      //그런 경우를 대비해서 _retry를 true로 설정함으로써 무한 재시도 루프에 빠지지 않게 함.
      //무한 루프 방지 방법임.
      originalRequest._retry = true;

      // 새로운 accessToken 가져오기
      try {
        // 3. RefreshToken으로 AccessToken 재발급 요청
        const accessToken = await getNewTokenWithRefreshToken();

        // if (!accessToken) {
        //   console.error("Failed to refresh token");
        //   window.location.href = '/LoginPage';
        //   return Promise.reject(error);
        // }

        // 4. 발급 받은 AccessToken을 localStorage에 재저장
        localStorage.setItem("tokenForAdmin", accessToken);
        console.log("tokenForAdmin를 잘 저장했니?", accessToken);

        // 5. 원래 요청의 인증 헤더를 업데이트하고 다시 시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log(
          "헤더 업데이트를 잘 했니?",
          originalRequest.headers.Authorization
        );
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

// 중간에 만료가 되었을 그 찰나에 못 받아옴

// import axios from "axios";

// const apiInstance = axios.create({
//   baseURL: "http://223.130.161.221/api/v1",
// });

// apiInstance.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// export default apiInstance;
