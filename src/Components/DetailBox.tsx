import { motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieVideo, IContent, IGetVideo } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 2;
`;

const BigList = styled(motion.div)`
  position: absolute;
  max-width: 900px;
  width: 90%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 100px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.darker};
  z-index: 10;
`;
const XBtn = styled(motion.div)`
  position: absolute;
  right: 15px;
  top: 10px;
  background-color: ${(props) => props.theme.black.darker};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  svg {
    margin: auto;
  }
`;
const BigCover = styled.div`
  width: 100%;
  background-size: 100% 100%;
  background-position: center center;
  height: 400px;
  border-radius: 15px 15px 0 0;
`;
const BigVideo = styled.span`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.red};
  border-radius: 4px;
  font-weight: bold;
  margin-left: 20px;
  position: relative;
  top: -10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.black.darker};
  }
  svg {
    margin-left: 5px;
    padding-top: 1px;
  }
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 30px;
  position: relative;
  top: -120px;
  letter-spacing: -2px;
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    font-size: 25px;
  }
`;
const BigInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -50px;
`;
const BigGenres = styled.ul`
  display: flex;
  padding: 0 20px;
  font-weight: bold;
  li {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const BigReleaseDate = styled.span`
  padding: 0 20px;
`;
const BigOverview = styled.p`
  position: relative;
  top: 0px;
  padding: 20px;
  line-height: 30px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IDetail {
  contentId: string;
  clickedContent: IContent | null | undefined;
  genObj: string[];
  content?: string;
}

function DetailBox({ contentId, clickedContent, genObj, content }: IDetail) {
  const navigation = useNavigate();
  const { scrollY } = useViewportScroll();
  // 상세 정보 벗어나기
  const onOverlayClick = () => navigation(`${content}`);

  // 예고편 재생
  const listId: any = clickedContent?.id;
  const { data: video } = useQuery<IGetVideo>(["video"], () =>
    getMovieVideo(listId)
  );
  const onPlay = () => {
    let tvideo = video?.results.filter(
      (v) => v.name.includes("티저") || v.name.includes("예고편")
    )[0].key;
    window.open(`https://www.youtube.com/watch?v=${tvideo}`, "_blank");
    tvideo = undefined;
  };

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigList style={{ top: scrollY.get() + 100 }} layoutId={contentId}>
        {clickedContent && (
          <>
            <XBtn onClick={onOverlayClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
                  fill="currentColor"
                />
              </svg>
            </XBtn>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, #181818, transparent), url(${makeImagePath(
                  clickedContent.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigVideo onClick={onPlay}>
              예고편
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                  fill="currentColor"
                />
              </svg>
            </BigVideo>
            <BigTitle>{clickedContent.title || clickedContent.name}</BigTitle>
            <BigInfo>
              <BigGenres>
                {genObj.map((genre, i) => (
                  <li key={i}>{genre}</li>
                ))}
              </BigGenres>
              <BigReleaseDate>
                {clickedContent.release_date || clickedContent.first_air_date}
              </BigReleaseDate>
            </BigInfo>
            <BigOverview>{clickedContent.overview}</BigOverview>
          </>
        )}
      </BigList>
    </>
  );
}

export default DetailBox;
