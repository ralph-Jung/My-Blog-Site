import React from "react";
import { axiosInstance } from "../apis/axiosInstance";
type useInfo = {
    id: number;
    email: string;
    role: string;
};
// 수정
// 유저의 정보를 가져오는 컴포넌트
// token의 type을 string 이거나 null type으로 선언
// 반환값 즉 , return getData.data 의 type을 지정
const QueryUserInfo = async (token: string | null): Promise<useInfo> => {
    try {
        console.log(token);

        const getData = await axiosInstance.get("/v1/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(getData.data);

        return getData.data;
    } catch (error) {
        console.error("유저 정보를 볼러오는 것을 실패했습니다", error);
        throw new Error("Failed to fetch user information");
    }
};

export default QueryUserInfo;
