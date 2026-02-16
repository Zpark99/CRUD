나만의 CRUD 게시판 (진재가만듬)

세팅, 개발, 배포까지 기간 2025/09/07 - 2026/02/16 

## 📖 프로젝트 소개
React와 Node.js를 사용하여 만든 CRUD(Create, Read, Update, Delete) 게시판입니다.
AWS EC2와 S3를 활용하여 배포까지 직접 구현했습니다.

## 🛠️ 기술 스택 (Tech Stack)
- **Frontend:** React, Vite, Bootstrap
- **Backend:** Node.js, Express, MySQL (MariaDB)
- **Deployment:** AWS EC2, S3, CloudFront, RDS (또는 로컬 DB)

## ✨ 주요 기능
1. ** 게시글 작성/조회/수정/삭제 (CRUD) **
2. **조회수 카운트 기능**
3. **AWS 클라우드 배포 완료**

## 📸 실행 화면
<img width="958" height="538" alt="처음으로 완성!" src="https://github.com/user-attachments/assets/fe1c8881-91ad-453f-95b2-bfc22c7cd1b8" />

## 🚀 트러블 슈팅 (Trouble Shooting)

### 1. 배포 후 화면이 하얗게 나오는 현상 (MIME Type Error)
- **문제:** 리액트 빌드 파일을 S3에 업로드했는데, 사이트 접속 시 빈 화면과 함께 `Failed to load module script... MIME type of "text/html"` 에러가 발생.
- **원인:** S3에는 최신 파일이 올라갔지만, **CloudFront(CDN)가 이전 버전의 `index.html` 파일 위치를 캐싱(기억)** 하고 있어서, 존재하지 않는 구버전 JS 파일을 요청했기 때문.
- **해결:** CloudFront 콘솔에서 **무효화(Invalidation)** 를 생성하여 경로를 `/*`로 설정, 캐시를 강제로 삭제하여 해결함.

### 2. useEffect 무한 루프와 서버 과부하
- **문제:** 게시글 목록을 불러올 때 콘솔에 로그가 수백 번 찍히며 브라우저가 느려지고, 서버 요청이 폭주함.
- **원인:** `useEffect` 훅을 사용할 때 **의존성 배열(Dependency Array, `[]`)을 누락**하여, 상태(State)가 변경될 때마다 렌더링 → API 요청 → 상태 변경 → 렌더링이 무한 반복됨.
- **해결:** `useEffect(() => { ... }, [])` 처럼 빈 배열을 추가하여 컴포넌트 마운트 시 **최초 1회만 실행**되도록 수정.

### 3. EC2 서버에서의 Git 워크플로우 실수
- **문제:** 서버 코드를 수정하고 배포하려는데 `git push` 명령어가 작동하지 않거나 권한 오류 발생.
- **원인:** EC2 서버를 '수정하는 곳'으로 착각하여 서버에서 직접 코드를 고치고 Push 하려 했음. (EC2는 배포를 위한 다운로드 전용 공간)
- **해결:** 1. **로컬(내 컴퓨터)** 에서 코드 수정 및 `git push`.
    2. **서버(EC2)** 에서는 `git pull`로 코드 받기 및 `pm2 restart`로 반영.
    - 이 올바른 배포 파이프라인(Local → GitHub → EC2)을 정립하여 해결.

### 4. AWS 보안 그룹(Security Group) 설정 시행착오
- **문제:** 초기 배포 시 외부에서 접속이 안 되거나, 불필요한 포트가 열려 보안이 취약했음.
- **해결:** - **웹 접근:** Nginx를 통해 80(HTTP), 443(HTTPS) 포트만 `0.0.0.0/0`(전체 허용)으로 개방.
    - **서버 보호:** Node.js가 사용하는 3000번 포트는 외부 접근을 차단하고 내부(Localhost)에서만 통신하도록 설정.
    - **관리자 보호:** SSH(22) 포트는 **'내 IP'** 에서만 접속 가능하도록 제한하여 보안 강화.

## 링크

https://d3hkrvr14wb43j.cloudfront.net/ (현재 운영 중단)
