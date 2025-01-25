/*
  2025. 01. 24
  - 디자인 리팩토링 작업
  - 데모 계정은 기존대로 한개만 사용
  - 개인 이메일 계정 삭제
  - 계정 마다 멀티 프로필 최대 4개까지 생성
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService, firebaseInstance, storageService } from "../firebaseConfig";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


// 회원가입과 페이지 메인 영역 wrapper
const AuthAndMainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// 회원가입과 페이지 메인 영역 wrap
const AuthAndMainWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

// 회원가입 폼 Wrap / Auth Form Wrap
const SignUpWrap = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.black.dark};
  p {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const SignUpTitle =  styled.h2 `
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;


  /* 태블릿, 모바일 사이즈  */
  @media (max-width: ${(props) => props.theme.size.tablet})
  and (min-width: ${(props) => props.theme.size.mobileL}) {
    font-size: 32px;
  }

  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 30px;
  }
`

// 페이지 로고 
const LogoText = styled.span`
  color: #5EFF84;
  font-family: 'Jaro';
  text-shadow: -3px 0 #000, 0 3px #000, 3px 0 #000, 0 -3px #000;
`

// 회원가입 버튼 wrap
const SignBtnWrap = styled.div`
  width: 400px; 
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* 태블릿 사이즈에서만 적용 */
   @media (max-width: ${(props) => props.theme.size.tablet}) 
   and (min-width: ${(props) => props.theme.size.mobileL}) {
    width: 350px;
  }
  /* 모바일 사이즈 */
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    width: 300px;
  }
`;

// 소셜 로그인 버튼 wrap
const SocialBtnWrap = styled.div`
  width: 100%;
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// 회원가입 버튼 (구글, 깃허브, 데모계정)
const SocialAuthBtn = styled.button`
  width: 80%;
  padding: 10px 0;
  margin-top: 10px;
  background-color: #5EFF84;
  border: 2px solid #A1A1A1;
  box-shadow: 0 4px 4px rgba(0,0,0,0.25);
  transition-duration:0.2s;
  border-radius: 10px;
  font-family: 'Jaro';
  font-size: 18px;

  svg {
      margin-right: 4px;
    }
    // 버튼 호버 시
    &:hover {
      background-color: #00A727;
      color: ${(props) => props.theme.white.lighter};
      box-shadow: inset 0 4px 4px rgba(0,0,0,0.25);
    }
`;

// 내용 정보 또는 회원가입 wrap
const CenterInfoWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

// 첫 화면 메인 페이지 wrap
const ContextWrap = styled.div`
  max-width: 850px;
  margin: auto;
  text-align: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: ${(props) => props.theme.size.mobileL}) 
  and (min-width: ${(props) => props.theme.size.mobile}){
    width: 350px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    width: 290px;
  }
`;
const Title = styled.h2`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: -5px;
  /* @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 400px;
    font-size: 35px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    width: 300px;
    font-size: 30px;
  } */
`;
const Content = styled.p`
  font-size: 26px;
  /* @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 24px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 20px;
  } */
`;

const AuthWrap = styled.div`
  margin-top: 16vh;
  text-align: center;
`;
const AuthNotionText = styled.p`
  font-size: 20px;
  letter-spacing: 0px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
      text-decoration: underline;
    }
  
`;


/********************/

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

    switch(name) {
      case "google":
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        break;
      case "github":
        provider = new firebaseInstance.auth.GithubAuthProvider();
        break;
    }

    await authService.signInWithPopup(provider);
    navigation(`/`);
  };

  // 데모 계정 로그인
  const loginDemo = () => {
    navigation(`/signin`);
  };

  return (
    <AuthAndMainWrapper>
      <AuthAndMainWrap>
        <CenterInfoWrap>
          {showSign ? (
            /* 회원가입 영역 */
            <SignUpWrap>
              <SignUpTitle>지금 바로 <LogoText>DANVIEW</LogoText> 멤버십을 시작하세요!</SignUpTitle>
              {/* 소셜 회원가입 */}
              <SignBtnWrap>
              <SocialBtnWrap>
                  {/* 구글 회원가입 버튼 */}
                <SocialAuthBtn name="google" onClick={onSocialClick}>
                  <FcGoogle style={{}}/>
                  GOOGLE로 회원가입
                </SocialAuthBtn>
                {/* 깃허브 회원가입 버튼 */}
                <SocialAuthBtn name="github" onClick={onSocialClick}>
                  <FaGithub />
                  GITHUB로 회원가입
                </SocialAuthBtn>
                {/* 데모 계정 자동 회원가입 */}
                <SocialAuthBtn onClick={loginDemo}>
                  DEMO 계정 로그인
                </SocialAuthBtn>
              </SocialBtnWrap>
            </SignBtnWrap>
            </SignUpWrap>
          ) : 
          (
            /* 첫 메인 페이지 */
            <ContextWrap>
              <Title>영화와 시리즈를 무제한으로 .</Title>
              <>
                <Content>
                  다양한 디바이스에서 시청하세요. 
                </Content>
                <Content>
                  언제든 해지하실 수 있습니다.
                </Content>
              </>

              {/* 클릭 시 회원가입 창 open */}
              <AuthWrap>
                <AuthNotionText  onClick={onSignUp}>시청할 준비가 되셨나요?</AuthNotionText>
              </AuthWrap>
            </ContextWrap>
          )}
        </CenterInfoWrap>
      </AuthAndMainWrap>
    </AuthAndMainWrapper>
  );
}

export default Auth;
