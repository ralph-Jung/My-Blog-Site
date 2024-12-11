import { axiosInstance } from "../apis/axiosInstance";
const getAccessToken = async () => {
    try {
        const response = await axiosInstance.post("/v1/auth/refresh", {});

        console.log("새로운 Access Token:", response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error("Access Token 갱신 실패:", error);
        return null;
    }
};

export default getAccessToken;
