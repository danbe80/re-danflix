import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { authService } from "../firebaseConfig";

const SignWrap = styled.div`
  width: 300px;
  margin: auto;
`;
const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px 0 0 0;
  input {
    padding: 10px;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 3px;
    &:focus {
      outline: 1px solid #3498db;
      border: none;
    }
  }
`;
const EmailInput = styled.input``;
const PwInput = styled.input``;
const SignBtn = styled.button`
  background-color: #c20811;
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin: 10px 0 20px 0;
  padding: 10px 0;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.red};
  }
`;
const ErrorMsg = styled.span`
  display: block;
  font-size: 14px;
  color: ${(props) => props.theme.red.normal};
`;
interface ISign {
  email: string;
  password: string;
}
function AuthForm() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISign>();
  // 일반 회원가입
  const onValid = async (data: ISign) => {
    const { email, password } = data;
    try {
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      error?.customData._tokenResponse.error.errors[0].message ===
        "EMAIL_EXISTS" && setError("이미 존재하는 계정입니다.");
    }
  };

  return (
    <>
      <SignWrap>
        <SignForm onSubmit={handleSubmit(onValid)}>
          <EmailInput
            placeholder="Email"
            type="email"
            {...register("email", {
              required: { value: true, message: "이메일을 입력해주세요." },
            })}
          />
          <PwInput
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "패스워드를 입력해주세요(6자 이상)",
            })}
          />
        </SignForm>
        {/* 폼 에러 처리 */}
        <ErrorMsg>{errors.email?.message}</ErrorMsg>
        <ErrorMsg>{errors.password?.message}</ErrorMsg>
        <ErrorMsg>{error}</ErrorMsg>

        <SignBtn type="submit" onClick={handleSubmit(onValid)}>
          회원가입 완료하기
        </SignBtn>
      </SignWrap>
    </>
  );
}
export default AuthForm;
