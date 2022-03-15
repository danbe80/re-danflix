/* 
2022.3.6 start
2022.3.10 수정 - 트렌드 all api로 바꿈

작성자: Lee Hye Rin (danbe80)

*/

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BsCaretRightFill,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDay, getGenre, getWeek, IGenre, IGetContentResult } from "../api";
import DetailBox from "../Components/DetailBox";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.dark};
  overflow: hidden;
`;
// 로딩
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    height: 200px;
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 40px;
  }
`;
/* 제목 */
const Title = styled.h2`
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
  background-size: 100% 100%;
  /* background-repeat: no-repeat; */
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
const content = "/";

function Home() {
  // 24시간 전체 인기 작품 api
  const { data: day, isLoading } = useQuery<IGetContentResult>(
    ["day", "trending"],
    getDay
  );
  // 일주일 전체 인기 작품 api
  const { data: week } = useQuery<IGetContentResult>(
    ["week", "trending"],
    getWeek
  );

  // 현재 클릭한 박스 아이디
  const { seriesId } = useParams();
  const [dIndex, setDindex] = useState(0);
  const [wIndex, setWindex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const [isHover, setHover] = useState(false);

  // 앞으로 이동
  // 코드 중복 극혐... 나중에 바꿔주겠어...
  const incraseIndex = (date: string) => {
    if (date === "day") {
      if (day) {
        if (leaving) return;
        toggleLeaving();
        setBack(false);
        const totalDay = day.results.length - 1;
        const maxIndex = Math.floor(totalDay / offset) - 1;
        setDindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    } else if (date === "week") {
      if (week) {
        if (leaving) return;
        toggleLeaving();
        setBack(false);
        const totalWeek = week.results.length - 1;
        const maxIndex = Math.floor(totalWeek / offset) - 1;
        setWindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };
  // 뒤로 이동
  const decraseIndex = (date: string) => {
    if (date === "day") {
      if (day) {
        if (leaving) return;
        toggleLeaving();
        setBack(true);
        const totalSeries = day?.results.length - 1;
        const maxIndex = Math.floor(totalSeries / offset) - 1;
        setDindex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    } else if (date === "week") {
      if (week) {
        if (leaving) return;
        toggleLeaving();
        setBack(true);
        const totalSeries = week?.results.length - 1;
        const maxIndex = Math.floor(totalSeries / offset) - 1;
        setWindex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };
  // 이동 애니메이션 시작되는 동시에 다시 눌러도 이동 애니메이션이 잃어나지 않는다.
  const toggleLeaving = () => setLeaving((prev) => !prev);

  // 박스 클릭 시 주소 변경 (박스 아이디 포함 주소)
  const onBoxClicked = (seriesId: string) => {
    navigation(`/${seriesId}`);
  };

  const navigation = useNavigate();

  // 장르 api
  const { data: genre } = useQuery<IGenre>("genres", getGenre);
  const trendGenres = seriesId
    ? seriesId.includes("d")
      ? day?.results.find((day) => day.id === +seriesId.slice(0, -1))?.genre_ids
      : seriesId.includes("w")
      ? week?.results.find((week) => week.id === +seriesId.slice(0, -1))
          ?.genre_ids
      : null
    : null;

  let genObj: string[] = [];
  const genresName =
    trendGenres &&
    trendGenres.forEach((id: number) =>
      genre?.genres.find((gen) =>
        gen.id === id ? genObj.push(gen.name) : null
      )
    );

  const clickedtrend = seriesId
    ? seriesId.includes("d")
      ? day?.results.find(
          (series: { id: number }) => series.id === +seriesId.slice(0, -1)
        )
      : seriesId.includes("w")
      ? week?.results.find(
          (serise: { id: number }) => serise.id === +seriesId.slice(0, -1)
        )
      : null
    : null;

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
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* 배너 */}
          <Banner bgphoto={makeImagePath(day?.results[0].backdrop_path || "")}>
            <Title>{day?.results[0].title}</Title>
            <Overview>
              {day
                ? day?.results[0].overview.length > 180
                  ? day?.results[0].overview.slice(0, 180) + "..."
                  : day?.results[0].overview
                : null}
            </Overview>
          </Banner>
          <SliderWrapper>
            {/* 첫번째 슬라이드 - 24시간 인기 작품 */}
            <SliderWrap>
              <Slider>
                <PrevBtn onClick={() => decraseIndex("day")}>
                  <BsChevronCompactLeft />
                </PrevBtn>

                <RowTitle
                  whileHover="hover"
                  animate="rest"
                  initial="rest"
                  onHoverStart={(prev) => setHover(!prev)}
                  onHoverEnd={(prev) => setHover(!prev)}
                >
                  24시간 인기 작품
                  <MoreWrap>
                    <MoreMovies variants={slashVariants}>모두 보기</MoreMovies>
                    <motion.div variants={iconVariants} initial={{ x: -30 }}>
                      <BsCaretRightFill />
                    </motion.div>
                  </MoreWrap>
                </RowTitle>
                <AnimatePresence
                  initial={false}
                  onExitComplete={toggleLeaving}
                  custom={back}
                >
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={dIndex}
                    custom={back}
                  >
                    {day?.results
                      .slice(1)
                      .slice(offset * dIndex, offset * dIndex + offset)
                      .map((series) => (
                        <Box
                          layoutId={series.id + "d"}
                          key={series.id}
                          variants={boxVariants}
                          initial="normal"
                          whileHover="hover"
                          transition={{ type: "tween" }}
                          bgphoto={makeImagePath(series.poster_path, "w500")}
                          onClick={() => onBoxClicked(series.id + "d")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{series.title || series.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
                <NextBtn onClick={() => incraseIndex("day")}>
                  <BsChevronCompactRight />
                </NextBtn>
              </Slider>
            </SliderWrap>
            <SliderWrap>
              <Slider>
                <PrevBtn onClick={() => decraseIndex("week")}>
                  <BsChevronCompactLeft />
                </PrevBtn>

                <RowTitle
                  whileHover="hover"
                  animate="rest"
                  initial="rest"
                  onHoverStart={(prev) => setHover(!prev)}
                  onHoverEnd={(prev) => setHover(!prev)}
                >
                  주 인기 작품
                  <MoreWrap>
                    <MoreMovies variants={slashVariants}>모두 보기</MoreMovies>
                    <motion.div variants={iconVariants} initial={{ x: -30 }}>
                      <BsCaretRightFill />
                    </motion.div>
                  </MoreWrap>
                </RowTitle>

                <AnimatePresence
                  initial={false}
                  onExitComplete={toggleLeaving}
                  custom={back}
                >
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={wIndex}
                    custom={back}
                  >
                    {week?.results
                      .slice(1)
                      .slice(offset * wIndex, offset * wIndex + offset)
                      .map((series) => (
                        <Box
                          layoutId={series.id + "w"}
                          key={series.id}
                          variants={boxVariants}
                          initial="normal"
                          whileHover="hover"
                          transition={{ type: "tween" }}
                          bgphoto={makeImagePath(series.poster_path, "w500")}
                          onClick={() => onBoxClicked(series.id + "w")}
                        >
                          <Info variants={infoVariants}>
                            <h4>{series.title || series.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>

                <NextBtn onClick={() => incraseIndex("week")}>
                  <BsChevronCompactRight />
                </NextBtn>
              </Slider>
            </SliderWrap>
          </SliderWrapper>
          <AnimatePresence>
            {seriesId ? (
              <>
                <DetailBox
                  contentId={seriesId}
                  clickedContent={clickedtrend}
                  genObj={genObj}
                  content={content}
                />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
