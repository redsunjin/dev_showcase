## 요약
<!-- 변경 목적과 핵심 내용을 2~3줄로 작성해 주세요. -->

## 변경 유형
- [ ] 학습 카드 추가 / 수정 (`src/data.js`)
- [ ] 커리큘럼 코스 추가 / 수정 (`src/curriculum.js`)
- [ ] 함정 찾기 연습 추가 / 수정 (`src/curriculum.js`)
- [ ] UI / 기능 / 하네스 개선

## 기술 정확성 검증 (콘텐츠 PR 필수)
> [harness/CARD_AUTHORING_GUIDE.md](harness/CARD_AUTHORING_GUIDE.md)의 기술 정확성 3원칙을 따릅니다.
- [ ] **공식 문서 근거 (Source-of-Truth)**: MDN, RFC, OWASP, Spring/JPA/DB 공식 문서 등으로 사실 관계를 확인했습니다.
  - 참고 출처: <!-- URL 또는 공식 문서명 -->
- [ ] **동작 재현 확인 (Spec-Check)**: 코드 스니펫·SQL·보안 페이로드가 실제 브라우저/런타임/DB 스펙과 모순되지 않음을 확인했습니다.
- [ ] **저작권 안전**: 외부 이미지·캡처를 사용하지 않고 순수 텍스트·UI DSL·SVG 스키마로 작성했습니다.

## 자동 검증 체크리스트
- [ ] `node harness/validate.mjs` 통과
- [ ] `node harness/functional-test.mjs` 통과
- [ ] 새 JS 파일 추가 시 `sw.js` `APP_SHELL` 반영 및 캐시 버전 갱신
