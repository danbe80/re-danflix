import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  BsCaretRightFill,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getGenre,
  getMovies,
  getMtopRated,
  IGenre,
  IGetContentResult,
} from "../api";
import { makeImagePath } from "../utils";
import DetailBox from "./DetailBox";
import Loading from "./Loading";

/* 전체 */
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.dark};
  overflow: hidden;
`;

/* 홈 배너 */
const Banner = styled.div<{ bgphoto: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: 100vw 100vh;
  position: relative;
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    height: 200px;
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 40px;
  }
`;
// 태블릿 크기부터
const GenreTitle = styled.h2`
  position: absolute;
  top: 60px;
  font-size: 16px;
  font-weight: bold;
  display: none;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: block;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    top: 40px;
    font-size: 12px;
  }
`;

/* 제목 */
const Title = styled.h3`
  margin-top: 140px;
  font-size: 55px;
  margin-bottom: 20px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 35px;
    margin-top: 120px;
    margin-bottom: 10px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    font-size: 18px;
  }
`;
/* 요약내용 */
const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 14px;
    width: 70%;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    display: none;
  }
`;
const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  top: -120px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    top: -50px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    top: 0;
  }
`;
const SliderWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Slider = styled(motion.div)`
  height: 250px;
  margin: auto 35px;
  position: relative;
  span {
    /* 버튼 공통 css : PrevBtn, NextBtn*/
    width: 35px;
    height: 200px;
    display: flex;
    align-items: center;
    position: absolute;
    color: ${(props) => props.theme.white.darker};
    z-index: 1;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 40px;
    cursor: pointer;
  }
  &:hover > span,
  &:hover > h2 div > svg {
    opacity: 1;
    transition: all 0.5s;
  }
`;
const PrevBtn = styled(motion.span)`
  left: -35px;
  top: 25px;
`;
const NextBtn = styled(motion.span)`
  right: -35px;
  top: 25px;
`;

const RowTitle = styled(motion.h2)`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 0 0 0 5px;
`;

const MoreWrap = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 2px;
  svg {
    opacity: 0;
    font-size: 10px;
  }
`;

const MoreMovies = styled(motion.div)`
  transform-origin: left center;
  font-size: 10px;
  margin-left: 4px;
  margin-top: 1px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  height: 100%;
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: #f1f1f1;
  background-image: url(${(props) => props.bgphoto});
  background-size: 100% 200px;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 3px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  opacity: 0;
  bottom: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 16px;
    line-height: 18px;
  }
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.innerWidth + 5 : window.innerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.innerWidth + 5 : -window.innerWidth + 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};
const iconVariants = {
  rest: {
    x: -45,
    transition: {
      type: "linear",
      duration: 1.2,
    },
  },
  hover: {
    x: 0,
    transition: {
      type: "linear",
    },
  },
};

const slashVariants = {
  rest: {
    scaleX: 0,
    transition: {
      type: "linear",
      duration: 1,
    },
  },
  hover: {
    scaleX: 1,
    transition: {
      type: "linear",
    },
  },
};

let offset = 6;
const content = "/movies";

function Movie() {
  console.log("랜더링");
  // 현재 반영 중 영화 api  useQuery(queryKey, queryFn, options)
  const { data: now, isLoading } = useQuery<IGetContentResult>(
    ["movies", "playing"],
    getMovies
  );
  // 평점 높은 영화 api
  const { data: mtop } = useQuery<IGetContentResult>(
    ["movies", "top_rated"],
    getMtopRated
  );
  const navigation = useNavigate();
  // 클릭한 movie의 id
  const { movieId } = useParams();
  // 슬라이더 박스 좌우 movement
  const [nIndex, setNindex] = useState(0);
  const [rIndex, setRindex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const [isHover, setHover] = useState(false);
  // 슬라이더 박스 앞으로 이동
  const incraseIndex = (date: string) => {
    if (date === "now") {
      if (now) {
        if (leaving) return;
        toggleLeaving();
        setBack(false);
        const totalDay = now.results.length - 1;
        const maxIndex = Math.floor(totalDay / offset) - 1;
        setNindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    } else if (date === "top") {
      if (mtop) {
        if (leaving) return;
        toggleLeaving();
        setBack(false);
        const totalWeek = mtop.results.length - 1;
        const maxIndex = Math.floor(totalWeek / offset) - 1;
        setRindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };
  // 슬라이더 박스 뒤로 이동
  const decraseIndex = (date: string) => {
    if (date === "top") {
      if (now) {
        if (leaving) return;
        toggleLeaving();
        setBack(true);
        const totalSeries = now?.results.length - 1;
        const maxIndex = Math.floor(totalSeries / offset) - 1;
        setNindex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    } else if (date === "top") {
      if (mtop) {
        if (leaving) return;
        toggleLeaving();
        setBack(true);
        const totalSeries = mtop?.results.length - 1;
        const maxIndex = Math.floor(totalSeries / offset) - 1;
        setRindex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };
  // 이동 애니메이션 시작되는 동시에 다시 눌러도 이동 애니메이션이 잃어나지 않는다.
  const toggleLeaving = () => setLeaving((prev) => !prev);

  // 박스 클릭 시 주소 변경 (박스 아이디 포함 주소)
  const onBoxClicked = (movieId: string) => {
    navigation(`/movies/${movieId}`);
  };
  // 상세 정보 벗어나기
  const clickedMovie = movieId
    ? movieId.includes("n")
      ? now?.results.find((movie) => movie.id === +movieId.slice(0, -1))
      : movieId.includes("r")
      ? mtop?.results.find((movie) => movie.id === +movieId.slice(0, -1))
      : null
    : null;
  // 장르 api
  const { data: genre } = useQuery<IGenre>("genres", getGenre);
  const movieGenres = movieId
    ? movieId.includes("n")
      ? now?.results.find((movie) => movie.id === +movieId.slice(0, -1))
          ?.genre_ids
      : movieId.includes("r")
      ? mtop?.results.find((movie) => movie.id === +movieId.slice(0, -1))
          ?.genre_ids
      : null
    : null;
  let genObj: string[] = [];
  const genresName =
    movieGenres &&
    movieGenres.forEach((id) =>
      genre?.genres.find((gen) =>
        gen.id === id ? genObj.push(gen.name) : null
      )
    );
  // filter 가 false를 만나면 그 뒤로 실행 ㄴㄴ함...이유가 뭐지?

  const xSize = window.innerWidth;

  useEffect(() => {
    if (xSize <= 425 && xSize > 375) {
      offset = 4;
    } else if (xSize <= 375) {
      offset = 3;
    } else {
      offset = 6;
    }
  }, [xSize]);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <></>
        // <>
        //   <Banner bgphoto={makeImagePath(now?.results[0].backdrop_path || "")}>
        //     <GenreTitle>영화</GenreTitle>
        //     <Title>{now?.results[0].title}</Title>
        //     <Overview>
        //       {/* 내용 설명이 긴 영화는 200자로 제한을 둠 */}
        //       {now
        //         ? now?.results[0].overview.length > 180
        //           ? now?.results[0].overview.slice(0, 180) + "..."
        //           : now?.results[0].overview
        //         : null}
        //     </Overview>
        //   </Banner>
        //   <SliderWrapper>
        //     <SliderWrap>
        //       <Slider>
        //         <PrevBtn onClick={() => decraseIndex("now")}>
        //           <BsChevronCompactLeft />
        //         </PrevBtn>

        //         <RowTitle
        //           whileHover="hover"
        //           animate="rest"
        //           initial="rest"
        //           onHoverStart={(prev) => setHover(!prev)}
        //           onHoverEnd={(prev) => setHover(!prev)}
        //         >
        //           극장 최신 개봉작
        //           <MoreWrap>
        //             <MoreMovies variants={slashVariants}>모두 보기</MoreMovies>
        //             <motion.div variants={iconVariants} initial={{ x: -30 }}>
        //               <BsCaretRightFill />
        //             </motion.div>
        //           </MoreWrap>
        //         </RowTitle>
        //         <AnimatePresence
        //           initial={false}
        //           onExitComplete={toggleLeaving}
        //           custom={back}
        //         >
        //           <Row
        //             variants={rowVariants}
        //             initial="hidden"
        //             animate="visible"
        //             exit="exit"
        //             transition={{ type: "tween", duration: 1 }}
        //             key={nIndex}
        //             custom={back}
        //           >
        //             {now?.results
        //               .slice(1)
        //               .slice(offset * nIndex, offset * nIndex + offset)
        //               .map((movie) => (
        //                 <Box
        //                   layoutId={movie.id + "n"}
        //                   key={movie.id}
        //                   variants={boxVariants}
        //                   initial="normal"
        //                   whileHover="hover"
        //                   transition={{ type: "tween" }}
        //                   bgphoto={makeImagePath(movie.poster_path, "w500")}
        //                   onClick={() => onBoxClicked(movie.id + "n")}
        //                 >
        //                   <Info variants={infoVariants}>
        //                     <h4>{movie.title}</h4>
        //                   </Info>
        //                 </Box>
        //               ))}
        //           </Row>
        //         </AnimatePresence>
        //         <NextBtn onClick={() => incraseIndex("now")}>
        //           <BsChevronCompactRight />
        //         </NextBtn>
        //       </Slider>
        //       {/* 주 기준 인기 영화작품 */}
        //       {/* 극장 개봉작 */}
        //     </SliderWrap>
        //     <SliderWrap>
        //       <Slider>
        //         <PrevBtn onClick={() => decraseIndex("top")}>
        //           <BsChevronCompactLeft />
        //         </PrevBtn>

        //         <RowTitle
        //           whileHover="hover"
        //           animate="rest"
        //           initial="rest"
        //           onHoverStart={(prev) => setHover(!prev)}
        //           onHoverEnd={(prev) => setHover(!prev)}
        //         >
        //           평점 높은 순위
        //           <MoreWrap>
        //             <MoreMovies variants={slashVariants}>모두 보기</MoreMovies>
        //             <motion.div variants={iconVariants} initial={{ x: -30 }}>
        //               <BsCaretRightFill />
        //             </motion.div>
        //           </MoreWrap>
        //         </RowTitle>
        //         <AnimatePresence
        //           initial={false}
        //           onExitComplete={toggleLeaving}
        //           custom={back}
        //         >
        //           <Row
        //             variants={rowVariants}
        //             initial="hidden"
        //             animate="visible"
        //             exit="exit"
        //             transition={{ type: "tween", duration: 1 }}
        //             key={rIndex}
        //             custom={back}
        //           >
        //             {mtop?.results
        //               .slice(1)
        //               .slice(offset * rIndex, offset * rIndex + offset)
        //               .map((movie) => (
        //                 <Box
        //                   layoutId={movie.id + "r"}
        //                   key={movie.id}
        //                   variants={boxVariants}
        //                   initial="normal"
        //                   whileHover="hover"
        //                   transition={{ type: "tween" }}
        //                   bgphoto={makeImagePath(movie.poster_path, "w500")}
        //                   onClick={() => onBoxClicked(movie.id + "r")}
        //                 >
        //                   <Info variants={infoVariants}>
        //                     <h4>{movie.title}</h4>
        //                   </Info>
        //                 </Box>
        //               ))}
        //           </Row>
        //         </AnimatePresence>
        //         <NextBtn onClick={() => incraseIndex("top")}>
        //           <BsChevronCompactRight />
        //         </NextBtn>
        //       </Slider>
        //       {/* 주 기준 인기 영화작품 */}
        //       {/* 극장 개봉작 */}
        //     </SliderWrap>
        //   </SliderWrapper>
        //   {/* 영화 정보 보기 화면 */}
        //   <AnimatePresence>
        //     {movieId ? (
        //       <>
        //         <DetailBox
        //           contentId={movieId}
        //           clickedContent={clickedMovie}
        //           genObj={genObj}
        //           content={content}
        //         />
        //       </>
        //     ) : null}
        //   </AnimatePresence>
        // </>
      )}
    </Wrapper>
  );
}
export default Movie;
