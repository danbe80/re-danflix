import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Profile from "../Routes/Profile";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import SignIn from "./SignIn";
import Tv from "./Tv";
import MainPage from "./MainPage";
import AuthForm from "./Sign/LoginModal";
import MovieDetailPage from "./MovieDetailPage";
import MovieRatingList from "./MovieRatingList";
import RatingWritePage from "./RatingWritePage";
import RatingDetailPage from "./RatingDetailPage";
import Mypage from "./MyPage";

interface IUser {
  displayName: string | null;
  uid: string;
  profilePhotoURL: string | null;
  updataProfile: (args: any) => Promise<void>;
}

interface ILog {
  isLoggedIn: boolean;
  userObj: IUser | null | undefined;
  refreshUser: () => void;
}

function AppRouter({ isLoggedIn, userObj, refreshUser }: ILog) {
  return (
    <Router>
      {/* {isLoggedIn ? <Header userObj={userObj} /> : <HeaderSign />} */}
      <Header />
      {/* <Mypage /> */}
      {/* <RatingDetailPage /> */}
      {/* <MovieRatingList /> */}
      {/* <MainPage /> */}
      {/* <MovieDetailPage /> */}
      <Routes>
        {/* {isLoggedIn ? (
          <> */}
        <Route path="/" element={<MainPage />}>
          <Route path=":seriesId" element={<MainPage />} />
        </Route>
        <Route path="/movies" element={<MovieDetailPage />}>
          <Route path=":movieId" element={<MovieDetailPage />}></Route>
        </Route>
        <Route path="/review" element={<RatingWritePage />}>
          <Route path=":reviewId" element={<RatingDetailPage />}></Route>
        </Route>

        {/* <Route path="/movies" */}
        {/*
            <Route path="/tv" element={<Tv />}>
              <Route path=":tvId" element={<Tv />} />
            </Route>
            <Route
              path="/profile"
              element={
                <Profile userObj={userObj} refreshUser={() => refreshUser} />
              }
            /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        {/* </>
        ) : (
          <> */}
        {/* <Route path="/*" element={<Auth />} />
            <Route path="/signin" element={<SignIn />} /> */}
        {/* </> */}
        {/* )} */}
      </Routes>
    </Router>
  );
}
export default AppRouter;
