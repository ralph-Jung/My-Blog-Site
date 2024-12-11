import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../schemas/signupSchema";
import { axiosInstance } from "../apis/axiosInstance";
import styled from "styled-components";
type SignUpData = { email: string; password: string; role: "user" | "admin" };
function signupPage() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SignUpData>({
        resolver: yupResolver(signupSchema),
    });
    const navigate = useNavigate();

    console.log(errors);

    const onsubmit = async (data: SignUpData) => {
        try {
            const postUserData = await axiosInstance.post("/v1/users", {
                email: data.email,
                password: data.password,
                role: data.role,
            });
            alert("회원가입 성공");
            navigate("/login");
        } catch (error) {
            console.error("Server Error:", error); // 로그로 에러 출력
            alert("회원가입 실패");
        }
    };
    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <SignupDiv>
                <LabelTtile>회원가입</LabelTtile>

                <div>
                    <DivEmailStyle>
                        <div>아이디</div>
                        <InputStyle type="email" {...register("email")} />
                        <div>{errors.email?.message}</div>
                    </DivEmailStyle>

                    <DivPasswordStyle>
                        <div>비밀번호</div>
                        <InputStyle type="password" {...register("password")} />
                        <div>{errors.password?.message}</div>
                    </DivPasswordStyle>

                    <DivRoleStyle>
                        <div>역할</div>
                        <InputStyle type="role" {...register("role")} />
                        <div>{errors.role?.message}</div>
                    </DivRoleStyle>
                </div>

                <div>
                    <button type="submit">가입하기</button>
                </div>
            </SignupDiv>
        </form>
    );
}
export default signupPage;

const SignupDiv = styled.div`
    width: 50vw;
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

const LabelTtile = styled.label`
    font-size: 2em;
    color: white;
`;

const DivEmailStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2em;
`;

const InputStyle = styled.input`
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

const DivRoleStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
`;
