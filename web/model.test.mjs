import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, DIMENSIONS, SEED, visibleNodes, queryNodes, propose, commitRecord, setVisibility } from './model.mjs';

const input = (overrides = {}) => ({
  title: '一个待核的判断', body: 'Zven 为这次判断保留了原材料。',
  excerpt: null, tense: 'present', eventTime: '时间待补', evidence: '来源待核',
  tags: [{ dimension: 'cognition', value: '判断依据' }], gaps: ['事件时间待补。'], notes: [],
  hypothesis: null, scenarioId: null, anchorId: null, relatedIds: [], ...overrides,
});

test('seed is a detached fictional demonstration covering six dimensions and three tenses', () => {
  const first = createState();
  const second = createState();
  assert.equal(first.nodes.length, 8);
  assert.equal(visibleNodes(first, true).length, 4);
  assert.deepEqual(new Set(first.nodes.flatMap((node) => node.tags.map((tag) => tag.dimension))), new Set(DIMENSIONS.map((dimension) => dimension.id)));
  assert.deepEqual(new Set(first.nodes.filter((node) => node.anchorId === 'demo-a01').map((node) => node.tense)), new Set(['past', 'present', 'future']));
  first.nodes[0].body = 'edited';
  first.nodes[0].tags[0].value = 'edited';
  assert.deepEqual(second, SEED);
});

test('public reading applies stricter Node × Scenario visibility and fails closed for unknown scenarios', () => {
  const state = createState();
  state.nodes[0].visibility = 'public';
  state.nodes[0].scenarioId = 'demo-s02';
  state.nodes[1].visibility = 'private';
  state.nodes[2].scenarioId = 'unknown';
  const publicIds = visibleNodes(state, true).map((node) => node.id);
  assert.deepEqual(publicIds, ['demo-n08']);
  assert.equal(visibleNodes(state).length, 8);
});

test('no content dimension requires pending; pending never enters any archive query', () => {
  const state = createState();
  assert.throws(() => commitRecord(state, input({ tags: [] })), /至少一个内容维/);
  const next = commitRecord(state, input({ tags: [], visibility: 'public' }), { pending: true });
  assert.equal(next.pending.length, 1);
  assert.ok(next.pending[0].id);
  assert.equal(next.pending[0].visibility, 'private');
  assert.equal(next.nodes.length, state.nodes.length);
  assert.equal(queryNodes(next).length, state.nodes.length);
  assert.equal(queryNodes(next, { publicOnly: true }).length, 4);
  assert.throws(() => setVisibility(next, next.pending[0].id, 'public'), /找不到/);
  assert.deepEqual(state, createState());
});

test('all hypothesis fields are mandatory, including for pending', () => {
  const state = createState();
  const hypothesis = { claim: '下次能定位依据。', revisitAt: '2026-10-01', falsifier: '找不到依据。' };
  for (const field of Object.keys(hypothesis)) {
    const incomplete = { ...hypothesis, [field]: '' };
    assert.throws(() => commitRecord(state, input({ tense: 'future', hypothesis: incomplete })), /假说/);
    assert.throws(() => commitRecord(state, input({ tense: 'future', hypothesis: incomplete, tags: [] }), { pending: true }), /假说/);
  }
  const next = commitRecord(state, input({ tense: 'future', hypothesis }));
  assert.deepEqual(next.nodes.at(-1).hypothesis, hypothesis);
});

test('a revision preserves the original address and snapshots previous content and tags', () => {
  const state = createState();
  const original = structuredClone(state.nodes[0]);
  const next = commitRecord(state, { body: 'Zven 补记：原材料后来被找到。', tags: [{ dimension: 'cognition', value: '改判' }] }, { mergeId: original.id });
  const revised = next.nodes.find((node) => node.id === original.id);
  assert.equal(next.nodes.length, state.nodes.length);
  assert.equal(revised.id, original.id);
  assert.equal(revised.revisions.length, 1);
  assert.equal(revised.revisions[0].body, original.body);
  assert.deepEqual(revised.revisions[0].tags, original.tags);
  assert.deepEqual(state.nodes[0], original);
  const twice = commitRecord(next, { title: '第二次修订' }, { mergeId: original.id });
  assert.equal(twice.nodes[0].revisions.length, 2);
  assert.equal(twice.nodes[0].revisions[0].body, original.body);
  assert.equal(twice.nodes[0].revisions[1].body, revised.body);
});

test('revisit adds a separate Node and leaves the original hypothesis fully unchanged', () => {
  const state = createState();
  const original = structuredClone(state.nodes.find((node) => node.id === 'demo-n03'));
  const next = commitRecord(state, input({ revisitResult: '无法判定' }), { revisitOf: original.id });
  const revisit = next.nodes.at(-1);
  assert.notEqual(revisit.id, original.id);
  assert.equal(revisit.revisitOf, original.id);
  assert.ok(revisit.relatedIds.includes(original.id));
  assert.deepEqual(next.nodes.find((node) => node.id === original.id), original);
  assert.equal(next.nodes.length, state.nodes.length + 1);
  assert.throws(() => commitRecord(state, input(), { revisitOf: original.id }), /回访结果/);
  assert.throws(() => commitRecord(state, input({ revisitResult: '成立' }), { revisitOf: 'demo-n01' }), /已有假说/);
  assert.throws(() => commitRecord(state, input({ revisitResult: '成立' }), { revisitOf: original.id, mergeId: original.id }), /不能覆盖/);
});

test('query intersects dimensions and values, supports scope and tense, and does not mutate records', () => {
  const state = createState();
  const before = structuredClone(state);
  const filters = [{ dimension: 'cognition', value: '判断依据' }, { dimension: 'methods', value: '保留反例' }];
  assert.deepEqual(queryNodes(state, { filters }).map((node) => node.id), ['demo-n02', 'demo-n03', 'demo-n07']);
  assert.deepEqual(queryNodes(state, { filters, publicOnly: true, tense: 'present', scenarioId: 'demo-s01' }).map((node) => node.id), ['demo-n02']);
  assert.deepEqual(queryNodes(state, { dimension: 'era', value: '人机边界', search: '模型' }).map((node) => node.id), ['demo-n05']);
  assert.deepEqual(queryNodes(state, { filters: [...filters, { dimension: 'cognition', value: '未决' }] }), []);
  assert.deepEqual(state, before);
});

test('create is always private, and visibility is a separate per-Node change', () => {
  const state = createState();
  const next = commitRecord(state, input({ visibility: 'public' }));
  const record = next.nodes.at(-1);
  assert.equal(record.visibility, 'private');
  assert.ok(record.archiveTime && !Number.isNaN(Date.parse(record.archiveTime)));
  const published = setVisibility(next, record.id, 'public');
  assert.equal(visibleNodes(published, true).length, 5);
  assert.equal(next.nodes.at(-1).visibility, 'private');
  const inPrivateScenario = commitRecord(state, input({ scenarioId: 'demo-s02' }));
  const changed = setVisibility(inPrivateScenario, inPrivateScenario.nodes.at(-1).id, 'public');
  assert.equal(visibleNodes(changed, true).length, 4);
});

test('structure rejects empty evidence/time, incomplete excerpts, unknown dimensions and bad associations', () => {
  const state = createState();
  for (const field of ['title', 'body', 'eventTime', 'evidence']) assert.throws(() => commitRecord(state, input({ [field]: '' })), /尚未确认/);
  assert.throws(() => commitRecord(state, input({ excerpt: { text: '我记得。', time: '', evidence: '待核' } })), /摘录时间/);
  assert.throws(() => commitRecord(state, input({ tags: [{ dimension: 'invented', value: 'x' }] })), /不能自动创建/);
  assert.throws(() => commitRecord(state, input({ scenarioId: 'missing' })), /所选场/);
  assert.throws(() => commitRecord(state, input({ relatedIds: ['missing'] })), /关联的 Node/);
});

test('proposal is deterministic, preserves first-person material and never invents a date or publishes', () => {
  const text = '我以前认为这个判断成立，现在找不到依据。';
  const proposal = propose(text);
  assert.deepEqual(proposal, propose(text));
  assert.equal(proposal.body, '');
  assert.equal(proposal.excerpt.text, text);
  assert.equal(proposal.tense, 'past');
  assert.equal(proposal.eventTime, '时间待补');
  assert.ok(proposal.gaps.length);
  assert.equal('visibility' in proposal, false);
  assert.equal('archiveTime' in proposal, false);
  assert.ok(proposal.notes.some((note) => note.includes('本地关键词')));
  assert.equal(propose('2026-09-18，Zven 保留了判断依据。').eventTime, '2026-09-18');
  assert.deepEqual(propose('一小段尚不明确的材料。').tags, []);
  assert.throws(() => commitRecord(createState(), { ...propose('未来会怎样'), title: '假说候选', tags: [{ dimension: 'cognition', value: '未决' }] }), /假说/);
});

test('public search does not surface private revisions', () => {
  const state = createState();
  state.nodes[0].revisions.push({ body: '不应从旧版检索命中' });
  assert.deepEqual(queryNodes(state, { publicOnly: true, search: '不应从旧版检索命中' }), []);
});
