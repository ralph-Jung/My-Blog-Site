import React from "react";
import { useQuery } from "@tanstack/react-query";
import QueryUserInfo from "./QueryUserInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
function myData() {
    const navigate = useNavigate();

    const token = Cookies.get("accessToken") || null;
    const {
        data,
        isError: _isError,
        isLoading: _isLoading,
    } = useQuery({
        queryKey: ["myData", token],
        queryFn: () => QueryUserInfo(),
    });
    console.log(data);

    return (
        <MyInfoDiv>
            <div> &lt; 내 정보 &gt;</div>
            <div>
                <div>id:{data?.id}</div>
                <div>email:{data?.email}</div>
                <div>role:{data?.role}</div>
            </div>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </MyInfoDiv>
    );
}
export default myData;

//css
const MyInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin: auto;
    justify-content: center;
    align-items: center;
`;
