import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { authService } from "../firebaseConfig";

// const LoginFormWrap = styled.form`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;
// const LoginInput = styled.input`
//   width: 80%;
//   padding: 12px 10px;
//   margin: 0 auto 10px auto;
//   background-color: #D9D9D9;
//   border: none;
//   border-radius: 10px;
//   &:focus {
//     outline: 1px solid #3498db;
//     border: none;
//   }
// `;
// const LoginBtn = styled.button`
//   height: 35px;
//   background-color: #5EFF84;
//   color: ${(props) => props.theme.black.dark};
//   font-size: 22px;
//   border: 1px solid #A1A1A1;
//   border-radius: 10px;
//   margin: 0 auto 20px auto;
//   width: 80%;
//   font-family: 'Jaro';
//   box-shadow: 0 4px 4px rgba(0,0,0,0.25);
//   transition-duration:0.2s;
//   &:hover {
//     background-color: ${(props) => props.theme.commonBtn.hoverFill};
//     color: ${(props) => props.theme.white.lighter};
//     box-shadow: inset 0 4px 4px rgba(0,0,0,0.25);
//   }
// `;

// const ErrorMsg = styled.span`
//   color: ${(props) => props.theme.red.normal};
//   font-size: 12px;
//   margin-bottom: 10px;
// `;

interface ISign {
  email: string;
  password: string;
}
function LoginForm() {
  const [error, setError] = useState("");
  const [demo, setDemo] = useState({ email: "demo@demo.com", pw: "12345678" });
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISign>();
  const onValid = async (data: ISign) => {
    try {
      await authService.signInWithEmailAndPassword(data.email, data.password);
      navigation(`/`);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          return setError("존재하지 않는 계정이거나 잘못된 이메일입니다.");
        case "auth/wrong-password":
          return setError("잘못된 비밀번호 입니다.");
        default:
          break;
      }
    }
  };
  return (
    // 
    <div></div>
  );
}

export default LoginForm;
