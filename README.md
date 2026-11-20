# 개발자 핵심 기본소양 웹앱 (`dev_showcase`)

웹 보안, 데이터베이스, 자료구조, SQL 함정, OS·네트워크, 설계·클린코드, 브라우저·FE, 소프트웨어 테스트, CI/CD·DevOps, AI·LLM·에이전트까지 **핵심 기본기 학습 카드(152선+)**, **인터랙티브 커리큘럼 코스(시뮬레이션)**, **AI 코드·설계 함정 찾기 연습**을 하나로 제공하는 정적 PWA 웹앱입니다.

- **라이브 웹앱**: https://redsunjin.github.io/dev_showcase/
- **라이선스**: [CC BY-NC 4.0](LICENSE) *(기업·조직 내부 직원 교육·온보딩 목적 무료 활용 허용 — 아래 라이선스 안내 참고)*

---

## 주요 기능
- **학습 카드 (`카드 152선+`)**: 난이도(`Lv.1 입문·필수` → `Lv.2 실무·핵심` → `Lv.3 심화·고급`) 필터·우선순위 정렬, 도식(`ui.*`), 3초 암기 모드, 집중 퀴즈, AI 심화/튜터 프롬프트 복사
- **커리큘럼 트랙 (코스 시뮬레이션)**: 실무 시나리오를 8~9단계 스토리, 실시간 메트릭 증감(Delta), SVG 패킷·부하 게이지 애니메이션, **직접 비교 토글(`ON/OFF`)**, 다중 학습 카드 연결로 학습
- **연습: 함정 찾기 (AI 코드·설계 리뷰)**: AI가 생성한 코드·SQL·설정에서 숨은 장애/보안 함정을 짚어내고 관련 카드 및 **AI 검증 리뷰 프롬프트**로 연결
- **다크(기본) / 라이트 모드 & 오프라인 PWA**: 헤더 토글로 다크/웜 화이트 모드 전환, `localStorage` 진도 영구 저장

---

## 콘텐츠 제작 및 검증 하네스 (Harness)
신규 **학습 카드 · 커리큘럼 코스 · 함정 찾기** 추가 시 [harness/CARD_AUTHORING_GUIDE.md](harness/CARD_AUTHORING_GUIDE.md)와 템플릿([card-template.js](harness/card-template.js), [course-template.js](harness/course-template.js))을 따르며, PR 생성 시 GitHub Actions CI가 아래 검증을 자동 실행합니다.

```bash
node harness/validate.mjs
node harness/functional-test.mjs
```

---

## 외부 CDN 의존성 및 폐쇄망(망분리) 배포 안내

현재 공개 GitHub Pages 버전은 빌드 도구 없는 초경량 구성을 위해 아래 3개 외부 CDN을 사용합니다.
1. **Tailwind CSS CDN** (`https://cdn.tailwindcss.com`) — [index.html](index.html)
2. **Font Awesome 6 CDN** (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`) — [index.html](index.html)
3. **Pretendard 웹폰트 CDN** (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`) — [assets/styles.css](assets/styles.css)

### 사내 폐쇄망 / 망분리 환경에서 내부 호스팅하는 방법
외부 인터넷 접근이 차단된 사내망에서 운영하려면 아래 순서로 로컬 벤더링(Vendoring) 후 정적 웹서버(Nginx, 사내 GitHub/GitLab Pages 등)에 배포하세요.
1. **Tailwind CSS 로컬 빌드**: 프로젝트 루트에서 Tailwind CLI(`npx tailwindcss -i ./assets/styles.css -o ./assets/vendor/tailwind.css --content "./index.html,./src/**/*.js" --minify`)로 정적 CSS를 생성하고, `index.html`의 `cdn.tailwindcss.com` 스크립트를 `<link rel="stylesheet" href="assets/vendor/tailwind.css">`로 교체합니다.
2. **Font Awesome 로컬 복사**: Font Awesome 6 Free 패키지의 `css/all.min.css`와 `webfonts/` 폴더를 `assets/vendor/fontawesome/`에 배치하고 `index.html` 링크 경로를 로컬로 변경합니다.
3. **Pretendard 폰트 로컬 복사 (선택)**: `assets/styles.css` 1번 줄의 `@import`를 로컬 폰트 경로로 변경하거나 제거해 OS 기본 시스템 폰트(`-apple-system, BlinkMacSystemFont, sans-serif`)를 사용합니다.
4. **PWA 캐시 갱신**: `sw.js`의 `APP_SHELL`에 로컬 벤더 파일을 추가하고 `CACHE_NAME` 버전을 올린 뒤 `node harness/validate.mjs`로 검증합니다.

---

## License
Distributed under **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.
- 개인 학습, 스터디, 비영리 교육 목적으로 자유롭게 사용·공유·수정할 수 있습니다.
- **기업·조직 내부 활용 예외 (Additional Permission)**: 원저작자(`sunjin.jo / redsunjin`)는 본 프로젝트의 **상업적 재판매·유료 서비스화·유료 강의 교재 판매는 금지**하되, 영리 기업 및 조직이 **내부 임직원 교육 및 신입 개발자 온보딩 가이드 용도로 무료 사내 활용·배포하는 것은 명시적으로 허용**합니다.
- 이용 및 공유 시 원저작자(`sunjin.jo / redsunjin`) 및 출처를 표시해 주세요. 자세한 원문은 [LICENSE](LICENSE)를 참고하세요.
