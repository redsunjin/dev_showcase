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
    ['ai-agent', 'AI·LLM·에이전트']
]);

const errors = [];

// 1. Load & parse src/data.js
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
        errors.push(`Duplicate id=${item.id}.`);
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

// 2. Check copyright / external image capture references
const filesToScan = ['index.html', 'src/data.js', 'src/app.js', 'manifest.webmanifest'];
for (const file of filesToScan) {
    const content = fs.readFileSync(file, 'utf8');
    if (/original infographic|캡처해서|스크린샷|이미지.*출처/i.test(content)) {
        errors.push(`${file}: contains forbidden external image/capture reference.`);
    }
}

// 3. Check total count alignment in index.html & manifest.webmanifest
const indexHtml = fs.readFileSync('index.html', 'utf8');
const totalStr = String(items.length);
if (!indexHtml.includes(`${totalStr}선`)) {
    errors.push(`index.html: expected "${totalStr}선" title/heading.`);
}

const manifest = JSON.parse(fs.readFileSync('manifest.webmanifest', 'utf8'));
if (!manifest.name.includes(`${totalStr}선`)) {
    errors.push(`manifest.webmanifest: expected "${totalStr}선" in name.`);
}

// 4. Syntax check app.js & sw.js
for (const file of ['src/app.js', 'sw.js']) {
    new Function(fs.readFileSync(file, 'utf8'));
}

if (errors.length > 0) {
    console.error('❌ Harness validation failed:\n' + errors.map(e => `  - ${e}`).join('\n'));
    process.exit(1);
}

console.log(`✅ Harness validation passed! Total items: ${items.length}`);
console.log('Category breakdown:', categoryCounts);
const levelCounts = items.reduce((acc, it) => {
    acc[`Lv.${it.level}`] = (acc[`Lv.${it.level}`] || 0) + 1;
    return acc;
}, {});
console.log('Difficulty breakdown:', levelCounts);
