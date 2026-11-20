// 새 커리큘럼 코스 & 함정 찾기 연습 템플릿 (harness/CARD_AUTHORING_GUIDE.md 참고)

// 1) src/curriculum.js -> curriculumTracks 배열에 추가
const courseTemplate = {
    id: 'course-slug', // 고유 영문 slug
    title: '05. 코스 제목',
    subtitle: '학습자의 호기심을 자극하는 질문형 부제',
    badge: '분야 태그',
    badgeCls: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    levelLabel: '입문 → 실무',
    duration: '8단계 시뮬레이션',
    summary: '이 코스가 다루는 실무 시나리오 요약',
    learningGoals: [
        '학습 목표 1',
        '학습 목표 2',
        '학습 목표 3',
        '학습 목표 4'
    ],
    steps: [
        {
            tag: '배경',
            shortTitle: '짧은 단계명', // 스텝퍼 표시용 (2~8자 권장)
            title: '1. 단계 제목',
            cardIds: [1], // src/data.js에 존재하는 카드 ID (1개 이상)
            story: [
                '첫 번째 문단: 현재 시스템 상황과 현상 설명.',
                '두 번째 문단: 왜 이 지점이 중요한지 구체적 맥락 설명.'
            ],
            whyLimit: '(선택) 이전 방식이 왜 깨지거나 한계에 봉착했는지 설명',
            takeaway: '이 단계에서 반드시 기억할 핵심 원리 1문장',
            tradeoff: '(선택) 실무 적용 시 감수해야 할 비용·복잡도 트레이드오프',
            metrics: { users: '100', p95: '60 ms', error: '0%', cost: '$100' },
            // (선택) 코스당 최소 1개 이상의 핵심 단계에 직접 비교 variants 포함
            variants: [
                {
                    label: '개선 적용 (ON)',
                    note: '핵심 효과 한 줄 요약',
                    metrics: { users: '100', p95: '60 ms', error: '0%', cost: '$100' },
                    diagram: {
                        usersStatus: 'normal',
                        nodes: [
                            { label: '노드 1', sub: '상태 요약', state: 'ok', load: 20 },
                            { label: '노드 2', sub: '상태 요약', spec: '스펙 표기', state: 'info', load: 30 }
                        ]
                    }
                },
                {
                    label: '미적용 (OFF)',
                    note: '발생하는 병목/위험 요약',
                    metrics: { users: '100', p95: '1,500 ms', error: '12%', cost: '$100' },
                    diagram: {
                        usersStatus: 'spike',
                        nodes: [
                            { label: '노드 1', sub: '요청 적체', state: 'warn', load: 80 },
                            { label: '노드 2', sub: 'CPU 95% 포화', spec: '병목', state: 'err', load: 95 }
                        ]
                    }
                }
            ],
            diagram: {
                usersStatus: 'normal',
                nodes: [
                    { label: '노드 1', sub: '상태 요약', state: 'ok', load: 20 },
                    { label: '노드 2', sub: '상태 요약', spec: '스펙 표기', state: 'info', load: 30 }
                ]
            }
        }
    ]
};

// 2) src/curriculum.js -> trapChallenges 배열에 추가
const trapTemplate = {
    id: 'trap-11',
    category: '분야명',
    catCls: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    title: 'AI가 짜준 OO 코드',
    promptContext: 'AI에게 어떤 요청을 했을 때 나온 결과인지 1줄 상황 설명',
    language: 'Java / SQL / JavaScript',
    codeLines: [
        '// 1번 줄',
        '// 2번 줄 (함정이 있는 줄)'
    ],
    buggyLines: [2], // 1-based line numbers
    options: [
        { id: 'a', label: '정답 함정 설명' },
        { id: 'b', label: '오답 선택지 1' },
        { id: 'c', label: '오답 선택지 2' },
        { id: 'd', label: '오답 선택지 3' }
    ],
    answerId: 'a',
    explanation: '실제 런타임/스펙 기준으로 왜 장애나 보안 사고가 발생하는지 설명',
    fixCode: '// 안전한 개선 코드 예시',
    relatedCardIds: [1], // src/data.js 유효 카드 ID
    aiReviewPrompt: 'AI에게 이 함정을 검증하고 수정하도록 요청하는 실전 리뷰 프롬프트'
};
