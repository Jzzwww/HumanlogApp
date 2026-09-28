import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import * as model from './model.mjs';

// Run the actual application handlers and renderers in an isolated VM. The small
// host below supplies browser boundaries only; no browser or user storage is touched.
const source = readFileSync(new URL('./app.mjs', import.meta.url), 'utf8')
  .replace(/^import\s+\{[^}]+\}\s+from\s+['"]\.\/model\.mjs['"];?\s*/u, '');
const storageKey = 'zven.context.preview.v1';
const plain = (value) => JSON.parse(JSON.stringify(value));

function harness({ state = model.createState(), hash = '#/' } = {}) {
  const documentHandlers = new Map();
  const windowHandlers = new Map();
  const storage = new Map([[storageKey, JSON.stringify(state)]]);
  const app = { innerHTML: '' };
  const toast = { textContent: '', classList: { add() {}, remove() {} } };
  let formControls = null;
  class TestFormData {
    constructor(form) { this.values = new Map(Object.entries(form.controls)); }
    get(name) { return this.values.get(name) ?? null; }
    has(name) { return this.values.has(name); }
    entries() { return this.values.entries(); }
    [Symbol.iterator]() { return this.entries(); }
  }
  const context = vm.createContext({
    ...model,
    structuredClone,
    crypto: { randomUUID },
    URL,
    URLSearchParams,
    FormData: TestFormData,
    Date,
    setTimeout: () => 0,
    clearTimeout() {},
    location: { hash, origin: 'http://127.0.0.1:4318', pathname: '/' },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
    },
    navigator: { clipboard: { async writeText() {} } },
    document: {
      title: '',
      querySelector(selector) {
        if (selector === '#app') return app;
        if (selector === '#toast') return toast;
        if (selector === '#main') return { focus() {} };
        if (selector === '#confirm-form' && formControls && app.innerHTML.includes('id="confirm-form"')) return { controls: formControls };
        if (selector === '#capture') return { value: vm.runInContext('draft().text', context) };
        return null;
      },
      addEventListener: (event, callback) => documentHandlers.set(event, callback),
    },
    window: {
      scrollY: 0,
      scrollTo() {},
      addEventListener: (event, callback) => windowHandlers.set(event, callback),
    },
  });
  vm.runInContext(source, context, { filename: 'app.mjs' });
  return {
    run: (expression) => vm.runInContext(expression, context),
    read: (expression) => plain(vm.runInContext(expression, context)),
    stored: () => JSON.parse(storage.get(storageKey)),
    html: () => app.innerHTML,
    setForm(record) {
      formControls = {
        title: record.title,
        body: record.body,
        tense: record.tense,
        eventTime: record.eventTime,
        evidence: record.evidence,
        scenarioId: record.scenarioId || '',
        anchorId: record.anchorId || '',
        gaps: (record.gaps || []).join('\n'),
        excerptText: record.excerpt?.text || '',
        excerptTime: record.excerpt?.time || '',
        excerptEvidence: record.excerpt?.evidence || '',
        claim: record.hypothesis?.claim || '',
        revisitAt: record.hypothesis?.revisitAt || '',
        falsifier: record.hypothesis?.falsifier || '',
        revisitResult: record.revisitResult || '',
      };
      for (const dimension of model.DIMENSIONS) {
        const tags = record.tags.filter((tag) => tag.dimension === dimension.id);
        if (tags.length) {
          formControls[`dim-${dimension.id}`] = 'on';
          formControls[`value-${dimension.id}`] = tags.map((tag) => tag.value).join('、');
        }
      }
    },
    async click(action, id) {
      await documentHandlers.get('click')({
        target: { closest: () => ({ dataset: { action, id } }) },
        preventDefault() {},
      });
    },
    hashchange(nextHash) {
      context.location.hash = nextHash;
      windowHandlers.get('hashchange')();
    },
  };
}

function withCurrentDraft(context = {}) {
  const state = model.createState();
  const form = {
    ...structuredClone(state.nodes[0]),
    title: '还没完成的确认稿',
    body: '观察者已经手工补写了这段正文，不能被下一次打开覆盖。',
    evidence: '人工补充的证据说明',
    tags: [{ dimension: 'methods', value: '手工确认的取值' }],
  };
  state.drafts = [{
    id: 'current',
    text: '先前留下、尚未收录的原始碎片。',
    updatedAt: '2026-09-28T08:00:00.000Z',
    proposal: { form, mergeId: 'demo-n01', revisitOf: null, pendingSource: null, ...context },
  }];
  state.pending.push({ ...structuredClone(state.nodes[3]), id: 'pending-test', tags: [] });
  return state;
}

for (const [action, id] of [
  ['edit', 'demo-n02'],
  ['revisit', 'demo-n03'],
  ['continue-pending', 'pending-test'],
]) {
  test(`${action}: opening another writing task preserves a draft that can be restored after reload`, async () => {
    const initial = withCurrentDraft();
    const expected = structuredClone(initial.drafts[0]);
    const app = harness({ state: initial, hash: '#/node/demo-n02' });
    await app.click(action, id);
    const parked = app.read('state.drafts').find((draft) => draft.id !== 'current' && draft.text === expected.text);
    assert.ok(parked, 'the displaced draft must have its own saved entry');
    assert.deepEqual(parked.proposal, expected.proposal);
    assert.notEqual(app.read('draft()').proposal.form.body, expected.proposal.form.body);

    const reloaded = harness({ state: app.stored(), hash: '#/write' });
    await reloaded.click('restore-draft', parked.id);
    const restored = reloaded.read('draft()');
    assert.equal(restored.text, expected.text);
    assert.deepEqual(restored.proposal, expected.proposal);
    assert.equal(reloaded.run('ui.stage'), 'confirm');
    assert.equal(reloaded.run('ui.mergeId'), expected.proposal.mergeId);
    assert.equal(reloaded.run('ui.proposal.body'), expected.proposal.form.body);
  });
}

for (const context of [
  { mergeId: 'demo-n01', revisitOf: null, pendingSource: null },
  { mergeId: null, revisitOf: 'demo-n03', pendingSource: null },
  { mergeId: null, revisitOf: null, pendingSource: 'pending-test' },
]) {
  const mode = context.mergeId ? 'revision' : context.revisitOf ? 'revisit' : 'pending';
  test(`back-capture keeps the manually edited ${mode} form and its context across reload`, async () => {
    const initial = withCurrentDraft(context);
    const edited = {
      ...structuredClone(initial.drafts[0].proposal.form),
      body: `尚在表单中的 ${mode} 新正文。`,
      evidence: '在确认页改写后的证据',
      ...(context.revisitOf ? { revisitResult: '无法判定' } : {}),
    };
    const app = harness({ state: initial, hash: '#/write' });
    app.setForm(edited);
    await app.click('back-capture');
    const saved = app.read('draft()');
    assert.equal(app.run('ui.stage'), 'capture');
    assert.equal(saved.text, initial.drafts[0].text);
    assert.equal(saved.proposal.form.body, edited.body);
    assert.equal(saved.proposal.form.evidence, edited.evidence);
    for (const key of ['mergeId', 'revisitOf', 'pendingSource']) assert.equal(saved.proposal[key], context[key]);

    const reloaded = harness({ state: app.stored(), hash: '#/write' });
    assert.equal(reloaded.run('ui.proposal.body'), edited.body);
    for (const key of ['mergeId', 'revisitOf', 'pendingSource']) assert.equal(reloaded.run(`ui.${key}`), context[key]);
  });
}

test('malformed encoded addresses render an empty state on initial load and navigation', () => {
  for (const hash of ['#/node/%', '#/node/%E0%A4%A', '#/pending/%ZZ', '#/anchor/%']) {
    let app;
    assert.doesNotThrow(() => { app = harness({ hash }); });
    assert.ok(app.html().includes('class="empty"'), 'bad addresses need a readable empty state');
    assert.doesNotThrow(() => app.hashchange('#/node/%'));
  }
});

test('public scoped reading never reveals a private Scenario name or description', () => {
  const state = model.createState();
  state.scenarios.find((scenario) => scenario.id === 'demo-s02').title = 'PRIVATE_SCENARIO_TITLE';
  state.scenarios.find((scenario) => scenario.id === 'demo-s02').description = 'PRIVATE_SCENARIO_DESCRIPTION';
  const app = harness({ state });
  app.run('ui.publicOnly = true');
  for (const expression of [
    "recordsPage(new URLSearchParams('scenario=demo-s02'))",
    "recordsPage(new URLSearchParams('scenario=demo-s02'), 'era')",
    "anchorPage('demo-a01', new URLSearchParams('scenario=demo-s02'))",
  ]) {
    const html = app.run(expression);
    assert.ok(!html.includes('PRIVATE_SCENARIO_TITLE'));
    assert.ok(!html.includes('PRIVATE_SCENARIO_DESCRIPTION'));
    assert.ok(html.includes('此处无公开内容'));
  }
});

test('Scenario anchor links and routed anchor views keep the same Scenario scope', () => {
  const state = model.createState();
  const elsewhere = state.nodes.find((node) => node.id === 'demo-n05');
  elsewhere.anchorId = 'demo-a01';
  elsewhere.title = 'SECOND_SCENARIO_ONLY';
  const original = state.nodes.find((node) => node.id === 'demo-n02');
  original.title = 'FIRST_SCENARIO_ONLY';
  const app = harness({ state });
  const scenarioHtml = app.run("scenarioPage('demo-s02')");
  assert.match(scenarioHtml, /#\/anchor\/demo-a01\?[^"\s]*scenario=demo-s02/u);
  const scoped = app.run("anchorPage('demo-a01', new URLSearchParams('scenario=demo-s02'))");
  assert.ok(scoped.includes('SECOND_SCENARIO_ONLY'));
  assert.ok(!scoped.includes('FIRST_SCENARIO_ONLY'));
  assert.ok(scoped.includes('材料经过谁的手'), 'the current Scenario should remain legible');
  const routed = app.run("content({path:'/anchor/demo-a01', params:new URLSearchParams('scenario=demo-s02')})");
  assert.ok(routed.includes('SECOND_SCENARIO_ONLY'));
  assert.ok(!routed.includes('FIRST_SCENARIO_ONLY'));
  const wholeDossier = app.run("anchorPage('demo-a01')");
  assert.ok(wholeDossier.includes('FIRST_SCENARIO_ONLY'));
  assert.ok(wholeDossier.includes('SECOND_SCENARIO_ONLY'));
});
