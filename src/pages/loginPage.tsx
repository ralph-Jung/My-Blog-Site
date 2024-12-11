import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../apis/axiosInstance";
import styled from "styled-components";
import { loginSchema } from "../schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

export type User = {
    password: string;
    email: string;
};

function loginPage() {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const navigate = useNavigate();

    const onsubmit = async (data: User) => {
        try {
            const response = await axiosInstance.post(
                "/v1/auth/login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    withCredentials: true, // 쿠키 전송 활성화
                }
            );
            console.log(response);

            alert("로그인 성공!");
            navigate("/");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios 에러:", error.response?.data);
            } else {
                console.error("일반 에러:", error);
            }
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 버튼 disabled 를 위한 코드
    const emailValue = watch("email");
    const passwordValue = watch("password");

    const [notAllow, setNotAllow] = useState<boolean>();
    useEffect(() => {
        if (emailValue && passwordValue && isValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValue, passwordValue]);

    return (
        <DivStyle>
            <FormStyle onSubmit={handleSubmit(onsubmit)} noValidate>
                <LabelTtile>로그인</LabelTtile>

                <DivEmailStyle>
                    <div>아이디</div>
                    <InputEmailStyle
                        // name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        {...register("email")}
                    />
                    <div>{errors.email?.message}</div>
                </DivEmailStyle>
                <DivPasswordStyle>
                    <div>비밀번호</div>
                    <InputPasswordStyle
                        // name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        {...register("password", {})}
                    />
                    <div>{errors.password?.message}</div>
                </DivPasswordStyle>

                <button type="submit" id="btn_id" disabled={notAllow}>
                    로그인
                </button>
            </FormStyle>
        </DivStyle>
    );
}
export default loginPage;

//css

//css
const DivStyle = styled.div`
    text-align: center;
    margin-top: 10%;
    flex: ;
`;

const LabelTtile = styled.label`
    font-size: 2em;
    color: white;
`;

const FormStyle = styled.form``;

const DivEmailStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2em;
`;

const InputEmailStyle = styled.input`
    display: flex;
    flexdirection: column;
    width: 250px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
`;

const DivPasswordStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
`;

const InputPasswordStyle = styled.input`
    display: flex;
    flexdirection: column;
    width: 250px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
`;

// const ButtonStyle = styled.button`
//     background-color: ${(props) => (props.notAllow ? "gray" : "pink")};
//     width: 268px;
//     text-align: center;
//     margin: 10px;
//     padding: 8px;
//     border: 1px solid black;
//     border-radius: 0.5em;
// `;
