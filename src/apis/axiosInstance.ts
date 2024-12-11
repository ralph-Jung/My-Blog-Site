import axios from "axios";
import { UpdateAccessToken } from "../pages/updateAccesstoken";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
export { axiosInstance };
