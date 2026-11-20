# 콘텐츠 제작 및 운영 하네스 지침 (Content Authoring Harness)

이 문서는 **개발자 핵심 기본소양 웹앱**의 **학습 카드(`src/data.js`) · 커리큘럼 코스 · 함정 찾기 연습(`src/curriculum.js`)**을 일관된 품질·구조·기술 정확성·저작권 기준으로 제작하고 검증하기 위한 공식 운영 계약입니다.

---

## 1. 콘텐츠 확장 운영 원칙

1. **코스 우선 → 부족한 카드 보충**: 새로운 실무 주제(예: Java/Spring, 분산 시스템, 관찰 가능성)를 추가할 때는 먼저 학습 흐름(코스)을 설계하고, 코스 단계에 필요한 기본 개념이 카드에 없으면 `src/data.js`에 카드를 추가한 뒤 `cardIds`로 연결합니다.
2. **자체 제작 & 외부 이미지 금지**: 모든 설명과 도식은 외부 이미지나 타인의 저작물을 캡처·복제하지 않고 **순수 텍스트와 코드 기반 UI DSL(`ui.*`) / SVG 시뮬레이션 스키마**로 직접 작성합니다.
3. **표현의 명확성**: 카드는 3초 안에 원리가 떠오르도록 간결하게, 코스는 "문제 → 임시 해결 → 한계 → 근본 해결 → 트레이드오프"의 인과관계가 드러나도록 작성합니다.

---

## 2. 기술 정확성 관리 3원칙 (필수 계약)

CI 자동 검증은 문법·스키마·참조 무결성을 보장하지만, 기술적 오개념(예: 브라우저/스펙 오해)은 사람과 리뷰 프로세스가 함께 검증해야 합니다.

1. **공식 문서 근거 원칙 (Source-of-Truth)**: 새 카드·코스·함정 찾기 PR에는 MDN, RFC, OWASP, Spring/JPA/DB 공식 문서 등 **검증 기준 출처**를 최소 1건 이상 명시합니다.
2. **동작 재현 원칙 (Spec-Check)**: 코드 스니펫, SQL 쿼리, 보안 페이로드(예: `innerHTML` 이벤트 핸들러, CORS 헤더 조합)는 실제 런타임·브라우저·DB 스펙에서 설명과 일치하게 동작해야 합니다.
3. **이중 리뷰 & 오류 제보 루프**: 모든 콘텐츠 PR은 **CI 자동 검증 + AI 기술 팩트체크 + 도메인 담당자 확인**을 거치며, 배포 후 발견된 오류는 GitHub Issue(`content-accuracy`)를 통해 즉시 보정합니다.

---

## 3. 학습 카드 스키마 (`src/data.js`)

### 난이도 기준 (`level`: 1 | 2 | 3)

| 단계 | 라벨 | 우선순위 | 선정 기준 |
| :--- | :--- | :--- | :--- |
| **`level: 1`** | **입문·필수** | 최우선 | 주니어/입문자도 반드시 알아야 하는 기초 개념 |
| **`level: 2`** | **실무·핵심** | 중우선 | 실무 개발·설계·트러블슈팅에서 자주 마주치는 핵심 원리 및 트레이드오프 |
| **`level: 3`** | **심화·고급** | 심화 | 아키텍처, 분산 시스템, 대규모 운영·최적화·에이전트 오케스트레이션 등 심화 주제 |

### 카드 객체 필수 필드 (템플릿: `harness/card-template.js`)

```js
{
    id: 153, // 1부터 순차 증가하는 고유 정수
    category: 'ai-agent', // ALLOWED_CATEGORIES 키 중 하나
    catName: 'AI·LLM·에이전트', // ALLOWED_CATEGORIES 표시명과 정확히 일치
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    level: 1, // 1 | 2 | 3
    title: '16. 카드 제목',
    subtitle: 'English Subtitle',
    diagram: '핵심 키워드 요약 1줄 (검색 인덱싱 겸용)',
    concept: '핵심 정의 1~2문장 (HTML 태그 직접 작성 금지, 일반 텍스트만 사용)',
    defense: '실무 핵심 소양 포인트 및 트레이드오프 1문장'
}
```

### 인포그래픽 도식 규칙 (`getInfographic(id)`)
- `ui.flow([...])`, `ui.vflow([...])`, `ui.rows([[key, value, badgeClass], ...])`, `ui.vs(...)`, `ui.tree(...)`, `ui.code(text, colorClass)`
- `ui.code` 내 `<`, `>`는 반드시 `&lt;`, `&gt;`로 이스케이프합니다.

---

## 4. 커리큘럼 코스 & 함정 찾기 스키마 (`src/curriculum.js`)

템플릿: `harness/course-template.js`

### 코스(`curriculumTracks`) 필수 계약
- 고유 `id`, `title`, `subtitle`, `badge`, `badgeCls`, `levelLabel`, `learningGoals` (3개 이상)
- `steps`: **최소 8단계 이상** 구성 (문제 → 한계 → 해결 → 운영/정리)
- 각 `step` 필수 필드:
  - `tag`, `shortTitle` (하단 스텝퍼용 2~8자 간결 라벨), `title`
  - `cardIds`: `src/data.js`에 실제 존재하는 카드 ID 1개 이상 배열
  - `story`: 문자열 또는 2문단 배열
  - `takeaway`: 핵심 원리 요약
  - `whyLimit` *(선택)*: 이전 방식의 한계 설명
  - `tradeoff` *(선택)*: 실무 트레이드오프
  - `metrics`: 4~5개 핵심 정량 지표 객체
  - `diagram.nodes`: 2~4개 아키텍처 노드 (`label`, `sub`, `state`: `'ok'|'info'|'warn'|'err'`, 선택 `spec`, `load`)
- **인터랙티브 비교(`variants`)**: 코스당 최소 1개 이상의 핵심 단계에 `variants` (2개 이상 비교 시나리오)를 포함합니다.

### 함정 찾기(`trapChallenges`) 필수 계약
- 고유 `id`, `category`, `catCls`, `title`, `promptContext`, `language`
- `codeLines` (문자열 배열), `buggyLines` (1-based 줄 번호 배열, `codeLines` 범위 내)
- `options` (4개 선택지), `answerId` (`options`에 존재하는 `id`)
- `explanation`, `fixCode`, `relatedCardIds` (`src/data.js` 유효 ID 배열), `aiReviewPrompt`

---

## 5. 자동 검증 실행 (필수)

콘텐츠를 추가하거나 수정한 뒤에는 반드시 아래 명령을 실행해 통과해야 하며, PR 생성 시 GitHub Actions CI에서도 동일하게 검증됩니다.

```bash
node harness/validate.mjs
node harness/functional-test.mjs
```

자동 검증 항목:
1. `src/data.js`: ID 연속성·중복, 필수 필드, `level` 유효성, `getInfographic(id)` 100% 매핑
2. `src/curriculum.js`: 코스/함정 ID 중복, 최소 단계 수, `shortTitle`, `variants`, 모든 `cardIds`/`relatedCardIds` 참조 무결성, `buggyLines` 범위
3. 저작권 안전 스캔: 금지된 외부 이미지·캡처 표현 점검
4. PWA 동기화: `index.html`에 로드되는 `src/*.js` 스크립트와 `sw.js` `APP_SHELL` 일치 여부 및 문법 검사
