import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthForm from "../Components/AuthForm";
import { authService, firebaseInstance } from "../firebaseConfig";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const FirstWrap = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
// Auth form
const SingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${(props) => props.theme.white.lighter};
  h2 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;
const AnotherSign = styled.div`
  width: 300px;
  margin: auto;
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

// main
const MainWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -1;
`;
const ContextWrap = styled.div`
  max-width: 850px;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const BigText = styled.h2`
  font-size: 52px;
  font-weight: bold;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 400px;
    font-size: 35px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    width: 300px;
    font-size: 30px;
  }
`;
const MiddleText = styled.p`
  margin: 20px 0;
  font-size: 28px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 25px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 20px;
  }
`;
const EmailText = styled.p`
  font-size: 20px;
  letter-spacing: 0px;
  margin-bottom: 20px;
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 18px;
  }
`;
const EmailWrap = styled.div``;
const SignBtn = styled.div``;
const StartBtn = styled.button`
  width: 50%;
  margin: 0 auto;
  color: ${(props) => props.theme.white.lighter};
  background-color: #c20811;
  border: none;
  border-radius: 3px;
  font-size: 25px;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.red};
  }
`;

function Auth() {
  const navigation = useNavigate();
  // 회원가입 버튼
  const [showSign, setShowSign] = useState(false);
  const onSignUp = () => {
    setShowSign(true);
  };
  // 소셜 회원가입
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
  return (
    <Wrapper>
      <FirstWrap>
        <MainWrap>
          <Img src={require("../Img/ko-main-images.jpg")} />
          {showSign ? (
            /* 회원가입 폼 */
            <SingText>
              <h2>넷플릭스 멤버십을 시작하세요.</h2>
              <p>이메일과 비밀번호만 입력하면 넷플릭스 가입 완료!</p>
              <p>복잡한 단계는 모두 없앴습니다.</p>
              {/* 일반 회원가입 */}
              <AuthForm />
              {/* 소셜 회원가입 */}
              <AnotherSign>
                <Google name="google" onClick={onSocialClick}>
                  <FcGoogle />
                  구글로 회원가입
                </Google>
                <GitHub name="github" onClick={onSocialClick}>
                  <FaGithub />
                  깃허브로 회원가입
                </GitHub>
              </AnotherSign>
            </SingText>
          ) : (
            /* 첫 메인 페이지 */
            <ContextWrap>
              <BigText>영화와 시리즈를 무제한으로.</BigText>
              <MiddleText>
                다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
              </MiddleText>

              <EmailWrap>
                <EmailText>시청할 준비가 되셨나요?</EmailText>
                {/* 회원가입 */}
                <SignBtn>
                  <StartBtn onClick={onSignUp}>시작하기</StartBtn>
                </SignBtn>
              </EmailWrap>
            </ContextWrap>
          )}
        </MainWrap>
      </FirstWrap>
    </Wrapper>
  );
}

export default Auth;
