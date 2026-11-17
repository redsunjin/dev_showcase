(() => {
    'use strict';

    const STORAGE_KEY = 'devShowcaseState_v1';

    const LEVEL_META = {
        1: { label: 'Lv.1 입문·필수', short: 'Lv.1 입문', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
        2: { label: 'Lv.2 실무·핵심', short: 'Lv.2 실무', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
        3: { label: 'Lv.3 심화·고급', short: 'Lv.3 심화', cls: 'bg-purple-500/15 text-purple-300 border-purple-500/30' }
    };

    const state = {
        currentCategory: 'all',
        levelFilter: 'all', // 'all' | '1' | '2' | '3'
        sortByPriority: true, // true: Lv.1 -> Lv.2 -> Lv.3, false: id ascending
        statusFilter: 'all', // 'all' | 'unlearned' | 'learned' | 'bookmarked'
        searchQuery: '',
        isFlashcardMode: false,
        revealedCards: new Set(),
        learnedCards: new Set(),
        bookmarkedCards: new Set(),
        activeDetailId: null,
        quizQueue: [],
        quizIndex: 0,
        quizKnownCount: 0
    };

    // DOM Elements
    const grid = document.getElementById('cardGrid');
    const emptyState = document.getElementById('emptyState');
    const visibleCountText = document.getElementById('visibleCountText');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const toggleModeBtn = document.getElementById('toggleModeBtn');
    const modeText = document.getElementById('modeText');
    const studyGuideBtn = document.getElementById('studyGuideBtn');
    const closeStudyGuideBtn = document.getElementById('closeStudyGuideBtn');
    const studyGuidePanel = document.getElementById('studyGuidePanel');
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const startQuizBtn = document.getElementById('startQuizBtn');

    const progressBadge = document.getElementById('progressBadge');
    const bookmarkBadge = document.getElementById('bookmarkBadge');
    const progressBarFill = document.getElementById('progressBarFill');
    const catBtns = document.querySelectorAll('.cat-btn');
    const levelBtns = document.querySelectorAll('.level-btn');
    const statusBtns = document.querySelectorAll('.status-btn');
    const sortPriorityBtn = document.getElementById('sortPriorityBtn');
    const sortPriorityText = document.getElementById('sortPriorityText');

    const toastNotification = document.getElementById('toastNotification');
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastDesc = document.getElementById('toastDesc');
    let toastTimeout = null;

    // Detail Dialog Elements
    const detailDialog = document.getElementById('detailDialog');
    const detailCatBadge = document.getElementById('detailCatBadge');
    const detailLevelBadge = document.getElementById('detailLevelBadge');
    const detailIdBadge = document.getElementById('detailIdBadge');
    const detailTitle = document.getElementById('detailTitle');
    const detailSubtitle = document.getElementById('detailSubtitle');
    const detailInfographic = document.getElementById('detailInfographic');
    const detailConcept = document.getElementById('detailConcept');
    const detailDefense = document.getElementById('detailDefense');
    const detailBookmarkBtn = document.getElementById('detailBookmarkBtn');
    const detailLearnedBtn = document.getElementById('detailLearnedBtn');
    const detailCloseBtn = document.getElementById('detailCloseBtn');
    const detailDeepPromptBtn = document.getElementById('detailDeepPromptBtn');
    const detailStudyPromptBtn = document.getElementById('detailStudyPromptBtn');
    const detailPrevBtn = document.getElementById('detailPrevBtn');
    const detailNextBtn = document.getElementById('detailNextBtn');

    // Quiz Dialog Elements
    const quizDialog = document.getElementById('quizDialog');
    const quizCloseBtn = document.getElementById('quizCloseBtn');
    const quizCounter = document.getElementById('quizCounter');
    const quizActiveView = document.getElementById('quizActiveView');
    const quizCompleteView = document.getElementById('quizCompleteView');
    const quizCatBadge = document.getElementById('quizCatBadge');
    const quizLevelBadge = document.getElementById('quizLevelBadge');
    const quizDialogTitle = document.getElementById('quizDialogTitle');
    const quizSubtitle = document.getElementById('quizSubtitle');
    const quizHiddenPrompt = document.getElementById('quizHiddenPrompt');
    const quizRevealBtn = document.getElementById('quizRevealBtn');
    const quizAnswerArea = document.getElementById('quizAnswerArea');
    const quizInfographic = document.getElementById('quizInfographic');
    const quizConcept = document.getElementById('quizConcept');
    const quizDefense = document.getElementById('quizDefense');
    const quizAgainBtn = document.getElementById('quizAgainBtn');
    const quizKnowBtn = document.getElementById('quizKnowBtn');
    const quizSummaryText = document.getElementById('quizSummaryText');
    const quizRestartBtn = document.getElementById('quizRestartBtn');
    const quizDoneCloseBtn = document.getElementById('quizDoneCloseBtn');

    // Confirm Reset Dialog
    const confirmResetDialog = document.getElementById('confirmResetDialog');

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.learned)) {
                state.learnedCards = new Set(parsed.learned.filter(Number.isInteger));
            }
            if (Array.isArray(parsed.bookmarked)) {
                state.bookmarkedCards = new Set(parsed.bookmarked.filter(Number.isInteger));
            }
            if (typeof parsed.currentCategory === 'string') {
                state.currentCategory = parsed.currentCategory;
            }
            if (typeof parsed.levelFilter === 'string') {
                state.levelFilter = parsed.levelFilter;
            }
            if (typeof parsed.sortByPriority === 'boolean') {
                state.sortByPriority = parsed.sortByPriority;
            }
            if (typeof parsed.statusFilter === 'string') {
                state.statusFilter = parsed.statusFilter;
            }
        } catch {
            // Ignore storage errors
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                learned: Array.from(state.learnedCards),
                bookmarked: Array.from(state.bookmarkedCards),
                currentCategory: state.currentCategory,
                levelFilter: state.levelFilter,
                sortByPriority: state.sortByPriority,
                statusFilter: state.statusFilter
            }));
        } catch {
            // Ignore storage errors
        }
    }

    function showToast(title, desc, isError = false) {
        toastTitle.textContent = title;
        toastDesc.textContent = desc;
        toastIcon.className = isError
            ? 'fa-solid fa-circle-exclamation text-rose-400 text-base shrink-0'
            : 'fa-solid fa-circle-check text-emerald-400 text-base shrink-0';
        toastNotification.classList.remove('hidden');
        toastNotification.classList.add('flex');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastNotification.classList.add('hidden');
            toastNotification.classList.remove('flex');
        }, 3200);
    }

    function copyTextFallback(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) throw new Error('execCommand copy failed');
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch {
                // Fall back to execCommand
            }
        }
        copyTextFallback(text);
    }

    async function copyPrompt(id, type) {
        const item = items.find(i => i.id === id);
        if (!item) return;

        const cleanTitle = item.title.replace(/^\d+\.\s*/, '');
        let promptText = '';
        let label = '';

        if (type === 'deep') {
            label = `[${cleanTitle}] 실무 심화 프롬프트 복사 완료`;
            promptText = `당신은 시니어 소프트웨어 엔지니어이자 기술 멘토입니다.
아래 개발자 기본소양 주제에 대해 실무 관점에서 깊이 있게 설명해 주세요.

- 분야: ${item.catName}
- 주제: ${cleanTitle} (${item.subtitle})
- 핵심 요약: ${item.concept}
- 주요 포인트: ${item.defense}

[질문 및 요청사항]
1. 이 개념이 등장하게 된 배경과 해결하고자 하는 근본적인 문제는 무엇인가요?
2. 실제 프로덕션 환경에서 이 개념이 잘못 적용되거나 간과되었을 때 발생하는 장애/보안 사고 사례를 구체적인 코드나 시나리오로 보여주세요.
3. 실무에서 이를 올바르게 설계·구현하기 위한 모범 사례(Best Practice)와 트레이드오프를 정리해 주세요.`;
        } else {
            label = `[${cleanTitle}] 1:1 학습·퀴즈 프롬프트 복사 완료`;
            promptText = `당신은 친절하고 체계적인 1:1 개발자 튜터입니다.
제가 아래 개념을 완벽히 이해하고 설명할 수 있도록 단계별 학습을 진행해 주세요.

- 학습 주제: ${cleanTitle} (${item.subtitle})
- 분야: ${item.catName}
- 기본 개념: ${item.concept}
- 핵심 포인트: ${item.defense}

[학습 진행 방식]
1. 먼저 초급 개발자도 직관적으로 이해할 수 있도록 비유를 들어 3줄로 쉽게 설명해 주세요.
2. 그 다음, 제가 이 개념을 제대로 이해했는지 확인할 수 있는 실무 상황 기반의 퀴즈(또는 꼬리 질문) 1가지를 내주세요.
3. 제가 답변을 입력하면, 부족한 부분을 피드백해 주고 다음 단계 심화 질문으로 넘어가 주세요.`;
        }

        try {
            await copyToClipboard(promptText);
            showToast(label, 'Gemini나 ChatGPT 채팅창에 붙여넣어(Ctrl+V) 바로 질문해 보세요.');
        } catch {
            showToast('복사에 실패했습니다', '브라우저 클립보드 권한을 확인해 주세요.', true);
        }
    }

    function updateProgress() {
        const total = items.length;
        const learned = state.learnedCards.size;
        const pct = total > 0 ? Math.round((learned / total) * 100) : 0;
        progressBadge.textContent = `학습 ${learned}/${total} (${pct}%)`;
        bookmarkBadge.textContent = `북마크 ${state.bookmarkedCards.size}`;
        progressBarFill.style.width = `${pct}%`;
    }

    function getFilteredItems() {
        const q = state.searchQuery.trim().toLowerCase();
        const result = items.filter(item => {
            const matchesCategory = state.currentCategory === 'all' || item.category === state.currentCategory;
            const matchesLevel = state.levelFilter === 'all' || String(item.level) === state.levelFilter;
            const isLearned = state.learnedCards.has(item.id);
            const isBookmarked = state.bookmarkedCards.has(item.id);

            const matchesStatus =
                state.statusFilter === 'all' ? true :
                state.statusFilter === 'unlearned' ? !isLearned :
                state.statusFilter === 'learned' ? isLearned :
                state.statusFilter === 'bookmarked' ? isBookmarked : true;

            const matchesSearch = !q || (
                item.title.toLowerCase().includes(q) ||
                item.subtitle.toLowerCase().includes(q) ||
                item.diagram.toLowerCase().includes(q) ||
                item.concept.toLowerCase().includes(q) ||
                item.defense.toLowerCase().includes(q) ||
                item.catName.toLowerCase().includes(q)
            );
            return matchesCategory && matchesLevel && matchesStatus && matchesSearch;
        });

        if (state.sortByPriority) {
            result.sort((a, b) => (a.level - b.level) || (a.id - b.id));
        } else {
            result.sort((a, b) => a.id - b.id);
        }
        return result;
    }

    function updateFilterUI() {
        catBtns.forEach(btn => {
            const active = btn.getAttribute('data-category') === state.currentCategory;
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            if (active) {
                btn.className = 'cat-btn px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition bg-blue-600 text-white shadow-lg shadow-blue-600/20 cursor-pointer';
            } else {
                btn.className = 'cat-btn px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer';
            }
        });

        levelBtns.forEach(btn => {
            const lvl = btn.getAttribute('data-level');
            const active = lvl === state.levelFilter;
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            const baseColor =
                lvl === '1' ? 'text-emerald-300' :
                lvl === '2' ? 'text-amber-300' :
                lvl === '3' ? 'text-purple-300' : 'text-white';
            if (active) {
                btn.className = `level-btn px-2.5 py-1 rounded-lg text-xs font-semibold transition bg-slate-800 ${baseColor} border border-slate-500 cursor-pointer`;
            } else {
                btn.className = `level-btn px-2.5 py-1 rounded-lg text-xs font-medium transition bg-slate-900 ${lvl === 'all' ? 'text-slate-400' : baseColor} border border-slate-800 hover:border-slate-600 cursor-pointer`;
            }
        });

        sortPriorityBtn.setAttribute('aria-pressed', state.sortByPriority ? 'true' : 'false');
        if (state.sortByPriority) {
            sortPriorityText.textContent = '우선순위순 (Lv.1→3)';
            sortPriorityBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 cursor-pointer';
        } else {
            sortPriorityText.textContent = '기본 번호순';
            sortPriorityBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium transition bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 cursor-pointer';
        }

        statusBtns.forEach(btn => {
            const active = btn.getAttribute('data-status') === state.statusFilter;
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            if (active) {
                btn.className = 'status-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition bg-slate-800 text-white border border-slate-500 cursor-pointer';
            } else {
                btn.className = 'status-btn px-3 py-1.5 rounded-lg text-xs font-medium transition bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 cursor-pointer';
            }
        });
    }

    function toggleLearned(id) {
        if (state.learnedCards.has(id)) {
            state.learnedCards.delete(id);
        } else {
            state.learnedCards.add(id);
        }
        saveState();
        updateProgress();
        render();
        if (detailDialog.open && state.activeDetailId === id) {
            renderDetailModal(id);
        }
    }

    function toggleBookmark(id) {
        if (state.bookmarkedCards.has(id)) {
            state.bookmarkedCards.delete(id);
        } else {
            state.bookmarkedCards.add(id);
        }
        saveState();
        updateProgress();
        render();
        if (detailDialog.open && state.activeDetailId === id) {
            renderDetailModal(id);
        }
    }

    function toggleReveal(id) {
        if (!state.isFlashcardMode) return;
        if (state.revealedCards.has(id)) {
            state.revealedCards.delete(id);
        } else {
            state.revealedCards.add(id);
        }
        render();
    }

    function render() {
        const filtered = getFilteredItems();

        if (visibleCountText) {
            visibleCountText.textContent = `현재 표시된 카드: ${filtered.length}개 / 전체 ${items.length}개`;
        }

        if (filtered.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }

        emptyState.classList.remove('flex');
        emptyState.classList.add('hidden');

        grid.innerHTML = filtered.map(item => {
            const isLearned = state.learnedCards.has(item.id);
            const isBookmarked = state.bookmarkedCards.has(item.id);
            const isRevealed = !state.isFlashcardMode || state.revealedCards.has(item.id);
            const lvl = LEVEL_META[item.level] || LEVEL_META[2];

            return `
                <article data-card-id="${item.id}"
                     class="glass-card card-glow rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between ${state.isFlashcardMode ? 'cursor-pointer' : ''} ${isLearned ? 'opacity-70 border-emerald-500/30' : ''}">
                    <div>
                        <!-- Card Top Metadata -->
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <span class="text-[11px] px-2.5 py-0.5 rounded-full border ${item.badgeColor} font-semibold">
                                    ${escapeHtml(item.catName)}
                                </span>
                                <span class="text-[10px] px-2 py-0.5 rounded-full border ${lvl.cls} font-semibold">
                                    ${lvl.short}
                                </span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="text-xs text-slate-500 font-mono mr-0.5">#${String(item.id).padStart(2, '0')}</span>
                                <button type="button" data-action="detail" data-id="${item.id}" title="상세 보기" aria-label="${escapeHtml(item.title)} 상세 보기"
                                        class="w-6 h-6 rounded-lg flex items-center justify-center border border-slate-700 bg-slate-900 text-slate-400 hover:text-blue-300 hover:border-blue-500/40 transition cursor-pointer">
                                    <i class="fa-solid fa-expand text-[10px]" aria-hidden="true"></i>
                                </button>
                                <button type="button" data-action="bookmark" data-id="${item.id}" title="북마크" aria-label="${escapeHtml(item.title)} 북마크" aria-pressed="${isBookmarked}"
                                        class="w-6 h-6 rounded-lg flex items-center justify-center border transition cursor-pointer ${isBookmarked ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-amber-300'}">
                                    <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-star text-[10px]" aria-hidden="true"></i>
                                </button>
                                <button type="button" data-action="learned" data-id="${item.id}" title="학습 완료 체크" aria-label="${escapeHtml(item.title)} 학습 완료 체크" aria-pressed="${isLearned}"
                                        class="w-6 h-6 rounded-lg flex items-center justify-center border transition cursor-pointer ${isLearned ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'}">
                                    <i class="fa-solid fa-check text-xs" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Title & Subtitle -->
                        <h3 class="text-base font-bold text-slate-100 leading-snug">
                            <button type="button" data-action="detail" data-id="${item.id}" class="text-left hover:text-blue-300 transition cursor-pointer">
                                ${escapeHtml(item.title)}
                            </button>
                        </h3>
                        <p class="text-xs text-slate-400 mt-0.5 mb-3 font-mono">${escapeHtml(item.subtitle)}</p>

                        ${isRevealed ? `
                            <!-- Visual Infographic Diagram Box -->
                            <div class="info-canvas rounded-xl p-3 mb-3.5 min-h-[108px] flex flex-col items-center justify-center">
                                ${getInfographic(item.id)}
                            </div>

                            <!-- Core Concept -->
                            <p class="text-sm text-slate-300 leading-relaxed mb-4">
                                ${escapeHtml(item.concept)}
                            </p>
                        ` : `
                            <!-- Hidden State in Flashcard Mode -->
                            <div class="my-6 py-8 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 flex flex-col items-center justify-center text-center px-4">
                                <i class="fa-regular fa-eye text-blue-400 text-lg mb-2" aria-hidden="true"></i>
                                <span class="text-xs font-medium text-slate-300">클릭하여 핵심 도식 & 한 줄 정의 확인</span>
                                <span class="text-[11px] text-slate-500 mt-0.5">머릿속으로 먼저 3초 개발지식을 떠올려 보세요</span>
                            </div>
                        `}
                    </div>

                    <!-- Bottom Summary / Key Takeaway -->
                    <div class="border-t border-slate-800/80 pt-3 mt-1 flex flex-col gap-3">
                        <div class="flex items-start gap-2">
                            <i class="fa-solid fa-key text-amber-400 text-xs mt-1 shrink-0" aria-hidden="true"></i>
                            ${isRevealed ? `
                                <p class="text-xs text-slate-300 leading-relaxed">
                                    <strong class="text-amber-300">핵심 소양 포인트:</strong> ${escapeHtml(item.defense)}
                                </p>
                            ` : `
                                <p class="text-xs text-slate-500 italic">카드를 클릭하면 핵심 소양 포인트가 표시됩니다.</p>
                            `}
                        </div>

                        <!-- AI Prompt Copy Actions -->
                        <div class="flex items-center gap-2 pt-2 border-t border-slate-800/50">
                            <button type="button" data-action="copy-deep" data-id="${item.id}"
                                    title="실무 장애 사례 및 모범 사례 질문 프롬프트 복사"
                                    class="flex-1 bg-slate-900/90 hover:bg-blue-600/20 border border-slate-700/80 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fa-solid fa-wand-magic-sparkles text-blue-400 text-[10px]" aria-hidden="true"></i>
                                <span>AI 심화 프롬프트</span>
                            </button>
                            <button type="button" data-action="copy-study" data-id="${item.id}"
                                    title="비유 설명 + 1:1 꼬리 질문 퀴즈 학습 프롬프트 복사"
                                    class="flex-1 bg-slate-900/90 hover:bg-purple-600/20 border border-slate-700/80 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fa-solid fa-graduation-cap text-purple-400 text-[10px]" aria-hidden="true"></i>
                                <span>AI 학습·퀴즈 프롬프트</span>
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    // Detail Modal Logic
    function renderDetailModal(id) {
        const item = items.find(i => i.id === id);
        if (!item) return;
        state.activeDetailId = id;

        const isLearned = state.learnedCards.has(id);
        const isBookmarked = state.bookmarkedCards.has(id);

        const lvl = LEVEL_META[item.level] || LEVEL_META[2];
        detailCatBadge.className = `text-xs px-2.5 py-0.5 rounded-full border font-semibold ${item.badgeColor}`;
        detailCatBadge.textContent = item.catName;
        detailLevelBadge.className = `text-xs px-2.5 py-0.5 rounded-full border font-semibold ${lvl.cls}`;
        detailLevelBadge.textContent = lvl.label;
        detailIdBadge.textContent = `#${String(item.id).padStart(2, '0')} / ${items.length}`;
        detailTitle.textContent = item.title;
        detailSubtitle.textContent = item.subtitle;
        detailInfographic.innerHTML = getInfographic(item.id);
        detailConcept.textContent = item.concept;
        detailDefense.textContent = item.defense;

        detailBookmarkBtn.className = `w-8 h-8 rounded-lg flex items-center justify-center border transition cursor-pointer ${
            isBookmarked
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-amber-300'
        }`;
        detailBookmarkBtn.innerHTML = `<i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-star text-sm" aria-hidden="true"></i>`;

        detailLearnedBtn.className = `w-8 h-8 rounded-lg flex items-center justify-center border transition cursor-pointer ${
            isLearned
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-emerald-300'
        }`;

        const filtered = getFilteredItems();
        const idx = filtered.findIndex(i => i.id === id);
        detailPrevBtn.disabled = idx <= 0;
        detailNextBtn.disabled = idx === -1 || idx >= filtered.length - 1;
    }

    function openDetailModal(id) {
        renderDetailModal(id);
        if (!detailDialog.open) {
            detailDialog.showModal();
        }
    }

    function navigateDetail(delta) {
        const filtered = getFilteredItems();
        const idx = filtered.findIndex(i => i.id === state.activeDetailId);
        if (idx === -1) return;
        const nextItem = filtered[idx + delta];
        if (nextItem) {
            renderDetailModal(nextItem.id);
        }
    }

    // Quiz Modal Logic
    function shuffleArray(arr) {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function startQuiz() {
        const filtered = getFilteredItems();
        const unlearnedInFilter = filtered.filter(i => !state.learnedCards.has(i.id));
        const pool = unlearnedInFilter.length > 0 ? unlearnedInFilter : filtered;

        if (pool.length === 0) {
            showToast('퀴즈 대상 카드가 없습니다', '필터를 조정한 뒤 다시 시도해 주세요.', true);
            return;
        }

        state.quizQueue = shuffleArray(pool);
        state.quizIndex = 0;
        state.quizKnownCount = 0;
        renderQuizCard();
        if (!quizDialog.open) {
            quizDialog.showModal();
        }
    }

    function renderQuizCard() {
        if (state.quizIndex >= state.quizQueue.length) {
            quizActiveView.classList.add('hidden');
            quizCompleteView.classList.remove('hidden');
            quizCompleteView.classList.add('flex');
            quizCounter.textContent = '완료';
            quizSummaryText.textContent = `총 ${state.quizQueue.length}개의 카드 중 ${state.quizKnownCount}개를 학습 완료로 체크했습니다.`;
            return;
        }

        quizCompleteView.classList.add('hidden');
        quizCompleteView.classList.remove('flex');
        quizActiveView.classList.remove('hidden');

        const item = state.quizQueue[state.quizIndex];
        const lvl = LEVEL_META[item.level] || LEVEL_META[2];
        quizCounter.textContent = `${state.quizIndex + 1} / ${state.quizQueue.length}`;
        quizCatBadge.className = `text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${item.badgeColor}`;
        quizCatBadge.textContent = item.catName;
        quizLevelBadge.className = `text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${lvl.cls}`;
        quizLevelBadge.textContent = lvl.label;
        quizDialogTitle.textContent = item.title;
        quizSubtitle.textContent = item.subtitle;

        quizHiddenPrompt.classList.remove('hidden');
        quizAnswerArea.classList.add('hidden');
        quizAnswerArea.classList.remove('flex');
    }

    function revealQuizAnswer() {
        const item = state.quizQueue[state.quizIndex];
        if (!item) return;
        quizInfographic.innerHTML = getInfographic(item.id);
        quizConcept.textContent = item.concept;
        quizDefense.textContent = item.defense;
        quizHiddenPrompt.classList.add('hidden');
        quizAnswerArea.classList.remove('hidden');
        quizAnswerArea.classList.add('flex');
    }

    function advanceQuiz(markLearned) {
        const item = state.quizQueue[state.quizIndex];
        if (item && markLearned) {
            if (!state.learnedCards.has(item.id)) {
                state.learnedCards.add(item.id);
                saveState();
                updateProgress();
                render();
            }
            state.quizKnownCount += 1;
        }
        state.quizIndex += 1;
        renderQuizCard();
    }

    // Event Delegation on Card Grid
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (btn) {
            e.stopPropagation();
            const id = Number(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');
            if (action === 'learned') toggleLearned(id);
            else if (action === 'bookmark') toggleBookmark(id);
            else if (action === 'detail') openDetailModal(id);
            else if (action === 'copy-deep') copyPrompt(id, 'deep');
            else if (action === 'copy-study') copyPrompt(id, 'study');
            return;
        }

        const card = e.target.closest('article[data-card-id]');
        if (card && state.isFlashcardMode) {
            toggleReveal(Number(card.getAttribute('data-card-id')));
        }
    });

    // Search & Clear
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        clearSearchBtn.classList.toggle('hidden', state.searchQuery.length === 0);
        render();
    });

    clearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        searchInput.focus();
        render();
    });

    // Category, Level, Sort & Status Filters
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.currentCategory = btn.getAttribute('data-category');
            saveState();
            updateFilterUI();
            render();
        });
    });

    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.levelFilter = btn.getAttribute('data-level');
            saveState();
            updateFilterUI();
            render();
        });
    });

    sortPriorityBtn.addEventListener('click', () => {
        state.sortByPriority = !state.sortByPriority;
        saveState();
        updateFilterUI();
        render();
    });

    statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.statusFilter = btn.getAttribute('data-status');
            saveState();
            updateFilterUI();
            render();
        });
    });

    resetFiltersBtn.addEventListener('click', () => {
        state.currentCategory = 'all';
        state.levelFilter = 'all';
        state.statusFilter = 'all';
        state.searchQuery = '';
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        saveState();
        updateFilterUI();
        render();
    });

    // Flashcard Mode Toggle
    toggleModeBtn.addEventListener('click', () => {
        state.isFlashcardMode = !state.isFlashcardMode;
        state.revealedCards.clear();
        toggleModeBtn.setAttribute('aria-pressed', state.isFlashcardMode ? 'true' : 'false');
        if (state.isFlashcardMode) {
            modeText.textContent = '암기 모드 ON';
            toggleModeBtn.classList.add('border-amber-500/50', 'bg-amber-950/30', 'text-amber-200');
        } else {
            modeText.textContent = '암기 모드 OFF';
            toggleModeBtn.classList.remove('border-amber-500/50', 'bg-amber-950/30', 'text-amber-200');
        }
        render();
    });

    // Study Guide Toggle
    studyGuideBtn.addEventListener('click', () => {
        const isHidden = studyGuidePanel.classList.toggle('hidden');
        studyGuideBtn.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
    });

    closeStudyGuideBtn.addEventListener('click', () => {
        studyGuidePanel.classList.add('hidden');
        studyGuideBtn.setAttribute('aria-expanded', 'false');
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Detail Dialog Controls
    detailCloseBtn.addEventListener('click', () => detailDialog.close());
    detailBookmarkBtn.addEventListener('click', () => {
        if (state.activeDetailId !== null) toggleBookmark(state.activeDetailId);
    });
    detailLearnedBtn.addEventListener('click', () => {
        if (state.activeDetailId !== null) toggleLearned(state.activeDetailId);
    });
    detailDeepPromptBtn.addEventListener('click', () => {
        if (state.activeDetailId !== null) copyPrompt(state.activeDetailId, 'deep');
    });
    detailStudyPromptBtn.addEventListener('click', () => {
        if (state.activeDetailId !== null) copyPrompt(state.activeDetailId, 'study');
    });
    detailPrevBtn.addEventListener('click', () => navigateDetail(-1));
    detailNextBtn.addEventListener('click', () => navigateDetail(1));

    // Quiz Dialog Controls
    startQuizBtn.addEventListener('click', startQuiz);
    quizCloseBtn.addEventListener('click', () => quizDialog.close());
    quizDoneCloseBtn.addEventListener('click', () => quizDialog.close());
    quizRestartBtn.addEventListener('click', startQuiz);
    quizRevealBtn.addEventListener('click', revealQuizAnswer);
    quizAgainBtn.addEventListener('click', () => advanceQuiz(false));
    quizKnowBtn.addEventListener('click', () => advanceQuiz(true));

    // Reset Progress Dialog
    resetProgressBtn.addEventListener('click', () => {
        confirmResetDialog.showModal();
    });

    confirmResetDialog.addEventListener('close', () => {
        const result = confirmResetDialog.returnValue;
        confirmResetDialog.returnValue = '';
        if (result === 'reset') {
            state.learnedCards.clear();
            state.bookmarkedCards.clear();
            saveState();
            updateProgress();
            render();
            showToast('학습 진도가 초기화되었습니다', '모든 완료 체크와 북마크가 초기화되었습니다.');
        }
    });

    // Light-dismiss fallback for browsers without <dialog closedby="any">
    if (!('closedBy' in HTMLDialogElement.prototype)) {
        const outside = (e, dialog) => {
            const r = dialog.getBoundingClientRect();
            return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
        };
        for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
            let pressedOutside = false;
            dialog.addEventListener('pointerdown', (e) => {
                pressedOutside = outside(e, dialog);
            });
            dialog.addEventListener('pointerup', (e) => {
                if (pressedOutside && outside(e, dialog)) dialog.close();
            });
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (detailDialog.open) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateDetail(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateDetail(1);
            }
            return;
        }

        if (e.key === '/' && !quizDialog.open && !confirmResetDialog.open) {
            const tag = document.activeElement?.tagName;
            if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
                e.preventDefault();
                searchInput.focus();
            }
        }
    });

    // Register Service Worker over HTTP/HTTPS
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
    }

    // Initialize
    loadState();
    updateFilterUI();
    updateProgress();
    render();
})();
