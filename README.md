# 나누리 (Nanuri) - 사용하지 않는 물건 나눔 플랫폼

> **나누리**는 사용하지 않는 물건을 나눔받고 싶은 사람과 나눔해주고 싶은 사람을 연결하는 플랫폼입니다.

## 프로젝트 개요

나누리는 대학생들을 위한 물건 나눔 플랫폼으로, 사용하지 않는 물건을 효율적으로 재활용하고 공유할 수 있도록 도와주는 서비스입니다. JWT 기반 인증과 실시간 채팅, 알림 시스템을 통해 안전하고 편리한 나눔 경험을 제공합니다.

## 프로젝트 개요

- **프로젝트명**: 나누리 (Nanuri)
- **기술 스택**: React 18.2.0, Material-UI, Recoil, Axios

## 주요 기능

### 1. 사용자 인증
- 회원가입 및 프로필 관리
- JWT 토큰 기반 인증

### 2. 나눔 시스템
- **나눠요**: 사용자가 물건을 나누는 기능
- **필요해요**: 사용자가 필요한 물건을 요청하는 기능
- **관심**: 관심 있는 물건을 북마크하는 기능

### 3. 아이템 관리
- 카테고리별 분류 (전자제품, 의류, 도서 등)
- 이미지 업로드 및 관리
- 검색 및 필터링 (최신순, 관심순, 조회순, 마감임박순)
- 아이템 수정 및 삭제

### 4. 채팅 시스템
- 실시간 채팅 (WebSocket 기반)
- 채팅방 생성 및 관리
- 메시지 히스토리 조회

### 5. 알림 시스템
- Firebase Cloud Messaging (FCM) 기반
- 실시간 알림 수신
 
## 기술 스택

### Frontend
- **React**: 18.2.0
- **Material-UI**: 5.12.3 (UI 컴포넌트)
- **Recoil**: 0.7.7 (상태 관리)
- **React Router**: 6.11.0 (라우팅)
- **Axios**: 1.8.4 (HTTP 클라이언트)

### UI/UX
- **Ant Design**: 5.25.4 (추가 UI 컴포넌트)
- **Chart.js**: 4.3.0 (차트)
- **React Toastify**: 11.0.5 (토스트 알림)

### 실시간 통신
- **Socket.io**: WebSocket 기반 실시간 채팅
- **STOMP**: 메시징 프로토콜

### 기타
- **Firebase**: 11.6.0 (알림 서비스)

## 프로젝트 구조

```
src/
├── apis/                    # API 관련 파일
│   ├── authApi.js          # 인증 API
│   ├── itemApi.js          # 아이템 API
│   ├── chatApi.js          # 채팅 API
│   ├── userApi.js          # 사용자 API
│   └── axios.js            # Axios 설정
├── assets/                  # 정적 자산
│   ├── theme/              # Material-UI 테마
│   ├── category/           # 카테고리 데이터
│   └── images/             # 이미지 파일
├── components/              # 재사용 가능한 컴포넌트
│   ├── MDBox/              # Material-UI 커스텀 컴포넌트
│   ├── MDButton/           # 버튼 컴포넌트
│   ├── ItemCard.js         # 아이템 카드
│   └── PostCard.js         # 게시글 카드
├── context/                 # React Context
│   └── index.js            # Material-UI 컨텍스트
├── layouts/                 # 페이지 레이아웃
│   ├── dashboard/          # 메인 대시보드
│   ├── authentication/     # 로그인/회원가입
│   ├── chat/               # 채팅 관련
│   ├── profile/            # 프로필 관리
│   └── detail/             # 상세 페이지
├── recoil/                  # Recoil 상태 관리
│   ├── LoginState.js       # 로그인 상태
│   ├── TabValueState.js    # 탭 상태
│   └── NicknameState.js    # 닉네임 상태
├── util/                    # 유틸리티 함수
│   ├── authService.js      # 인증 서비스
│   ├── navigationService.js # 네비게이션 서비스
│   └── notification.js     # 알림 서비스
├── App.js                   # 메인 앱 컴포넌트
├── routes.js               # 라우팅 설정
└── index.js                # 앱 진입점
```

## 주요 페이지

### 1. 대시보드 (`/home`)
- 나눔 아이템 목록 조회
- 탭별 분류 (나눠요, 필요해요, 관심)
- 검색 및 필터링 기능
- 카테고리별 정렬

### 2. 아이템 상세 (`/home/:itemId`)
- 아이템 상세 정보
- 이미지 갤러리
- 채팅하기 버튼
- 관심 추가/제거

### 3. 아이템 등록 (`/home/addItem`)
- 아이템 정보 입력
- 이미지 업로드
- 카테고리 선택
- 마감일 설정

### 4. 채팅 (`/chat`)
- 채팅방 목록
- 실시간 메시징
- 채팅방 생성 및 관리

### 5. 프로필 (`/profile`)
- 사용자 정보 관리
- 나눔 히스토리
- 관심 아이템 목록

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.development` 파일을 생성하고 다음 변수들을 설정하세요:
```
REACT_APP_SERVER_URL=your_backend_url
REACT_APP_PUBLIC_URL=your_public_url
REACT_APP_CALLBACK_URL=your_callback_url
```

### 3. 개발 서버 실행
```bash
npm start
```

### 4. 프로덕션 빌드
```bash
npm run build
```

## API 엔드포인트

### 인증
- `POST /api/nanuri/auth/login` - 로그인
- `POST /api/nanuri/auth/signup` - 회원가입
- `GET /api/nanuri/auth/logout` - 로그아웃

### 아이템
- `GET /api/items` - 아이템 목록 조회
- `POST /api/item` - 아이템 생성
- `GET /api/item/:id` - 아이템 상세 조회
- `PATCH /api/item/:id` - 아이템 수정
- `DELETE /api/item/:id` - 아이템 삭제

### 채팅
- `GET /api/chat/room/:roomId/messages` - 메시지 조회
- `GET /api/chat/room/:roomId` - 채팅방 정보
- `DELETE /api/chat/room/:roomId` - 채팅방 나가기

## 상태 관리

### Recoil Atoms
- `LoginState`: 사용자 로그인 상태
- `TabValue`: 대시보드 탭 상태
- `NicknameState`: 사용자 닉네임
- `ChatTapValue`: 채팅 탭 상태
- `HistoryTapValue`: 히스토리 탭 상태

## 주요 컴포넌트

### 1. ItemCard
아이템을 카드 형태로 표시하는 컴포넌트
- 이미지, 제목, 설명, 카테고리 표시
- 관심 버튼, 채팅 버튼 포함

### 2. MDBox
Material-UI 기반 커스텀 박스 컴포넌트
- 일관된 스타일링
- 반응형 레이아웃 지원

### 3. Dashboard
메인 대시보드 컴포넌트
- 탭 기반 네비게이션
- 검색 및 필터링 기능
- 아이템 목록 표시

## 개발 가이드

### 1. 코드 스타일
- ESLint와 Prettier 설정 사용
- Material-UI 컴포넌트 우선 사용
- 함수형 컴포넌트와 Hooks 사용

### 2. 상태 관리
- 전역 상태는 Recoil 사용
- 로컬 상태는 useState 사용
- API 호출은 Axios 사용

### 3. 라우팅
- React Router v6 사용
- Private Routes로 인증 필요 페이지 보호
- Lazy Loading으로 성능 최적화
