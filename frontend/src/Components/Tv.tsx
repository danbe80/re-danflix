import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BsCaretRightFill,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
// import styled from "styled-components";
import {
  getGenre,
  getTopRated,
  getTvs,
  IGenre,
  IGetContentResult,
} from "../api";
import { makeImagePath } from "../utils";
import DetailBox from "./DetailBox";
import Loading from "./Loading";

// const Wrapper = styled.div`
//   background-color: black;
//   overflow: hidden;
// `;
// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const Banner = styled.div<{ bgphoto: string }>`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.bgphoto});
//   background-size: 100vw 100vh;
//   position: relative;
//   @media (max-width: ${(props) => props.theme.size.mobileL}) {
//     height: 200px;
//     background-size: 100%;
//     background-repeat: no-repeat;
//     padding: 40px;
//   }
// `;
// // 태블릿 크기부터
// const GenreTitle = styled.h2`
//   position: absolute;
//   top: 60px;
//   font-size: 16px;
//   font-weight: bold;
//   display: none;
//   @media (max-width: ${(props) => props.theme.size.tablet}) {
//     display: block;
//   }
//   @media (max-width: ${(props) => props.theme.size.mobileL}) {
//     top: 40px;
//     font-size: 12px;
//   }
// `;
// /* 제목 */
// const Title = styled.h2`
//   margin-top: 140px;
//   font-size: 55px;
//   margin-bottom: 20px;
//   @media (max-width: ${(props) => props.theme.size.tablet}) {
//     font-size: 35px;
//     margin-top: 120px;
//     margin-bottom: 10px;
//   }
//   @media (max-width: ${(props) => props.theme.size.mobileL}) {
//     font-size: 18px;
//   }
// `;
// /* 요약내용 */
// const Overview = styled.p`
//   font-size: 20px;
//   width: 50%;
//   @media (max-width: ${(props) => props.theme.size.tablet}) {
//     font-size: 14px;
//     width: 70%;
//   }
//   @media (max-width: ${(props) => props.theme.size.mobileL}) {
//     display: none;
//   }
// `;

// const SliderWrapper = styled.div`
//   width: 100%;
//   position: relative;
//   top: -120px;
//   @media (max-width: ${(props) => props.theme.size.tablet}) {
//     top: -50px;
//   }
//   @media (max-width: ${(props) => props.theme.size.mobileL}) {
//     top: 0;
//   }
// `;
// const SliderWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;
// const Slider = styled(motion.div)`
//   height: 250px;
//   margin: auto 35px;
//   position: relative;
//   span {
//     /* 버튼 공통 css : PrevBtn, NextBtn*/
//     width: 35px;
//     height: 200px;
//     display: flex;
//     align-items: center;
//     position: absolute;
//     color: ${(props) => props.theme.white.darker};
//     z-index: 1;
//     opacity: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     font-size: 40px;
//     cursor: pointer;
//   }
//   &:hover > span,
//   &:hover > h2 div > svg {
//     opacity: 1;
//     transition: all 0.5s;
//   }
// `;
// const PrevBtn = styled(motion.span)`
//   left: -35px;
//   top: 25px;
// `;
// const NextBtn = styled(motion.span)`
//   right: -35px;
//   top: 25px;
// `;
// const RowTitle = styled(motion.h2)`
//   display: inline-flex;
//   align-items: center;
//   font-size: 14px;
//   font-weight: bold;
//   margin-bottom: 5px;
//   padding: 0 0 0 5px;
// `;

// const MoreWrap = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   margin-top: 2px;
//   svg {
//     opacity: 0;
//     font-size: 10px;
//   }
// `;

// const MoreTvs = styled(motion.div)`
//   transform-origin: left center;
//   font-size: 10px;
//   margin-left: 4px;
//   margin-top: 1px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 10px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   @media (max-width: ${(props) => props.theme.size.mobileL}) {
//     grid-template-columns: repeat(4, 1fr);
//   }
//   @media (max-width: ${(props) => props.theme.size.mobile}) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;
// const Box = styled(motion.div)<{ bgphoto: string }>`
//   background-color: #f1f1f1;
//   background-image: url(${(props) => props.bgphoto});
//   background-size: 100% 200px;
//   background-position: center center;
//   height: 200px;
//   font-size: 66px;
//   border-radius: 3px;
//   cursor: pointer;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;
// const Info = styled(motion.div)`
//   padding: 10px;
//   background-color: ${(props) => props.theme.black.lighter};
//   position: absolute;
//   opacity: 0;
//   bottom: 0;
//   width: 100%;
//   h4 {
//     text-align: center;
//     font-size: 16px;
//     line-height: 18px;
//   }
// `;
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
    x: -38,
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
const content = "/tv";
function Tv() {
  // 인기 시리즈 api
  const { data: popular, isLoading } = useQuery<IGetContentResult>(
    ["tv", "popular"],
    getTvs
  );
  // 실시간 반영 api
  const { data: top } = useQuery<IGetContentResult>(["tv", "top"], getTopRated);
  const [pIndex, setPindex] = useState(0);
  const [tIndex, setTindex] = useState(0);

  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const [isHover, setHover] = useState(false);

  // 앞으로 이동
  const incraseIndex = (list: string) => {
    if (list === "popular") {
      if (popular) {
        if (leaving) return;
        toggleLeaving();
        setBack(false);
        const totalTvs = popular.results.length - 1;
        const maxIndex = Math.floor(totalTvs / offset) - 1;
        setPindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    } else if (list === "top") {
      if (top) {
        if (leaving) return;
        toggleLeaving();
        setBack(false);
        const totalTvs = top.results.length - 1;
        const maxIndex = Math.floor(totalTvs / offset) - 1;
        setTindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };
  // 뒤로 이동
  const decraseIndex = (list: string) => {
    if (list === "popular") {
      if (popular) {
        if (leaving) return;
        toggleLeaving();
        setBack(true);
        const totalTvs = popular.results.length - 1;
        const maxIndex = Math.floor(totalTvs / offset) - 1;
        setPindex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    } else if (list === "top") {
      if (top) {
        if (leaving) return;
        toggleLeaving();
        setBack(true);
        const totalTvs = top.results.length - 1;
        const maxIndex = Math.floor(totalTvs / offset) - 1;
        setTindex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };

  // 이동 애니메이션 시작되는 동시에 다시 눌러도 이동 애니메이션이 잃어나지 않는다.
  const toggleLeaving = () => setLeaving((prev) => !prev);
  // 박스 클릭 시 주소 변경 (박스 아이디 포함 주소)
  const onBoxClicked = (tvId: string) => {
    navigation(`/tv/${tvId}`);
  };

  // 상세 정보 벗어나기
  const navigation = useNavigate();
  const { tvId } = useParams();
  const clickedTv = tvId
    ? tvId.includes("p")
      ? popular?.results.find((tv) => tv.id === +tvId.slice(0, -1))
      : tvId.includes("t")
      ? top?.results.find((tv) => tv.id === +tvId.slice(0, -1))
      : null
    : null;

  // 장르 api
  const { data: genre } = useQuery<IGenre>("genres", getGenre);
  const tvGenres = tvId
    ? tvId.includes("p")
      ? popular?.results.find((tv) => tv.id === +tvId.slice(0, -1))?.genre_ids
      : tvId.includes("t")
      ? top?.results.find((tv) => tv.id === +tvId.slice(0, -1))?.genre_ids
      : null
    : null;

  let genObj: string[] = [];
  const genresName =
    tvGenres &&
    tvGenres.forEach((id) =>
      genre?.genres.find((gen) =>
        gen.id === id ? genObj.push(gen.name) : null
      )
    );

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
    // <Wrapper>
    //   {isLoading ? (
    //     <Loading />
    //   ) : (
    //     <>
    //       <Banner
    //         bgphoto={makeImagePath(popular?.results[0].backdrop_path || "")}
    //       >
    //         <GenreTitle>Tv</GenreTitle>
    //         <Title>{popular?.results[0].name}</Title>
    //         <Overview>{popular?.results[0].overview}</Overview>
    //       </Banner>
    //       <SliderWrapper>
    //         {/* 첫번째 슬라이드 - 인기 시리즈 */}
    //         <SliderWrap>
    //           <Slider>
    //             <PrevBtn onClick={() => decraseIndex("popular")}>
    //               <BsChevronCompactLeft />
    //             </PrevBtn>

    //             <RowTitle
    //               whileHover="hover"
    //               animate="rest"
    //               initial="rest"
    //               onHoverStart={(prev) => setHover(!prev)}
    //               onHoverEnd={(prev) => setHover(!prev)}
    //             >
    //               인기 시리즈
    //               <MoreWrap>
    //                 <MoreTvs variants={slashVariants}>모두 보기</MoreTvs>
    //                 <motion.div variants={iconVariants} initial={{ x: -30 }}>
    //                   <BsCaretRightFill />
    //                 </motion.div>
    //               </MoreWrap>
    //             </RowTitle>
    //             <AnimatePresence
    //               initial={false}
    //               onExitComplete={toggleLeaving}
    //               custom={back}
    //             >
    //               <Row
    //                 variants={rowVariants}
    //                 initial="hidden"
    //                 animate="visible"
    //                 exit="exit"
    //                 transition={{ type: "tween", duration: 1 }}
    //                 key={pIndex}
    //                 custom={back}
    //               >
    //                 {popular?.results
    //                   .slice(1)
    //                   .slice(offset * pIndex, offset * pIndex + offset)
    //                   .map((tv) => (
    //                     <Box
    //                       layoutId={tv.id + "p"}
    //                       key={tv.id}
    //                       variants={boxVariants}
    //                       initial="normal"
    //                       whileHover="hover"
    //                       transition={{ type: "tween" }}
    //                       bgphoto={makeImagePath(tv.poster_path, "w500")}
    //                       onClick={() => onBoxClicked(tv.id + "p")}
    //                     >
    //                       <Info variants={infoVariants}>
    //                         <h4>{tv.name}</h4>
    //                       </Info>
    //                     </Box>
    //                   ))}
    //               </Row>
    //             </AnimatePresence>
    //             <NextBtn onClick={() => incraseIndex("popular")}>
    //               <BsChevronCompactRight />
    //             </NextBtn>
    //           </Slider>
    //         </SliderWrap>
    //         {/* 두번째 슬라이드 - 최고 평점 순위 */}
    //         <SliderWrap>
    //           <Slider>
    //             <PrevBtn onClick={() => decraseIndex("top")}>
    //               <BsChevronCompactLeft />
    //             </PrevBtn>

    //             <RowTitle
    //               whileHover="hover"
    //               animate="rest"
    //               initial="rest"
    //               onHoverStart={(prev) => setHover(!prev)}
    //               onHoverEnd={(prev) => setHover(!prev)}
    //             >
    //               최고 평점 순위
    //               <MoreWrap>
    //                 <MoreTvs variants={slashVariants}>모두 보기</MoreTvs>
    //                 <motion.div variants={iconVariants} initial={{ x: -30 }}>
    //                   <BsCaretRightFill />
    //                 </motion.div>
    //               </MoreWrap>
    //             </RowTitle>
    //             <AnimatePresence
    //               initial={false}
    //               onExitComplete={toggleLeaving}
    //               custom={back}
    //             >
    //               <Row
    //                 variants={rowVariants}
    //                 initial="hidden"
    //                 animate="visible"
    //                 exit="exit"
    //                 transition={{ type: "tween", duration: 1 }}
    //                 key={tIndex}
    //                 custom={back}
    //               >
    //                 {top?.results
    //                   .slice(1)
    //                   .slice(offset * tIndex, offset * tIndex + offset)
    //                   .map((tv) => (
    //                     <Box
    //                       layoutId={tv.id + "t"}
    //                       key={tv.id}
    //                       variants={boxVariants}
    //                       initial="normal"
    //                       whileHover="hover"
    //                       transition={{ type: "tween" }}
    //                       bgphoto={makeImagePath(tv.poster_path, "w500")}
    //                       onClick={() => onBoxClicked(tv.id + "t")}
    //                     >
    //                       <Info variants={infoVariants}>
    //                         <h4>{tv.name}</h4>
    //                       </Info>
    //                     </Box>
    //                   ))}
    //               </Row>
    //             </AnimatePresence>
    //             <NextBtn onClick={() => incraseIndex("top")}>
    //               <BsChevronCompactRight />
    //             </NextBtn>
    //           </Slider>
    //         </SliderWrap>
    //       </SliderWrapper>
    //       {/* Tv 정보 보기 화면 */}
    //       <AnimatePresence>
    //         {tvId ? (
    //           <>
    //             <DetailBox
    //               contentId={tvId}
    //               clickedContent={clickedTv}
    //               genObj={genObj}
    //               content={content}
    //             />
    //           </>
    //         ) : null}
    //       </AnimatePresence>
    //     </>
    //   )}
    // </Wrapper>
    <div></div>
  );
}

export default Tv;
