/*
  2025. 01. 24
  - 디자인 리팩토링 작업
  - 데모 계정 제한 기능 
  - 개인 이메일 계정 삭제
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService, firebaseInstance } from "../firebaseConfig";
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
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
`

// 페이지 로고 
const LogoText = styled.span`
  color: #5EFF84;
  font-family: 'Jaro';
  text-shadow: -3px 0 #000, 0 3px #000, 3px 0 #000, 0 -3px #000;
`

// 회원가입 버튼 wrap
const SignBtnWrap = styled.div`
  width: 300px;
  height: 20vh;
  margin: 5vh auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

// 회원가입 버튼 (구글, 깃허브, 데모계정)
const SocialAuthBtn = styled.button`
  width: 80%;
  height: 45px;
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
    margin-top: 17vh;
  text-align: center;
`;
const AuthNotionText = styled.p`
  font-size: 20px;
  letter-spacing: 0px;
  margin-bottom: 20px;
  cursor: pointer;
  /* @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 18px;
  } */
  &:hover {
      text-decoration: underline;
    }
  
`;

// const SignBtn = styled.div``;
// const StartBtn = styled.button`
//   width: 50%;
//   margin: 0 auto;
//   color: ${(props) => props.theme.white.lighter};
//   background-color: ${(props) => props.theme.red.darker};
//   border: none;
//   border-radius: 3px;
//   font-size: 25px;
//   padding: 10px 0;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   &:hover {
//     background-color: ${(props) => props.theme.red.normal};
//   }
// `;

// const Img = styled.img`
//   width: 100%;
//   height: 100%;
//   position: relative;
//   z-index: -1;
// `;





function Auth() {
  const navigation = useNavigate();
  // 회원가입 버튼
  const [showSign, setShowSign] = useState(false);
  const [successAuth, setSuccessAuth] = useState(false);
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

  // 데모 계정 회원가입 & 로그인
  const makeDemoAuth = () => {
    // 처음 방문한 사람인지 체크
    // 데모 계정을 만들었던 이력이 있는지 체크(24시간 안에)
    // 24시간 안에 데모 계정을 만들었다면 그 계정으로 로그인 할 수 있도록 로그인 폼에 아이디 & 비밀번호를 자동등록
    // 회원가입 창에서 바로 데모 계정 로그인 버튼을 클릭했다면 바로 로그인 

    const demoAccountInfo = localStorage.getItem('demoAccountInfo');

    // 데모 계정 생성이 되어 있는지 확인
    if(checkDemoAccount(demoAccountInfo)) {

    } 
    else {
      //하루 동안 만들 수 있는 계정 수
      const maxDemoCount : number = 10;

      // 1. 데모 계정 생성
      // 2. 데모 계정 로그인
      // 3. 데모 계정 로컬스토리지 저장 (계정 정보, 계정 생성 날짜)
      for(let i = 0; i < maxDemoCount; i++) {
        if(successAuth) break;
        else createDemoAccount(i);
      }
    }
  };

  // 데모 계정 존재 여부 확인 및 기간 확인
  const checkDemoAccount = (account: any) => {
    if(account === null) {
      return false;
    } else {
      
    
    }

    return false;
  }
  // 자동 데모 계정 생성
  const createDemoAccount = async (demoNum : number) => {
    const demoEmail = `demo${demoNum}@demo.com`;
    try {
      await authService.createUserWithEmailAndPassword(demoEmail, '123456');
      setSuccessAuth(true);
      
      // 로컬스토리지 저장



    } catch (error: any) {
      switch (error.code) {
        // 이메일 형식 error
        case "auth/invalid-email":
          console.log("이메일 형식이 맞지 않는다.")
          break;
        // 비밀번호 약함
        case "auth/weak-password":
          console.log("비밀번호가 약함")
          break;
        // 이미 존재하는 계정
        case "auth/email-already-in-use":
          console.log("이미 존재하는 계정");
          break;
      }
      setSuccessAuth(false);
    }
  }

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
                <SocialAuthBtn onClick={makeDemoAuth}>
                  DEMO 계정 로그인
                </SocialAuthBtn>
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
