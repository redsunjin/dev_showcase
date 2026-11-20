import fs from 'node:fs';

const ALLOWED_CATEGORIES = new Map([
    ['web-security', '웹 보안'],
    ['database', '데이터베이스'],
    ['data-structure', '자료구조'],
    ['sql-traps', 'SQL 함정'],
    ['os-network', 'OS·네트워크'],
    ['architecture', '설계·클린코드'],
    ['frontend', '브라우저·FE'],
    ['testing', '테스트'],
    ['devops', 'CI/CD·DevOps'],
    ['ai-agent', 'AI·LLM·에이전트'],
    ['java-spring', 'Java·Spring']
]);

const errors = [];

// 1. Load & validate src/data.js (Cards)
const dataCode = fs.readFileSync('src/data.js', 'utf8');
const { items, getInfographic } = new Function(dataCode + '; return { items, getInfographic };')();

if (!Array.isArray(items) || items.length === 0) {
    errors.push('src/data.js: items array is empty or missing.');
}

const seenIds = new Set();
const categoryCounts = {};

for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!Number.isInteger(item.id) || item.id < 1 || item.id > items.length) {
        errors.push(`Item at index ${i} has out-of-range id=${item.id} (expected 1..${items.length}).`);
    }
    if (seenIds.has(item.id)) {
        errors.push(`Duplicate card id=${item.id}.`);
    }
    seenIds.add(item.id);

    if (!ALLOWED_CATEGORIES.has(item.category)) {
        errors.push(`Item #${item.id}: invalid category "${item.category}".`);
    } else if (ALLOWED_CATEGORIES.get(item.category) !== item.catName) {
        errors.push(`Item #${item.id}: catName "${item.catName}" does not match "${ALLOWED_CATEGORIES.get(item.category)}".`);
    }

    if (![1, 2, 3].includes(item.level)) {
        errors.push(`Item #${item.id}: level must be 1, 2, or 3 (got ${item.level}).`);
    }

    for (const field of ['badgeColor', 'title', 'subtitle', 'diagram', 'concept', 'defense']) {
        if (typeof item[field] !== 'string' || item[field].trim().length === 0) {
            errors.push(`Item #${item.id}: missing or empty "${field}".`);
        }
    }

    const info = getInfographic(item.id);
    if (typeof info !== 'string' || info.trim().length === 0) {
        errors.push(`Item #${item.id}: missing infographic in getInfographic().`);
    }

    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
}

// 2. Load & validate src/curriculum.js (Courses & Trap Challenges)
const curriculumCode = fs.readFileSync('src/curriculum.js', 'utf8');
const { curriculumTracks, trapChallenges } = new Function(
    curriculumCode + '; return { curriculumTracks, trapChallenges };'
)();

if (!Array.isArray(curriculumTracks) || curriculumTracks.length === 0) {
    errors.push('src/curriculum.js: curriculumTracks array is empty or missing.');
} else {
    const seenTrackIds = new Set();
    for (const tr of curriculumTracks) {
        if (!tr.id || seenTrackIds.has(tr.id)) {
            errors.push(`Course "${tr.id}": missing or duplicate course id.`);
        }
        seenTrackIds.add(tr.id);

        for (const f of ['title', 'subtitle', 'badge', 'badgeCls', 'levelLabel']) {
            if (typeof tr[f] !== 'string' || !tr[f].trim()) {
                errors.push(`Course "${tr.id}": missing or empty "${f}".`);
            }
        }
        if (!Array.isArray(tr.learningGoals) || tr.learningGoals.length < 3) {
            errors.push(`Course "${tr.id}": learningGoals must have >= 3 items.`);
        }
        if (!Array.isArray(tr.steps) || tr.steps.length < 8) {
            errors.push(`Course "${tr.id}": steps must have >= 8 steps (got ${tr.steps?.length || 0}).`);
            continue;
        }
        let hasVariant = false;
        tr.steps.forEach((st, idx) => {
            const label = `Course "${tr.id}" step #${idx + 1}`;
            for (const f of ['tag', 'shortTitle', 'title', 'takeaway']) {
                if (typeof st[f] !== 'string' || !st[f].trim()) {
                    errors.push(`${label}: missing or empty "${f}".`);
                }
            }
            const storyOk = (typeof st.story === 'string' && st.story.trim().length > 0)
                || (Array.isArray(st.story) && st.story.length > 0 && st.story.every(p => typeof p === 'string' && p.trim().length > 0));
            if (!storyOk) errors.push(`${label}: missing or empty "story".`);

            const ids = Array.isArray(st.cardIds) ? st.cardIds : (st.cardId ? [st.cardId] : []);
            if (ids.length === 0) {
                errors.push(`${label}: must reference at least 1 cardId.`);
            }
            for (const cid of ids) {
                if (!seenIds.has(cid)) {
                    errors.push(`${label}: references invalid cardId ${cid}.`);
                }
            }
            if (!st.metrics || Object.keys(st.metrics).length === 0) {
                errors.push(`${label}: missing metrics.`);
            }
            if (!st.diagram || !Array.isArray(st.diagram.nodes) || st.diagram.nodes.length < 2) {
                errors.push(`${label}: diagram.nodes must have >= 2 nodes.`);
            }
            if (Array.isArray(st.variants) && st.variants.length >= 2) {
                hasVariant = true;
            }
        });
        if (!hasVariant) {
            errors.push(`Course "${tr.id}": must include at least 1 interactive variants step.`);
        }
    }
}

if (!Array.isArray(trapChallenges) || trapChallenges.length === 0) {
    errors.push('src/curriculum.js: trapChallenges array is empty or missing.');
} else {
    const seenTrapIds = new Set();
    for (const ch of trapChallenges) {
        if (!ch.id || seenTrapIds.has(ch.id)) {
            errors.push(`Trap "${ch.id}": missing or duplicate trap id.`);
        }
        seenTrapIds.add(ch.id);

        for (const f of ['category', 'catCls', 'title', 'promptContext', 'language', 'explanation', 'fixCode', 'aiReviewPrompt']) {
            if (typeof ch[f] !== 'string' || !ch[f].trim()) {
                errors.push(`Trap "${ch.id}": missing or empty "${f}".`);
            }
        }
        if (!Array.isArray(ch.codeLines) || ch.codeLines.length === 0) {
            errors.push(`Trap "${ch.id}": codeLines must be a non-empty array.`);
        } else if (!Array.isArray(ch.buggyLines) || ch.buggyLines.length === 0) {
            errors.push(`Trap "${ch.id}": buggyLines must be a non-empty array.`);
        } else {
            for (const ln of ch.buggyLines) {
                if (!Number.isInteger(ln) || ln < 1 || ln > ch.codeLines.length) {
                    errors.push(`Trap "${ch.id}": buggyLine ${ln} out of range 1..${ch.codeLines.length}.`);
                }
            }
        }
        if (!Array.isArray(ch.options) || ch.options.length < 2 || !ch.options.some(o => o.id === ch.answerId)) {
            errors.push(`Trap "${ch.id}": invalid options or missing answerId "${ch.answerId}".`);
        }
        if (!Array.isArray(ch.relatedCardIds) || ch.relatedCardIds.length === 0) {
            errors.push(`Trap "${ch.id}": relatedCardIds must reference >= 1 card.`);
        } else {
            for (const cid of ch.relatedCardIds) {
                if (!seenIds.has(cid)) {
                    errors.push(`Trap "${ch.id}": references invalid relatedCardId ${cid}.`);
                }
            }
        }
    }
}

// 3. Check copyright / external image capture references across all content & app files
const filesToScan = ['index.html', 'src/data.js', 'src/curriculum.js', 'src/app.js', 'manifest.webmanifest'];
for (const file of filesToScan) {
    const content = fs.readFileSync(file, 'utf8');
    if (/original infographic|캡처해서|스크린샷|이미지.*출처/i.test(content)) {
        errors.push(`${file}: contains forbidden external image/capture reference.`);
    }
}

// 4. Verify index.html local scripts are all listed in sw.js APP_SHELL
const indexHtml = fs.readFileSync('index.html', 'utf8');
const swCode = fs.readFileSync('sw.js', 'utf8');
const scriptMatches = [...indexHtml.matchAll(/<script[^>]+src="(src\/[^"]+)"/g)].map(m => m[1]);
for (const srcPath of scriptMatches) {
    if (!swCode.includes(`./${srcPath}`)) {
        errors.push(`sw.js: APP_SHELL is missing "./${srcPath}" referenced in index.html.`);
    }
}

// 5. Syntax check JS files
for (const file of ['src/app.js', 'src/curriculum.js', 'sw.js']) {
    new Function(fs.readFileSync(file, 'utf8'));
}

if (errors.length > 0) {
    console.error('❌ Harness validation failed:\n' + errors.map(e => `  - ${e}`).join('\n'));
    process.exit(1);
}

console.log(`✅ Harness validation passed! Cards: ${items.length}, Courses: ${curriculumTracks.length}, Traps: ${trapChallenges.length}`);
console.log('Category breakdown:', categoryCounts);
const levelCounts = items.reduce((acc, it) => {
    acc[`Lv.${it.level}`] = (acc[`Lv.${it.level}`] || 0) + 1;
    return acc;
}, {});
console.log('Difficulty breakdown:', levelCounts);
