// 새 학습 카드 템플릿 (harness/CARD_AUTHORING_GUIDE.md 참고)

// 1) src/data.js -> items 배열에 추가
const cardTemplate = {
    id: 0, // 다음 순번 입력
    category: 'ai-agent', // web-security | database | data-structure | sql-traps | os-network | architecture | frontend | testing | devops | ai-agent
    catName: 'AI·LLM·에이전트',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    level: 1, // 1: 입문·필수 | 2: 실무·핵심 | 3: 심화·고급
    title: '00. 개념 제목',
    subtitle: 'English Concept Name',
    diagram: '검색 및 요약용 핵심 키워드 흐름',
    concept: '이 개념이 무엇이며 어떤 문제를 해결하는지 1~2문장으로 설명합니다.',
    defense: '실무에서 반드시 기억해야 할 설계 기준, 트레이드오프 또는 방어 포인트를 적습니다.'
};

// 2) src/data.js -> getInfographic(id) map에 동일 id로 추가
// 0: ui.vflow([
//     ui.flow([
//         `<span class="node-pill">입력</span>`,
//         `<span class="badge-info">처리</span>`,
//         `<span class="badge-ok">결과</span>`
//     ]),
//     `<span class="text-[10px] text-slate-400">핵심 요약 캡션</span>`
// ])
