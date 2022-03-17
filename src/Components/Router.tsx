import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Profile from "../Routes/Profile";
import Header from "./Header/Header";
import HeaderSign from "./Header/HeaderSign";
import Movie from "./Movie";
import Search from "./Search";
import SignIn from "./SignIn";
import Tv from "./Tv";

interface ILog {
  isLoggedIn: boolean;
}

function AppRouter({ isLoggedIn }: ILog) {
  return (
    <Router>
      {isLoggedIn ? <Header /> : <HeaderSign />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}>
              <Route path=":seriesId" element={<Home />} />
            </Route>
            <Route path="/movies" element={<Movie />}>
              <Route path=":movieId" element={<Movie />} />
            </Route>
            <Route path="/tv" element={<Tv />}>
              <Route path=":tvId" element={<Tv />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Auth />} />
            <Route path="/signin" element={<SignIn />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
export default AppRouter;
