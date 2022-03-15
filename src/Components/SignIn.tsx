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
const BackImg = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const LoginWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 60px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 300px;
    margin: 0 auto;
    padding: 30px;
  }
`;

const Text = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 28px;
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 24px;
  }
`;

const LoginType = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    background-color: transparent;
    color: ${(props) => props.theme.white.lighter};
    border: none;
    svg {
      margin-right: 4px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Google = styled.button``;
const GitHub = styled.button``;
const NotUser = styled.div`
  margin: 10px;
  color: #636e72;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 14px;
  }
`;
const SignPath = styled.div`
  margin-top: 5px;
  color: ${(props) => props.theme.white.lighter};
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
      <BackImg>
        <Img src={require("../Img/ko-main-images.jpg")} />
      </BackImg>

      <LoginWrap>
        <Text>로그인</Text>
        <LoginForm />
        <LoginType>
          <Google onClick={onSocialClick} name="google">
            <FcGoogle />
            Google
          </Google>
          <GitHub onClick={onSocialClick} name="github">
            <FaGithub />
            GitHub
          </GitHub>
        </LoginType>
        <NotUser>
          <span>Netflix 회원이 아닌가요?</span>
          <SignPath onClick={onSingUp}> 지금 가입하세요.</SignPath>
        </NotUser>
      </LoginWrap>
    </Wrapper>
  );
}

export default SignIn;
