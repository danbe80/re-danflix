/* 
  사용하고 있는 api 주소: https://www.themoviedb.org/
  작성자: Lee Hye Rin(danbe80)

  2022.3.10 수정 (api 추가)

*/


const API_KEY = '8649939cb56656c3bd0052ccb1e4a89e';
const BASE_PATH = "https://api.themoviedb.org/3"

export interface IContent {
  backdrop_path: string;
  id: number;
  poster_path: string;
  genre_ids: [];
  title: string;
  name: string;
  overview: string;
  vote_average: number;
  release_date: string;
  first_air_date: string;
}

export interface IGetContentResult {
  id: number;
  dates: {
    maximum: string;
    minmum: string;
  };
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}

// 장르 인터페이스
export interface IGenre {
  genres: [
    {
      id: number,
      name: string
    }
  ]
}

// 예고편 api
interface IVideo {
name: string,
key: string,
published_at: string,
id: string
}

export interface IGetVideo {
  id: string;
  results: IVideo[];
}

// 현재 극장에서 개봉하고 있는 영화 api (Movie)
export function getMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}
// 평점 높은 영화 api
export function getMtopRated(){
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}

// 인기 있는 Tv 시리즈 api (Tv)
export function getTvs(){
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko&page=1`).then(
    response => response.json()
  );
}

// 최고 평점 Tv 시리즈 api
export function getTopRated(){
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`).then(
    response => response.json()
  );
}

// 트렌드 api (Home) 하루
export function getDay(){
  return fetch(`${BASE_PATH}/trending/all/day?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}
// 한 주 동안 인기 있던 영화 api
export function getWeek(){
  return fetch(`${BASE_PATH}/trending/all/week?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}
// 검색 api
export function getSearch(keyword:string){
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}`).then(
    response => response.json()
  );
}

// 장르 모아둔 api
export function getGenre(){
  return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}
// 영화예고편 api
export function getMovieVideo(listId:string){
  return fetch(`${BASE_PATH}/movie/${listId}/videos?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}
// Tv 예고편 api
export function getTvvideo(tvId:string){
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}&language=ko`).then(
    response => response.json()
  );
}