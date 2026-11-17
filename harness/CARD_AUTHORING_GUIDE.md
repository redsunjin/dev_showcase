# 학습 카드 제작 하네스 지침 (Card Authoring Harness)

이 문서는 **개발자 핵심 기본소양 웹앱**의 학습 카드를 일관된 품질·구조·저작권 안전 기준으로 제작하고 검증하기 위한 공식 하네스 지침입니다.

---

## 1. 저작권 및 콘텐츠 독자성 원칙 (필수)

1. **자체 제작 원칙**: 모든 카드의 `concept`, `defense`, `diagram` 및 인포그래픽 도식은 외부 이미지나 타인의 저작물을 캡처·복제하지 않고 **순수 텍스트와 코드 기반 UI DSL(`ui.*`)**로 직접 작성합니다.
2. **외부 이미지 금지**: 카드 콘텐츠에 외부 이미지 파일(`.png`, `.jpg`, `.webp` 등)을 첨부하거나 외부 이미지 출처를 인용·언급하지 않습니다.
3. **표현의 명확성**: 모든 설명은 3초 안에 핵심 원리가 떠오르도록 직관적이고 간결한 한국어 기술 문장으로 작성합니다.

---

## 2. 난이도 및 우선순위 기준 (`level`: 1 | 2 | 3)

모든 카드는 학습자가 기초부터 고급까지 우선순위에 따라 접근할 수 있도록 반드시 `level`을 지정합니다.

| 단계 | 라벨 | 우선순위 | 선정 기준 |
| :--- | :--- | :--- | :--- |
| **`level: 1`** | **입문·필수** | 최우선 | 주니어/입문자도 반드시 알아야 하는 기초 개념 (예: XSS, HTTP 상태코드, 인덱스 기본, 단위 테스트, Docker, LLM 토큰/프롬프트) |
| **`level: 2`** | **실무·핵심** | 중우선 | 실무 개발·설계·트러블슈팅에서 자주 마주치는 핵심 원리 및 트레이드오프 (예: CSRF/CORS, 격리 수준, RAG, CI/CD 무중단 배포, Mock/Stub) |
| **`level: 3`** | **심화·고급** | 심화 | 아키텍처, 분산 시스템, 대규모 운영·최적화·에이전트 오케스트레이션 등 시니어/심화 주제 (예: CQRS, Raft/분산 락, Kubernetes, MCP, AI Evals) |

---

## 3. 카드 데이터 스키마 (`src/data.js`)

`items` 배열의 각 객체는 다음 필드를 **모두** 포함해야 합니다.

```js
{
    id: 153, // 1부터 순차 증가하는 고유 정수
    category: 'ai-agent', // 허용된 카테고리 키 중 하나
    catName: 'AI·LLM·에이전트', // UI 표시용 카테고리명
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20', // 카테고리 배지 Tailwind 클래스
    level: 1, // 1 (입문·필수) | 2 (실무·핵심) | 3 (심화·고급)
    title: '16. 카드 제목', // "NN. 핵심 제목" 형식
    subtitle: 'English Subtitle', // 영문 표준 용어
    diagram: '핵심 키워드 요약 1줄 (검색 인덱싱 겸용)',
    concept: '핵심 정의 1~2문장 (HTML 태그 직접 작성 금지, 일반 텍스트만 사용)',
    defense: '실무 핵심 소양 포인트 및 트레이드오프 1문장'
}
```

### 허용 카테고리 목록
- `web-security` (`웹 보안`)
- `database` (`데이터베이스`)
- `data-structure` (`자료구조`)
- `sql-traps` (`SQL 함정`)
- `os-network` (`OS·네트워크`)
- `architecture` (`설계·클린코드`)
- `frontend` (`브라우저·FE`)
- `testing` (`테스트`)
- `devops` (`CI/CD·DevOps`)
- `ai-agent` (`AI·LLM·에이전트`)

---

## 4. 인포그래픽 도식 작성 규칙 (`getInfographic(id)`)

`getInfographic(id)`의 `map` 객체에 동일한 `id`로 DOM 기반 도식을 반드시 등록합니다.

- `ui.flow([...])`: 좌→우 흐름 (파이프라인, 요청/응답)
- `ui.vflow([...])`: 상→하 계층·단계 흐름
- `ui.rows([[key, value, badgeClass], ...])`: 항목별 비교/속성 표 (`badge-ok`, `badge-info`, `badge-warn`, `badge-err`)
- `ui.vs(h1, list1, c1, h2, list2, c2)`: A vs B 트레이드오프 대조
- `ui.tree(root, left, right, caption)`: 트리·분기 구조
- `ui.code(text, colorClass)`: 코드·명령어·스키마 블록 (`<`, `>`는 반드시 `&lt;`, `&gt;`로 이스케이프)

---

## 5. 자동 검증 실행 (필수)

카드를 추가하거나 수정한 뒤에는 반드시 아래 검증 스크립트를 실행하여 통과해야 합니다.

```bash
node harness/validate.mjs
```

검증 항목:
1. `items` ID의 연속성(1..N) 및 중복 여부
2. 필수 필드 누락 여부 및 `level` 값(1, 2, 3) 유효성
3. `getInfographic(id)` 매핑 100% 일치 여부
4. `concept`/`defense`/`title` 내 비이스케이프 `<script>` 및 금지된 외부 이미지 출처 표현 점검
5. `index.html` 및 `manifest.webmanifest`의 총 개수 표기 일치 여부
