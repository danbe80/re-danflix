// /*

import { useState } from "react";
import LoginModal from "./Sign/LoginModal";
import SignupModal from "./Sign/SignupModal";

//   2022. 3. 4 start
//   모든 페이지 header components
//   framer-motion을 이용한 animation 구현

//   2025. 01. 23 refactoring

//   Header랑 HeaderSign이랑 합침
//   component 재활용
// */

//   return (
//     <Headeer>
//       {/* 헤더 공통 : 로고 */}
//       <Logo onClick={onHome}>
//         DANVIEW
//       </Logo>

//       {/* 로그인 전 헤더 : 로고, 로그인 버튼*/}
//       {
//         !userObj ? (
//           <>
//           {
//             currentURL.pathname !== "/signin" ? (
//               <LoginBtn onClick={onSignIn}>Login</LoginBtn>
//             ) : null
//           }
//           </>
//         ) : (
//             /* 로그인 후 헤더 : 로고, 컨텐츠 메뉴(nav), 검색 아이콘, 로그인 프로필*/
//             <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
//             <Wrap>
//               <Items>
//                 <Item>
//                   {/* 각 url의 pathname을 확인해 정해놓은 pathname과 동일 시 circle이 생성 */}
//                   <Link to="/">
//                     홈{match.pathname === "/" && <Circle layoutId="circle" />}
//                   </Link>
//                 </Item>
//                 <Item>
//                   <Link to="/tv">
//                     시리즈{match.pathname === "/tv" && <Circle layoutId="circle" />}
//                   </Link>
//                 </Item>
//                 <Item>
//                   <Link to="/movies">
//                     영화
//                     {match.pathname === "/movies" && <Circle layoutId="circle" />}
//                   </Link>
//                 </Item>
//               </Items>

//               {/* 반응형 메뉴 (태블릿(768px)부터 생김) */}
//               <RMenu onClick={onShowMenu}>
//                 메뉴 <BsFillCaretDownFill />
//               </RMenu>
//               {clickMenu ? (
//                 <RItems onClick={onShowMenu}>
//                   <RItem>
//                     <Link to="/">홈</Link>
//                   </RItem>
//                   <RItem>
//                     <Link to="/tv">시리즈</Link>
//                   </RItem>
//                   <RItem>
//                     <Link to="/movies">영화</Link>
//                   </RItem>
//                 </RItems>
//               ) : null}

//             </Wrap>
//             <SearchAndProfileWrap>
//               <Search onSubmit={handleSubmit(onValid)}>
//                 <SearchIcon
//                   onClick={toggleSearch}
//                   animate={{ x: searchOpen ? -160 : 0 }}
//                   transition={{ type: "linear" }}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                     clipRule="evenodd"
//                   />
//                 </SearchIcon>
//                 <Input
//                   {...register("keyword", { required: true, minLength: 2 })}
//                   autoComplete="off"
//                   animate={inputAnimation}
//                   initial={{ scaleX: 0 }}
//                   transition={{ type: "linear" }}
//                   placeholder="제목, 사람, 장르"
//                 />
//                 {cancel ? (
//                   <XIcon onClick={onCancel}>{cancel ? <BsX /> : null}</XIcon>
//                 ) : null}
//               </Search>
//               {/* 유저 아이콘 추가 예정 (Profile)  */}
//               {profilepath === "/profile" ? (
//                 <>
//                   <LogOutBtn onClick={handleLogOut}>
//                     <RiLogoutBoxLine />
//                   </LogOutBtn>
//                 </>
//               ) : (
//                 <>
//                   <ProfileWrap
//                     variants={proVariants}
//                     initial="normal"
//                     onClick={onProfile}
//                     whileHover="hover"
//                   >
//                     <ProfilePhoto profile={userObj?.profilePhotoURL} />
//                   </ProfileWrap>
//                 </>
//               )}
//             </SearchAndProfileWrap>
//             </Nav>
//         )
//       }

//     </Headeer>
//   );
// }

// components/Header.jsx
export default function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md sticky top-0 z-50 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-500">DANVIEW</h1>
      <nav className="flex gap-6">
        <button onClick={() => setShowAuth(true)} className="text-indigo-500">
          로그인
        </button>
        {showAuth && (
          <LoginModal
            onClose={() => setShowAuth(false)}
            onSignupOpen={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        )}

        <button
          onClick={() => setShowSignup(true)}
          className="text-gray-700 hover:text-pink-500"
        >
          회원가입
        </button>
        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      </nav>
    </header>
  );
}
