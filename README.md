# [DANFLIX](https://danflix-aed3e.web.app/) - NETFLIX CLONE SITE

**_ 이 사이트는 넷플릭스 클론 코딩 입니다 _**

---

## Skills

- React
- Firebase Auth
- TypeScript
- 

---

## 프로젝트 목표
> firebase Auth/login 기능 활용 \
> React 재활용 컨포넌트

---

## 주요 기능

### Firebase Auth

> 소셜 로그인 기능 구현 시 사용한 SDK


### Firebase-admin

> 데모 계정 생성할 시 사용한 SDK

### [TMDB open API](https://www.themoviedb.org/) 

> 전 세계 영화, 드라마, 컨텐츠 등의 정보를 공유해주는 오픈 커뮤니티 데이터베이스

<br>

---

> 2025.01.16 danflix Refactoring

## 수정사항

1. 데모계정 서로 다른 유저가 동시 로그인이 가능하다. => 버그가 맞다.
2. 동시 로그인한 데모계정의 프로필 정보를 한쪽에서 바꾸면 다른 기기로 로그인 동일한 데모계정도 프로필 정보가 동시에 변경된다.

1,2 번의 대한 해결 사항으론 데모 계정을 이메일 아이디가 다르게 생성되도록 한다.
=> 데모 계정으로 로그인하기 버튼으로 바꾸고 하루 10개의 데모 계정만 만들 수 있도록 변경한다.

2번에 대한 동시 로그인 해결 방안으론 

> 1. 진짜 넷플릭스처럼 같은 계정에 4개의 프로필을 생성 가능하도록 한다. => 내가 본 이력에 대한 정보도 다르게 저장이 되겠지?
> 2. 동시 로그인을 할 수 없도록 제한을 둔다. => 다른 곳에서 로그인하면 기존에 로그인 되어 있는 기기에선 자동 로그아웃 처리를 한다.

3. 장시간 활동이 없을 경우 자동 로그아웃 실행?
    => ott 플랫폼 클론코딩이라서 장시간 움직이지 않고 영상을 보는 페이지이기 때문에 이 기능이 들어가도 될지가 문제다.

4. 회원가입 버튼 클릭 시 다시 메인 화면으로 돌아가지지 않음

### 추가 사항

1. 현재 영화, 드라마 등 관련 영상 예고편과 설명만 보여주지만 컨텐츠의 평가를 남긴 평점, 리뷰들을 추가한다.
2. 유저가 선택한 컨텐츠와 비슷한 컨텐츠 추천 리스트 추가
3. 선택한 컨텐츠이고, 본 기록이 남아있는지 체크해주는 UI 추가 (DB가 필요함.) => firebase Realtime DB
4. 데모계정 일 10개의 계정 회원가입으로 제한 => 계정 생성 후 24시간 자동 삭제
5. 계정 멀티 프로필 추가

### 25.01.26 변경 사항
데모계정 일일 10개의 계정 생성 기능은 진행하지 않기로 함.
24시간이 지나면 계정 자동 삭제 기능을 넣을까 했지만 별로 좋은 방법은 아니라고 생각한다.
계정을 찾아서 삭제할 떄마다 서버와의 소통과 시간 계산이 들어가고 
데모 계정 로그인 시 24시간이 지났고 계정 삭제 후 다시 계정을 생성하는 방법은 별로 좋지 않다고 생각이 들었다.

=> 데모계정은 기존과 같게 한 개의 계정 뿐이지만 대신 계정마다 최대 4개의 멀티 프로필을 생성할 수 있도록 한다.


---


### 리팩토링 일정

1/20 ~ 1/22 페이지 디자인 리팩토링 [DanView 디자인](https://www.figma.com/design/BNO7IOHSdlcAvdbT9e0clS/Untitled?node-id=0-1&t=qCzQxaHPx9n0lqLA-1)

1/22 ~ 1/25 페이지 퍼블리싱, 프론트 기능 수정

1/26 ~ 1/31 백엔드 연결, 버그 테스트