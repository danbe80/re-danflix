import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getGenre, getSearch, IGenre, IGetContentResult } from "../api";
import { makeImagePath } from "../utils";
import DetailBox from "./DetailBox";
import Loading from "./Loading";

const Wrapper = styled.div`
  position: relative;
  padding-top: 100px;
  overflow-x: hidden;
  height: 100vh;
`;
const RelatedSearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
  font-size: 14px;
  padding: 0 60px;
  span {
    margin-left: 5px;
    color: #a4b0be;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    padding: 0 40px;
    font-size: 12px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    padding: 0 20px;
  }
`;
const RelatedSearch = styled.ul`
  width: 100%;
  display: flex;
  margin: 10px 0 30px 0;
  color: ${(props) => props.theme.white.darker};
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    flex-wrap: wrap;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 10px;
  }
`;
const SearchItem = styled.li`
  padding: 2px 5px;
  cursor: pointer;
  &:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.white.darker};
  }
  &:hover {
    color: ${(props) => props.theme.red};
  }
`;
const SearchWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 0 60px;
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 40px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 20px;
  }
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
  const clickedList = listId
    ? data?.results.find((list) => list.id === +listId)
    : null;

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
  const onSearch = (list: any) => {
    navigation(`/search?keyword=${list.target.innerText}`);
  };
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
                <SearchItem
                  onClick={onSearch}
                  value={list.name || list.title}
                  key={list.id}
                >
                  {list.name || list.title}
                </SearchItem>
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
            <DetailBox
              contentId={listId}
              clickedContent={clickedList}
              genObj={genObj}
              content={`/search?keyword=${keyword}`}
            />
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
