// 개발자 핵심 기본소양 167선 데이터 및 인포그래픽 빌더
// 제작 규칙: harness/CARD_AUTHORING_GUIDE.md

const CATEGORY_REGISTRY = [
    { id: 'web-security', name: '웹 보안', shortName: '웹 보안', icon: 'fa-solid fa-shield-halved', iconCls: 'text-cyan-400', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { id: 'database', name: '데이터베이스', shortName: 'DB', icon: 'fa-solid fa-database', iconCls: 'text-emerald-400', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'data-structure', name: '자료구조', shortName: '자료구조', icon: 'fa-solid fa-diagram-project', iconCls: 'text-purple-400', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { id: 'sql-traps', name: 'SQL 함정', shortName: 'SQL', icon: 'fa-solid fa-triangle-exclamation', iconCls: 'text-rose-400', badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    { id: 'os-network', name: 'OS·네트워크', shortName: 'OS·네트워크', icon: 'fa-solid fa-network-wired', iconCls: 'text-amber-400', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'architecture', name: '설계·클린코드', shortName: '설계·클린코드', icon: 'fa-solid fa-cubes', iconCls: 'text-indigo-400', badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { id: 'frontend', name: '브라우저·FE', shortName: '브라우저·FE', icon: 'fa-brands fa-js', iconCls: 'text-sky-400', badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
    { id: 'testing', name: '테스트', shortName: '테스트', icon: 'fa-solid fa-vial-circle-check', iconCls: 'text-fuchsia-400', badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' },
    { id: 'devops', name: 'CI/CD·DevOps', shortName: 'CI/CD·DevOps', icon: 'fa-solid fa-gears', iconCls: 'text-orange-400', badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { id: 'ai-agent', name: 'AI·LLM·에이전트', shortName: 'AI·LLM·에이전트', icon: 'fa-solid fa-robot', iconCls: 'text-teal-400', badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    { id: 'java-spring', name: 'Java·Spring', shortName: 'Java·Spring', icon: 'fa-solid fa-mug-hot', iconCls: 'text-lime-400', badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20' }
];

const items = [
    // --- Web Security (15) ---
    {
        id: 1, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 1,
        title: '01. XSS (교차 사이트 스크립팅)', subtitle: 'Cross-Site Scripting',
        diagram: 'script steal() 게시판 DB 피해자 화면 실행',
        concept: '공격자가 저장하거나 주입한 악성 스크립트가 다른 사용자의 브라우저에서 그대로 실행되는 취약점.',
        defense: '출력 이스케이프(Escaping) + CSP 보조 적용 / 남의 브라우저에서 악성 스크립트 실행 차단'
    },
    {
        id: 2, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '02. CSP (콘텐츠 보안 정책)', subtitle: 'Content-Security-Policy',
        diagram: "script-src 'self' → /app.js (허용), evil.com/x.js (차단)",
        concept: '브라우저가 로드 및 실행할 수 있는 리소스의 출처를 제한하는 HTTP 응답 헤더.',
        defense: '허용한 출처의 스크립트만 실행하며, 인라인 <script>는 nonce·hash로 예외 허용'
    },
    {
        id: 3, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 1,
        title: '03. HttpOnly · Secure', subtitle: '쿠키 보안 속성',
        diagram: 'Set-Cookie: sid=abc; HttpOnly; Secure',
        concept: 'HttpOnly는 document.cookie 접근을 막고, Secure는 https:// 요청에서만 쿠키를 전송.',
        defense: '스크립트 접근(XSS 탈취)과 평문 전송(스니핑 노출)을 동시에 차단'
    },
    {
        id: 4, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '04. SameSite', subtitle: '쿠키 전송 범위 제한',
        diagram: 'Strict(교차 안 보냄) | Lax(최상위 GET만) | None(교차 전송·Secure 필수)',
        concept: '교차 사이트(evil.com → bank.com) 요청 시 쿠키 자동 전송 여부를 제어하는 속성.',
        defense: 'CSRF(사이트 간 요청 위조) 위험을 줄이는 핵심 쿠키 속성'
    },
    {
        id: 5, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '05. Prepared Statement', subtitle: 'SQL 인젝션 방어',
        diagram: 'WHERE id = ?  ← [ "1 OR 1=1" ] (값 하나로 비교)',
        concept: '쿼리 구조와 입력값을 분리하여, 사용자 입력이 SQL 조건문을 바꾸지 못하게 바인딩.',
        defense: '입력을 실행 코드가 아닌 순수 값으로 바인딩 (열·정렬 이름은 허용 목록으로 검증)'
    },
    {
        id: 6, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '06. 동일 출처 정책 (SOP)', subtitle: 'Same-Origin Policy',
        diagram: 'https://a.com:443 기준 → http(스킴 다름), api.a.com(호스트 다름), :8443(포트 다름)',
        concept: '다른 출처의 리소스 응답 읽기를 브라우저가 기본적으로 차단하는 보안 정책.',
        defense: '스킴(Protocol) · 호스트(Host) · 포트(Port) 3가지가 모두 같아야 동일 출처로 인정'
    },
    {
        id: 7, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '07. CORS', subtitle: '교차 출처 리소스 공유',
        diagram: 'OPTIONS(사전 요청) → Allow-Origin: https://a.com → PUT /items 응답 읽기 허용',
        concept: 'SOP 제한 환경에서 서버가 명시적으로 허용한 출처에 한해 교차 출처 응답을 공유하는 표준.',
        defense: '단순 요청(Simple Request)은 사전 요청(Preflight) 생략 가능'
    },
    {
        id: 8, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '08. HTTPS 인증서', subtitle: 'TLS Certificate Chain',
        diagram: '루트 CA ➔ 중간 CA ➔ a.com 인증서 (서명 체인 검증)',
        concept: 'OS·브라우저 신뢰 목록에 있는 루트 CA부터 이어지는 인증서 체인으로 서버의 신원을 확인.',
        defense: '브라우저가 도메인 일치, 유효 기간, 서명 체인을 엄격히 검사'
    },
    {
        id: 9, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 3,
        title: '09. HSTS', subtitle: 'HTTPS 강제 헤더',
        diagram: 'Strict-Transport-Security: max-age=31536000 (http:// 입력 → https로 변경)',
        concept: '브라우저가 평문 HTTP 요청을 보내지 않고 무조건 HTTPS 접속만 하도록 강제하는 헤더.',
        defense: '인증서 오류 무시 불가, 첫 방문 전 보호는 HSTS preload 목록 활용'
    },
    {
        id: 10, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 1,
        title: '10. 클릭재킹 (Clickjacking)', subtitle: '투명한 iframe 위 클릭 가로채기',
        diagram: '[공격 페이지: 경품 받기 버튼] 겹침 → [투명 iframe: 실제 송금 버튼]',
        concept: '공격 페이지 위에 투명한 iframe을 겹쳐 사용자가 의도하지 않은 동작을 클릭하게 유도.',
        defense: "CSP frame-ancestors 'none' 또는 X-Frame-Options: DENY 설정"
    },
    {
        id: 11, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '11. SSRF', subtitle: '서버 측 요청 위조',
        diagram: 'url=http://169.254.169.254/ → 서버가 대신 내부 메타데이터/관리 API 요청',
        concept: '공격자가 전달한 URL을 서버가 대신 요청하게 만들어 내부망이나 클라우드 메타데이터에 접근.',
        defense: '허용 목록(Whitelist) 검증 및 내부 사설 IP·메타데이터 주소 대역 차단'
    },
    {
        id: 12, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 3,
        title: '12. 경로 탐색 (Path Traversal)', subtitle: '허용 폴더 밖 파일 접근',
        diagram: '?file=../../etc/passwd → /var/www/files 탈출 → /etc/passwd 노출',
        concept: '../ 문자열 등을 조작해 허용된 디렉토리 바깥의 시스템 파일을 읽거나 실행하는 공격.',
        defense: '경로를 정규화(Canonicalization)한 뒤 허용된 기본 폴더 하위인지 검사'
    },
    {
        id: 13, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 2,
        title: '13. IDOR', subtitle: '안전하지 않은 직접 객체 참조',
        diagram: '로그인: 사용자 A → GET /orders/1002 요청 → 1002의 주인이 A인지 확인(403 거부)',
        concept: 'ID 숫자나 식별자만 바꿔서 다른 사용자의 데이터에 무단 접근을 시도하는 취약점.',
        defense: '추측하기 어려운 ID(UUID)만으로는 부족하며, 요청마다 객체 접근 권한을 서버가 직접 검사'
    },
    {
        id: 14, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 1,
        title: '14. 무차별 대입 (Brute Force)', subtitle: '반복 추측 시도 공격',
        diagram: '같은 계정에 비밀번호 대입 #1 #2 #3 #4 #5 → 🔒 잠시 차단 · 지연',
        concept: '자동화된 도구로 비밀번호나 인증번호를 맞을 때까지 반복 대입하는 공격.',
        defense: '계정·IP별 실패 횟수 집계, 속도 제한(Rate Limit), MFA 및 유출 비밀번호 차단 병행'
    },
    {
        id: 15, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 3,
        title: '15. 대칭 · 비대칭 암호', subtitle: 'Symmetric vs Asymmetric',
        diagram: '대칭: 같은 키 K로 암·복호화 | 비대칭: 공개키 암호화 → 개인키 복호화',
        concept: '대칭 암호는 속도가 빠르고, 비대칭 암호는 키 분배와 전자서명에 유리함.',
        defense: 'TLS 실무: 키 합의·서명은 비대칭키, 실제 데이터 전송 암호화는 대칭키 사용'
    },
    {
        id: 106, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 1,
        title: '16. CSRF (사이트 간 요청 위조)', subtitle: 'Cross-Site Request Forgery',
        diagram: '로그인된 피해자 브라우저 ➔ 악성 사이트 방문 ➔ bank.com/transfer 자동 요청',
        concept: '사용자가 의도하지 않았는데도 로그인된 세션 쿠키가 자동 실려 위조된 요청이 실행되는 공격.',
        defense: 'CSRF 토큰(Synchronizer Token) 검증 + SameSite=Lax/Strict + Referer/Origin 헤더 검증'
    },
    {
        id: 107, category: 'web-security', catName: '웹 보안',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        level: 3,
        title: '17. 인증과 인가 · OAuth 2.0', subtitle: 'Authentication vs Authorization',
        diagram: '인증(누구인가? 로그인) ➔ 인가(무엇을 할 수 있는가? 권한/스코프 발급)',
        concept: '인증은 신원 확인, 인가는 리소스 접근 권한 부여이며 OAuth 2.0은 제3자 앱에 권한을 위임하는 표준.',
        defense: '비밀번호 직접 공유 없이 Authorization Code + PKCE 흐름으로 안전하게 Access Token 발급'
    },

    // --- Database (15) ---
    {
        id: 16, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 1,
        title: '01. 정규화 (Normalization)', subtitle: '함수 종속에 따라 관계를 분해',
        diagram: '[직원 | 부서 | 부서전화] (직원→부서→부서전화) ➔ [직원·부서] + [부서·전화] 분리',
        concept: '이행 함수 종속 등을 제거하여 데이터 중복과 삽입·삭제·갱신 이상을 방지하는 과정.',
        defense: '함수 종속성에 따라 테이블을 분해하여 데이터 무결성 확보'
    },
    {
        id: 17, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 1,
        title: '02. 반정규화 (Denormalization)', subtitle: '읽기 성능을 위해 중복 수용',
        diagram: '[주문] + [고객] ➔ [주문 + 고객명 복사] (JOIN 감소 ↔ 갱신 비용 증가)',
        concept: '잦은 JOIN으로 인한 조회 성능 저하를 막기 위해 의도적으로 컬럼을 중복시키는 기법.',
        defense: '읽기 성능을 얻는 대신 중복 값의 일관성 관리 및 갱신 부담을 수용해야 함'
    },
    {
        id: 18, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '03. 클러스터드 인덱스', subtitle: 'Clustered Index',
        diagram: 'InnoDB 기본 키 B+ 트리 ➔ 리프 노드에 [PK 1 + 행 데이터] 직접 저장',
        concept: '기본 키(PK) 기준으로 B+ 트리가 구성되며, 리프 노드에 실제 테이블 행 데이터가 저장됨.',
        defense: '논리적 정렬을 유지하지만 물리 파일의 연속 배치를 무조건 보장하는 것은 아님'
    },
    {
        id: 19, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '04. 커버링 인덱스', subtitle: 'Covering Index',
        diagram: 'SELECT a, b WHERE a=7 ➔ 인덱스(a,b)에서 바로 획득 (테이블 접근 X)',
        concept: '쿼리에 필요한 모든 열(SELECT, WHERE 등)을 인덱스가 포함하여 테이블 본체 접근을 생략.',
        defense: '랜덤 I/O를 획기적으로 줄이며, 가시성 확인 방식은 DBMS 구현에 따라 다름'
    },
    {
        id: 20, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 1,
        title: '05. 복합 인덱스 (Composite Index)', subtitle: '다중 컬럼 B-Tree 사전식 정렬',
        diagram: 'B-tree(a, b) 정렬: (1,10), (1,20), (2,10), (2,30) → a=1 범위 즉시 탐색',
        concept: '첫 번째 열(a)로 먼저 정렬되고, 같은 값 안에서 두 번째 열(b)이 정렬되는 인덱스.',
        defense: '선두 열(a) 조건이 탐색 범위 축소에 가장 중요하며, b만 단독 조건일 때는 효율 저하'
    },
    {
        id: 21, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '06. N+1 문제', subtitle: 'N+1 Problem',
        diagram: '주문 목록 1회 조회 ➔ 연관된 고객 1, 고객 2, 고객 3... 각각 N회 추가 조회',
        concept: '목록 조회 쿼리 1번 이후, 각 결과 행의 연관 엔티티를 지연 로딩하며 N번의 쿼리가 추가 실행됨.',
        defense: '대안: Fetch Join(JOIN) 또는 배치 조회(WHERE IN / @BatchSize)로 해결'
    },
    {
        id: 22, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '07. 낙관적 락 (Optimistic Lock)', subtitle: '갱신 조건으로 버전 충돌 감지',
        diagram: 'UPDATE ... SET version=4 WHERE id=1 AND version=3 (0행 갱신 시 충돌 판정)',
        concept: 'DB 락을 잡지 않고, 수정 시점에 version 값 등이 읽었을 때와 같은지 비교해 충돌을 감지.',
        defense: '충돌이 적은 환경에 유리하며, 0행 갱신(충돌) 발생 시 애플리케이션에서 재시도 처리'
    },
    {
        id: 23, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 3,
        title: '08. 비관적 락 (Pessimistic Lock)', subtitle: '먼저 락을 잡고 충돌 작업 제한',
        diagram: 'T1: SELECT ... FOR UPDATE 🔒 ➔ T2: 충돌하는 락 요청은 대기',
        concept: '데이터를 조회할 때부터 배타 락(X-Lock) 등을 걸어 다른 트랜잭션의 수정을 대기시킴.',
        defense: '충돌이 잦은 재고 차감 등에 유용하나 데드락 위험 존재 (일반 읽기 동작은 DB별 차이)'
    },
    {
        id: 24, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '09. MVCC', subtitle: '다중 버전 동시성 제어',
        diagram: '한 행의 여러 버전 [v1 ← v2 ← v3] ➔ 스냅샷 A는 v1, 스냅샷 B는 v3 조회',
        concept: '데이터 수정 시 이전 버전을 별도 유지(InnoDB Undo 로그·PostgreSQL 다중 튜플 등)해, 읽기 작업이 락 대기 없이 일관된 스냅샷을 읽음.',
        defense: '트랜잭션 격리 수준(Isolation Level)의 가시성 규칙에 따라 읽을 행 버전을 선택'
    },
    {
        id: 25, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 3,
        title: '10. JOIN', subtitle: '테이블 결합',
        diagram: '[주문: o1 | 고객ID: 7] ⋈ [고객ID: 7 | Kim] ➔ [o1 | 7 | Kim]',
        concept: '조인 조건(ON)에 맞는 두 관계(테이블)의 행을 하나로 결합하여 조회.',
        defense: 'INNER JOIN은 양쪽 일치하는 행만 결합하며, 조인 키 인덱스 유무가 성능을 좌우'
    },
    {
        id: 26, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 3,
        title: '11. GROUP BY', subtitle: '그룹 집계',
        diagram: '[A, B, A, A] ➔ GROUP BY key, COUNT(*) ➔ [A: 3건, B: 1건]',
        concept: '같은 키 값을 가진 행들을 하나의 그룹으로 묶어 COUNT, SUM, AVG 등의 집계 함수를 수행.',
        defense: 'SELECT 절에는 GROUP BY에 명시된 열이나 집계 함수만 올 수 있음(표준 SQL 기준)'
    },
    {
        id: 27, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '12. SQL vs NoSQL', subtitle: '관계형 vs 비관계형',
        diagram: '관계형(테이블·정형 스키마) vs NoSQL(문서 {...}, 키→값, 노드↔관계)',
        concept: '관계형 DB는 정합성과 조인에 강하고, NoSQL은 데이터 모델 차이(문서·키값·그래프)로 유연한 확장에 강함.',
        defense: '최근에는 제품별로 트랜잭션 및 스키마 지원 범위가 넓어져 워크로드 특성에 맞게 선택'
    },
    {
        id: 28, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 3,
        title: '13. WAL (Write-Ahead Log)', subtitle: '데이터 페이지보다 로그 먼저 기록',
        diagram: '변경 발생 ➔ 1. WAL 로그 영속화 ➔ 2. 이후 데이터 페이지 디스크 반영',
        concept: '실제 데이터 파일을 수정하기 전에 변경 내역을 순차 로그(WAL/Redo)에 먼저 디스크 기록.',
        defense: '서버 장애 복구 시 기록된 로그를 재적용(Redo)하여 커밋된 데이터의 영속성(Durability) 보장'
    },
    {
        id: 29, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 3,
        title: '14. 팬텀 리드 (Phantom Read)', subtitle: '재조회한 조건의 행 집합이 달라짐',
        diagram: 'WHERE score >= 80 첫 조회(3행) ➔ 다른 Tx가 신규 행 INSERT ➔ 재조회(4행)',
        concept: '한 트랜잭션 내에서 같은 조건으로 범위를 다시 읽었을 때, 없던 유령 행이 새로 나타나는 현상.',
        defense: '표준 격리 수준에서는 SERIALIZABLE(또는 InnoDB의 Gap Lock/Next-Key Lock)으로 방지'
    },
    {
        id: 30, category: 'database', catName: '데이터베이스',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        level: 2,
        title: '15. 파티셔닝 (Partitioning)', subtitle: '키 기준으로 테이블을 나눔',
        diagram: '주문 테이블·날짜 기준 ➔ [2024] [2025] [2026] (2025 조건 시 해당 파티션만 탐색)',
        concept: '대용량 논리 테이블을 날짜 등 파티션 키 기준으로 여러 물리 조각으로 분할.',
        defense: '조건에 맞는 파티션만 읽고 나머지는 제외하는 파티션 프루닝(Pruning)이 핵심'
    },

    // --- Data Structure (15) ---
    {
        id: 31, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 1,
        title: '01. 배열 · 연결 리스트', subtitle: 'Array / Linked List',
        diagram: '배열: 인덱스 O(1) 주소 직접 접근 | 연결 리스트: O(n) 노드 연결 순회',
        concept: '배열은 연속 메모리로 즉시 접근이 가능하고, 연결 리스트는 포인터로 노드를 이어 동적 크기에 유리.',
        defense: '연결 리스트에서 포인터 연결 수정 자체는 O(1)이지만, 해당 위치까지 탐색하는 시간 O(n)은 별개'
    },
    {
        id: 32, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 1,
        title: '02. 스택 (Stack)', subtitle: 'LIFO · 후입선출',
        diagram: 'push ↘ [ B · top ] (아래에 A) ↗ pop (B를 먼저 꺼냄)',
        concept: '마지막에 넣은 원소를 가장 먼저 꺼내는 후입선출 구조.',
        defense: '연결 리스트나 동적 배열 기반으로 구현 시 push · pop 연산 최악 O(1) (재할당 제외)'
    },
    {
        id: 33, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 1,
        title: '03. 큐 (Queue)', subtitle: 'FIFO · 선입선출',
        diagram: 'dequeue ⬅ [ 앞 A → B → C 뒤 ] ⬅ enqueue (A를 먼저 꺼냄)',
        concept: '먼저 넣은 원소를 가장 먼저 꺼내는 선입선출 구조.',
        defense: '양 끝 포인터(head/tail)를 둔 연결 리스트나 원형 큐로 구현해야 enqueue·dequeue 최악 O(1)'
    },
    {
        id: 34, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '04. 덱 (Deque)', subtitle: '양 끝에서 삽입 · 삭제',
        diagram: '⬅➡ [ A ⇄ B ] ⬅➡ (양방향 연결 + 양 끝 포인터)',
        concept: '스택과 큐의 특성을 합쳐 앞(Front)과 뒤(Rear) 양쪽 끝에서 원소를 넣고 뺄 수 있는 구조.',
        defense: '양 끝 삽입·삭제 연산 모두 최악 O(1)에 수행'
    },
    {
        id: 35, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '05. 해시 테이블 (Hash Table)', subtitle: '키 → 해시 → 저장 위치',
        diagram: '좋은 분산·부하율 유지 시 조회 평균 O(1) ➔ 충돌 집중 시 최악 O(n)',
        concept: '해시 함수로 키를 버킷 인덱스로 변환해 저장 위치를 정하고 키를 빠르게 조회.',
        defense: '체이닝 해시 테이블 기준 충돌이 한 버킷에 집중되면 최악 O(n)까지 성능이 저하됨'
    },
    {
        id: 36, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '06. 해시 충돌 (Hash Collision)', subtitle: '서로 다른 키 · 같은 해시 위치',
        diagram: '키 A ↘ [ 버킷 2 ] ↙ 키 B (체이닝 vs 개방 주소법)',
        concept: '서로 다른 키가 해시 함수 결과 같은 버킷 인덱스에 배정되는 현상.',
        defense: '체이닝(같은 버킷에 연결 리스트/트리로 연결) 또는 개방 주소법(다른 빈 슬롯 탐사)으로 해결'
    },
    {
        id: 37, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '07. 이진 탐색 트리 (BST)', subtitle: 'Binary Search Tree',
        diagram: '루트 [8] ➔ 왼쪽 자식 [3] (작은 키), 오른쪽 자식 [12] (큰 키)',
        concept: '모든 노드에서 왼쪽 서브트리는 작은 키, 오른쪽 서브트리는 큰 키를 가지는 이진 트리.',
        defense: '탐색 시간은 트리 높이 O(h)에 비례하며, 한쪽으로 치우친 편향 트리일 때 최악 O(n)'
    },
    {
        id: 38, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '08. 균형 트리 (Balanced Tree)', subtitle: 'AVL · 레드블랙 트리',
        diagram: '회전(Rotation) 등으로 높이 O(log n) 유지 ➔ 탐색·삽입·삭제 최악 O(log n)',
        concept: '삽입·삭제 시 트리가 편향되지 않도록 노드 회전 등으로 높이를 스스로 제한하는 BST.',
        defense: '최악의 경우에도 트리 높이를 O(log n)으로 보장하여 탐색 성능을 일정하게 유지'
    },
    {
        id: 39, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '09. 힙 (Heap)', subtitle: '완전 이진 트리의 부모·자식 순서 유지',
        diagram: '최소 이진 힙(부모 ≤ 자식): 루트 [1] ➔ 자식 [4], [3] (최솟값 확인 O(1))',
        concept: '완전 이진 트리 상태를 유지하며 부모 노드가 자식 노드보다 항상 작거나(최소 힙) 큰 자료구조.',
        defense: '루트 노드로 최솟값/최댓값 확인은 최악 O(1)이지만, 형제 노드 사이의 정렬은 보장하지 않음'
    },
    {
        id: 40, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 2,
        title: '10. 우선순위 큐 (Priority Queue)', subtitle: '우선순위가 높은 원소를 먼저 꺼냄',
        diagram: '입력 5, 1, 3 ➔ 최우선 1을 먼저 꺼냄 ➔ 삽입·삭제 최악 O(log n)',
        concept: '들어온 순서와 무관하게 우선순위가 가장 높은 원소를 먼저 추출하는 추상 자료형.',
        defense: '보통 이진 힙(Binary Heap)으로 구현하며 배열 재할당 비용 제외 시 삽입·삭제 최악 O(log n)'
    },
    {
        id: 41, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 3,
        title: '11. 트라이 (Trie)', subtitle: '문자 경로를 공유하는 문자열 트리',
        diagram: '[c] ➔ [a] ➔ [t], [r] (접두사 ca 공유 / 탐색 O(L))',
        concept: '문자열의 각 문자를 트리의 계층 노드로 저장하여 공통 접두사 경로를 공유하는 트리.',
        defense: '자식 노드 접근이 O(1)일 때 문자열 길이 L에 대해 탐색 시간 O(L) 보장 (자동완성에 최적)'
    },
    {
        id: 42, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 3,
        title: '12. 그래프 표현', subtitle: 'Graph Representation',
        diagram: '인접 행렬(0/1 격자): 공간 O(V²) | 인접 리스트(A→B,C): 공간 O(V + E)',
        concept: '정점(V)과 간선(E)의 연결 관계를 2차원 행렬 또는 정점별 연결 리스트로 저장.',
        defense: '정점 대비 간선이 적은 희소 그래프에서는 인접 리스트가 메모리와 순회 면에서 훨씬 효율적'
    },
    {
        id: 43, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 3,
        title: '13. BFS · DFS', subtitle: '너비 우선 · 깊이 우선 탐색',
        diagram: 'BFS: 큐·가까운 정점부터·최소 간선 경로 | DFS: 스택/재귀·한 경로 끝까지 확장',
        concept: '그래프의 모든 정점을 방문하는 두 가지 대표 탐색 방식 (방문 표시로 중복 탐색 방지).',
        defense: '인접 리스트 기준 두 방식 모두 시간 복잡도는 최악 O(V + E)'
    },
    {
        id: 44, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 3,
        title: '14. 유니온 파인드 (Union-Find)', subtitle: '서로소 집합 (Disjoint Set)',
        diagram: 'union(A, B): 대표 A를 B 아래에 연결 ➔ find(A) = find(B) 대표 조회',
        concept: '서로소 집합들을 합치고(Union) 특정 원소가 속한 집합의 대표 루트를 찾는(Find) 자료구조.',
        defense: '랭크(Rank) 기반 합치기 + 경로 압축(Path Compression) 적용 시 분할상환 O(α(n)) (거의 상수 시간)'
    },
    {
        id: 45, category: 'data-structure', catName: '자료구조',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        level: 3,
        title: '15. 빅오 (Big O)', subtitle: '입력 크기에 따른 비용의 점근적 상한',
        diagram: '3n + 2 → O(n), n² + n → O(n²) (상수 배와 작은 차수는 생략)',
        concept: '입력 크기 n이 무한히 커질 때 알고리즘 실행 시간이나 공간 증가율의 상한을 표기.',
        defense: '주의: 빅오(점근적 상한) 자체가 무조건 최악의 경우(Worst Case)만을 뜻하는 것은 아님'
    },

    // --- SQL Traps (15) ---
    {
        id: 46, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 1,
        title: '01. INNER vs LEFT JOIN', subtitle: '내부 조인 vs 왼쪽 외부 조인',
        diagram: 'A(1, 2) ⋈ B(1) ➔ INNER: [1|1] / LEFT: [1|1], [2|NULL]',
        concept: 'INNER JOIN은 양쪽 테이블에서 조인 조건이 매칭되는 행만 남김.',
        defense: 'LEFT JOIN은 오른쪽에 매칭되는 행이 없어도 왼쪽 행을 유지하고 오른쪽 열을 NULL로 채움'
    },
    {
        id: 47, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 1,
        title: '02. WHERE vs HAVING', subtitle: '행 조건 vs 그룹 조건',
        diagram: '입력 1, 2, 3 ➔ WHERE x>1(1 제외 후 합계 5) vs HAVING SUM(x)>1(전체 합계 6)',
        concept: 'WHERE는 그룹화 이전에 개별 행을 먼저 필터링하고, HAVING은 그룹 집계 이후 결과를 필터링.',
        defense: '집계 함수 조건은 HAVING에 작성하며, WHERE로 먼저 줄일 수 있는 조건은 WHERE에 두는 것이 효율적'
    },
    {
        id: 48, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 1,
        title: '03. UNION vs UNION ALL', subtitle: '중복 제거 vs 전체 유지',
        diagram: 'A(1, 1) + B(1, 2) ➔ UNION: 1, 2 (2행) | UNION ALL: 1, 1, 1, 2 (4행)',
        concept: '두 쿼리 결과를 세로로 합칠 때 UNION은 중복 행을 제거하고, UNION ALL은 그대로 모두 유지.',
        defense: '중복 제거가 필요 없다면 정렬·비교 비용이 없는 UNION ALL을 써야 성능상 유리 (순서는 ORDER BY로 지정)'
    },
    {
        id: 49, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: '04. 삭제 명령 3종', subtitle: 'DELETE / TRUNCATE / DROP',
        diagram: 'DELETE(WHERE 조건 행 삭제) | TRUNCATE(빈 테이블로 비움) | DROP(테이블 자체 제거)',
        concept: 'DELETE는 행 단위 삭제, TRUNCATE는 테이블 데이터 전체 비우기, DROP은 테이블 구조까지 삭제.',
        defense: 'DELETE만 WHERE 절 사용이 가능하며, 롤백 가능 여부 및 트리거 동작은 DBMS별로 차이가 있음'
    },
    {
        id: 50, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: '05. COUNT(*) vs COUNT(열)', subtitle: '전체 행 수 vs 값이 있는 행 수',
        diagram: '입력 v: [7, NULL, 7] ➔ COUNT(*) = 3 (모든 행) | COUNT(v) = 2 (NULL 제외)',
        concept: 'COUNT(*)는 NULL 여부와 관계없이 전체 행 수를 세고, COUNT(열)은 해당 열이 NULL이 아닌 행만 셈.',
        defense: 'COUNT(열)도 중복된 값(7, 7)은 각각 세며, 중복까지 빼려면 COUNT(DISTINCT 열) 사용'
    },
    {
        id: 51, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: '06. NULL 비교', subtitle: 'Equality(=) vs IS NULL',
        diagram: '입력 v: NULL ➔ WHERE v = NULL (UNKNOWN · 0행) | WHERE v IS NULL (TRUE · 1행)',
        concept: 'SQL의 3치 논리(TRUE/FALSE/UNKNOWN)에서 NULL과의 일반 등호(=) 비교는 모두 UNKNOWN이 됨.',
        defense: 'NULL = NULL 조차 TRUE가 아니므로, NULL 판별은 반드시 = 대신 IS NULL / IS NOT NULL 사용'
    },
    {
        id: 52, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: '07. IN vs EXISTS', subtitle: '포함 여부 vs 존재 여부',
        diagram: '서브쿼리 S가 NULL 1행일 때 ➔ 1 IN (S): UNKNOWN | EXISTS(S): TRUE (행이 있으므로)',
        concept: 'IN은 실제 값들을 비교하고, EXISTS는 서브쿼리가 반환하는 행이 1건이라도 존재하는지만 확인.',
        defense: '단순 EXISTS는 반환된 열의 값이 NULL이어도 행 자체만 존재하면 TRUE로 평가됨'
    },
    {
        id: 53, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: '08. NOT IN 함정', subtitle: 'NOT IN vs NOT EXISTS',
        diagram: 'x=2, 서브쿼리 S=(1, NULL) ➔ x NOT IN (1, NULL)은 UNKNOWN (x=2 제외됨!)',
        concept: 'x NOT IN (1, NULL)은 x!=1 AND x!=NULL로 풀리는데, x!=NULL이 UNKNOWN이므로 전체가 UNKNOWN이 됨.',
        defense: '서브쿼리 결과에 NULL이 섞일 가능성이 있다면 무조건 NOT EXISTS나 NULL 제외 조건을 사용해야 안전'
    },
    {
        id: 54, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: '09. CASE vs COALESCE', subtitle: '조건별 분기 값 vs 첫 비NULL 값',
        diagram: 'x = -1 일 때: CASE(x<0이면 0) → 0 | COALESCE(x, 0) → -1 (음수를 바꾸지 않음)',
        concept: 'CASE는 조건식에 따라 값을 분기하고, COALESCE는 나열된 인자 중 첫 번째로 NULL이 아닌 값을 반환.',
        defense: 'COALESCE는 오직 NULL 여부만 보므로, 음수나 빈 문자열 처리 등 조건 분기에는 CASE를 써야 함'
    },
    {
        id: 55, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 2,
        title: "10. LIKE 'a%' vs '%a'", subtitle: '접두 검색 vs 접미 검색',
        diagram: "입력 ab, ba, ca ➔ LIKE 'a%' (접두 범위 탐색 가능) | LIKE '%a' (접두 범위 불가)",
        concept: '일반 문자열 B-Tree 인덱스는 왼쪽 첫 글자부터 정렬되어 있음.',
        defense: "와일드카드(%)가 앞에 오는 '%a'나 '%a%'는 B-Tree 인덱스의 접두 범위 탐색(Range Scan)을 쓸 수 없음"
    },
    {
        id: 56, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 3,
        title: '11. OFFSET vs 키셋 페이지네이션', subtitle: 'Offset vs Keyset Pagination',
        diagram: 'OFFSET 4 (앞 1..4행을 읽고 건너뜀) vs WHERE id > 4 LIMIT 2 (4 이후 바로 탐색)',
        concept: 'OFFSET은 페이지가 뒤로 갈수록 버리는 행까지 다 읽어야 해서 급격히 느려짐.',
        defense: '정렬된 고유 키 인덱스를 활용해 마지막 조회 키 이후(id > 4)부터 읽는 키셋 방식이 대용량에 필수'
    },
    {
        id: 57, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 3,
        title: '12. CHAR vs VARCHAR', subtitle: '고정 길이 vs 가변 길이',
        diagram: "'a'를 길이 3에 저장 ➔ CHAR(3): 'a··' (공백 패딩) | VARCHAR(3): 'a' (패딩 없음)",
        concept: 'CHAR는 남는 공간만큼 공백을 채워 고정 길이로 저장하고, VARCHAR는 실제 문자열 길이만큼만 저장.',
        defense: '공백 패딩 비교 방식 및 반환 규칙은 DBMS마다 다르게 동작하므로 주의'
    },
    {
        id: 58, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 3,
        title: '13. PK vs UNIQUE', subtitle: '기본 키 vs 유일 제약',
        diagram: 'PK: 중복 불가 · NULL 불가 · 테이블당 1개 | UNIQUE: 중복 불가 · NULL 허용 · 여러 개 가능',
        concept: '두 제약 모두 중복 값을 막지만, 기본 키(PK)는 행의 절대 식별자로서 NULL을 절대 허용하지 않음.',
        defense: 'UNIQUE 제약 컬럼은 NULL을 허용하며(PostgreSQL 등 다중 NULL 허용 여부 등 세부 동작은 DB별 차이)'
    },
    {
        id: 59, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 3,
        title: '14. 순위 함수 3종', subtitle: 'ROW_NUMBER / RANK / DENSE_RANK',
        diagram: '점수 90, 90, 80 ➔ ROW_NUMBER(1,2,3) | RANK(1,1,3) | DENSE_RANK(1,1,2)',
        concept: '동점자(90, 90) 발생 시 순위를 매기는 윈도우 함수 3종의 차이.',
        defense: 'ROW_NUMBER는 무조건 고유 번호 부여, RANK는 공동 순위 뒤 번호 건너뜀(3위), DENSE_RANK는 빈틈없이 이어감(2위)'
    },
    {
        id: 60, category: 'sql-traps', catName: 'SQL 함정',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        level: 3,
        title: '15. 상관 vs 비상관 서브쿼리', subtitle: 'Correlated vs Uncorrelated',
        diagram: '상관(바깥 행 A, B 참조 → A:30, B:5) vs 비상관(독립 집계 → 모두 전체 합계 35)',
        concept: '상관 서브쿼리는 바깥 쿼리의 열을 참조하여 논리적으로 바깥 행마다 결과를 달리 계산.',
        defense: '비상관 서브쿼리는 단독 실행이 가능하며, 실제 물리적 실행 횟수는 옵티마이저 최적화(Unnesting 등)에 따름'
    },

    // --- OS & Network & Infra Classics (15) ---
    {
        id: 61, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 1,
        title: '01. 프로세스 vs 스레드', subtitle: 'Process vs Thread',
        diagram: '프로세스(독립 메모리: Code/Data/Heap/Stack) vs 스레드(Heap 공유 · Stack만 독립)',
        concept: '프로세스는 OS로부터 자원을 할당받는 실행 단위이고, 스레드는 프로세스 내에서 자원을 공유하며 실행되는 흐름 단위.',
        defense: '스레드는 컨텍스트 스위칭 비용이 적지만 공유 자원(Heap) 동기화 이슈(Race Condition) 주의 필수'
    },
    {
        id: 62, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '02. 데드락 (교착 상태) 4대 조건', subtitle: 'Deadlock Conditions',
        diagram: '상호배제 · 점유대기 · 비선점 · 순환대기 (4가지 모두 성립 시 발생)',
        concept: '두 개 이상의 작업이 서로 상대방이 가진 자원이 해제되기를 무한정 기다리는 상태.',
        defense: '4가지 조건 중 하나라도 끊으면 예방 가능 (실무에서는 자원 획득 순서 통일·타임아웃 설정)'
    },
    {
        id: 63, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '03. 동기/비동기 · 블로킹/논블로킹', subtitle: 'Sync/Async & Blocking/Non-blocking',
        diagram: '작업 완료 여부 관심(동기 vs 비동기) × 제어권 반환 여부(블로킹 vs 논블로킹)',
        concept: '동기는 결과 순서와 완료를 직접 챙기는 관점이고, 블로킹은 호출된 함수가 끝날 때까지 제어권을 묶어두는 관점.',
        defense: '대규모 I/O 서버는 제어권을 바로 돌려받고 이벤트로 결과를 처리하는 Async + Non-Blocking 모델 선호'
    },
    {
        id: 64, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '04. 가상 메모리와 페이징', subtitle: 'Virtual Memory & Paging',
        diagram: '가상 주소(페이지) ➔ MMU · 페이지 테이블 ➔ 물리 메모리(프레임) 매핑',
        concept: '프로세스마다 독립된 큰 가상 주소 공간을 부여하고, 필요한 페이지 단위로 물리 메모리에 올려 실행하는 기법.',
        defense: '물리 메모리에 없는 페이지 접근 시 Page Fault 발생, 빈번하면 스래싱(Thrashing)으로 급격한 성능 저하'
    },
    {
        id: 65, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 1,
        title: '05. TCP vs UDP', subtitle: '연결 지향 신뢰성 vs 비연결 초저지연',
        diagram: 'TCP(3-Way Handshake · 순서/재전송 보장) vs UDP(연결 생략 · 빠른 스트리밍)',
        concept: 'TCP는 흐름·혼잡 제어와 재전송으로 데이터 무결성을 보장하고, UDP는 헤더가 단순해 속도가 빠름.',
        defense: '웹 API·결제는 TCP, 실시간 영상·게임·DNS 및 최신 HTTP/3(QUIC)는 UDP 기반 활용'
    },
    {
        id: 66, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 1,
        title: '06. TCP 3-Way & 4-Way Handshake', subtitle: '연결 수립과 연결 종료',
        diagram: '연결: SYN → SYN+ACK → ACK | 종료: FIN → ACK → FIN → ACK(TIME_WAIT)',
        concept: '통신 전 양쪽의 송수신 준비를 확인하는 3단계와, 남은 패킷 유실을 막기 위한 4단계 종료 절차.',
        defense: '종료 측의 TIME_WAIT 상태는 마지막 ACK 재전송 보장 및 이전 연결의 지연 패킷이 새 연결에 섞이는 것을 방지하며, 과도하면 포트 고갈 유발 가능'
    },
    {
        id: 67, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 1,
        title: '07. HTTP/1.1 vs HTTP/2 vs HTTP/3', subtitle: '웹 프로토콜의 진화',
        diagram: 'HTTP/1.1(순차 처리·HOL) → HTTP/2(바이너리 멀티플렉싱) → HTTP/3(UDP 기반 QUIC)',
        concept: '한 번의 연결로 여러 요청을 동시에 처리하는 멀티플렉싱 도입 및 TCP의 패킷 손실 지연(HOL Blocking) 해결.',
        defense: 'HTTP/3는 QUIC 프로토콜을 사용해 연결 수립(0-RTT/1-RTT)이 빠르고 모바일 망 전환에도 연결 유지'
    },
    {
        id: 68, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '08. DNS 조회 과정', subtitle: 'Domain Name System Resolution',
        diagram: '브라우저/OS 캐시 → Local DNS → Root → TLD(.com) → Authoritative DNS(IP 응답)',
        concept: '사람이 읽는 도메인 주소를 계층적 네임서버 질의를 통해 실제 서버의 IP 주소로 변환하는 과정.',
        defense: 'TTL(Time-To-Live) 동안 캐싱되어 부하를 줄이며, 서버 이전 시 TTL 단축 전략이 필수'
    },
    {
        id: 69, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 3,
        title: '09. 세션 vs JWT 토큰 인증', subtitle: 'Stateful Session vs Stateless JWT',
        diagram: '세션(서버 저장소 조회 · 즉시 무효화) vs JWT(서명 검증 · 서버 무상태 확장 유리)',
        concept: '세션은 서버 저장소에 상태를 유지하고, JWT는 사용자 정보를 Base64URL 인코딩 후 서명(무결성 검증·암호화 아님)해 클라이언트가 보관.',
        defense: 'JWT는 탈취 시 만료 전 강제 폐기가 어렵기 때문에 짧은 Access Token + Refresh Token 조합 사용'
    },
    {
        id: 70, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '10. RESTful API 설계 & 멱등성', subtitle: 'HTTP Methods & Idempotency',
        diagram: '멱등성 O: GET, PUT, DELETE (여러 번 호출해도 서버 상태 동일) | 멱등성 X: POST (중복 생성)',
        concept: '자원(URI)과 행위(HTTP Method)를 명확히 표현하며, 네트워크 재시도 시 안전성을 판단하는 멱등성 개념.',
        defense: '결제 등 POST 요청의 중복 실행을 막기 위해 클라이언트가 고유 Idempotency-Key를 헤더로 전송'
    },
    {
        id: 71, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '11. 캐시 전략 (Cache-Aside & Write)', subtitle: 'Caching Patterns',
        diagram: 'Cache-Aside: 캐시 히트 시 즉시 반환 → 미스 시 DB 조회 후 캐시 적재',
        concept: '반복 조회되는 데이터를 메모리(Redis 등)에 두어 DB 부하를 줄이고 응답 속도를 높이는 패턴.',
        defense: '만료 시간(TTL)이 한꺼번에 끝나 DB로 요청이 몰리는 Cache Stampede 방지를 위해 Jitter(랜덤 편차) 적용'
    },
    {
        id: 72, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 2,
        title: '12. 로드 밸런서 (L4 vs L7)', subtitle: 'Load Balancing Layers',
        diagram: 'L4(IP · Port 기반 빠른 패킷 분산) vs L7(URL · 헤더 · 쿠키 기반 지능형 라우팅)',
        concept: '트래픽을 여러 서버로 분산해 가용성과 확장성을 확보하는 장비/소프트웨어.',
        defense: 'L7은 HTTP 내용을 해석하므로 SSL 종료(Termination), 경로별 마이크로서비스 분기, WAF 연동 가능'
    },
    {
        id: 73, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 3,
        title: '13. 포워드 프록시 vs 리버스 프록시', subtitle: 'Forward vs Reverse Proxy',
        diagram: '포워드(클라이언트 앞단 · 익명성/캐싱) vs 리버스(서버 앞단 · Nginx · 보안/분산)',
        concept: '포워드 프록시는 내부 사용자를 대신해 외부에 요청하고, 리버스 프록시는 외부 요청을 받아 내부 서버로 전달.',
        defense: '리버스 프록시(Nginx 등)는 실제 백엔드 서버 IP를 은닉하고 HTTPS 처리·정적 파일 서빙을 전담'
    },
    {
        id: 74, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 3,
        title: '14. 스케일 업 vs 스케일 아웃', subtitle: 'Scale-Up vs Scale-Out',
        diagram: 'Scale-Up(서버 사양 증설 · 수직 확장) vs Scale-Out(서버 대수 증가 · 수평 확장)',
        concept: '트래픽 증가에 대응해 단일 머신 성능을 높일지, 여러 대의 서버를 병렬로 늘릴지 결정하는 아키텍처 전략.',
        defense: 'Scale-Out은 무중단 확장과 장애 격리에 유리하지만, 세션·파일을 서버 로컬에 두지 않는 Stateless 설계가 필수'
    },
    {
        id: 75, category: 'os-network', catName: 'OS·네트워크',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        level: 3,
        title: '15. 컨테이너 vs 가상머신 (VM)', subtitle: 'Container (Docker) vs Virtual Machine',
        diagram: 'VM(Hypervisor 위 Guest OS 각각 포함) vs 컨테이너(Host OS 커널 공유 · 경량 격리)',
        concept: 'VM은 하드웨어 수준에서 OS 전체를 가상화하고, 컨테이너는 프로세스 격리 기술로 애플리케이션 실행 환경만 패키징.',
        defense: '컨테이너는 이미지 용량이 작고 초 단위로 기동되어 CI/CD 및 오토스케일링(Kubernetes)의 표준 기반'
    },

    // --- Architecture & Clean Code (15) ---
    {
        id: 76, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 1,
        title: '01. SOLID 5대 원칙', subtitle: '객체지향 설계의 핵심 기둥',
        diagram: 'SRP(단일책임) · OCP(개방폐쇄) · LSP(리스코프) · ISP(인터페이스분리) · DIP(의존역전)',
        concept: '변경에 유연하고 유지보수하기 쉬운 소프트웨어를 만들기 위한 5가지 객체지향 설계 원칙.',
        defense: '핵심은 추상화(인터페이스)에 의존하여 기존 코드 수정 없이 새로운 기능을 확장(OCP)하는 것'
    },
    {
        id: 77, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 1,
        title: '02. DI와 IoC (의존성 주입 · 제어의 역전)', subtitle: 'Dependency Injection & Inversion of Control',
        diagram: '직접 생성(new Impl) ➔ 외부 컨테이너가 인터페이스 구현체를 조립·주입',
        concept: '객체가 사용할 의존 객체를 직접 생성하지 않고 외부(프레임워크 등)에서 주입받아 결합도를 낮추는 패턴.',
        defense: '생성자 주입을 사용하면 불변성(final)을 보장하고 단위 테스트 시 Mock 객체 교체가 매우 쉬움'
    },
    {
        id: 78, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '03. 응집도와 결합도', subtitle: 'High Cohesion · Low Coupling',
        diagram: '높은 응집도(관련 기능 한 모듈에 집중) × 낮은 결합도(모듈 간 의존 최소화)',
        concept: '좋은 소프트웨어 모듈화의 척도로, 내부 요소끼리는 밀접하게 뭉치고 외부 모듈과는 느슨하게 연결됨.',
        defense: '요구사항 변경 시 수정 범위가 한 모듈 내부로 국한되어 사이드 이펙트를 방지'
    },
    {
        id: 79, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '04. 합성 vs 상속', subtitle: 'Composition over Inheritance',
        diagram: '상속(Is-A · 부모 변경 시 자식 파손 위험) vs 합성(Has-A · 인터페이스 위임)',
        concept: '기존 클래스의 기능을 재사용할 때 상위 클래스를 확장(상속)하기보다 필드로 포함(합성)하여 위임하는 설계.',
        defense: '상속은 캡슐화를 깨뜨리고 클래스 폭발을 유발하므로, 다형성이 필요한 경우 합성을 우선 고려'
    },
    {
        id: 80, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '05. 생성 · 구조 · 행위 디자인 패턴', subtitle: 'Singleton · Adapter · Strategy',
        diagram: '생성(Singleton/Factory) · 구조(Adapter/Proxy/Decorator) · 행위(Strategy/Observer)',
        concept: '반복적으로 발생하는 설계 문제를 해결하기 위해 검증된 객체 간 협력 구조 템플릿.',
        defense: '전략 패턴(Strategy)으로 if-else 분기를 제거하고, 프록시/데코레이터로 부가 기능을 분리'
    },
    {
        id: 81, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '06. 레이어드 vs 헥사고날 아키텍처', subtitle: 'Layered vs Hexagonal (Ports & Adapters)',
        diagram: '레이어드(Controller→Service→DB 의존) vs 헥사고날(도메인 중심 · 외부 어댑터 역전)',
        concept: '비즈니스 도메인 로직을 웹 프레임워크나 특정 DB 기술로부터 격리하여 순수하게 보호하는 아키텍처.',
        defense: '포트(인터페이스)와 어댑터(구현)로 경계를 나누면 인프라 교체 시에도 핵심 도메인 코드는 무변경 유지'
    },
    {
        id: 82, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '07. TDD와 테스트 피라미드', subtitle: 'Unit · Integration · E2E Test',
        diagram: '단위 테스트(다수·빠름) ➔ 통합 테스트(중간) ➔ E2E 테스트(소수·전체 흐름)',
        concept: '실패하는 테스트 작성(Red) → 통과 구현(Green) → 리팩토링(Refactor) 사이클과 계층별 테스트 비중 전략.',
        defense: '격리된 단위 테스트 비중을 높여 빠른 피드백 루프를 확보하고 리팩토링의 심리적 안전망 구축'
    },
    {
        id: 83, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '08. 테스트 더블 (Mock vs Stub)', subtitle: 'Test Doubles in Unit Testing',
        diagram: 'Stub(상태 검증 · 미리 정해진 반환값 제공) vs Mock(행위 검증 · 호출 여부/횟수 확인)',
        concept: '단위 테스트 시 외부 API나 DB 등 실제 의존성을 대체하는 가짜 객체들의 역할 구분.',
        defense: '과도한 Mock 사용은 내부 구현에 테스트를 결합시키므로, 꼭 필요한 외부 경계(Boundary)에만 적용'
    },
    {
        id: 84, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 2,
        title: '09. 모놀리식 vs 마이크로서비스 (MSA)', subtitle: 'Monolithic vs Microservices',
        diagram: '모놀리식(단일 배포·로컬 트랜잭션) vs MSA(독립 배포·장애 격리·분산 트랜잭션)',
        concept: '애플리케이션을 하나의 통합 단위로 배포할지, 도메인별 독립 서비스로 분리할지 결정하는 구조.',
        defense: '초기에는 모듈화된 모놀리식으로 시작하고, 팀 규모와 트래픽 병목이 명확할 때 MSA로 점진 분리'
    },
    {
        id: 85, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 3,
        title: '10. 메시지 큐 & 이벤트 기반 아키텍처', subtitle: 'Kafka · RabbitMQ · Pub/Sub',
        diagram: 'Producer ➔ [ Message Broker / Topic ] ➔ Consumer (비동기 결합 · 트래픽 완충)',
        concept: '서비스 간 직접 동기 호출 대신 이벤트를 발행·구독하여 시스템 간 결합도를 낮추고 트래픽 폭주를 완충.',
        defense: '최소 한 번 전송(At-least-once) 특성상 컨슈머의 멱등성 처리와 실패 메시지용 DLQ(Dead Letter Queue) 필수'
    },
    {
        id: 86, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 3,
        title: '11. 분산 트랜잭션과 Saga 패턴', subtitle: 'Eventual Consistency & 보상 트랜잭션',
        diagram: '주문 생성 ➔ 결제 성공 ➔ 재고 차감 실패 ➔ [결제 취소 보상 트랜잭션 실행]',
        concept: '분산 DB 환경에서 전역 락(2PC) 대신 로컬 트랜잭션 연쇄와 실패 시 보상(Compensating) 트랜잭션으로 정합성 유지.',
        defense: '강한 일관성 대신 결과적 일관성(Eventual Consistency)을 수용하여 높은 가용성과 확장성 확보'
    },
    {
        id: 87, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 3,
        title: '12. 서킷 브레이커 (Circuit Breaker)', subtitle: '장애 전파 차단 패턴',
        diagram: 'Closed(정상) ➔ 오류 임계치 초과 ➔ Open(즉시 차단·Fallback) ➔ Half-Open(복구 탐색)',
        concept: '연동된 외부 서비스에 장애가 발생했을 때 무한 대기를 막고 요청을 즉시 차단해 연쇄 장애를 예방하는 패턴.',
        defense: '타임아웃·재시도(Exponential Backoff)와 함께 사용하여 전체 시스템 스레드 고갈 방지'
    },
    {
        id: 88, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 3,
        title: '13. Git Merge vs Rebase', subtitle: '브랜치 통합 전략',
        diagram: 'Merge(병합 커밋 생성 · 이력 보존) vs Rebase(베이스 재배치 · 선형 깔끔한 히스토리)',
        concept: '분리된 브랜치의 변경 사항을 합칠 때 분기 이력을 남길지, 커밋을 일렬로 재정렬할지 선택.',
        defense: '공용 원격 브랜치(main 등)에 이미 푸시된 커밋은 절대 Rebase하지 않는 것이 협업의 철칙'
    },
    {
        id: 89, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 3,
        title: '14. CI / CD 파이프라인', subtitle: '지속적 통합 · 지속적 배포',
        diagram: '코드 Push ➔ CI(자동 빌드 · 린트 · 테스트) ➔ CD(스테이징 · 프로덕션 무중단 배포)',
        concept: '코드 변경 사항을 주기적으로 병합·검증하고, 검증된 아티팩트를 운영 환경까지 자동 배포하는 프로세스.',
        defense: '배포 리스크를 줄이기 위해 Blue/Green(전환) 또는 Canary(점진적 트래픽 유입) 배포 전략 활용'
    },
    {
        id: 90, category: 'architecture', catName: '설계·클린코드',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        level: 3,
        title: '15. 로그 · 메트릭 · 분산 추적', subtitle: 'Observability (관측 가능성 3대 축)',
        diagram: 'Logs(상세 이벤트 기록) · Metrics(수치 시계열 추이) · Traces(마이크로서비스 요청 경로)',
        concept: '운영 중인 시스템의 내부 상태를 외부 출력 데이터만으로 파악하고 장애 원인을 신속히 진단하는 역량.',
        defense: '구조화된 JSON 로그와 요청별 고유 Trace-ID를 전파하여 분산 환경의 병목 지점을 즉시 추적'
    },

    // --- Browser & Frontend Classics (15) ---
    {
        id: 91, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 1,
        title: '01. 브라우저 렌더링 과정 (CRP)', subtitle: 'Critical Rendering Path',
        diagram: 'HTML(DOM) + CSS(CSSOM) ➔ Render Tree ➔ Layout(배치) ➔ Paint(그리기) ➔ Composite',
        concept: '브라우저가 HTML, CSS, JS를 해석해 화면의 픽셀로 변환하는 일련의 파이프라인.',
        defense: 'Layout(Reflow)과 Paint(Repaint)를 유발하는 속성 대신 transform·opacity를 쓰면 GPU 합성(Composite)만 수행'
    },
    {
        id: 92, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '02. JS 이벤트 루프 (Event Loop)', subtitle: 'Call Stack · Microtask · Macrotask',
        diagram: 'Call Stack 비어있음 ➔ Microtask(Promise) 모두 실행 ➔ 렌더링 ➔ Macrotask(setTimeout)',
        concept: '싱글 스레드인 자바스크립트가 브라우저 Web APIs 및 태스크 큐를 통해 비동기 작업을 처리하는 메커니즘.',
        defense: 'Microtask Queue(Promise.then)는 Macrotask Queue(setTimeout)보다 항상 우선순위가 높아 먼저 비워짐'
    },
    {
        id: 93, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '03. 클로저 (Closure)', subtitle: 'Lexical Environment 기억',
        diagram: '외부 함수 종료 후에도 내부 함수가 외부 변수의 렉시컬 환경을 참조·유지',
        concept: '함수가 선언될 당시의 렉시컬 스코프를 기억하여, 외부 함수 실행이 끝난 뒤에도 변수에 접근할 수 있는 특성.',
        defense: '상태 은닉(Private 변수 구현)과 커링에 유용하나, 불필요한 참조가 남으면 메모리 누수 유발 주의'
    },
    {
        id: 94, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 1,
        title: '04. 이벤트 버블링 · 캡처링 · 위임', subtitle: 'Event Propagation & Delegation',
        diagram: '캡처링(Window → Target) ➔ 타겟 ➔ 버블링(Target → Window) · 상위 요소에서 일괄 처리',
        concept: 'DOM 이벤트가 상위에서 하위로 전파(캡처링)되었다가 다시 상위로 올라가는(버블링) 흐름.',
        defense: '수백 개의 리스트 아이템에 각각 리스너를 다는 대신 부모 요소에 하나만 등록하는 이벤트 위임으로 메모리 절약'
    },
    {
        id: 95, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '05. 디바운싱 vs 스로틀링', subtitle: 'Debouncing vs Throttling',
        diagram: '디바운싱(마지막 입력 후 일정 시간 뒤 1회 실행) vs 스로틀링(일정 주기마다 최대 1회 실행)',
        concept: '단시간에 과도하게 발생하는 이벤트(검색창 입력, 스크롤, 리사이즈)의 핸들러 호출 빈도를 제어하는 기법.',
        defense: '자동완성 API 호출에는 디바운싱, 무한 스크롤 위치 감지에는 스로틀링이 적합'
    },
    {
        id: 96, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '06. 브라우저 저장소 3종 비교', subtitle: 'Cookie vs LocalStorage vs SessionStorage',
        diagram: 'Cookie(4KB·매 요청 전송) | LocalStorage(영구·탭 공유) | SessionStorage(탭 닫으면 삭제)',
        concept: '클라이언트 측에 데이터를 저장하는 3가지 Web Storage 및 쿠키의 용량·만료·전송 범위 차이.',
        defense: '민감한 인증 토큰은 XSS 탈취 위험이 있는 Web Storage 대신 HttpOnly 쿠키 저장 권장'
    },
    {
        id: 97, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '07. HTTP 캐시 (강력 캐시 vs 검증 캐시)', subtitle: 'Cache-Control · ETag · 304 Not Modified',
        diagram: 'max-age 유효(200 from cache) ➔ 만료 후 If-None-Match(ETag) ➔ 변경 없으면 304 반환',
        concept: '정적 리소스 재다운로드를 막아 로딩 속도를 높이는 브라우저 캐시 제어 및 조건부 요청 메커니즘.',
        defense: '해시가 포함된 JS/CSS 번들은 긴 max-age를 주고, HTML은 no-cache로 매번 ETag 검증을 거치게 설정'
    },
    {
        id: 98, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '08. CSR vs SSR vs SSG', subtitle: '웹 렌더링 전략 비교',
        diagram: 'CSR(클라이언트 JS 렌더링) | SSR(요청 시 서버 HTML 생성) | SSG(빌드 시 정적 HTML 생성)',
        concept: 'HTML을 언제, 어디서 생성하느냐에 따른 렌더링 전략과 초기 로딩(FCP)·SEO·서버 부하 트레이드오프.',
        defense: 'SEO와 초기 속도가 중요하면 SSR/SSG + Hydration, 대시보드 등 인터랙션 중심 앱은 CSR 유리'
    },
    {
        id: 99, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 3,
        title: '09. Virtual DOM과 재조정 (Reconciliation)', subtitle: 'Diffing 알고리즘 & 일괄 DOM 반영',
        diagram: '상태 변경 ➔ 새 Virtual DOM 생성 ➔ 이전 트리와 Diffing 비교 ➔ 변경 부분만 실제 DOM 패치',
        concept: '실제 DOM 조작 비용을 줄이기 위해 메모리상의 가상 트리에서 변경점을 계산한 뒤 한 번에 반영하는 기법.',
        defense: '리스트 렌더링 시 고유한 key 값을 부여해야 재조정 과정에서 불필요한 DOM 재생성을 막을 수 있음'
    },
    {
        id: 100, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 3,
        title: '10. 웹 성능 핵심 지표 (Core Web Vitals)', subtitle: 'LCP · INP · CLS',
        diagram: 'LCP(최대 콘텐츠 로딩 ≤2.5s) · INP(상호작용 반응 ≤200ms) · CLS(레이아웃 이동 ≤0.1)',
        concept: '구글이 정의한 사용자 경험(로딩 속도, 입력 반응성, 시각적 안정성)의 3대 핵심 성능 지표.',
        defense: '이미지 크기 속성 명시로 CLS를 줄이고, 코드 스플리팅과 우선순위 리소스 프리로드로 LCP 개선'
    },
    {
        id: 101, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '11. script 태그의 async vs defer', subtitle: 'HTML 파싱 차단 방지 전략',
        diagram: '기본(파싱 중단 후 실행) | async(다운로드 병렬·완료 즉시 실행) | defer(파싱 완료 후 순서대로 실행)',
        concept: '외부 자바스크립트 로드 시 HTML DOM 구축이 멈추는 렌더링 블로킹을 제어하는 속성.',
        defense: 'DOM 접근이 필요하거나 스크립트 간 실행 순서가 중요할 때는 defer 사용이 표준'
    },
    {
        id: 102, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 3,
        title: '12. 웹소켓 vs SSE vs 롱 폴링', subtitle: '실시간 통신 프로토콜 선택',
        diagram: 'Long Polling(반복 요청) | SSE(서버→클라이언트 단방향 스트림) | WebSocket(전이중 양방향)',
        concept: 'HTTP의 요청-응답 한계를 넘어 실시간 알림, 채팅, AI 스트리밍 등을 구현하는 통신 방식.',
        defense: '채팅·게임은 WebSocket, 실시간 알림이나 LLM 토큰 스트리밍에는 가벼운 HTTP 기반 SSE가 효율적'
    },
    {
        id: 103, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '13. 번들링과 트리 쉐이킹 (Tree Shaking)', subtitle: '모듈 번들러 최적화',
        diagram: 'ES Modules(import/export) 정적 분석 ➔ 미사용 코드(Dead Code) 제거 ➔ 번들 용량 축소',
        concept: '여러 모듈 파일을 묶고(Bundling), 실제로 호출되지 않는 죽은 코드를 빌드 결과물에서 제거하는 기법.',
        defense: 'CommonJS(require) 대신 정적 구조인 ES Module(import)을 사용해야 트리 쉐이킹이 정상 동작'
    },
    {
        id: 104, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 2,
        title: '14. 상태 관리와 불변성 (Immutability)', subtitle: '단방향 데이터 흐름 & 참조 비교',
        diagram: '기존 객체 직접 수정(X) ➔ 새 객체 복사 생성(O) ➔ 얕은 비교(===)로 변경 즉시 감지',
        concept: '데이터 예측 가능성을 높이고 UI 프레임워크가 상태 변화를 빠르게 감지하도록 기존 상태를 직접 변이시키지 않는 원칙.',
        defense: '깊은 비교(Deep Compare) 대신 참조 주소만 비교하면 되므로 렌더링 최적화 성능이 크게 향상'
    },
    {
        id: 105, category: 'frontend', catName: '브라우저·FE',
        badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        level: 1,
        title: '15. 시맨틱 HTML과 웹 접근성 (A11y)', subtitle: 'Semantic Markup & ARIA',
        diagram: '<div> 남발(X) ➔ <header> <nav> <main> <article> <button> 사용(O)',
        concept: '태그 자체에 의미를 부여하여 검색 엔진(SEO)과 스크린 리더 등 보조 기기가 문서 구조를 이해하도록 작성.',
        defense: '키보드 포커스 이동(Tab), 명확한 alt 텍스트, 명도 대비 준수는 모든 사용자를 위한 기본 소양'
    },

    // --- Software Testing (15) ---
    {
        id: 108, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 1,
        title: '01. 단위 테스트', subtitle: 'Unit Test',
        diagram: '함수 f(x): x=2 → 4 | 의존성은 필요할 때 대역 사용 | 작고 빠른 피드백',
        concept: '함수·클래스 등 가장 작은 코드 단위를 외부 의존성과 분리하여 독립적으로 빠르게 검증하는 테스트.',
        defense: '작은 코드 단위를 빠르게 검증 (외부 DB·네트워크 의존성은 필요 시 테스트 대역으로 격리)'
    },
    {
        id: 109, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 1,
        title: '02. 통합 테스트', subtitle: 'Integration Test',
        diagram: '모듈 ↔ 서비스 ↔ DB | 경계와 실제 연동 확인 | 환경 범위는 테스트마다 명시',
        concept: '여러 모듈, 서비스, 데이터베이스 등 구성 요소 간 경계에서 실제 연동이 올바르게 동작하는지 확인하는 테스트.',
        defense: '모듈·DB 등 경계의 연동을 검증하며, 사용하는 테스트 환경 범위를 테스트마다 명확히 명시'
    },
    {
        id: 110, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 1,
        title: '03. E2E 테스트', subtitle: 'End-to-End Test',
        diagram: '화면 → API → DB | 로그인 → 주문 → 완료 | 실제 경로에 가까운 흐름',
        concept: '사용자 화면(UI)부터 API, DB까지 실제 운영 환경과 가장 유사한 전체 흐름을 끝에서 끝까지 검증하는 테스트.',
        defense: '사용자 흐름을 실제 경로에 가깝게 검증 (실행 비용이 크므로 핵심 시나리오 위주로 유지)'
    },
    {
        id: 111, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 1,
        title: '04. 테스트 피라미드', subtitle: 'Test Pyramid',
        diagram: 'E2E(소수) / 통합(중간) / 단위·많이 | 조직·제품에 따라 비율은 조정',
        concept: '실행 속도가 빠르고 비용이 낮은 단위 테스트를 가장 많이 두고, 위로 갈수록(통합·E2E) 비중을 줄이는 테스트 구성 지침.',
        defense: '빠른 하위 테스트를 더 많이 두는 지침 (단, 조직과 제품 특성에 따라 비율은 유연하게 조정)'
    },
    {
        id: 112, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 1,
        title: '05. AAA 패턴', subtitle: 'Arrange Act Assert',
        diagram: '준비(Arrange) → 실행(Act) → 검증(Assert) | given → when → then과 같은 역할',
        concept: '하나의 테스트 코드를 준비(Arrange)·실행(Act)·검증(Assert) 세 구간으로 나누어 테스트 의도를 명확히 드러내는 구조.',
        defense: '준비·실행·검증으로 테스트를 구분 (BDD의 given → when → then 패턴과 동일한 역할)'
    },
    {
        id: 113, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '06. Mock · Stub · Fake', subtitle: 'Test Doubles',
        diagram: 'Stub(정해진 응답) | Mock(호출 검증) | Fake(간소 구현)',
        concept: '테스트 대상의 외부 의존성을 대체하는 테스트 대역(Test Double)으로, Stub은 고정 응답, Mock은 호출 여부·인자 검증, Fake는 동작하는 간소 구현을 제공.',
        defense: '대역은 목적과 구현 수준에 따라 구분 (용어 경계는 테스트 프레임워크·문헌마다 차이가 있음)'
    },
    {
        id: 114, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '07. 상태 · 행위 검증', subtitle: 'State vs Behavior Verification',
        diagram: '상태 검증(잔액 = 900) vs 행위 검증(save 1회) | 관찰할 계약에 맞춰 선택',
        concept: '테스트 후 반환값·객체 상태 변화를 확인하는 상태 검증과, 협력 객체의 메서드 호출 여부를 확인하는 행위 검증의 구분.',
        defense: '상태 결과와 협력 호출 중 관찰할 계약에 맞춰 선택하되, 내부 구현 결합도도 함께 고려'
    },
    {
        id: 115, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '08. 경계값 분석', subtitle: 'Boundary Value Analysis',
        diagram: '허용 범위 1···100 → 0, 1, 2 ··· 99, 100, 101 경계값과 바로 안팎 확인',
        concept: '결함이 입력 범위의 경계 부근에서 자주 발생한다는 경험적 원리에 따라 경계값과 바로 안팎의 값을 집중적으로 테스트하는 기법.',
        defense: '경계값과 바로 안팎을 집중 확인 (동등 분할과 함께 적용하면 최소 케이스로 높은 결함 탐지율 확보)'
    },
    {
        id: 116, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '09. 코드 커버리지', subtitle: 'Code Coverage',
        diagram: '실행됨 11 / 16 | 라인·분기 등 기준이 다름 | 높아도 검증 품질을 보장하진 않음',
        concept: '테스트 실행 시 전체 코드 중 실제로 실행된 비율(라인·분기·조건 등)을 측정하는 지표.',
        defense: '실행 범위를 보여줄 뿐 결함 부재나 단언(Assertion) 품질을 보장하지 않으므로 맹목적 수치 목표는 지양'
    },
    {
        id: 117, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '10. 회귀 테스트', subtitle: 'Regression Test',
        diagram: '기존 기능 + 변경 → 관련 테스트 실행 | 의도치 않은 영향 탐지',
        concept: '기능 추가, 버그 수정, 리팩토링 등 코드 변경 후 기존에 정상 동작하던 기능이 깨지지 않았는지 재확인하는 테스트.',
        defense: '변경 뒤 기존 동작이 깨졌는지 재확인 (CI 파이프라인 자동화로 배포 전 의도치 않은 사이드 이펙트 차단)'
    },
    {
        id: 118, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '11. Flaky 테스트', subtitle: 'Flaky Test',
        diagram: '통과 / 실패 / 통과 / 실패 | 관련 변경 없이 결과가 흔들림 | 시간·순서·외부 의존성 점검',
        concept: '코드 변경 없이도 실행할 때마다 통과와 실패가 간헐적으로 바뀌는 비결정적(불안정한) 테스트.',
        defense: '관련 변경 없이 결과가 간헐적으로 바뀜 → 고정 시각, 테스트 실행 순서, 비동기 대기, 외부 의존성을 점검해 제거'
    },
    {
        id: 119, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 2,
        title: '12. TDD', subtitle: 'Test-Driven Development',
        diagram: 'RED(실패) → GREEN(최소 구현) → REFACTOR(개선) 짧은 주기',
        concept: '실패하는 테스트를 먼저 작성(Red)하고, 테스트를 통과하는 최소 코드를 구현(Green)한 뒤, 중복과 설계를 개선(Refactor)하는 개발 방법론.',
        defense: '실패 테스트·최소 구현·개선의 짧은 주기를 반복해 요구사항 명세화와 안전한 리팩토링을 동시에 달성'
    },
    {
        id: 120, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 3,
        title: '13. 계약 테스트', subtitle: 'Contract Test',
        diagram: '소비자 GET /users/1 ↔ 제공자 { id, name } | 상호작용 약속 호환성 검증',
        concept: '마이크로서비스 등에서 API 소비자(Consumer)와 제공자(Provider) 간 요청·응답 스키마 약속이 깨지지 않았는지 검증하는 테스트.',
        defense: '서비스 간 상호작용 약속의 호환성 검증 (전체 통합 환경 없이도 API 변경으로 인한 연동 장애를 조기 탐지)'
    },
    {
        id: 121, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 3,
        title: '14. 속성 기반 테스트', subtitle: 'Property-Based Testing',
        diagram: 'reverse(reverse(xs)) = xs | [] [1] [2, 7] 랜덤 | 일반 성질 선언 · 생성·축소',
        concept: '개별 예시 입력을 나열하는 대신 항상 성립해야 하는 불변 성질(Property)을 선언하면, 도구가 무작위 입력을 생성·축소(Shrinking)해 반례를 찾는 기법.',
        defense: '여러 생성 입력으로 일반 성질을 확인 (예상치 못한 엣지 케이스와 경계 조건을 자동으로 발견)'
    },
    {
        id: 122, category: 'testing', catName: '테스트',
        badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
        level: 3,
        title: '15. 부하 · 스트레스 테스트', subtitle: 'Load vs Stress Test',
        diagram: '목표 부하(Load) vs 한계 탐색(Stress) | 응답시간·오류율·자원 함께 측정',
        concept: '예상 트래픽(목표 부하)에서의 안정적 성능을 확인하는 부하 테스트와, 시스템이 무너지는 임계점(한계)을 탐색하는 스트레스 테스트.',
        defense: '예상 부하와 한계 탐색을 구분해 측정하며, 처리량뿐 아니라 응답시간(Latency)·오류율·CPU/메모리 자원을 함께 관찰'
    },

    // --- CI/CD & DevOps (15) ---
    {
        id: 123, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 1,
        title: '01. Git 브랜치 전략 (Git Flow vs Trunk-Based)', subtitle: 'Branching Strategy',
        diagram: 'Git Flow(장기 브랜치·릴리즈) vs Trunk-Based(짧은 PR·main 상시 배포)',
        concept: '팀의 배포 주기와 릴리즈 형태에 맞춰 코드 통합·검증·배포 브랜치 흐름을 정하는 협업 규칙.',
        defense: 'CI/CD 자동화가 성숙할수록 짧은 수명의 브랜치를 자주 병합하는 Trunk-Based 전략이 충돌과 배포 지연을 줄임'
    },
    {
        id: 124, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 1,
        title: '02. Docker 컨테이너와 이미지 레이어', subtitle: 'Container & Image Layers',
        diagram: 'Dockerfile 명령 → 읽기 전용 레이어 캐시 → 격리된 컨테이너 실행',
        concept: '애플리케이션과 실행 환경을 OS 커널을 공유하는 경량 컨테이너로 패키징해 어디서나 동일하게 실행하는 기술.',
        defense: '변경 빈도가 낮은 의존성 설치를 상위 레이어에 배치해 빌드 캐시를 극대화하고, 멀티 스테이지 빌드로 이미지 크기 최소화'
    },
    {
        id: 125, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 1,
        title: '03. CI (지속적 통합) 파이프라인', subtitle: 'Continuous Integration',
        diagram: 'Push / PR → Lint · Build · Test · 보안 스캔 → 자동 병합 게이트',
        concept: '코드 변경이 발생할 때마다 자동으로 빌드·정적 분석·테스트를 실행해 통합 결함을 조기에 발견하는 자동화 절차.',
        defense: '피드백 루프가 길어지지 않도록 빠른 단위·린트 검사를 앞단에 배치하고 실패 시 즉시 병합을 차단'
    },
    {
        id: 126, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 1,
        title: '04. 환경변수와 시크릿 관리', subtitle: 'Secrets & Config Management',
        diagram: '코드(Git)에서 비밀키 분리 → Vault / KMS / OIDC 동적 주입',
        concept: 'API 키, DB 비밀번호 등 민감 정보를 소스코드와 분리해 환경별 설정과 시크릿 저장소를 통해 안전하게 주입하는 원칙.',
        defense: '저장소에 .env나 키를 절대 커밋하지 않으며, CI/CD에서는 장기 정적 키 대신 OIDC 단기 토큰과 최소 권한 원칙 적용'
    },
    {
        id: 127, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 2,
        title: '05. CD와 무중단 배포 (Blue-Green · Canary)', subtitle: 'Continuous Deployment',
        diagram: 'Blue-Green(즉시 전환) | Canary(트래픽 5%→100% 점진 검증) | Rolling(순차 교체)',
        concept: '검증된 빌드를 운영 환경에 자동 반영하되, 사용자 요청 끊김 없이 새 버전을 전환하고 이상 시 즉시 되돌리는 배포 전략.',
        defense: 'Blue-Green은 빠른 롤백에 유리하나 자원이 2배 필요하고, Canary는 소수 트래픽으로 실제 지표 검증 후 점진 확대'
    },
    {
        id: 128, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 2,
        title: '06. 리버스 프록시와 API Gateway', subtitle: 'Reverse Proxy & API Gateway',
        diagram: 'Client → Gateway(TLS·인증·Rate Limit·라우팅) → 내부 마이크로서비스',
        concept: '클라이언트 앞단에서 요청을 받아 TLS 종료, 인증, 트래픽 제어, 경로 라우팅을 대신 처리하는 진입점 계층.',
        defense: '공통 관심사(인증·로깅·속도 제한)를 게이트웨이로 모아 백엔드 서비스의 중복과 외부 노출 면적을 줄임'
    },
    {
        id: 129, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 2,
        title: '07. 헬스체크 (Liveness vs Readiness Probe)', subtitle: 'Health Check Probes',
        diagram: 'Readiness(트래픽 수신 가능?) vs Liveness(프로세스 재시작 필요?)',
        concept: '오케스트레이터가 컨테이너의 정상 여부를 판단해 트래픽을 보낼지(Readiness), 재시작할지(Liveness) 결정하는 상태 점검.',
        defense: 'Readiness 실패는 로드밸런서에서 제외하고, Liveness에 외부 DB 장애를 묶으면 연쇄 재시작 장애가 발생하므로 분리 설계'
    },
    {
        id: 130, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 2,
        title: '08. 관찰 가능성 3대 축 (Logs · Metrics · Traces)', subtitle: 'Observability Pillars',
        diagram: 'Logs(개별 이벤트) + Metrics(시계열 수치) + Traces(분산 요청 추적)',
        concept: '시스템 외부에서 관측되는 데이터만으로 내부 상태와 장애 원인을 추론할 수 있도록 로그·메트릭·트레이스를 통합 수집하는 체계.',
        defense: 'Trace ID를 로그와 메트릭에 공통 연결(Correlation)하면 분산 환경에서 지연 병목 구간을 즉시 특정 가능'
    },
    {
        id: 131, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 2,
        title: '09. Feature Flag (기능 플래그)', subtitle: 'Feature Toggles & Progressive Delivery',
        diagram: '코드 배포(Deploy)와 기능 공개(Release) 분리 → 조건부 ON/OFF & 킬 스위치',
        concept: '코드 재배포 없이 설정 변경만으로 특정 기능의 활성화 대상과 비율을 동적으로 제어하는 기법.',
        defense: '배포 리스크를 낮추고 장애 시 1초 내 기능 차단이 가능하나, 사용이 끝난 오래된 플래그는 주기적으로 정리해 기술 부채 방지'
    },
    {
        id: 132, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 2,
        title: '10. 빌드 캐시와 아티팩트 불변성', subtitle: 'Build Cache & Immutable Artifacts',
        diagram: '1회 빌드 산출물(SHA 태그) → Dev → Staging → Prod 동일 아티팩트 승격',
        concept: '한 번 빌드·검증된 컨테이너 이미지나 패키지를 수정하지 않고 그대로 상위 환경으로 승격시켜 환경 간 차이를 없애는 원칙.',
        defense: '환경마다 소스를 다시 빌드하면 재현성이 깨지므로 latest 태그 대신 커밋 SHA/다이제스트 기반 불변 아티팩트 사용'
    },
    {
        id: 133, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 3,
        title: '11. Kubernetes 기본 구조 (Pod · Service · Ingress)', subtitle: 'Kubernetes Core Architecture',
        diagram: 'Ingress(외부 라우팅) → Service(고정 VIP) → Pod(컨테이너·오토스케일)',
        concept: '컨테이너의 배포·복구·확장을 선언적으로 관리하는 오케스트레이션 플랫폼의 핵심 리소스 계층.',
        defense: 'Pod는 언제든 재생성되는 일시적 단위이므로 고정 IP 대신 Service 추상화를 두고, requests/limits 자원 명세 필수'
    },
    {
        id: 134, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 3,
        title: '12. IaC (코드형 인프라)와 멱등성', subtitle: 'Infrastructure as Code',
        diagram: '선언적 코드(Terraform) → State 비교(Plan) → 멱등적 반영(Apply)',
        concept: '서버·네트워크·DB 등 인프라 구성을 수동 클릭이 아닌 버전 관리되는 선언적 코드로 정의·프로비저닝하는 방식.',
        defense: '같은 코드를 여러 번 실행해도 동일한 상태가 유지되는 멱등성과 원격 State 잠금(Lock)으로 구성 드리프트(Drift) 방지'
    },
    {
        id: 135, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 3,
        title: '13. GitOps (선언적 배포 동기화)', subtitle: 'GitOps Workflow',
        diagram: 'Git(Desired State) ↔ Pull 기반 에이전트(ArgoCD) ↔ 클러스터(Actual State)',
        concept: '인프라와 배포 상태의 단일 진실 공급원(SSOT)을 Git에 두고, 클러스터 내부 에이전트가 차이를 감지해 자동 동기화하는 운영 모델.',
        defense: 'CI 파이프라인에 운영 클러스터 관리자 키를 둘 필요가 없어 보안성이 높고, git revert만으로 선언적 롤백 가능'
    },
    {
        id: 136, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 3,
        title: '14. SLI · SLO · SLA와 에러 버짓', subtitle: 'Service Level Objectives',
        diagram: 'SLI(실제 지표 99.95%) ≥ SLO(내부 목표 99.9%) | 잔여 에러 버짓으로 배포 속도 조절',
        concept: '서비스 품질을 측정하는 지표(SLI), 내부 목표(SLO), 고객 계약(SLA)을 정의하고 허용 가능한 실패량(에러 버짓)을 관리하는 SRE 원칙.',
        defense: '100% 가용성은 비현실적이므로 에러 버짓이 남으면 신기능 출시를 가속하고, 소진되면 안정화 작업에 집중'
    },
    {
        id: 137, category: 'devops', catName: 'CI/CD·DevOps',
        badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        level: 3,
        title: '15. 블레임리스 포스트모템 (장애 회고)', subtitle: 'Blameless Postmortem',
        diagram: '개인 비난 금지 → 타임라인·근본 원인(5-Whys) → 재발 방지 시스템 액션',
        concept: '장애 발생 시 개인의 실수를 추궁하지 않고, 실수가 발생할 수밖에 없던 시스템·프로세스 결함을 찾아 개선하는 회고 문화.',
        defense: '비난이 없는 환경이어야 장애 정황이 투명하게 공유되며, 모든 후속 조치는 담당자와 기한이 있는 티켓으로 추적'
    },

    // --- AI, LLM & Agent Engineering (15) ---
    {
        id: 138, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 1,
        title: '01. LLM 동작 원리 (토큰 · 컨텍스트 · Temperature)', subtitle: 'Tokens, Context Window & Sampling',
        diagram: '입력 토큰 → Context Window(기억 한계) → 다음 토큰 확률 예측(Temperature 조절)',
        concept: '대규모 언어 모델(LLM)이 텍스트를 토큰 단위로 쪼개어 컨텍스트 윈도우 안에서 다음 토큰의 확률 분포를 예측해 생성하는 원리.',
        defense: '코드·데이터 추출 등 정확성이 중요하면 Temperature를 낮추고(0~0.2), 컨텍스트 길이가 길어질수록 비용·지연·주의력 저하 고려'
    },
    {
        id: 139, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 1,
        title: '02. 프롬프트 엔지니어링 (System · Few-Shot · CoT)', subtitle: 'Prompt Engineering Fundamentals',
        diagram: '역할·제약(System) + 입출력 예시(Few-Shot) + 단계별 추론(CoT) → 일관된 품질',
        concept: '모델의 역할, 출력 형식, 제약 조건과 예시를 명확히 구조화해 원하는 정확도와 톤의 응답을 이끌어내는 기법.',
        defense: '모호한 지시 대신 구체적 제약과 반례·예시(Few-Shot)를 제공하고, 복잡한 판단은 단계별 사고 과정을 명시해 오류율 감소'
    },
    {
        id: 140, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 1,
        title: '03. AI 코딩 어시스턴트 실무 워크플로우', subtitle: 'AI-Assisted Coding Workflow',
        diagram: '명확한 스펙·관련 파일 컨텍스트 제공 → 작은 단위 생성 → 테스트·직접 리뷰',
        concept: 'AI를 활용해 코드를 작성할 때 정확한 맥락을 전달하고, 생성된 코드를 자동 테스트와 인간 리뷰로 검증하는 개발 습관.',
        defense: '한 번에 거대한 코드를 맡기기보다 작은 단위로 나누어 생성하고, 보안·엣지 케이스·의존성 존재 여부를 반드시 직접 검증'
    },
    {
        id: 141, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 1,
        title: '04. 구조화 출력 (Structured Output · JSON Schema)', subtitle: 'Deterministic JSON Output',
        diagram: '자유 텍스트(파싱 취약) vs JSON Schema 강제(타입 안전한 앱 연동)',
        concept: 'LLM 응답을 자유 문장이 아닌 사전 정의된 JSON Schema 형식으로 강제하여 백엔드·프론트엔드 코드가 안정적으로 파싱하도록 하는 기술.',
        defense: '프롬프트로만 "JSON으로 줘"라고 요청하면 마크다운 백틱 등이 섞여 깨지므로 API의 Schema 제약과 런타임 검증(Zod 등) 병행'
    },
    {
        id: 142, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 2,
        title: '05. 임베딩과 벡터 검색 (Vector Search)', subtitle: 'Embeddings & Similarity Search',
        diagram: '문서 청크 → 임베딩 벡터(고차원 좌표) → 코사인 유사도 + 키워드 하이브리드 검색',
        concept: '텍스트의 의미를 수치 벡터로 변환해 단어가 달라도 문맥적 의미가 가까운 문서를 찾아내는 시맨틱 검색 기반 기술.',
        defense: '고유명사·에러 코드·정확한 식별자 검색은 벡터 검색만으로는 약하므로 BM25 키워드 검색과 결합한 하이브리드 검색 + 리랭킹 권장'
    },
    {
        id: 143, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 2,
        title: '06. RAG (검색 증강 생성)', subtitle: 'Retrieval-Augmented Generation',
        diagram: '질문 → 사내 DB·문서 검색(Retrieve) → 근거 문맥 주입 → 최신·사실 기반 답변 생성',
        concept: '모델 학습 데이터에 없는 최신 정보나 사내 비공개 문서를 외부 저장소에서 검색해 프롬프트에 함께 넣어 답변하게 하는 아키텍처.',
        defense: '청크 크기·오버랩 전략과 검색 정확도가 전체 품질의 80%를 좌우하며, 답변에 출처(Citation)를 함께 반환하도록 설계'
    },
    {
        id: 144, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 2,
        title: '07. Function Calling과 Tool Use', subtitle: 'LLM Tool Invocation',
        diagram: 'LLM이 도구 이름·인자 JSON 생성 → 앱이 실제 함수 실행 → 결과를 LLM에 재전달',
        concept: 'LLM이 텍스트만 생성하는 한계를 넘어 DB 조회, API 호출, 계산 등 외부 도구의 호출 스펙을 결정하고 결과를 받아 후속 추론을 이어가는 구조.',
        defense: 'LLM이 직접 코드를 실행하는 것이 아니라 호출 의도만 반환하므로, 실제 실행 전 서버 측 권한·인자 유효성 검증 필수'
    },
    {
        id: 145, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 2,
        title: '08. 할루시네이션(환각) 방지와 그라운딩', subtitle: 'Grounding & Hallucination Mitigation',
        diagram: '확인된 근거(Grounding) 강제 + 모를 땐 "모른다" 허용 + 검증 루프',
        concept: '모델이 사실이 아닌 내용을 그럴듯하게 지어내는 현상을 줄이기 위해 검색된 근거에만 기반해 답하도록 제약하는 설계.',
        defense: '근거가 없을 때 억지로 답하지 않도록 거부 경로를 명시하고, 코드·사실 주장은 컴파일러/테스트/검색으로 교차 검증'
    },
    {
        id: 146, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 2,
        title: '09. 프롬프트 인젝션과 AI 가드레일', subtitle: 'Prompt Injection & Guardrails',
        diagram: '악의적 입력("시스템 지시 무시해") → 입력/출력 가드레일 + 최소 권한 도구 격리',
        concept: '사용자 입력이나 외부 문서에 숨겨진 명령으로 시스템 프롬프트 탈취·무단 도구 실행을 유도하는 공격과 이를 막는 방어 계층.',
        defense: '시스템 지시와 비신뢰 데이터를 분리하고, 민감 정보(PII) 마스킹·위험 도구 실행 제한 등 다층 가드레일 구축'
    },
    {
        id: 147, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 2,
        title: '10. LLM 지연·비용 최적화 (TTFT · 캐싱 · 라우팅)', subtitle: 'Latency, Caching & Model Routing',
        diagram: '단순 작업(경량 모델) / 복잡 추론(고성능 모델) + Prompt Caching + 스트리밍(TTFT)',
        concept: '첫 토큰 응답 시간(TTFT) 체감 개선을 위한 스트리밍, 반복 프리픽스 캐싱, 난이도별 모델 라우팅으로 비용과 속도를 최적화하는 전략.',
        defense: '모든 요청에 최고가 대형 모델을 쓰기보다 작업 난이도에 따라 소형·대형 모델을 분기하고 시맨틱/프리픽스 캐시 적극 활용'
    },
    {
        id: 148, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 3,
        title: '11. AI 에이전트 루프 (Plan · Act · Observe)', subtitle: 'Agentic Loop & ReAct',
        diagram: '목표 수립(Plan) → 도구 실행(Act) → 결과 관찰(Observe) → 반복/종료 조건',
        concept: '단일 질의응답을 넘어 모델이 스스로 계획을 세우고 도구를 실행하며 그 결과를 관찰해 목표 달성까지 반복 수행하는 자율 루프.',
        defense: '무한 루프와 토큰 폭증을 막기 위해 최대 스텝 수(max_steps), 타임아웃, 비용 상한 및 명확한 종료 조건을 반드시 설정'
    },
    {
        id: 149, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 3,
        title: '12. MCP (Model Context Protocol)', subtitle: 'Standardized Tool & Context Protocol',
        diagram: 'AI Host/Client ↔ 표준 프로토콜(MCP) ↔ 다양한 도구·DB·리소스 Server',
        concept: 'LLM 애플리케이션(Host)과 외부 데이터·도구(Server)를 N:M 커스텀 연동 없이 표준 인터페이스로 연결하는 개방형 프로토콜.',
        defense: '도구 스키마와 리소스를 표준화해 재사용성을 높이며, 외부 MCP 서버 연결 시 실행 권한과 입출력 검증 필수'
    },
    {
        id: 150, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 3,
        title: '13. AI 평가 체계 (Evals · Golden Set · Judge)', subtitle: 'LLM & Agent Evaluation',
        diagram: '골든 데이터셋(입력·기대) → 정량 지표 + LLM-as-a-Judge → 프롬프트 회귀 방지',
        concept: '비결정적인 LLM·에이전트 출력 품질을 느낌("Vibe check")이 아닌 자동화된 테스트셋과 채점 기준으로 정량 평가하는 체계.',
        defense: '프롬프트나 모델을 바꿀 때마다 Evals를 CI에서 회귀 테스트해 한 영역 개선 시 다른 영역 품질이 하락하는 현상 방지'
    },
    {
        id: 151, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 3,
        title: '14. 프롬프트 vs RAG vs 파인튜닝 선택 기준', subtitle: 'Adaptation Strategy Trade-offs',
        diagram: '지시·형식(프롬프트) → 최신·사내 지식(RAG) → 도메인 말투·특수 패턴(파인튜닝)',
        concept: '문제를 해결할 때 프롬프트 개선, 외부 지식 검색(RAG), 가중치 재학습(Fine-Tuning) 중 비용과 유지보수 관점에서 최적 수단을 고르는 기준.',
        defense: '프롬프트와 RAG로 80% 이상 해결 가능하므로 처음부터 파인튜닝에 투자하기보다 Evals로 병목을 확인한 뒤 단계적으로 도입'
    },
    {
        id: 152, category: 'ai-agent', catName: 'AI·LLM·에이전트',
        badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        level: 3,
        title: '15. 멀티 에이전트와 Human-in-the-Loop', subtitle: 'Multi-Agent & Safe Approval Gates',
        diagram: '역할 분담(탐색·구현·검증 에이전트) + 파괴적 작업 전 사용자 승인(HITL)',
        concept: '단일 에이전트에 모든 맥락을 몰아넣지 않고 전문 역할별로 분리 협업시키며, 고위험 작업 전 사람의 최종 승인을 거치는 안전 설계.',
        defense: 'DB 삭제·결제·운영 배포 등 되돌릴 수 없는 액션에는 반드시 Human-in-the-Loop 승인 게이트와 감사 로그를 적용'
    },

    // --- Java & Spring (15) ---
    {
        id: 153, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 1,
        title: '01. JVM 메모리 구조와 GC', subtitle: 'Heap · Stack · Metaspace & Stop-The-World',
        diagram: 'Stack(스레드별 프레임) | Heap(Young·Old 객체·GC 대상) | Metaspace(클래스 메타)',
        concept: 'JVM은 스레드별 Stack과 공유 Heap·Metaspace로 메모리를 관리하며, GC가 GC Root에서 도달할 수 없는(Unreachable) Heap 객체를 회수할 때 일시 정지(Stop-The-World)가 발생.',
        defense: '대용량 객체 무분별 적재나 메모리 누수는 Full GC·STW 급증으로 이어지므로 힙 크기와 GC 로그(G1GC/ZGC)를 모니터링'
    },
    {
        id: 154, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 1,
        title: '02. equals() · hashCode() 계약', subtitle: 'Equality & Hash Contract',
        diagram: 'a.equals(b) == true ➔ a.hashCode() == b.hashCode() (반드시 일치)',
        concept: 'HashMap·HashSet은 먼저 hashCode()로 버킷을 찾고 equals()로 동등성을 비교하므로, 두 메서드는 반드시 함께 재정의해야 함.',
        defense: 'equals()만 재정의하면 논리적으로 같은 객체를 HashMap에서 찾지 못하며, 가변 필드를 hashCode에 쓰면 저장 후 키가 유실됨'
    },
    {
        id: 155, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 1,
        title: '03. String 불변성과 StringBuilder', subtitle: 'Immutability & String Concatenation',
        diagram: '루프 내 str += x (매번 새 객체 O(N²)) vs StringBuilder.append() (가변 버퍼 O(N))',
        concept: 'Java의 String은 불변(Immutable) 객체이므로 반복문에서 + 연산을 누적하면 매번 새 배열을 복사해 메모리와 GC 부담이 급증.',
        defense: '반복적인 문자열 조합에는 StringBuilder(단일 스레드) 또는 String.join을 사용하고, 불변성 덕분에 String Pool 공유·스레드 안전성을 얻음'
    },
    {
        id: 156, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 1,
        title: '04. Spring Bean 스코프와 싱글톤', subtitle: 'Singleton Bean & Stateless Design',
        diagram: '@Service 싱글톤 인스턴스 1개 ← 다수 스레드 동시 접근 (공유 가변 필드 금지)',
        concept: 'Spring Bean의 기본 스코프는 컨테이너당 1개만 생성되는 Singleton이므로, 모든 HTTP 요청 스레드가 동일한 인스턴스를 공유.',
        defense: 'Controller·Service·Repository Bean에는 사용자별 상태(가변 필드)를 절대 저장하지 않고 무상태(Stateless)로 설계해야 동시성 오염 방지'
    },
    {
        id: 157, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 1,
        title: '05. 생성자 주입 vs 필드 주입', subtitle: 'Constructor Injection vs @Autowired Field',
        diagram: 'private final Repo repo; + 생성자 주입 (불변·순환참조 탐지·테스트 용이)',
        concept: '생성자 주입은 의존성을 final로 고정하고 객체 생성 시점에 누락·순환 참조를 즉시 발견할 수 있는 Spring 공식 권장 방식.',
        defense: '필드 주입(@Autowired)은 Spring 컨테이너 없이 순수 단위 테스트가 어렵고 final 불변성을 보장할 수 없으므로(구버전·설정 시 순환 참조 은닉) 생성자 주입을 기본으로 사용'
    },
    {
        id: 158, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '06. Spring MVC 요청 흐름 (Filter vs Interceptor)', subtitle: 'Servlet Filter → DispatcherServlet → Interceptor',
        diagram: 'HTTP 요청 ➔ Servlet Filter ➔ DispatcherServlet ➔ HandlerInterceptor ➔ Controller',
        concept: 'Filter는 서블릿 컨테이너 영역에서 인코딩·보안·로깅을 처리하고, Interceptor는 Spring MVC 영역에서 컨트롤러 핸들러 전후의 인증·공통 로직을 처리.',
        defense: '컨트롤러 핸들러 정보(@Annotation)·@ControllerAdvice 예외 처리 등 MVC 컨텍스트가 필요하면 Interceptor, 전역 요청/응답 래핑·보안 필터링은 Filter에 배치'
    },
    {
        id: 159, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '07. Spring AOP 프록시와 Self-Invocation', subtitle: 'Proxy-based AOP & Internal Call Pitfall',
        diagram: '외부 호출 → 프록시(@Transactional 적용) | 내부 this.method() → 프록시 우회(미적용)',
        concept: 'Spring AOP는 대상 Bean을 감싼 프록시 객체를 통해 트랜잭션·캐시를 적용하므로, 같은 클래스 내부에서 this.method()를 직접 호출하면 AOP가 동작하지 않음.',
        defense: '@Transactional·@Async·@Cacheable 메서드는 별도 Bean으로 분리해 외부에서 프록시를 거쳐 호출되도록 설계'
    },
    {
        id: 160, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '08. @Transactional 전파와 롤백 규칙', subtitle: 'Propagation & Checked Exception Rollback',
        diagram: 'RuntimeException/Error(기본 롤백) | Checked Exception(기본 커밋 → rollbackFor 지정)',
        concept: 'Spring @Transactional은 기본적으로 Unchecked 예외(RuntimeException)만 롤백하며, 전파 속성(REQUIRED vs REQUIRES_NEW)에 따라 트랜잭션 경계가 달라짐.',
        defense: 'Checked 예외도 롤백하려면 rollbackFor = Exception.class를 명시하고, REQUIRES_NEW는 추가 DB 커넥션을 점유하므로 데드락·풀 고갈에 주의'
    },
    {
        id: 161, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '09. JPA 영속성 컨텍스트와 변경 감지', subtitle: 'Persistence Context & Dirty Checking',
        diagram: '엔티티 조회 → 1차 캐시·스냅샷 보관 → 필드 수정 → Flush 시점 자동 UPDATE',
        concept: '영속성 컨텍스트는 트랜잭션 내 엔티티를 1차 캐시로 관리하며, 커밋/Flush 시점에 최초 스냅샷과 비교해 변경이 감지되면 자동으로 UPDATE SQL을 실행(Dirty Checking, 기본은 전체 컬럼 갱신·필요 시 @DynamicUpdate).',
        defense: '읽기 전용 조회는 @Transactional(readOnly = true)를 지정해 스냅샷 복사와 변경 감지 비용을 생략하고 메모리 사용량을 절감'
    },
    {
        id: 162, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '10. JPA 지연 로딩(LAZY)과 프록시', subtitle: 'LAZY vs EAGER & LazyInitializationException',
        diagram: '@ManyToOne(fetch = FetchType.LAZY) 필수 — 기본 EAGER는 의도치 않은 JOIN·N+1 유발',
        concept: '연관 엔티티를 실제 사용하는 시점에 조회하는 지연 로딩(LAZY)은 프록시 객체를 반환하며, 영속성 컨텍스트 종료 후 접근하면 LazyInitializationException이 발생.',
        defense: '모든 연관관계는 FetchType.LAZY로 통일하고, 필요한 조회 화면에서만 Fetch Join·@EntityGraph·BatchSize로 한 번에 로딩'
    },
    {
        id: 163, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '11. OSIV (Open Session In View) 트레이드오프', subtitle: 'DB Connection Lifetime vs Lazy Loading',
        diagram: 'OSIV=true(응답 완료까지 커넥션 점유) vs OSIV=false(트랜잭션 종료 즉시 커넥션 반납)',
        concept: 'Spring Boot 기본값인 spring.jpa.open-in-view=true는 뷰 렌더링·컨트롤러 종료까지 영속성 컨텍스트와 DB 커넥션을 유지해 지연 로딩을 편하게 해줌.',
        defense: '트래픽이 높은 API 서버에서 외부 HTTP 호출 중 DB 커넥션이 묶여 풀이 고갈되므로, 운영 환경에서는 OSIV=false + 트랜잭션 내 DTO 변환 권장'
    },
    {
        id: 164, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 3,
        title: '12. HikariCP 커넥션 풀 사이징', subtitle: 'Connection Pool Tuning & Contention',
        diagram: '권장 풀 크기 ≈ (DB CPU 코어 × 2) + 유효 디스크(HDD 기준·다중 앱 합산 · SSD는 실측 튜닝)',
        concept: 'DB 커넥션 풀은 미리 열어둔 연결을 재사용해 핸드셰이크 비용을 줄이지만, 풀을 과도하게 키우면 DB CPU 경합과 메모리 낭비로 처리량이 오히려 하락.',
        defense: '풀 크기 확대보다 느린 쿼리·트랜잭션 내 외부 API 호출 제거가 우선이며, connectionTimeout과 leakDetectionThreshold로 점유 누수를 탐지'
    },
    {
        id: 165, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 3,
        title: '13. ThreadLocal과 스레드 풀 누수', subtitle: 'ThreadLocal Context Contamination',
        diagram: '요청 A: set(userA) → remove() 누락 → 스레드 풀 재사용 → 요청 B가 userA 조회!',
        concept: 'ThreadLocal은 스레드마다 독립된 변수를 저장하지만, Tomcat처럼 스레드 풀을 재사용하는 서버에서는 요청 종료 시 정리하지 않으면 다음 요청에 이전 데이터가 남음.',
        defense: 'ThreadLocal 사용 시 반드시 try-finally 블록이나 Filter/Interceptor 종료 시점에 ThreadLocal.remove()를 호출해 컨텍스트 오염과 메모리 누수 방지'
    },
    {
        id: 166, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 2,
        title: '14. Spring Security 필터 체인', subtitle: 'SecurityFilterChain & SecurityContextHolder',
        diagram: 'HTTP 요청 → DelegatingFilterProxy → SecurityFilterChain(인증·인가) → Controller',
        concept: 'Spring Security는 DispatcherServlet 앞단의 서블릿 필터 체인에서 인증(Authentication)과 인가(Authorization)를 처리하고 결과를 SecurityContextHolder에 보관.',
        defense: 'JWT 기반 무상태 API에서는 SessionCreationPolicy.STATELESS를 설정하고, 커스텀 인증 필터 순서와 예외 처리(401 vs 403)를 명확히 분리'
    },
    {
        id: 167, category: 'java-spring', catName: 'Java·Spring',
        badgeColor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
        level: 3,
        title: '15. Java Virtual Threads (Project Loom)', subtitle: 'Lightweight Concurrency for I/O-bound Apps',
        diagram: '수만 개 Virtual Thread → 소수 Carrier OS Thread에 마운트 (I/O 대기 시 자동 언마운트)',
        concept: 'Java 21 정식 도입된 가상 스레드는 JVM이 스케줄링하는 초경량 스레드로, DB·HTTP 등 I/O 블로킹이 많은 서버에서 동기 코드 스타일로 높은 동시성을 달성.',
        defense: 'CPU 연산 위주 작업에는 이점이 없으며, JDK 21 환경에서는 synchronized 블록 내 블로킹 I/O 시 캐리어 스레드 피닝(Pinning)을 피하기 위해 ReentrantLock 사용 권장'
    }
];

// 하네스 표준 인포그래픽 UI 빌더 (DOM 기반 순수 코드 도식화)
const ui = {
    code: (txt, color='text-blue-300 border-blue-500/30') => 
        `<div class="bg-slate-900/95 border ${color} rounded-lg px-2.5 py-1 font-mono text-[11px] text-center shadow-sm">${txt}</div>`,
    flow: (steps) => 
        `<div class="flex flex-wrap items-center justify-center gap-1.5 w-full">${steps.join('<i class="fa-solid fa-arrow-right text-[10px] text-slate-500 mx-0.5"></i>')}</div>`,
    vflow: (steps) => 
        `<div class="flex flex-col items-center justify-center gap-1 w-full">${steps.join('<i class="fa-solid fa-arrow-down text-[10px] text-slate-500"></i>')}</div>`,
    rows: (list) => 
        `<div class="flex flex-col gap-1.5 w-full">${list.map(([k, v, badge]) => `
            <div class="flex items-center justify-between bg-slate-900/80 border border-slate-800/90 rounded-lg px-2.5 py-1 text-[11px]">
                <span class="font-mono text-slate-300 truncate mr-2">${k}</span>
                <span class="${badge || 'badge-info'} shrink-0">${v}</span>
            </div>`).join('')}</div>`,
    vs: (h1, list1, c1, h2, list2, c2) => `
        <div class="grid grid-cols-2 gap-2 w-full text-[11px]">
            <div class="bg-slate-900/85 border ${c1} rounded-xl p-2 flex flex-col items-center justify-between">
                <div class="font-bold mb-1.5 text-center border-b border-slate-800 pb-1 w-full">${h1}</div>
                <div class="space-y-1 text-center w-full">${list1.map(x => `<div class="font-mono text-[10.5px] text-slate-300 bg-slate-950/70 rounded px-1.5 py-0.5">${x}</div>`).join('')}</div>
            </div>
            <div class="bg-slate-900/85 border ${c2} rounded-xl p-2 flex flex-col items-center justify-between">
                <div class="font-bold mb-1.5 text-center border-b border-slate-800 pb-1 w-full">${h2}</div>
                <div class="space-y-1 text-center w-full">${list2.map(x => `<div class="font-mono text-[10.5px] text-slate-300 bg-slate-950/70 rounded px-1.5 py-0.5">${x}</div>`).join('')}</div>
            </div>
        </div>`,
    tree: (root, left, right, caption='') => `
        <div class="flex flex-col items-center w-full py-1">
            <div class="node-pill border-emerald-500/50 text-emerald-300 font-bold">${root}</div>
            <div class="flex items-center justify-center gap-8 text-slate-500 text-[10px] my-0.5">
                <span>↙</span><span>↘</span>
            </div>
            <div class="flex items-center justify-center gap-4 w-full">
                <div class="node-pill text-[10.5px]">${left}</div>
                <div class="node-pill text-[10.5px]">${right}</div>
            </div>
            ${caption ? `<div class="text-[10px] text-slate-400 mt-1.5">${caption}</div>` : ''}
        </div>`
};

const INFOGRAPHIC_MAP = {
        // --- Web Security 1~15 ---
        1: ui.vflow([
            ui.code('&lt;script&gt;steal()&lt;/script&gt;', 'text-rose-300 border-rose-500/40'),
            ui.flow([`<span class="node-pill"><i class="fa-solid fa-database text-cyan-400 mr-1"></i>게시판 DB</span>`, `<span class="text-[10px] text-slate-400">그대로 출력</span>`, `<span class="badge-err"><i class="fa-solid fa-skull mr-1"></i>피해자 화면 실행</span>`])
        ]),
        2: ui.vflow([
            ui.code("Content-Security-Policy: script-src 'self'", 'text-cyan-300 border-cyan-500/30'),
            ui.rows([
                ['/app.js (동일 출처)', '허용', 'badge-ok'],
                ['evil.com/x.js (외부)', '차단', 'badge-err'],
                ['인라인 &lt;script&gt;', '차단 (nonce 예외)', 'badge-err']
            ])
        ]),
        3: ui.vflow([
            ui.code('Set-Cookie: sid=abc; HttpOnly; Secure', 'text-indigo-300 border-indigo-500/30'),
            ui.rows([
                ['document.cookie 접근', 'sid 안 보임', 'badge-ok'],
                ['http:// 평문 요청', '쿠키 안 보냄', 'badge-warn'],
                ['https:// 암호화 요청', '쿠키 안전 전송', 'badge-info']
            ])
        ]),
        4: ui.vflow([
            ui.flow([`<span class="node-pill border-rose-500/40 text-rose-300">evil.com</span>`, `<span class="text-[10px] text-slate-400">교차 요청 + 쿠키?</span>`, `<span class="node-pill border-cyan-500/40 text-cyan-300">bank.com</span>`]),
            ui.rows([
                ['Strict', '교차 사이트엔 안 보냄', 'badge-ok'],
                ['Lax', '최상위 GET 이동만 전송', 'badge-info'],
                ['None', '교차도 전송 · Secure 필수', 'badge-err']
            ])
        ]),
        5: ui.vs(
            '<span class="text-rose-400">문자열 결합 (취약)</span>', ['"...id=" + input', 'id=1 OR 1=1', '조건문 구조 변조됨'], 'border-rose-500/30',
            '<span class="text-emerald-400">Prepared 바인딩</span>', ['WHERE id = ?', '[ "1 OR 1=1" ]', '값 하나로 안전 비교'], 'border-emerald-500/30'
        ),
        6: ui.vflow([
            ui.code('기준: https://a.com:443 (스킴·호스트·포트)', 'text-cyan-300 border-cyan-500/30'),
            ui.rows([
                ['https://a.com/x', '같은 출처', 'badge-ok'],
                ['http://a.com', '스킴 다름 (차단)', 'badge-err'],
                ['https://api.a.com:8443', '호스트·포트 다름', 'badge-err']
            ])
        ]),
        7: ui.vflow([
            ui.flow([`<span class="node-pill">https://a.com</span>`, `<span class="badge-info">1. OPTIONS 사전요청</span>`, `<span class="node-pill">api.b.com</span>`]),
            ui.code('2. Access-Control-Allow-Origin: https://a.com', 'text-emerald-300 border-emerald-500/30'),
            `<span class="badge-ok">3. PUT /items 본 요청 & 응답 읽기 허용</span>`
        ]),
        8: ui.vs(
            '<span class="text-cyan-300">인증서 서명 체인</span>', ['루트 CA (OS 신뢰)', '↓ 서명', '중간 CA → a.com 인증서'], 'border-cyan-500/30',
            '<span class="text-emerald-300">브라우저 3대 검사</span>', ['✓ 도메인 일치 여부', '✓ 인증서 유효 기간', '✓ 상위 CA 서명 체인'], 'border-emerald-500/30'
        ),
        9: ui.vflow([
            ui.code('Strict-Transport-Security: max-age=31536000', 'text-rose-300 border-rose-500/30'),
            ui.flow([`<span class="node-pill">http:// 입력</span>`, `<span class="badge-ok">브라우저 내부 강제 전환</span>`, `<span class="node-pill border-emerald-500/40 text-emerald-300">https:// 접속</span>`]),
            `<span class="text-[10px] text-slate-400">첫 방문 전 공백은 HSTS preload 목록으로 방어</span>`
        ]),
        10: ui.vflow([
            `<div class="relative border border-amber-500/40 bg-amber-950/20 rounded-xl px-4 py-2 text-center w-full">
                <div class="text-[10px] text-amber-300 mb-1">공격 페이지 위 <strong>투명 iframe</strong> 겹침</div>
                <div class="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/50 px-3 py-1 rounded-lg text-xs font-bold text-amber-200">
                    🎁 경품 받기 클릭 <i class="fa-solid fa-arrow-pointer text-white"></i> <span class="badge-err">실제론 송금 버튼</span>
                </div>
            </div>`,
            ui.code("방어: frame-ancestors 'none' | X-Frame-Options: DENY", 'text-slate-300 border-slate-700')
        ]),
        11: ui.vflow([
            ui.code('url=http://169.254.169.254/ (공격자 입력)', 'text-rose-300 border-rose-500/40'),
            ui.flow([`<span class="node-pill">외부 웹 서버</span>`, `<span class="badge-warn">대신 내부 요청</span>`, `<span class="badge-err">클라우드 메타데이터 / 내부 API</span>`])
        ]),
        12: ui.vflow([
            ui.code('?file=../../etc/passwd', 'text-amber-300 border-amber-500/40'),
            ui.vs(
                '<span class="text-emerald-400">허용 폴더</span>', ['/var/www/files', '정상 리소스 경로'], 'border-emerald-500/30',
                '<span class="text-rose-400">상위 경로 탈출</span>', ['/etc/passwd', '폴더 밖 시스템 파일'], 'border-rose-500/30'
            )
        ]),
        13: ui.vflow([
            `<div class="text-[11px] text-cyan-300 font-semibold">현재 로그인 세션: <span class="node-pill">사용자 A</span></div>`,
            ui.rows([
                ['GET /orders/1001 (본인 주문)', '200 OK', 'badge-ok'],
                ['GET /orders/1002 (타인 주문)', '403 권한 거부', 'badge-err']
            ]),
            `<span class="text-[10px] text-slate-400">1002의 실제 소유주가 A인지 서버가 매 요청 검증</span>`
        ]),
        14: ui.vflow([
            `<div class="flex items-center gap-1 justify-center">
                <span class="badge-err">#1</span><span class="badge-err">#2</span><span class="badge-err">#3</span><span class="badge-err">#4</span><span class="badge-err">#5</span>
                <span class="text-[11px] text-slate-400 ml-1">연속 실패</span>
            </div>`,
            ui.flow([`<span class="badge-warn"><i class="fa-solid fa-lock mr-1"></i>잠시 차단 · 지연</span>`, `<span class="badge-ok">MFA · 유출 비번 차단</span>`])
        ]),
        15: ui.vflow([
            ui.flow([`<span class="badge-amber badge-warn">대칭키</span>`, `<span class="node-pill">평문</span>`, `<span class="text-[10px] text-amber-300">키 K</span>`, `<span class="node-pill">암호문</span>`, `<span class="text-[10px] text-amber-300">키 K</span>`, `<span class="node-pill">평문</span>`]),
            ui.flow([`<span class="badge-info">비대칭</span>`, `<span class="node-pill">평문</span>`, `<span class="text-[10px] text-cyan-300">공개키</span>`, `<span class="node-pill">암호문</span>`, `<span class="text-[10px] text-rose-300">개인키</span>`, `<span class="node-pill">평문</span>`])
        ]),
        106: ui.vflow([
            ui.flow([`<span class="node-pill border-rose-500/40 text-rose-300">악성 페이지 열람</span>`, `<span class="text-[10px] text-slate-400">쿠키 자동 첨부</span>`, `<span class="badge-err">bank.com 위조 요청</span>`]),
            `<span class="badge-ok">방어: CSRF Token 검증 + SameSite=Lax/Strict</span>`
        ]),
        107: ui.vs(
            '<span class="text-cyan-300">인증 (Authentication)</span>', ['당신은 누구인가?', 'ID/PW · 패스키 · 신원 확인'], 'border-cyan-500/30',
            '<span class="text-emerald-300">인가 (Authorization)</span>', ['어떤 권한이 있는가?', 'RBAC · OAuth 2.0 Scope'], 'border-emerald-500/30'
        ),

        // --- Database 16~30 ---
        16: ui.vflow([
            ui.code('[ 직원 | 부서 | 부서전화 ] (직원 → 부서 → 부서전화)', 'text-cyan-300 border-cyan-500/30'),
            `<div class="text-[10px] text-slate-400">이행 함수 종속 분리 ↙ ↘</div>`,
            ui.flow([`<span class="badge-ok">[ 직원 · 부서 ]</span>`, `<span class="text-slate-500">+</span>`, `<span class="badge-ok">[ 부서 · 전화 ]</span>`])
        ]),
        17: ui.vflow([
            ui.flow([`<span class="node-pill">주문 테이블</span>`, `<span class="text-slate-500">+</span>`, `<span class="node-pill">고객 테이블</span>`]),
            `<div class="bg-emerald-950/30 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-center w-full">
                <div class="text-xs font-bold text-emerald-300">[ 주문 + 고객명 복사 ]</div>
                <div class="text-[10px] text-slate-300 mt-0.5">JOIN 감소(읽기 향상) ↔ 중복 갱신 비용 수용</div>
            </div>`
        ]),
        18: ui.tree('PK 분기 (InnoDB B+Tree)', 'PK 1 | 실제 행 데이터', 'PK 2 | 실제 행 데이터', '리프 노드에 행 데이터 직접 저장'),
        19: ui.vflow([
            ui.code('SELECT a, b FROM tbl WHERE a = 7', 'text-purple-300 border-purple-500/30'),
            ui.flow([
                `<span class="badge-ok"><i class="fa-solid fa-bolt mr-1"></i>인덱스 (a, b) 만으로 획득</span>`,
                `<span class="badge-err line-through opacity-75">테이블 본체 접근 X</span>`
            ])
        ]),
        20: ui.vflow([
            `<div class="text-[10px] text-amber-300 font-mono">B-Tree(a, b) 사전식 정렬 순서</div>`,
            `<div class="grid grid-cols-2 gap-1.5 w-full text-[11px] font-mono">
                <div class="bg-amber-500/15 border border-amber-500/40 rounded px-2 py-0.5 text-amber-200 text-center">a=1 | b=10 (탐색)</div>
                <div class="bg-amber-500/15 border border-amber-500/40 rounded px-2 py-0.5 text-amber-200 text-center">a=1 | b=20 (탐색)</div>
                <div class="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-500 text-center">a=2 | b=10</div>
                <div class="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-500 text-center">a=2 | b=30</div>
            </div>`,
            `<span class="text-[10px] text-slate-400">선두 열(a) 조건이 탐색 범위 축소에 핵심</span>`
        ]),
        21: ui.vflow([
            ui.flow([
                `<span class="node-pill border-cyan-500/40 text-cyan-300">주문 목록 1회 조회</span>`,
                `<div class="flex flex-col gap-1">
                    <span class="badge-err text-[10px]">→ 고객 1 조회</span>
                    <span class="badge-err text-[10px]">→ 고객 2 조회 ... (N회)</span>
                </div>`
            ]),
            `<span class="badge-ok">대안: JOIN (Fetch Join) 또는 배치 조회 (IN절)</span>`
        ]),
        22: ui.vflow([
            ui.code('UPDATE ... SET version=4 WHERE id=1 AND version=3', 'text-emerald-300 border-emerald-500/30'),
            ui.flow([
                `<span class="badge-ok">1행 반영 → 버전 4 성공</span>`,
                `<span class="badge-err">0행 반영 → 버전 충돌 감지!</span>`
            ])
        ]),
        23: ui.vflow([
            ui.code('SELECT ... FOR UPDATE', 'text-purple-300 border-purple-500/40'),
            ui.flow([
                `<span class="badge-ok">T1 트랜잭션</span>`,
                `<span class="node-pill border-amber-500/50 text-amber-300"><i class="fa-solid fa-lock mr-1"></i>Row Lock 선점</span>`,
                `<span class="badge-err">✕ T2 충돌 락 요청 대기</span>`
            ])
        ]),
        24: ui.vflow([
            `<div class="text-[10px] text-slate-400">한 행의 여러 버전 체인 (Undo Log)</div>`,
            ui.flow([`<span class="node-pill">v1</span>`, `<span class="node-pill">v2</span>`, `<span class="node-pill border-pink-500/40 text-pink-300">v3 (최신)</span>`]),
            ui.flow([`<span class="badge-info">스냅샷 A → v1 읽음</span>`, `<span class="badge-ok">스냅샷 B → v3 읽음</span>`])
        ]),
        25: ui.vflow([
            ui.flow([
                `<span class="node-pill">주문 [o1 | 고객 7]</span>`,
                `<span class="text-amber-400 font-bold text-xs">⋈</span>`,
                `<span class="node-pill">고객 [7 | Kim]</span>`
            ]),
            `<span class="badge-ok">INNER JOIN 결과: [ o1 | 7 | Kim ]</span>`
        ]),
        26: ui.vflow([
            ui.flow([
                `<div class="flex gap-1"><span class="node-pill">A</span><span class="node-pill">B</span><span class="node-pill">A</span><span class="node-pill">A</span></div>`,
                `<div class="flex flex-col gap-1">
                    <span class="badge-info">A 그룹 · 3건</span>
                    <span class="badge-ok">B 그룹 · 1건</span>
                </div>`
            ]),
            `<span class="text-[10px] text-slate-400 font-mono">GROUP BY key, COUNT(*)</span>`
        ]),
        27: ui.vs(
            '<span class="text-emerald-400">SQL (관계형)</span>', ['정형 테이블 격자 (행·열)', '엄격한 스키마 & JOIN'], 'border-emerald-500/30',
            '<span class="text-cyan-400">NoSQL (비관계형)</span>', ['문서 { ... } / 키 → 값', '그래프 (노드 ↔ 관계)'], 'border-cyan-500/30'
        ),
        28: ui.vflow([
            ui.flow([
                `<span class="node-pill">변경 발생</span>`,
                `<span class="badge-ok">1. WAL 로그 먼저 영속화</span>`,
                `<span class="badge-info">2. 이후 디스크 페이지 반영</span>`
            ]),
            `<span class="text-[10px] text-slate-400">장애 복구 시 WAL 로그를 재적용(Redo)하여 복구</span>`
        ]),
        29: ui.vflow([
            ui.code('WHERE score >= 80', 'text-pink-300 border-pink-500/30'),
            ui.flow([
                `<span class="badge-info">첫 조회: 3행 ■■■</span>`,
                `<span class="badge-warn">+ 다른 Tx가 INSERT</span>`,
                `<span class="badge-err">재조회: 4행 ■■■■ (유령행)</span>`
            ])
        ]),
        30: ui.tree('주문 테이블 (날짜 파티션 키)', '2024 파티션', '2025 탐색 (Pruning) | 2026', '2025 조건 시 해당 파티션만 탐색'),

        // --- Data Structure 31~45 ---
        31: ui.vs(
            '<span class="text-cyan-400">배열 (Array)</span>', ['인덱스 O(1) 즉시 접근', '연속된 메모리 주소'], 'border-cyan-500/30',
            '<span class="text-purple-400">연결 리스트</span>', ['탐색 최악 O(n) 순회', '노드 포인터 연결 수정 O(1)'], 'border-purple-500/30'
        ),
        32: ui.vflow([
            `<div class="flex items-center gap-3">
                <span class="badge-info">push ↘</span>
                <div class="flex flex-col border-x-2 border-b-2 border-emerald-500/50 rounded-b-lg px-4 py-1 bg-slate-900/90 text-center">
                    <span class="text-xs font-bold text-emerald-300 border-b border-slate-700 pb-0.5">B · top</span>
                    <span class="text-xs text-slate-400 pt-0.5">A</span>
                </div>
                <span class="badge-ok">↗ pop (B 먼저)</span>
            </div>`,
            `<span class="text-[10px] text-slate-400">LIFO (후입선출) · 삽입/삭제 O(1)</span>`
        ]),
        33: ui.vflow([
            ui.flow([
                `<span class="badge-ok">dequeue ⬅</span>`,
                `<div class="flex items-center gap-2 border-y-2 border-cyan-500/40 px-3 py-1 bg-slate-900/90 font-mono text-xs">
                    <span class="text-cyan-300 font-bold">A(앞)</span><span>·</span><span>B</span><span>·</span><span class="text-purple-300">C(뒤)</span>
                </div>`,
                `<span class="badge-info">⬅ enqueue</span>`
            ]),
            `<span class="text-[10px] text-slate-400">FIFO (선입선출) · A를 먼저 꺼냄 O(1)</span>`
        ]),
        34: ui.vflow([
            ui.flow([
                `<span class="badge-info">삽입·삭제 ⇄</span>`,
                `<div class="flex items-center gap-3 border border-pink-500/40 rounded-lg px-4 py-1 bg-slate-900 font-mono text-xs">
                    <span class="text-pink-300 font-bold">Front A</span><span>⇄</span><span class="text-pink-300 font-bold">B Rear</span>
                </div>`,
                `<span class="badge-info">⇄ 삽입·삭제</span>`
            ]),
            `<span class="text-[10px] text-slate-400">양방향 연결 + 양 끝 포인터 · 모두 최악 O(1)</span>`
        ]),
        35: ui.vflow([
            ui.flow([`<span class="node-pill">키(Key)</span>`, `<span class="node-pill border-amber-500/40 text-amber-300">해시 함수</span>`, `<span class="node-pill">저장 위치</span>`]),
            ui.flow([`<span class="badge-ok">평균 조회 O(1)</span>`, `<span class="badge-err">충돌 집중 시 최악 O(n)</span>`])
        ]),
        36: ui.vflow([
            `<div class="flex items-center gap-4">
                <span class="node-pill">키 A</span>
                <span class="text-xs text-rose-400">↘ 같은 해시 위치 ↙</span>
                <span class="node-pill">키 B</span>
            </div>`,
            `<span class="badge-warn">[ 버킷 2 충돌 ] → 체이닝(연결) vs 개방 주소법(빈 슬롯 탐사)</span>`
        ]),
        37: ui.tree('루트 [ 8 ]', '왼쪽 [ 3 ] (작은 키)', '오른쪽 [ 12 ] (큰 키)', '탐색 O(h) · 편향 트리 시 최악 O(n)'),
        38: ui.tree('균형 루트 [ 8 ]', '[ 3 ] 회전으로 균형', '[ 12 ] 높이 O(log n)', 'AVL · 레드블랙 트리: 최악 O(log n) 보장'),
        39: ui.tree('최소 힙 루트 [ 1 ]', '자식 [ 4 ]', '자식 [ 3 ]', '부모 ≤ 자식 유지 · 최솟값 확인 O(1) (형제 정렬 X)'),
        40: ui.vflow([
            ui.flow([
                `<span class="node-pill">입력: 5, 1, 3</span>`,
                `<span class="badge-ok">최우선 '1' 먼저 꺼냄</span>`,
                `<span class="badge-info">삽입·삭제 O(log n)</span>`
            ])
        ]),
        41: ui.tree("루트 [ c ] → [ a ]", "경로 [ t ] ('cat')", "경로 [ r ] ('car')", "접두사 'ca' 공유 · 문자열 길이 L 탐색 O(L)"),
        42: ui.vs(
            '<span class="text-emerald-400">인접 행렬</span>', ['0 1 1 / 1 0 0', '공간 복잡도 O(V²)'], 'border-emerald-500/30',
            '<span class="text-cyan-400">인접 리스트</span>', ['A → B, C | B → A', '공간 복잡도 O(V + E)'], 'border-cyan-500/30'
        ),
        43: ui.vs(
            '<span class="text-cyan-400">BFS (너비 우선)</span>', ['큐(Queue) 사용', '가까운 정점 · 최소 간선 경로'], 'border-cyan-500/30',
            '<span class="text-purple-400">DFS (깊이 우선)</span>', ['스택(Stack) · 재귀', '한 경로 끝까지 깊게 탐색'], 'border-purple-500/30'
        ),
        44: ui.vflow([
            ui.flow([`<span class="node-pill">대표 A</span>`, `<span class="text-[10px] text-pink-300">union(A,B) 연결</span>`, `<span class="node-pill border-pink-500/40 text-pink-300">대표 B</span>`]),
            ui.code('find(A) = find(B) → 랭크+경로압축 시 O(α(n))', 'text-pink-300 border-pink-500/30')
        ]),
        45: ui.vflow([
            ui.flow([
                `<span class="node-pill">3n + 2 → <strong class="text-amber-300">O(n)</strong></span>`,
                `<span class="node-pill">n² + n → <strong class="text-amber-300">O(n²)</strong></span>`
            ]),
            `<span class="text-[10px] text-slate-400">상수 배·작은 차수 생략 (빅오 = 점근적 상한)</span>`
        ]),

        // --- SQL Traps 46~60 ---
        46: ui.vs(
            '<span class="text-cyan-400">INNER JOIN</span>', ['1 | 1', '— (매칭 행만)'], 'border-cyan-500/30',
            '<span class="text-emerald-400">LEFT JOIN</span>', ['1 | 1', '2 | NULL (왼쪽 유지)'], 'border-emerald-500/30'
        ),
        47: ui.vs(
            '<span class="text-emerald-400">WHERE x > 1</span>', ['합계: 5', '행 1을 먼저 제외 후 집계'], 'border-emerald-500/30',
            '<span class="text-amber-400">HAVING SUM(x) > 1</span>', ['합계: 6', '전체 집계 후 그룹 필터'], 'border-amber-500/30'
        ),
        48: ui.vs(
            '<span class="text-purple-400">UNION (중복 제거)</span>', ['결과: 1, 2', '총 2행 반환'], 'border-purple-500/30',
            '<span class="text-cyan-400">UNION ALL (전체)</span>', ['결과: 1, 1, 1, 2', '총 4행 그대로 유지'], 'border-cyan-500/30'
        ),
        49: ui.rows([
            ['DELETE (WHERE 가능)', '조건 행만 삭제 (id=2 남음)', 'badge-info'],
            ['TRUNCATE', '전체 비우기 (빈 테이블)', 'badge-warn'],
            ['DROP TABLE', '테이블 구조 자체 제거', 'badge-err']
        ]),
        50: ui.vflow([
            `<div class="text-[10px] text-slate-400 font-mono">입력 행 v: [ 7, NULL, 7 ]</div>`,
            ui.vs(
                '<span class="text-amber-300">COUNT(*)</span>', ['결과: 3', 'NULL 포함 모든 행'], 'border-amber-500/30',
                '<span class="text-cyan-300">COUNT(v)</span>', ['결과: 2', 'NULL 제외한 행 수'], 'border-cyan-500/30'
            )
        ]),
        51: ui.vs(
            '<span class="text-rose-400">WHERE v = NULL</span>', ['평가: UNKNOWN', '0행 선택 (조회 실패)'], 'border-rose-500/30',
            '<span class="text-emerald-400">WHERE v IS NULL</span>', ['평가: TRUE', '1행 정상 선택'], 'border-emerald-500/30'
        ),
        52: ui.vflow([
            `<div class="text-[10px] text-slate-400">서브쿼리 S 결과가 [ NULL ] 한 행일 때</div>`,
            ui.vs(
                '<span class="text-amber-300">1 IN (S)</span>', ['UNKNOWN', '값 직접 비교 불명'], 'border-amber-500/30',
                '<span class="text-emerald-300">EXISTS (S)</span>', ['TRUE', '행 자체가 존재하므로'], 'border-emerald-500/30'
            )
        ]),
        53: ui.vflow([
            `<div class="text-[10px] text-slate-400 font-mono">x = 2, 서브쿼리 S = (1, NULL)</div>`,
            ui.vs(
                '<span class="text-rose-400">x NOT IN (S)</span>', ['결과: UNKNOWN', 'x=2 결과에서 누락됨!'], 'border-rose-500/30',
                '<span class="text-emerald-400">NOT EXISTS</span>', ['결과: TRUE', 'x=2 정상 선택됨'], 'border-emerald-500/30'
            )
        ]),
        54: ui.vs(
            '<span class="text-pink-300">CASE (x < 0 이면 0)</span>', ['x = -1 → 0', 'NULL → NULL'], 'border-pink-500/30',
            '<span class="text-cyan-300">COALESCE(x, 0)</span>', ['x = -1 → -1 (유지)', 'NULL → 0 (첫 비NULL)'], 'border-cyan-500/30'
        ),
        55: ui.vs(
            "<span class='text-emerald-400'>LIKE 'a%' (접두)</span>", ["매칭: 'ab'", 'B-Tree 접두 범위 탐색 O'], 'border-emerald-500/30',
            "<span class='text-rose-400'>LIKE '%a' (접미)</span>", ["매칭: 'ba', 'ca'", '선행 %로 접두 범위 불가'], 'border-rose-500/30'
        ),
        56: ui.vs(
            '<span class="text-amber-300">OFFSET 4</span>', ['앞 1..4행 읽고 건너뜀', '뒤로 갈수록 느려짐'], 'border-amber-500/30',
            '<span class="text-cyan-300">WHERE id > 4 (키셋)</span>', ['마지막 키 4 이후 바로 탐색', '대용량에서 일정한 속도'], 'border-cyan-500/30'
        ),
        57: ui.vs(
            '<span class="text-emerald-300">CHAR(3) 고정 길이</span>', ["저장: 'a··'", '남는 길이 공백 패딩'], 'border-emerald-500/30',
            '<span class="text-cyan-300">VARCHAR(3) 가변</span>', ["저장: 'a'", '공백 패딩 없음'], 'border-cyan-500/30'
        ),
        58: ui.vs(
            '<span class="text-indigo-300">PRIMARY KEY</span>', ['중복 불가 · NULL 불가', '테이블당 1개만 가능'], 'border-indigo-500/30',
            '<span class="text-cyan-300">UNIQUE 제약</span>', ['중복 불가 · NULL 허용', '테이블에 여러 개 가능'], 'border-cyan-500/30'
        ),
        59: ui.vflow([
            `<div class="text-[10px] text-slate-400 font-mono">점수: 90, 90, 80 (ORDER BY 점수 DESC)</div>`,
            ui.rows([
                ['ROW_NUMBER (고유 번호)', '1, 2, 3', 'badge-info'],
                ['RANK (공동 순위 건너뜀)', '1, 1, 3', 'badge-warn'],
                ['DENSE_RANK (빈틈 없음)', '1, 1, 2', 'badge-ok']
            ])
        ]),
        60: ui.vs(
            '<span class="text-amber-300">상관 서브쿼리</span>', ['A → 30, B → 5', '바깥 행 참조 (고객별 합계)'], 'border-amber-500/30',
            '<span class="text-cyan-300">비상관 서브쿼리</span>', ['A → 35, B → 35', '독립 실행 (전체 합계)'], 'border-cyan-500/30'
        ),

        // --- OS & Network & Infra 61~75 ---
        61: ui.vs(
            '<span class="text-amber-300">프로세스 (Process)</span>', ['Code · Data · Heap · Stack', '독립 메모리 · IPC 통신'], 'border-amber-500/30',
            '<span class="text-cyan-300">스레드 (Thread)</span>', ['Code · Data · Heap 공유', 'Stack만 독립 · 빠른 전환'], 'border-cyan-500/30'
        ),
        62: ui.vflow([
            `<div class="grid grid-cols-2 gap-1.5 w-full text-[10.5px]">
                <span class="badge-err text-center">1. 상호 배제 (Mutual Exclusion)</span>
                <span class="badge-err text-center">2. 점유 대기 (Hold & Wait)</span>
                <span class="badge-err text-center">3. 비선점 (No Preemption)</span>
                <span class="badge-err text-center">4. 순환 대기 (Circular Wait)</span>
            </div>`,
            `<span class="badge-ok">4가지 모두 성립해야 발생 → 1개만 끊어도 예방!</span>`
        ]),
        63: ui.vs(
            '<span class="text-purple-300">Blocking + Sync</span>', ['제어권 묶임 + 완료 대기', '구현 단순 · I/O 대기 낭비'], 'border-purple-500/30',
            '<span class="text-emerald-300">Non-Blocking + Async</span>', ['제어권 즉시 반환 + 이벤트 콜백', '고성능 서버 (Node · Netty)'], 'border-emerald-500/30'
        ),
        64: ui.vflow([
            ui.flow([
                `<span class="node-pill">가상 주소 (Page)</span>`,
                `<span class="badge-info">MMU · 페이지 테이블</span>`,
                `<span class="node-pill border-emerald-500/40 text-emerald-300">물리 메모리 (Frame)</span>`
            ]),
            `<span class="text-[10px] text-slate-400">미적재 페이지 접근 시 Page Fault → 디스크 스왑 인</span>`
        ]),
        65: ui.vs(
            '<span class="text-cyan-300">TCP (신뢰성 · 연결형)</span>', ['순서 보장 · 재전송 · 흐름제어', '웹 API · DB · 금융 거래'], 'border-cyan-500/30',
            '<span class="text-amber-300">UDP (초저지연 · 비연결)</span>', ['핸드셰이크 X · 최소 헤더', '실시간 스트리밍 · 게임 · QUIC'], 'border-amber-500/30'
        ),
        66: ui.vflow([
            ui.flow([`<span class="badge-info">연결(3-Way)</span>`, `<span class="node-pill">SYN</span>`, `<span class="node-pill">SYN+ACK</span>`, `<span class="node-pill">ACK</span>`]),
            ui.flow([`<span class="badge-warn">종료(4-Way)</span>`, `<span class="node-pill">FIN</span>`, `<span class="node-pill">ACK</span>`, `<span class="node-pill">FIN</span>`, `<span class="node-pill">ACK</span>`])
        ]),
        67: ui.vflow([
            ui.flow([
                `<span class="node-pill">HTTP/1.1<br><span class="text-[9px] text-rose-300">순차 처리</span></span>`,
                `<span class="node-pill border-cyan-500/40">HTTP/2<br><span class="text-[9px] text-cyan-300">멀티플렉싱</span></span>`,
                `<span class="node-pill border-emerald-500/40">HTTP/3<br><span class="text-[9px] text-emerald-300">UDP · QUIC</span></span>`
            ]),
            `<span class="text-[10px] text-slate-400">TCP 패킷 손실로 인한 전체 지연(HOL Blocking) 해소</span>`
        ]),
        68: ui.vflow([
            ui.flow([
                `<span class="node-pill">브라우저 캐시</span>`,
                `<span class="node-pill">Local DNS</span>`,
                `<span class="node-pill">Root → .com</span>`,
                `<span class="badge-ok">IP 반환</span>`
            ]),
            `<span class="text-[10px] text-slate-400">도메인 → IP 변환 (TTL 동안 캐싱으로 응답 가속)</span>`
        ]),
        69: ui.vs(
            '<span class="text-emerald-300">세션 (Stateful)</span>', ['서버 메모리/Redis 저장', '즉시 강제 로그아웃 가능'], 'border-emerald-500/30',
            '<span class="text-amber-300">JWT 토큰 (Stateless)</span>', ['서명 검증 · 별도 저장소 X', '수평 확장 유리 · 짧은 만료 필수'], 'border-amber-500/30'
        ),
        70: ui.vflow([
            ui.rows([
                ['GET · PUT · DELETE', '멱등성 O (서버 상태 동일)', 'badge-ok'],
                ['POST (결제 · 주문 생성)', '멱등성 X (재시도 시 중복 발생)', 'badge-err']
            ]),
            `<span class="text-[10px] text-slate-400">중복 방지: 헤더에 고유 Idempotency-Key 포함</span>`
        ]),
        71: ui.vflow([
            ui.flow([
                `<span class="node-pill">1. 앱 조회</span>`,
                `<span class="badge-ok">Cache Hit → 즉시 반환</span>`
            ]),
            ui.flow([
                `<span class="badge-warn">Cache Miss</span>`,
                `<span class="node-pill">2. DB 조회</span>`,
                `<span class="node-pill border-cyan-500/40 text-cyan-300">3. 캐시 적재</span>`
            ])
        ]),
        72: ui.vs(
            '<span class="text-cyan-300">L4 로드 밸런서</span>', ['IP · Port 기반 패킷 전달', '초고속 처리 · 내용 미확인'], 'border-cyan-500/30',
            '<span class="text-purple-300">L7 로드 밸런서</span>', ['URL · 헤더 · 쿠키 기반 분기', 'SSL 종료 · 경로별 라우팅'], 'border-purple-500/30'
        ),
        73: ui.vs(
            '<span class="text-amber-300">포워드 프록시</span>', ['클라이언트 앞단 위치', '클라이언트 IP 은닉 · 캐싱'], 'border-amber-500/30',
            '<span class="text-emerald-300">리버스 프록시 (Nginx)</span>', ['백엔드 서버 앞단 위치', '서버 IP 은닉 · 부하 분산·SSL'], 'border-emerald-500/30'
        ),
        74: ui.vs(
            '<span class="text-purple-300">Scale-Up (수직 확장)</span>', ['CPU · RAM 스펙 업그레이드', '구조 단순 · 단일 장애점(SPOF)'], 'border-purple-500/30',
            '<span class="text-cyan-300">Scale-Out (수평 확장)</span>', ['동일 서버 여러 대 증설', '무중단 확장 · Stateless 필수'], 'border-cyan-500/30'
        ),
        75: ui.vs(
            '<span class="text-slate-300">가상머신 (VM)</span>', ['Hypervisor + Guest OS 포함', '무겁고 부팅 수십 초 소요'], 'border-slate-600',
            '<span class="text-cyan-300">컨테이너 (Docker)</span>', ['Host OS 커널 공유 · 프로세스 격리', '초경량 · 1초 내 즉시 기동'], 'border-cyan-500/30'
        ),

        // --- Architecture & Clean Code 76~90 ---
        76: ui.vflow([
            `<div class="grid grid-cols-5 gap-1 w-full text-center font-mono text-[10.5px]">
                <div class="bg-indigo-500/20 border border-indigo-500/40 rounded py-1 text-indigo-200 font-bold">S<br><span class="text-[9px] font-normal">단일책임</span></div>
                <div class="bg-indigo-500/20 border border-indigo-500/40 rounded py-1 text-indigo-200 font-bold">O<br><span class="text-[9px] font-normal">개방폐쇄</span></div>
                <div class="bg-indigo-500/20 border border-indigo-500/40 rounded py-1 text-indigo-200 font-bold">L<br><span class="text-[9px] font-normal">리스코프</span></div>
                <div class="bg-indigo-500/20 border border-indigo-500/40 rounded py-1 text-indigo-200 font-bold">I<br><span class="text-[9px] font-normal">인터페이스</span></div>
                <div class="bg-indigo-500/20 border border-indigo-500/40 rounded py-1 text-indigo-200 font-bold">D<br><span class="text-[9px] font-normal">의존역전</span></div>
            </div>`,
            `<span class="badge-ok">핵심: 추상화에 의존해 수정 없이 기능 확장 (OCP)</span>`
        ]),
        77: ui.vflow([
            ui.flow([
                `<span class="node-pill">Service</span>`,
                `<span class="text-[10px] text-slate-400">의존</span>`,
                `<span class="node-pill border-cyan-500/40 text-cyan-300">Repository (Interface)</span>`
            ]),
            `<span class="badge-info">외부 IoC 컨테이너가 구현체(MySQL / Mock)를 런타임 주입</span>`
        ]),
        78: ui.vs(
            '<span class="text-emerald-300">높은 응집도 (Cohesion)</span>', ['관련 책임끼리 한 모듈에 집중', '변경 시 한 곳만 수정'], 'border-emerald-500/30',
            '<span class="text-cyan-300">낮은 결합도 (Coupling)</span>', ['모듈 간 최소 인터페이스만 노출', '사이드 이펙트 차단'], 'border-cyan-500/30'
        ),
        79: ui.vs(
            '<span class="text-rose-300">상속 (Is-A · 강한 결합)</span>', ['부모 내부 구현에 종속', '부모 변경 시 자식 파손 위험'], 'border-rose-500/30',
            '<span class="text-emerald-300">합성 (Has-A · 유연한 위임)</span>', ['인터페이스 필드로 포함·위임', '런타임 행동 교체 용이'], 'border-emerald-500/30'
        ),
        80: ui.rows([
            ['생성 패턴', 'Singleton · Factory · Builder', 'badge-info'],
            ['구조 패턴', 'Adapter · Proxy · Decorator', 'badge-warn'],
            ['행위 패턴', 'Strategy · Observer · Template', 'badge-ok']
        ]),
        81: ui.vflow([
            ui.flow([
                `<span class="node-pill">Web Adapter</span>`,
                `<span class="badge-ok">[ 핵심 도메인 · Port ]</span>`,
                `<span class="node-pill">DB Adapter</span>`
            ]),
            `<span class="text-[10px] text-slate-400">외부 인프라가 도메인 인터페이스(Port)에 의존하도록 역전</span>`
        ]),
        82: ui.vflow([
            `<div class="flex flex-col items-center gap-1 w-full text-[10.5px]">
                <div class="w-1/3 bg-rose-500/20 border border-rose-500/40 rounded text-center py-0.5 text-rose-200">E2E (소수 · 느림)</div>
                <div class="w-2/3 bg-amber-500/20 border border-amber-500/40 rounded text-center py-0.5 text-amber-200">통합 테스트 (DB · API 연동)</div>
                <div class="w-full bg-emerald-500/20 border border-emerald-500/40 rounded text-center py-0.5 text-emerald-200 font-bold">단위 테스트 (다수 · 초고속 격리 검증)</div>
            </div>`
        ]),
        83: ui.vs(
            '<span class="text-cyan-300">Stub (상태 검증)</span>', ['미리 준비된 가짜 응답 반환', '결과 상태(State)가 맞는지 확인'], 'border-cyan-500/30',
            '<span class="text-purple-300">Mock (행위 검증)</span>', ['메서드 호출 여부·횟수 기록', '올바른 상호작용(Behavior) 확인'], 'border-purple-500/30'
        ),
        84: ui.vs(
            '<span class="text-amber-300">모놀리식 (Monolithic)</span>', ['단일 코드베이스 · 단일 배포', '로컬 ACID 트랜잭션 용이'], 'border-amber-500/30',
            '<span class="text-cyan-300">마이크로서비스 (MSA)</span>', ['도메인별 독립 배포 · 장애 격리', '분산 통신 · 결과적 일관성'], 'border-cyan-500/30'
        ),
        85: ui.vflow([
            ui.flow([
                `<span class="node-pill">Producer</span>`,
                `<span class="node-pill border-amber-500/40 text-amber-300">Message Broker</span>`,
                `<span class="node-pill">Consumer</span>`
            ]),
            `<span class="badge-info">비동기 결합 · 트래픽 완충(Backpressure) · 멱등성 처리</span>`
        ]),
        86: ui.vflow([
            ui.flow([
                `<span class="badge-ok">1. 주문 생성</span>`,
                `<span class="badge-ok">2. 결제 승인</span>`,
                `<span class="badge-err">3. 재고 부족!</span>`
            ]),
            `<span class="badge-warn"><i class="fa-solid fa-rotate-left mr-1"></i>보상 트랜잭션 실행: 결제 취소 → 주문 취소</span>`
        ]),
        87: ui.vflow([
            ui.flow([
                `<span class="badge-ok">Closed (정상)</span>`,
                `<span class="badge-err">Open (오류 급증 · 즉시 차단)</span>`,
                `<span class="badge-warn">Half-Open (복구 확인)</span>`
            ]),
            `<span class="text-[10px] text-slate-400">외부 장애 시 빠른 실패(Fail-Fast)로 연쇄 장애 전파 차단</span>`
        ]),
        88: ui.vs(
            '<span class="text-cyan-300">Git Merge</span>', ['병합 커밋(Merge Commit) 생성', '브랜치 분기 이력 그대로 보존'], 'border-cyan-500/30',
            '<span class="text-purple-300">Git Rebase</span>', ['베이스 커밋을 최신으로 재배치', '한 줄의 깔끔한 선형 히스토리'], 'border-purple-500/30'
        ),
        89: ui.vflow([
            ui.flow([
                `<span class="node-pill">Push</span>`,
                `<span class="badge-info">CI (빌드·테스트)</span>`,
                `<span class="badge-ok">CD (Blue/Green·Canary 배포)</span>`
            ])
        ]),
        90: ui.rows([
            ['Logs (로그)', '개별 이벤트의 상세 텍스트/JSON 기록', 'badge-info'],
            ['Metrics (메트릭)', 'CPU · 응답시간 · 에러율 수치 집계', 'badge-warn'],
            ['Traces (분산 추적)', 'Trace-ID로 마이크로서비스 호출 경로 추적', 'badge-ok']
        ]),

        // --- Browser & Frontend 91~105 ---
        91: ui.vflow([
            ui.flow([
                `<span class="node-pill">DOM + CSSOM</span>`,
                `<span class="node-pill">Render Tree</span>`,
                `<span class="node-pill border-amber-500/40 text-amber-300">Layout</span>`,
                `<span class="node-pill border-cyan-500/40 text-cyan-300">Paint</span>`,
                `<span class="badge-ok">Composite</span>`
            ]),
            `<span class="text-[10px] text-slate-400">transform · opacity 애니메이션은 Layout/Paint 생략!</span>`
        ]),
        92: ui.vflow([
            ui.flow([
                `<span class="node-pill">Call Stack</span>`,
                `<span class="badge-ok">1. Microtask (Promise)</span>`,
                `<span class="badge-info">2. Render</span>`,
                `<span class="badge-warn">3. Macrotask (setTimeout)</span>`
            ])
        ]),
        93: ui.vflow([
            ui.code('function outer() { let count = 0; return () => ++count; }', 'text-sky-300 border-sky-500/30'),
            `<span class="badge-info">outer() 종료 후에도 내부 함수가 count 렉시컬 환경 기억</span>`
        ]),
        94: ui.vflow([
            ui.flow([
                `<span class="node-pill">1. 캡처링 (위→아래)</span>`,
                `<span class="badge-warn">2. Target</span>`,
                `<span class="badge-ok">3. 버블링 (아래→위)</span>`
            ]),
            `<span class="text-[10px] text-slate-400">버블링을 활용해 상위 부모 1곳에 이벤트 위임(Delegation)</span>`
        ]),
        95: ui.vs(
            '<span class="text-sky-300">디바운싱 (Debouncing)</span>', ['연속 호출 멈춘 뒤 마지막 1회', '검색 자동완성 · 입력 유효성'], 'border-sky-500/30',
            '<span class="text-emerald-300">스로틀링 (Throttling)</span>', ['일정 시간 간격마다 최대 1회', '무한 스크롤 · 윈도우 리사이즈'], 'border-emerald-500/30'
        ),
        96: ui.rows([
            ['Cookie (최대 4KB)', '만료일 지정 · HTTP 요청마다 자동 전송', 'badge-warn'],
            ['LocalStorage (~5MB)', '영구 보존 · 같은 출처 탭 간 공유', 'badge-ok'],
            ['SessionStorage (~5MB)', '브라우저 탭 닫으면 즉시 삭제', 'badge-info']
        ]),
        97: ui.vflow([
            ui.flow([
                `<span class="node-pill">max-age 유효</span>`,
                `<span class="badge-ok">200 (디스크/메모리 캐시 즉시 사용)</span>`
            ]),
            ui.flow([
                `<span class="badge-warn">만료 후 ETag 검증</span>`,
                `<span class="badge-info">변경 없으면 304 Not Modified 반환</span>`
            ])
        ]),
        98: ui.rows([
            ['CSR (Client)', '빈 HTML + JS 번들 실행 · 빠른 페이지 전환', 'badge-info'],
            ['SSR (Server)', '요청마다 서버에서 완성 HTML 생성 · SEO 유리', 'badge-warn'],
            ['SSG (Static)', '빌드 시 미리 HTML 생성 · CDN 초고속 서빙', 'badge-ok']
        ]),
        99: ui.vflow([
            ui.flow([
                `<span class="node-pill">새 Virtual DOM</span>`,
                `<span class="badge-info">Diffing 비교 (key 활용)</span>`,
                `<span class="badge-ok">변경 노드만 실제 DOM 일괄 패치</span>`
            ])
        ]),
        100: ui.rows([
            ['LCP (로딩 속도)', '가장 큰 콘텐츠 표시 시간 ≤ 2.5초', 'badge-ok'],
            ['INP (상호작용 반응)', '클릭·입력 후 다음 페인트 지연 ≤ 200ms', 'badge-info'],
            ['CLS (시각적 안정성)', '예기치 않은 레이아웃 밀림 ≤ 0.1', 'badge-warn']
        ]),
        101: ui.vs(
            '<span class="text-amber-300">&lt;script async&gt;</span>', ['HTML 파싱과 병렬 다운로드', '다운로드 끝나는 즉시 파싱 멈추고 실행'], 'border-amber-500/30',
            '<span class="text-emerald-300">&lt;script defer&gt;</span>', ['HTML 파싱과 병렬 다운로드', 'DOM 파싱 완료 후 작성 순서대로 실행'], 'border-emerald-500/30'
        ),
        102: ui.rows([
            ['Long Polling', '응답 올 때까지 HTTP 연결 대기 후 재요청', 'badge-warn'],
            ['SSE (EventSource)', 'HTTP 기반 서버 → 클라이언트 단방향 스트림', 'badge-info'],
            ['WebSocket (ws://)', '핸드셰이크 후 전이중(Full-Duplex) 양방향 통신', 'badge-ok']
        ]),
        103: ui.vflow([
            ui.flow([
                `<span class="node-pill">ES Modules (import)</span>`,
                `<span class="badge-warn">정적 의존성 분석</span>`,
                `<span class="badge-ok">미사용 코드 제거(Tree Shaking)</span>`
            ])
        ]),
        104: ui.vs(
            '<span class="text-rose-300">직접 변이 (Mutation)</span>', ['user.name = "Kim"', '참조 주소 동일 → 변경 감지 어려움'], 'border-rose-500/30',
            '<span class="text-emerald-300">불변성 유지 (Immutable)</span>', ['{ ...user, name: "Kim" }', '얕은 비교(===)로 즉시 리렌더링'], 'border-emerald-500/30'
        ),
        105: ui.vflow([
            ui.code('&lt;header&gt; &lt;nav&gt; &lt;main&gt; &lt;article&gt; &lt;button&gt;', 'text-emerald-300 border-emerald-500/30'),
            `<span class="badge-info">SEO 검색 최적화 + 스크린 리더 · 키보드 접근성(A11y) 보장</span>`
        ]),

        // --- Software Testing 108~122 ---
        108: ui.vflow([
            ui.tree('함수 f(x)', 'x = 2', '결과 4', '의존성은 필요할 때 대역 사용'),
            `<span class="badge-ok">작고 빠른 피드백</span>`
        ]),
        109: ui.vflow([
            ui.flow([
                `<span class="node-pill">모듈</span>`,
                `<span class="node-pill border-cyan-500/50 text-cyan-300">서비스</span>`,
                `<span class="node-pill border-emerald-500/50 text-emerald-300">DB</span>`
            ]),
            `<span class="badge-info">경계와 실제 연동 확인 · 환경 범위는 테스트마다 명시</span>`
        ]),
        110: ui.vflow([
            ui.flow([
                `<span class="node-pill">화면(UI)</span>`,
                `<span class="node-pill">API</span>`,
                `<span class="node-pill">DB</span>`
            ]),
            `<span class="text-[10.5px] font-mono text-slate-300">로그인 → 주문 → 완료</span>`,
            `<span class="badge-info">실제 경로에 가까운 흐름</span>`
        ]),
        111: ui.vflow([
            `<div class="flex flex-col items-center gap-1 w-full">
                <div class="w-16 text-center text-[10px] py-0.5 rounded bg-rose-500/15 border border-rose-500/40 text-rose-300">E2E</div>
                <div class="w-28 text-center text-[10px] py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-300">통합</div>
                <div class="w-44 text-center text-[10px] py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold">단위 · 많이</div>
            </div>`,
            `<span class="text-[10px] text-slate-400">조직 · 제품에 따라 비율은 조정</span>`
        ]),
        112: ui.vflow([
            ui.flow([
                `<span class="node-pill border-amber-500/40 text-amber-300">준비 (Arrange)</span>`,
                `<span class="node-pill border-blue-500/40 text-blue-300">실행 (Act)</span>`,
                `<span class="node-pill border-emerald-500/40 text-emerald-300">검증 (Assert)</span>`
            ]),
            `<span class="text-[10px] font-mono text-slate-400">given → when → then과 같은 역할</span>`
        ]),
        113: ui.vflow([
            ui.rows([
                ['Stub', '정해진 응답 반환', 'badge-info'],
                ['Mock', '호출 여부·인자 검증', 'badge-warn'],
                ['Fake', '동작하는 간소 구현', 'badge-ok']
            ]),
            `<span class="text-[10px] text-slate-400">용어 경계는 도구·문헌마다 차이</span>`
        ]),
        114: ui.vs(
            '<span class="text-emerald-300">상태 검증</span>', ['잔액 = 900', '최종 상태·반환값 확인'], 'border-emerald-500/30',
            '<span class="text-sky-300">행위 검증</span>', ['save 1회 호출', '협력 객체 호출 검증'], 'border-sky-500/30'
        ),
        115: ui.vflow([
            `<span class="text-[10.5px] text-slate-300">허용 범위 <span class="font-mono text-fuchsia-300">1 ··· 100</span></span>`,
            `<div class="flex items-center gap-1.5 font-mono text-[10.5px]">
                <span class="badge-err">0</span>
                <span class="badge-ok">1</span>
                <span class="node-pill">2</span>
                <span class="text-slate-500">···</span>
                <span class="node-pill">99</span>
                <span class="badge-ok">100</span>
                <span class="badge-err">101</span>
            </div>`,
            `<span class="text-[10px] text-slate-400">경계값과 바로 안팎 확인</span>`
        ]),
        116: ui.vflow([
            `<div class="grid grid-cols-8 gap-1">
                ${Array.from({ length: 16 }, (_, idx) => `<span class="w-4 h-4 rounded-sm border ${idx < 11 ? 'bg-fuchsia-500/40 border-fuchsia-400/60' : 'bg-slate-800 border-slate-700'}"></span>`).join('')}
            </div>`,
            `<span class="text-[11px] font-mono text-slate-200">실행됨 11 / 16</span>`,
            `<span class="badge-warn">라인·분기 기준 다름 · 품질 보장은 아님</span>`
        ]),
        117: ui.vflow([
            ui.flow([
                `<span class="node-pill">기존 기능</span>`,
                `<span class="node-pill border-amber-500/40 text-amber-300">변경</span>`
            ]),
            `<span class="badge-info">관련 테스트 재실행 → 의도치 않은 영향 탐지</span>`
        ]),
        118: ui.vflow([
            `<div class="flex items-center gap-1.5">
                <span class="badge-info">통과</span>
                <span class="badge-err">실패</span>
                <span class="badge-info">통과</span>
                <span class="badge-err">실패</span>
            </div>`,
            `<span class="text-[10.5px] text-slate-300">관련 변경 없이 결과가 흔들림</span>`,
            `<span class="badge-warn">시간 · 순서 · 외부 의존성 점검</span>`
        ]),
        119: ui.vflow([
            ui.flow([
                `<span class="badge-err">RED (실패)</span>`,
                `<span class="badge-ok">GREEN (최소 구현)</span>`,
                `<span class="badge-info">REFACTOR (개선)</span>`
            ]),
            `<span class="text-[10px] text-slate-400">실패 테스트 → 최소 구현 → 설계 개선 순환</span>`
        ]),
        120: ui.vflow([
            ui.flow([
                `<span class="node-pill">소비자</span>`,
                ui.code('GET /users/1 → { id, name }', 'text-fuchsia-300 border-fuchsia-500/30'),
                `<span class="node-pill">제공자</span>`
            ]),
            `<span class="badge-ok">소비자 · 제공자의 상호작용 약속 확인</span>`
        ]),
        121: ui.vflow([
            ui.code('reverse(reverse(xs)) = xs', 'text-fuchsia-300 border-fuchsia-500/30'),
            `<div class="flex items-center gap-1 font-mono text-[10px]">
                <span class="node-pill">[]</span>
                <span class="node-pill">[1]</span>
                <span class="node-pill">[2, 7]</span>
                <span class="badge-info">랜덤</span>
            </div>`,
            `<span class="text-[10px] text-slate-400">일반 성질 선언 · 도구가 입력 생성 및 축소</span>`
        ]),
        122: ui.vs(
            '<span class="text-emerald-300">부하 (Load)</span>', ['목표 부하 유지', '예상 트래픽 성능 검증'], 'border-emerald-500/30',
            '<span class="text-rose-300">스트레스 (Stress)</span>', ['한계점 탐색', '응답시간·오류율·자원 측정'], 'border-rose-500/30'
        ),

        // --- CI/CD & DevOps 123~137 ---
        123: ui.vs(
            '<span class="text-amber-300">Git Flow</span>', ['develop / release / hotfix', '정기 릴리즈·모바일 앱 적합'], 'border-amber-500/30',
            '<span class="text-emerald-300">Trunk-Based</span>', ['짧은 피처 PR → main 병합', 'CI/CD 상시 배포에 최적'], 'border-emerald-500/30'
        ),
        124: ui.vflow([
            ui.flow([
                `<span class="node-pill">Base OS Layer</span>`,
                `<span class="node-pill border-cyan-500/40 text-cyan-300">Deps (캐시)</span>`,
                `<span class="node-pill border-orange-500/40 text-orange-300">App Code</span>`
            ]),
            `<span class="badge-ok">멀티 스테이지 빌드 + 커널 공유 경량 격리</span>`
        ]),
        125: ui.vflow([
            ui.flow([
                `<span class="node-pill">PR / Push</span>`,
                `<span class="badge-info">Lint · Unit Test</span>`,
                `<span class="badge-warn">Build · 보안 스캔</span>`,
                `<span class="badge-ok">Merge Gate</span>`
            ]),
            `<span class="text-[10px] text-slate-400">빠른 검사를 앞단에 배치해 즉각 피드백</span>`
        ]),
        126: ui.vs(
            '<span class="text-rose-300">코드 하드코딩 (위험)</span>', ['.env 커밋 · 정적 장기 키', '유출 시 전체 서비스 침해'], 'border-rose-500/30',
            '<span class="text-emerald-300">시크릿 분리 (안전)</span>', ['Vault / KMS / OIDC 토큰', '최소 권한·주기적 로테이션'], 'border-emerald-500/30'
        ),
        127: ui.rows([
            ['Blue-Green', '대기 환경 전환 · 1초 롤백 가능', 'badge-info'],
            ['Canary', '5% → 25% → 100% 점진 트래픽 검증', 'badge-ok'],
            ['Rolling', '인스턴스 순차 교체 · 추가 자원 불필요', 'badge-warn']
        ]),
        128: ui.vflow([
            ui.flow([
                `<span class="node-pill">Client</span>`,
                ui.code('API Gateway (TLS · 인증 · Rate Limit)', 'text-orange-300 border-orange-500/30'),
                `<span class="node-pill">내부 서비스</span>`
            ]),
            `<span class="text-[10px] text-slate-400">공통 관심사 집중 처리 &amp; 내부 구조 은닉</span>`
        ]),
        129: ui.vs(
            '<span class="text-sky-300">Readiness Probe</span>', ['트래픽 받을 준비 완료?', '실패 시 로드밸런서 제외'], 'border-sky-500/30',
            '<span class="text-amber-300">Liveness Probe</span>', ['프로세스 교착 상태?', '실패 시 컨테이너 재시작'], 'border-amber-500/30'
        ),
        130: ui.rows([
            ['Logs', '특정 시점의 개별 이벤트·에러 기록', 'badge-info'],
            ['Metrics', 'CPU·RPS·지연시간 시계열 집계', 'badge-ok'],
            ['Traces', '마이크로서비스 간 요청 전체 경로 추적', 'badge-warn']
        ]),
        131: ui.vflow([
            ui.flow([
                `<span class="node-pill">코드 배포 (Deploy)</span>`,
                `<span class="badge-info">Feature Flag OFF → 10% → 100%</span>`
            ]),
            `<span class="badge-ok">배포와 기능 공개 분리 · 장애 시 즉시 Kill Switch</span>`
        ]),
        132: ui.vflow([
            ui.flow([
                `<span class="node-pill border-orange-500/40 text-orange-300">1회 빌드 (sha-a1b2)</span>`,
                `<span class="node-pill">Staging</span>`,
                `<span class="node-pill border-emerald-500/40 text-emerald-300">Production</span>`
            ]),
            `<span class="badge-info">재빌드 금지 · 동일 불변 아티팩트 승격</span>`
        ]),
        133: ui.vflow([
            ui.flow([
                `<span class="node-pill">Ingress (L7)</span>`,
                `<span class="node-pill border-cyan-500/40 text-cyan-300">Service (VIP)</span>`,
                `<span class="node-pill border-emerald-500/40 text-emerald-300">Pod × N</span>`
            ]),
            `<span class="text-[10px] text-slate-400">선언적 상태 유지 · 자가 치유(Self-Healing)</span>`
        ]),
        134: ui.vflow([
            ui.flow([
                `<span class="node-pill">코드 (HCL/YAML)</span>`,
                `<span class="badge-warn">Plan (변경 미리보기)</span>`,
                `<span class="badge-ok">Apply (멱등적 반영)</span>`
            ]),
            `<span class="text-[10px] text-slate-400">원격 State 잠금으로 구성 드리프트 방지</span>`
        ]),
        135: ui.vflow([
            ui.flow([
                `<span class="node-pill border-orange-500/40 text-orange-300">Git (Desired State)</span>`,
                `<span class="badge-info">Pull 에이전트 감지</span>`,
                `<span class="node-pill border-emerald-500/40 text-emerald-300">Cluster 동기화</span>`
            ]),
            `<span class="text-[10px] text-slate-400">SSOT 기반 감사 추적 &amp; git revert 롤백</span>`
        ]),
        136: ui.rows([
            ['SLI (측정 지표)', '실제 성공률 99.95% · P95 지연 180ms', 'badge-info'],
            ['SLO (내부 목표)', '가용성 99.9% 이상 유지', 'badge-ok'],
            ['Error Budget', '허용 실패량(0.1%)으로 배포·안정화 균형', 'badge-warn']
        ]),
        137: ui.vflow([
            ui.flow([
                `<span class="badge-err">개인 비난 금지</span>`,
                `<span class="badge-info">타임라인 · 5-Whys</span>`,
                `<span class="badge-ok">시스템 재발 방지 액션</span>`
            ]),
            `<span class="text-[10px] text-slate-400">투명한 장애 공유 문화가 복원력을 높임</span>`
        ]),

        // --- AI, LLM & Agent Engineering 138~152 ---
        138: ui.vflow([
            ui.flow([
                `<span class="node-pill">토큰화 (Tokens)</span>`,
                `<span class="node-pill border-teal-500/40 text-teal-300">Context Window</span>`,
                `<span class="badge-info">다음 토큰 예측</span>`
            ]),
            `<span class="text-[10px] text-slate-400">정확성 작업은 Temperature 낮게 (0~0.2)</span>`
        ]),
        139: ui.rows([
            ['System Prompt', '역할 · 출력 형식 · 절대 제약 정의', 'badge-info'],
            ['Few-Shot 예시', '원하는 입출력 패턴 2~3개 제시', 'badge-ok'],
            ['Chain-of-Thought', '단계별 추론 유도로 논리 오류 감소', 'badge-warn']
        ]),
        140: ui.vflow([
            ui.flow([
                `<span class="node-pill">명확한 맥락·스펙</span>`,
                `<span class="node-pill border-teal-500/40 text-teal-300">작은 단위 생성</span>`,
                `<span class="badge-ok">테스트 · 직접 리뷰</span>`
            ]),
            `<span class="badge-warn">보안 · 엣지 케이스 · 의존성 검증 필수</span>`
        ]),
        141: ui.vs(
            '<span class="text-rose-300">자유 텍스트 응답</span>', ['마크다운·설명 혼재', '정규식 파싱 쉽게 깨짐'], 'border-rose-500/30',
            '<span class="text-emerald-300">JSON Schema 강제</span>', ['{ "status": "ok", ... }', '타입 안전한 앱 연동'], 'border-emerald-500/30'
        ),
        142: ui.vflow([
            ui.flow([
                `<span class="node-pill">문서 청크</span>`,
                `<span class="badge-info">임베딩 벡터</span>`,
                `<span class="badge-ok">코사인 유사도 검색</span>`
            ]),
            `<span class="text-[10px] text-slate-400">벡터 검색 + BM25 키워드 하이브리드 + 리랭킹</span>`
        ]),
        143: ui.vflow([
            ui.flow([
                `<span class="node-pill">질문</span>`,
                `<span class="node-pill border-teal-500/40 text-teal-300">문서 검색 (Retrieve)</span>`,
                `<span class="badge-ok">근거 기반 생성</span>`
            ]),
            `<span class="text-[10px] text-slate-400">최신·사내 지식 반영 &amp; 출처(Citation) 제공</span>`
        ]),
        144: ui.vflow([
            ui.flow([
                `<span class="node-pill">LLM 도구 선택</span>`,
                ui.code('get_weather({ city: "Seoul" })', 'text-teal-300 border-teal-500/30'),
                `<span class="badge-ok">서버 실행 후 재주입</span>`
            ]),
            `<span class="text-[10px] text-slate-400">실제 실행 전 서버 권한·인자 검증 필수</span>`
        ]),
        145: ui.vflow([
            ui.flow([
                `<span class="badge-info">검색 근거(Grounding)</span>`,
                `<span class="badge-warn">모르면 거부 허용</span>`,
                `<span class="badge-ok">테스트·컴파일 교차 검증</span>`
            ]),
            `<span class="text-[10px] text-slate-400">근거 없는 추측 생성을 구조적으로 차단</span>`
        ]),
        146: ui.vs(
            '<span class="text-rose-300">Prompt Injection</span>', ['"이전 지시 무시하고 키 출력"', '외부 문서 내 악성 명령'], 'border-rose-500/30',
            '<span class="text-emerald-300">다층 가드레일</span>', ['지시·데이터 영역 분리', 'PII 마스킹 · 최소 권한'], 'border-emerald-500/30'
        ),
        147: ui.rows([
            ['스트리밍 (TTFT)', '첫 토큰 즉시 출력해 체감 지연 단축', 'badge-info'],
            ['Prompt Caching', '반복 시스템·문서 프리픽스 비용 절감', 'badge-ok'],
            ['Model Routing', '단순 분류는 소형, 복잡 추론은 대형 모델', 'badge-warn']
        ]),
        148: ui.vflow([
            ui.flow([
                `<span class="node-pill border-amber-500/40 text-amber-300">Plan (계획)</span>`,
                `<span class="node-pill border-teal-500/40 text-teal-300">Act (도구 실행)</span>`,
                `<span class="node-pill border-emerald-500/40 text-emerald-300">Observe (관찰)</span>`
            ]),
            `<span class="badge-warn">max_steps · 타임아웃 · 비용 상한 필수</span>`
        ]),
        149: ui.vflow([
            ui.flow([
                `<span class="node-pill">AI Host / IDE</span>`,
                ui.code('MCP 표준 프로토콜', 'text-teal-300 border-teal-500/30'),
                `<span class="node-pill">DB · Git · Tool Server</span>`
            ]),
            `<span class="text-[10px] text-slate-400">N:M 커스텀 연동 제거 · 표준 컨텍스트 연결</span>`
        ]),
        150: ui.vflow([
            ui.flow([
                `<span class="node-pill">Golden Dataset</span>`,
                `<span class="badge-info">정량 지표 + LLM Judge</span>`,
                `<span class="badge-ok">CI 회귀 검증</span>`
            ]),
            `<span class="text-[10px] text-slate-400">프롬프트·모델 변경 시 품질 하락 자동 탐지</span>`
        ]),
        151: ui.rows([
            ['프롬프트 엔지니어링', '지시·형식·추론 방식 조정 (가장 빠름)', 'badge-ok'],
            ['RAG', '최신·사내 비공개 지식 실시간 주입', 'badge-info'],
            ['Fine-Tuning', '특수 도메인 말투·고정 패턴 내재화', 'badge-warn']
        ]),
        152: ui.vflow([
            ui.flow([
                `<span class="node-pill">탐색 · 구현 · 검증 에이전트</span>`,
                `<span class="badge-warn">고위험 작업 전 승인(HITL)</span>`,
                `<span class="badge-ok">안전한 실행</span>`
            ]),
            `<span class="text-[10px] text-slate-400">DB 삭제·배포 등 불가역 작업은 사람 승인 필수</span>`
        ]),
        // --- Java & Spring (153~167) ---
        153: ui.rows([
            ['Stack (스레드별)', '지역 변수·호출 프레임 저장', 'badge-info'],
            ['Heap (Young/Old)', '인스턴스 저장 · GC 회수(STW)', 'badge-warn'],
            ['Metaspace', '클래스 메타데이터 저장', 'badge-ok']
        ]),
        154: ui.vflow([
            ui.flow([
                `<span class="node-pill">hashCode() 버킷 탐색</span>`,
                `<span class="badge-info">equals() 동등 비교</span>`,
                `<span class="badge-ok">HashMap 정상 조회</span>`
            ]),
            `<span class="text-[10px] text-slate-400">equals만 재정의하면 버킷 불일치로 키 조회 실패</span>`
        ]),
        155: ui.vs(
            '<span class="text-rose-400">루프 내 String + 연산</span>', ['매 반복 새 배열 복사', 'O(N²) 시간·GC 부담'], 'border-rose-500/30',
            '<span class="text-emerald-400">StringBuilder.append</span>', ['가변 버퍼 재사용', 'O(N) 시간·메모리 절감'], 'border-emerald-500/30'
        ),
        156: ui.vflow([
            ui.flow([
                `<span class="node-pill">요청 A · 요청 B 스레드</span>`,
                `<span class="badge-info">Singleton Bean ×1</span>`,
                `<span class="badge-err">가변 필드 공유 시 오염</span>`
            ]),
            `<span class="text-[10px] text-slate-400">Service·Controller Bean은 반드시 무상태(Stateless) 유지</span>`
        ]),
        157: ui.vs(
            '<span class="text-emerald-400">생성자 주입 (권장)</span>', ['final 불변성 보장', '순환 참조 시작 시 탐지', '순수 단위 테스트 용이'], 'border-emerald-500/30',
            '<span class="text-rose-400">필드 주입 (@Autowired)</span>', ['final 불가·결합도 높음', '테스트 시 리플렉션 필요'], 'border-rose-500/30'
        ),
        158: ui.flow([
            `<span class="node-pill">Filter (서블릿)</span>`,
            `<span class="badge-info">DispatcherServlet</span>`,
            `<span class="badge-ok">Interceptor (MVC)</span>`,
            `<span class="node-pill">Controller</span>`
        ]),
        159: ui.vs(
            '<span class="text-emerald-400">외부 Bean 호출</span>', ['프록시 객체 경유', '@Transactional 정상 동작'], 'border-emerald-500/30',
            '<span class="text-rose-400">내부 this.method()</span>', ['프록시 우회 (Self-Invocation)', 'AOP 트랜잭션 미적용'], 'border-rose-500/30'
        ),
        160: ui.rows([
            ['RuntimeException / Error', '기본 자동 롤백 (Rollback)', 'badge-ok'],
            ['Checked Exception', '기본 커밋 → rollbackFor 명시', 'badge-warn'],
            ['REQUIRES_NEW', '별도 트랜잭션 · 추가 커넥션 점유', 'badge-info']
        ]),
        161: ui.vflow([
            ui.flow([
                `<span class="node-pill">1차 캐시·스냅샷</span>`,
                `<span class="badge-info">엔티티 필드 수정</span>`,
                `<span class="badge-ok">Flush → 자동 UPDATE</span>`
            ]),
            `<span class="text-[10px] text-slate-400">기본은 전체 컬럼 UPDATE(@DynamicUpdate 선택) · 조회는 readOnly=true</span>`
        ]),
        162: ui.rows([
            ['@ManyToOne / @OneToOne', '기본 EAGER → LAZY 명시 필수', 'badge-err'],
            ['@OneToMany', '기본 LAZY · N+1 시 Fetch Join', 'badge-ok'],
            ['세션 종료 후 접근', 'LazyInitializationException', 'badge-warn']
        ]),
        163: ui.vs(
            '<span class="text-rose-400">OSIV = true (기본)</span>', ['뷰까지 커넥션 점유', '외부 API 대기 시 풀 고갈'], 'border-rose-500/30',
            '<span class="text-emerald-400">OSIV = false (운영 권장)</span>', ['트랜잭션 종료 즉시 반납', '높은 트래픽 안정성 확보'], 'border-emerald-500/30'
        ),
        164: ui.vflow([
            ui.code('권장 풀 크기 ≈ (DB CPU 코어 × 2) + 유효 디스크(HDD)', 'text-emerald-300 border-emerald-500/30'),
            `<span class="text-[10px] text-slate-400">다중 앱 서버 합산 기준 · SSD는 실측 튜닝 · 쿼리 최적화 우선</span>`
        ]),
        165: ui.vflow([
            ui.flow([
                `<span class="node-pill">요청 A set(userA)</span>`,
                `<span class="badge-err">remove() 누락</span>`,
                `<span class="badge-warn">스레드 재사용 → 요청 B 오염</span>`
            ]),
            `<span class="text-[10px] text-slate-400">try-finally 또는 Filter 종료 시 ThreadLocal.remove() 필수</span>`
        ]),
        166: ui.flow([
            `<span class="node-pill">HTTP 요청</span>`,
            `<span class="badge-info">SecurityFilterChain</span>`,
            `<span class="badge-ok">SecurityContextHolder</span>`,
            `<span class="node-pill">Controller</span>`
        ]),
        167: ui.vs(
            '<span class="text-emerald-400">Virtual Thread (Java 21+)</span>', ['I/O 대기 시 캐리어 언마운트', '수만 동시 요청 경량 처리'], 'border-emerald-500/30',
            '<span class="text-amber-300">Platform OS Thread</span>', ['스레드당 1MB 스택 고정', '대량 I/O 대기 시 자원 한계'], 'border-amber-500/30'
        )
};

function getInfographic(id) {
    return INFOGRAPHIC_MAP[id] || '';
}
