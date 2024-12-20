import React from "react";
import { axiosInstance } from "../apis/axiosInstance";

const UpdateAccessToken = async (): Promise<void> => {
    const response = await axiosInstance.post("/v1/auth/refresh", {});

    console.log(response.data.accessToken);
};
export { UpdateAccessToken };
