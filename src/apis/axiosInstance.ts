import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Request Intercepted:", config);
        const token = Cookies.get("accessToken");
        console.log(token);

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log(config);

        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (res) => {
        console.log(res);

        console.log(res.data);
        return res.data;
    },
    async (error) => {
        console.error(error);
        if (error.response?.status == 401 && !error.config._retry) {
            error.config._retry = true;
            try {
                const res = await axiosInstance.post("/v1/auth/refresh", {});
                console.log(res);

                const newAccessToken = res.data.accessToken;
                Cookies.set("accessToken", newAccessToken);
                error.config.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                return axiosInstance(error.config);
            } catch (refreshError) {
                console.error(refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export { axiosInstance };
