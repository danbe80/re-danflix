import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authService, firebaseInstance } from "../firebaseConfig";
import LoginForm from "./LoginForm";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 60px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 50%;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 30px;
  }
`;

const LoginTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 28px;
  text-align: center;
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 24px;
  }
`;

const LoginType = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  button {
    background-color: transparent;
    border: none;
    
  }
`;
const SocialLoginBtn = styled.button`
  width: 30%;
  height: 35px;
  color: ${(props) => props.theme.black.dark};
  font-family: 'Jaro';
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  svg {
    width: 25px;
    height: 100%;
  }
  &:hover {
      text-decoration: underline;
    }
`;
const NotUser = styled.div`
  margin: 10px;
  color: ${(props) => props.theme.black.dark};
  font-family: 'Jaro';
  text-align: center;
  /* @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 14px;
  } */
`;
const SignPath = styled.div`
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function SignIn() {
  const navigation = useNavigate();
  // 소셜 로그인
  const onSocialClick = async (event: any) => {
    const {
      target: { name },
    } = event;
    let provider: any;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
    navigation(`/`);
  };

  const onSingUp = () => {
    navigation(`/`);
  };

  return (
    <Wrapper>
      <LoginWrap>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm />
        <LoginType>
          <SocialLoginBtn onClick={onSocialClick} name="google">
            <FcGoogle />
            LOGIN
          </SocialLoginBtn>
          <SocialLoginBtn onClick={onSocialClick} name="github">
            <FaGithub />
            LOGIN
          </SocialLoginBtn>
        </LoginType>
        <NotUser>
          <SignPath onClick={onSingUp}>아직 <span>DANVIEW</span> 회원이 아니신가요?</SignPath>
        </NotUser>
      </LoginWrap>
    </Wrapper>
  );
}

export default SignIn;
