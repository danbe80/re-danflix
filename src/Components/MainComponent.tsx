import styled from "styled-components";
import { useState } from "react";

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
  background-color: ${(props) => props.theme.red.darker};
  border: none;
  border-radius: 3px;
  font-size: 25px;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.red.normal};
  }
`;

function MainComponent() {
    const [showSign, setShowSign] = useState(false);

    const onSignUp = () => {
        setShowSign(true);
      };


    return (
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
    );
}

export default MainComponent;