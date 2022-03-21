import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../firebaseConfig";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px 0 0 0;
  input {
    width: 100%;
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
const IdInput = styled.input``;
const PwInput = styled.input``;
const LoginBtn = styled.button`
  background-color: #c20811;
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
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
  color: #ccc;
  font-size: 12px;
  margin-bottom: 10px;
`;

interface ISign {
  email: string;
  password: string;
}
function LoginForm() {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISign>();
  const onValid = async (data: ISign) => {
    await authService.signInWithEmailAndPassword(data.email, data.password);
    navigation(`/`);
    /* try {
    } catch (error) {
      console.log(error);
    } */
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <IdInput
          placeholder="Email"
          type="email"
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요." },
          })}
        />
        <ErrorMsg>{errors.email?.message}</ErrorMsg>
        <PwInput
          placeholder="password"
          type="password"
          {...register("password", {
            required: "패스워드를 입력해주세요(6자 이상)",
          })}
        />
        <ErrorMsg>{errors.password?.message}</ErrorMsg>
      </Form>

      <LoginBtn type="submit" onClick={handleSubmit(onValid)}>
        로그인
      </LoginBtn>
    </>
  );
}

export default LoginForm;
