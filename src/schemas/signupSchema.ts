import * as yup from "yup";
export const signupSchema = yup.object().shape({
    email: yup
        .string()
        .matches(
            /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
            "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
        )
        .required("이메일을 꼭 입력해주세요."),
    password: yup
        .string()
        .min(8, "비밀번호는 8자리 이상 입력해주세요")
        .max(16, "비밀번호는 16자리 이하로 입력해주세요")
        .required("비밀번호를 꼭 입력해주세요."),
    role: yup
        .string()
        .oneOf(["user", "admin"], "user 나 admin 중에서 입력해주세요")
        .required("꼭 입력해주시요"),
});
