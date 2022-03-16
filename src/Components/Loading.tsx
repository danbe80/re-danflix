import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 100px;
`;
const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadBar = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent #fff transparent #fff;
  position: relative;
`;
const LoadText = styled(motion.div)`
  position: absolute;
  font-size: 13px;
  font-weight: 500;
`;

function Loading() {
  return (
    <Wrapper>
      <LoadContainer>
        <LoadBar
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1, repeat: Infinity }}
        ></LoadBar>
        <LoadText
          animate={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
          LOADING...
        </LoadText>
      </LoadContainer>
    </Wrapper>
  );
}

export default Loading;
