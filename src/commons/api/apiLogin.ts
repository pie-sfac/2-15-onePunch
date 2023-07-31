import axios from "axios";

export function api(requiredAuth: boolean = true){
   if(requiredAuth){
    return apiLogin;  
   }
   return apiBasic;
}

const apiLogin = axios.create({
    baseURL: "http://223.130.161.221/api/v1"
});

export const apiBasic = axios.create({
  baseURL: "http://223.130.161.221/api/v1"
});

apiLogin.interceptors.request.use(
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

