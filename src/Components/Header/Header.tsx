/* 

  2022. 3. 4 start
  모든 페이지 header components
  framer-motion을 이용한 animation 구현
  


*/

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCaretDownFill, BsX } from "react-icons/bs";
import { authService } from "../../firebaseConfig";
import { RiLogoutBoxLine } from "react-icons/ri";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  height: 45px;
  padding: 30px 50px;
  z-index: 10;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    padding: 30px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    padding: 20px;
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    padding: 10px;
  }
`;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Logo = styled.svg`
  margin-right: 30px;
  width: 120px;
  height: 40px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
  path {
    stroke: white;
    stroke-width: 2;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 100px;
    margin-right: 20px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    width: 80px;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  font-size: 16px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: none;
  }
`;

const Item = styled.li`
  margin-right: 25px;
  position: relative;
`;
const RMenu = styled.span`
  display: none;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  svg {
    padding-top: 2px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: flex;
  }
`;
const RItems = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  text-align: center;
  top: 130%;
  right: -8px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
`;
const RItem = styled.li`
  padding: 10px;
  &:hover {
    background-color: rgba(25, 25, 25, 0.5);
    &:first-child {
      border-radius: 5px 5px 0 0;
    }
    &:last-child {
      border-radius: 0 0 5px 5px;
    }
  }
`;
const Search = styled.form`
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;
const SearchIcon = styled(motion.svg)`
  height: 25px;
  cursor: pointer;
`;

const Input = styled(motion.input)`
  color: ${(props) => props.theme.white.lighter};
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 8px 10px 8px 32px;
  z-index: -1;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  &:active {
    background-color: transparent;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const XIcon = styled.span`
  text-align: center;
  font-size: 20px;
  margin-right: 2px;
  margin-top: 2px;
  cursor: pointer;
`;

const ProfileWrap = styled(motion.div)`
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  margin-left: 10px;
  position: relative;
  cursor: pointer;
`;
const ProfilePhoto = styled.div`
  width: 100%;
  height: 100%;
`;
const Photo = styled.div``;

const ProfileSub = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100px;
  height: 200px;
  position: absolute;
  top: 70px;
  right: 30px;
  border-radius: 5px;
  opacity: 0;
`;

const LogOutBtn = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 10px;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const logoVariants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(229, 9, 20, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(229, 9, 20, 1)",
  },
};

const navVariants = {
  top: {
    background: "linear-gradient(rgba(0, 0, 0, .8), 50% ,rgba(0, 0, 0, 0))",
  },
  scroll: {
    background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))",
  },
};
const proVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
};

/* 검색창 interface */
interface IForm {
  keyword: string;
}

function Header() {
  /* 검색 아이콘 오픈 */
  const [searchOpen, setSearchOpen] = useState(false);

  /* 각 페이지의 위치(pathname 사용) */
  const match = useLocation();

  /* 검색창 애니메이션 */
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
    setCancel((prev) => !prev);
    setClickMenu(false);
  };

  /* 네비 애니메이션 */
  const navAnimation = useAnimation();
  /* 스크롤시 값 변화 */
  const { scrollY } = useViewportScroll();
  /* 스코롤 변화 감지 */
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  /* 검색창 */
  const [cancel, setCancel] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigate();
  const profilepath = useLocation().pathname;
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = (data: IForm) => {
    navigation(`/search?keyword=${data.keyword}`);
    setCancel(true);
  };

  // 검색 취소
  const onCancel = () => {
    setValue("keyword", "");
    toggleSearch();
    setCancel(false);
  };
  // 로고 클릭시 홈 이동
  const onHome = () => {
    navigation(`/`);
    setClickMenu(false);
  };
  // 내정보 보기(프로필)
  const onProfile = () => {
    navigation(`/profile`);
    setClickMenu(false);
  };
  // 로그아웃
  const handleLogOut = () => {
    authService.signOut();
    navigation(`/`);
  };
  // 반응형 메뉴
  const [clickMenu, setClickMenu] = useState(false);
  const onShowMenu = () => {
    setClickMenu((prev) => !prev);
  };
  return (
    <>
      <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
        <Wrap>
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
            onClick={onHome}
          >
            <motion.path
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 5 },
                fill: { duration: 2, delay: 3 },
              }}
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            />
          </Logo>
          <Items>
            <Item>
              {/* 각 url의 pathname을 확인해 정해놓은 pathname과 동일 시 circle이 생성 */}
              <Link to="/">
                홈{match.pathname === "/" && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link to="/tv">
                시리즈{match.pathname === "/tv" && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link to="/movies">
                영화
                {match.pathname === "/movies" && <Circle layoutId="circle" />}
              </Link>
            </Item>
          </Items>
          {/* 반응형 메뉴 (태블릿(768px)부터 생김) */}
          <RMenu onClick={onShowMenu}>
            메뉴 <BsFillCaretDownFill />
          </RMenu>
          {clickMenu ? (
            <RItems onClick={onShowMenu}>
              <RItem>
                <Link to="/">홈</Link>
              </RItem>
              <RItem>
                <Link to="/tv">시리즈</Link>
              </RItem>
              <RItem>
                <Link to="/movies">영화</Link>
              </RItem>
            </RItems>
          ) : null}
        </Wrap>
        <Wrap>
          {/* <button >로그아웃</button> */}
          <Search onSubmit={handleSubmit(onValid)}>
            <SearchIcon
              onClick={toggleSearch}
              animate={{ x: searchOpen ? -160 : 0 }}
              transition={{ type: "linear" }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </SearchIcon>
            <Input
              {...register("keyword", { required: true, minLength: 2 })}
              autoComplete="off"
              animate={inputAnimation}
              initial={{ scaleX: 0 }}
              transition={{ type: "linear" }}
              placeholder="제목, 사람, 장르"
            />
            {cancel ? (
              <XIcon onClick={onCancel}>{cancel ? <BsX /> : null}</XIcon>
            ) : null}
          </Search>
          {/* 유저 아이콘 추가 예정 (Profile)  */}
          {profilepath === "/profile" ? (
            <>
              <LogOutBtn onClick={handleLogOut}>
                <RiLogoutBoxLine />
              </LogOutBtn>
            </>
          ) : (
            <>
              <ProfileWrap
                variants={proVariants}
                initial="normal"
                onClick={onProfile}
                whileHover="hover"
              >
                <ProfilePhoto></ProfilePhoto>
              </ProfileWrap>
            </>
          )}
        </Wrap>
      </Nav>
    </>
  );
}

export default Header;
function data(data: any) {
  throw new Error("Function not implemented.");
}
