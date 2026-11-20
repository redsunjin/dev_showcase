import fs from 'node:fs';
import assert from 'node:assert/strict';

const dataCode = fs.readFileSync('src/data.js', 'utf8');
const { items, getInfographic } = new Function(dataCode + '; return { items, getInfographic };')();

// 1. Verify total count and categories
assert.equal(items.length, 152, 'Expected 152 total items');
const byCategory = items.reduce((acc, it) => {
    acc[it.category] = (acc[it.category] || 0) + 1;
    return acc;
}, {});
assert.equal(byCategory['testing'], 15);
assert.equal(byCategory['devops'], 15);
assert.equal(byCategory['ai-agent'], 15);

// 2. Verify difficulty levels & priority sorting
const lv1 = items.filter(i => i.level === 1);
const lv2 = items.filter(i => i.level === 2);
const lv3 = items.filter(i => i.level === 3);
assert.equal(lv1.length + lv2.length + lv3.length, 152);

const sortedByPriority = [...items].sort((a, b) => (a.level - b.level) || (a.id - b.id));
assert.equal(sortedByPriority[0].level, 1, 'First item in priority sort must be Lv.1');
assert.equal(sortedByPriority[sortedByPriority.length - 1].level, 3, 'Last item in priority sort must be Lv.3');

// 3. Verify HTML escaping safety for item #2 (<script> in defense)
const item2 = items.find(i => i.id === 2);
assert.ok(item2.defense.includes('<script>'), 'Item #2 should contain <script> text');

// 4. Verify all 152 infographics render non-empty HTML
for (const it of items) {
    const html = getInfographic(it.id);
    assert.ok(typeof html === 'string' && html.length > 10, `Infographic missing for #${it.id}`);
}

// 5. Verify index.html & styles.css mobile/word-break rules
const css = fs.readFileSync('assets/styles.css', 'utf8');
assert.ok(css.includes('word-break: keep-all'), 'styles.css must include word-break: keep-all');
assert.ok(css.includes('overscroll-behavior: contain'), 'styles.css must contain modal overscroll');

const html = fs.readFileSync('index.html', 'utf8');
assert.ok(html.includes('data-category="testing"'), 'index.html missing testing category tab');
assert.ok(html.includes('data-category="devops"'), 'index.html missing devops category tab');
assert.ok(html.includes('data-category="ai-agent"'), 'index.html missing ai-agent category tab');
assert.ok(html.includes('data-level="1"'), 'index.html missing difficulty filter');
assert.ok(html.includes('id="sortPriorityBtn"'), 'index.html missing priority sort button');
assert.ok(html.includes('id="tracksView"'), 'index.html missing tracksView');
assert.ok(html.includes('id="trapsView"'), 'index.html missing trapsView');
assert.ok(html.includes('id="themeToggleBtn"'), 'index.html missing themeToggleBtn');
assert.ok(html.includes('id="simReplayBtn"'), 'index.html missing simReplayBtn');
assert.ok(html.includes('id="simPauseBtn"'), 'index.html missing simPauseBtn');
assert.ok(!html.includes('치트시트'), 'index.html should use 카드 terminology instead of 치트시트');
assert.ok(css.includes('html.light'), 'styles.css missing light mode theme rules');
assert.ok(css.includes('sim-stage'), 'styles.css missing course simulation stage rules');
assert.ok(css.includes('bg-slate-950\\/70'), 'styles.css missing light override for bg-slate-950/70');

// 6. Verify curriculumTracks & trapChallenges integrity
const curriculumCode = fs.readFileSync('src/curriculum.js', 'utf8');
const { curriculumTracks, trapChallenges } = new Function(curriculumCode + '; return { curriculumTracks, trapChallenges };')();
const validIds = new Set(items.map(i => i.id));
assert.equal(curriculumTracks.length, 4, 'Expected 4 curriculum tracks');
for (const tr of curriculumTracks) {
    assert.ok(tr.steps.length >= 8, `Track ${tr.id} must have >= 8 steps`);
    let hasVariant = false;
    for (const st of tr.steps) {
        assert.ok(typeof st.shortTitle === 'string' && st.shortTitle.length > 0, `Track ${tr.id} step missing shortTitle`);
        const ids = Array.isArray(st.cardIds) ? st.cardIds : (st.cardId ? [st.cardId] : []);
        assert.ok(ids.length >= 1, `Track ${tr.id} step ${st.title} must link at least 1 card`);
        for (const cid of ids) {
            assert.ok(validIds.has(cid), `Track ${tr.id} references invalid cardId ${cid}`);
        }
        if (Array.isArray(st.variants) && st.variants.length >= 2) hasVariant = true;
    }
    assert.ok(hasVariant, `Track ${tr.id} must include at least 1 interactive variant step`);
}
assert.equal(trapChallenges.length, 10, 'Expected 10 trap challenges');
for (const ch of trapChallenges) {
    assert.ok(ch.options.some(o => o.id === ch.answerId), `Trap ${ch.id} answerId missing in options`);
    for (const cid of ch.relatedCardIds) {
        assert.ok(validIds.has(cid), `Trap ${ch.id} references invalid cardId ${cid}`);
    }
}

console.log('✅ All functional & structural assertions passed (152 items, 10 categories, 3 difficulty levels, 4 tracks, 10 traps).');
