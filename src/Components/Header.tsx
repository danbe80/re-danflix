/* 

  2022. 3. 4 start
  모든 페이지 header components
  framer-motion을 이용한 animation 구현
  

  2025. 01. 23 refactoring

  Header랑 HeaderSign이랑 합침
  component 재활용
*/

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCaretDownFill, BsX } from "react-icons/bs";
import { authService } from "../firebaseConfig";
import { RiLogoutBoxLine } from "react-icons/ri";

// *** 공통 헤더(로고) css *** //
// Header 
const Headeer = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /* 모바일 화면 */
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    padding: 0 20px;
    height: 60px;
    border: none;
  }
`
// 홈페이지 로고
const Logo = styled.h1`
  font-family: ${(props) => props.theme.logo.family}, serif;
  font-size: 2rem;
  color: ${(props) => props.theme.logo.color};
  // -webkit-text-stroke: 3px #000000;
  text-shadow: -3px 0 #000, 0 3px #000, 3px 0 #000, 0 -3px #000;
  cursor: pointer;
  `
// ************************** //

// *** 로그인 전 헤더 (로그인 버튼) *** //
const LoginBtn = styled.button`
  width: 4vw;
  height: 35px;
  background-color: ${(props) => props.theme.commonBtn.fill};
  border-radius: 15px;
  text-align: center;
  align-content: center;
  color: ${(props) => props.theme.black.dark};
  font-size: 18px;
  font-family: "Jaro", serif;
  border: 2px solid ${(props) => props.theme.commonBtn.stroke};
  box-shadow: 0 4px 4px ${(props) => props.theme.commonBtn.shadow};
  transition-duration:0.2s;

  &:hover {
    background-color: ${(props) => props.theme.commonBtn.hoverFill};
    color: ${(props) => props.theme.white.lighter};
    box-shadow: inset 0 4px 4px ${(props) => props.theme.commonBtn.shadow};
  }

  @media (max-width: ${(props) => props.theme.size.labtopL})
  and (min-width: ${(props) => props.theme.size.labtop}) {
    width: 6vw;
  }

  @media (max-width: ${(props) => props.theme.size.labtop}) 
  and (min-width: ${(props) => props.theme.size.tabletL}){
    width: 8vw;
  }

  @media (max-width: ${(props) => props.theme.size.tabletL}) 
  and (min-width: ${(props) => props.theme.size.mobileL}){
    width: 10vw;
  }

  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    width: 20vw;
  }

  @media (max-width: ${(props) => props.theme.size.mobile}) {
    font-size: 16px;
  }


`;

// ************************** //

const Nav = styled(motion.nav)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.black.dark};
  z-index: 10;

  @media (max-width: ${(props) => props.theme.size.tablet}) {
    /* padding: 30px; */
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    /* padding: 20px; */
  }
  @media (max-width: ${(props) => props.theme.size.mobile}) {
    /* padding: 10px; */
  }
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchAndProfileWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;

`

const Items = styled.ul`
  width: 80%;
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: none;
  }
`;

const Item = styled.li`
  width: 10%;
  position: relative;
  text-align: center;
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
  color: ${(props) => props.theme.black.dark};
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
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  margin-left: 10px;
  position: relative;
  cursor: pointer;
`;
const ProfilePhoto = styled.div<{ profile: string | null | undefined }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.profile});
  background-size: cover;
  border-radius: 5px;
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
    background: "",
  },
  // scroll: {
  //   background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))",
  // },
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
interface IUser {
  displayName: string | null;
  uid: string;
  profilePhotoURL: string | null;
  updataProfile: (args: any) => Promise<void>;
}
interface IObj {
  userObj: IUser | undefined | null;
}
function Header({ userObj }: IObj) {
  /* 검색 아이콘 오픈 */
  const [searchOpen, setSearchOpen] = useState(false);

  /* 각 페이지의 위치(pathname 사용) */
  const match = useLocation();

  // 로그인 버튼
  const onSignIn = () => {
    navigation(`/signin`);
  };

  // 로고 클릭시 홈 이동 (공통 기능)
  const onHome = () => {
    if(currentURL.pathname === "/") {
      window.location.reload();
    } else {
      navigation(`/`);
      setClickMenu(false);
    }
  };


  // *** 로그인 완료 후 기능 *** //

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

  // 현재 주소
  const currentURL = useLocation();

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
    <Headeer>
      {/* 헤더 공통 : 로고 */}
      <Logo onClick={onHome}>
        DANVIEW
      </Logo>

      {/* 로그인 전 헤더 : 로고, 로그인 버튼*/}
      {
        !userObj ? (
          <>
          {
            currentURL.pathname !== "/signin" ? (
              <LoginBtn onClick={onSignIn}>Login</LoginBtn>
            ) : null
          }
          </>
        ) : (
            /* 로그인 후 헤더 : 로고, 컨텐츠 메뉴(nav), 검색 아이콘, 로그인 프로필*/
            <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
            <Wrap>
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
            <SearchAndProfileWrap>
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
                    <ProfilePhoto profile={userObj?.profilePhotoURL} />
                  </ProfileWrap>
                </>
              )}
            </SearchAndProfileWrap>
            </Nav>
        )
      }
      

     
    </Headeer>
  );
}

export default Header;
function data(data: any) {
  throw new Error("Function not implemented.");
}
