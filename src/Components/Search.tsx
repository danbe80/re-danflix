import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getGenre, getSearch, IGenre, IGetContentResult } from "../api";
import { makeImagePath } from "../utils";
import Loading from "./Loading";

const Wrapper = styled.div`
  position: relative;
  top: 100px;
  overflow: hidden;
  padding-bottom: 200px;
`;
const Loader = styled.div``;
const RelatedSearchWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 60px;
  overflow-wrap: break-word;
  span {
  }
`;
const RelatedSearch = styled.ul`
  display: flex;
`;
const SearchItem = styled.li`
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.red};
  }
`;
const SearchWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 0 60px;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: ${(props) => props.theme.white.lighter};
  background-image: url(${(props) => props.bgphoto});
  background-size: 100% 200px;
  background-position: center center;
  height: 200px;
  border-radius: 3px;
  cursor: pointer;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  opacity: 0;
  bottom: 0;
  width: 100%;
  font-size: 14px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigList = styled(motion.div)`
  position: absolute;
  width: 50vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 100px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.darker};
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
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 15px 15px 0 0;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 30px;
  position: relative;
  top: -120px;
  letter-spacing: -2px;
`;
const BigMovieInfo = styled.div`
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
function Search() {
  const navigation = useNavigate();
  const location = useLocation();
  const listId = new URLSearchParams(location.search).get("sid");
  const keyword: any = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetContentResult>(
    ["search", "keyword"],
    () => getSearch(keyword)
  );

  const onBoxClicked = (listId: number) => {
    navigation(`/search?keyword=${keyword}&sid=${listId}`);
  };
  const onOverlayClick = () => navigation(`/search?keyword=${keyword}`);
  const { scrollY } = useViewportScroll();
  const clickedList =
    listId && data?.results.find((list) => list.id === +listId);
  const { data: genre } = useQuery<IGenre>("genres", getGenre);
  const listGenres =
    listId && data?.results.find((list) => list.id === +listId)?.genre_ids;
  let genObj: string[] = [];
  const genresName =
    listGenres &&
    listGenres.forEach((id) =>
      genre?.genres.find((gen) =>
        gen.id === id ? genObj.push(gen.name) : null
      )
    );
  // 홈으로 가서 검색하면 빠르게 검색이 가능함 하지만 검색한 후 다시 검색하면 굉장히 느린 것을 알 수 있음
  // 연관 검색어 중복 제거
  /* const relatedKeyArr = data?.results.map((key) => key.name || key.title);
  const relatedKey = relatedKeyArr?.filter(
    (item, i) => relatedKeyArr.indexOf(item) === i
  );
  console.log(relatedKey); */
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <RelatedSearchWrap>
            <span>다음과 관련된 콘텐츠:</span>
            <RelatedSearch>
              {data?.results.slice(0, 5).map((list) => (
                <SearchItem>{list.name || list.title}</SearchItem>
              ))}
            </RelatedSearch>
          </RelatedSearchWrap>
          <AnimatePresence>
            <SearchWrap>
              {data?.results.map((list) => (
                <Box
                  layoutId={list.id + "serach"}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  key={list.id}
                  bgphoto={makeImagePath(list.poster_path, "w500")}
                  onClick={() => onBoxClicked(list.id)}
                >
                  <Info variants={infoVariants}>
                    <h4>{list.name || list.title}</h4>
                  </Info>
                </Box>
              ))}
            </SearchWrap>
          </AnimatePresence>
        </>
      )}
      <AnimatePresence>
        {listId ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BigList
                style={{ top: scrollY.get() + 100 }}
                layoutId={listId + "serach"}
              >
                {clickedList && (
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
                          clickedList.backdrop_path || clickedList.poster_path,
                          "w500"
                        )})`,
                      }}
                    />
                    <BigTitle>{clickedList.title || clickedList.name}</BigTitle>
                    <BigMovieInfo>
                      <BigGenres>
                        {genObj.map((genre, i) => (
                          <li key={i}>{genre}</li>
                        ))}
                      </BigGenres>
                      <BigReleaseDate>
                        {clickedList.release_date}
                      </BigReleaseDate>
                    </BigMovieInfo>
                    <BigOverview>{clickedList.overview}</BigOverview>
                  </>
                )}
              </BigList>
            </Overlay>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;

/* 
  검색해서 결과가 나오는데 너무 오래 걸림... 

  검색 결과 나오는 목록 중 가끔 사진이 없는 애들이 있음
*/
