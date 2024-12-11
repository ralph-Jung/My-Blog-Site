import React from "react";
import { useQuery } from "@tanstack/react-query";
import QueryUserInfo from "./QueryUserInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
function myData() {
    const navigate = useNavigate();

    const token = Cookies.get("accessToken") || null;
    const {
        data,
        isError: _isError,
        isLoading: _isLoading,
    } = useQuery({
        queryKey: ["myData", token],
        queryFn: () => QueryUserInfo(token),
    });
    console.log(data);

    return (
        <div>
            <div> &lt; 내 정보 &gt;</div>
            <div>
                <div>id:{data?.id}</div>
                <div>email:{data?.email}</div>
                <div>role:{data?.role}</div>
            </div>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
    );
}
export default myData;
