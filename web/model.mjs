/**
 * Local prototype model. All seed records, dates, project/relationship labels,
 * excerpts and notes below are fictional demonstration material, not a Zven archive.
 * Proposed tags are local keyword suggestions. Nothing here calls an AI or persists data.
 */
export const DIMENSIONS = [
  { id: 'cognition', label: '认知判断', english: 'Judgment', description: '判断、依据，与后来发生的改判。' },
  { id: 'projects', label: '作品项目', english: 'Projects', description: '一件作品从起意到停留的痕迹。' },
  { id: 'methods', label: '技艺方法', english: 'Methods', description: '做事的方式，以及它的适用边界。' },
  { id: 'relations', label: '关系接触面', english: 'Relations', description: '以代号留下与 Zven 相接的那一面。' },
  { id: 'era', label: '时代索引', english: 'Era', description: '人机边界、注意力与记忆的变化。' },
  { id: 'orientation', label: '意义取向', english: 'Orientation', description: '选择与停留的方向，仍允许未决。' },
];

const demoNode = (fields) => ({
  excerpt: null,
  tense: 'present',
  archiveTime: '2026-09-28T08:00:00.000Z',
  evidence: '虚构演示材料；不对应真实事件',
  scenarioId: null,
  anchorId: null,
  visibility: 'private',
  gaps: [],
  notes: [],
  hypothesis: null,
  relatedIds: [],
  revisitOf: null,
  revisitResult: null,
  revisions: [],
  ...fields,
});

export const SEED = {
  nodes: [
    demoNode({
      id: 'demo-n01',
      title: '那个判断，还没有依据',
      body: 'Zven 重新读到一页旧笔记。页上写着“清楚了”，下面没有推导，也没有当时用过的材料。如今能确认的，只是他曾经写下这三个字。',
      excerpt: { text: '我记得自己当时很确定。但为什么确定，已经说不清了。', time: '2026-09-12（虚构示例）', evidence: '演示用自述；事件日期未记' },
      tense: 'past',
      eventTime: '2026 年夏，具体日期未记（虚构示例）',
      tags: [{ dimension: 'cognition', value: '判断依据' }, { dimension: 'era', value: '记忆外包' }],
      scenarioId: 'demo-s01',
      anchorId: 'demo-a01',
      visibility: 'public',
      gaps: ['旧判断所依据的材料未留存。'],
      notes: ['观察者：这条记录能证明笔记存在，不能复原当时的理由。'],
      relatedIds: ['demo-n02'],
    }),
    demoNode({
      id: 'demo-n02',
      title: '先留下依据，再写结论',
      body: 'Zven 给示例项目的一次取舍留下两段材料：一段支持继续，一段支持暂停。结论仍是继续；与上一版相比，多出的不是把握，而是可以重新检查的理由。',
      excerpt: { text: '我现在能接受以后改判，前提是还找得到这次怎么想的。', time: '2026-09-18（虚构示例）', evidence: '演示用当日自述' },
      eventTime: '2026-09-18（虚构示例）',
      tags: [{ dimension: 'cognition', value: '判断依据' }, { dimension: 'methods', value: '保留反例' }, { dimension: 'projects', value: '示例项目' }],
      scenarioId: 'demo-s01',
      anchorId: 'demo-a01',
      visibility: 'public',
      notes: ['观察者：两段材料的适用范围不同。它们被并置，但尚未互相抵消。'],
      relatedIds: ['demo-n01', 'demo-n03'],
    }),
    demoNode({
      id: 'demo-n03',
      title: '下一次取舍，能否找回理由',
      body: '观察者暂记一条假说：保留相反材料后，Zven 下次回看这项取舍时，能区分原来的依据与后来补上的解释。',
      tense: 'future',
      eventTime: '2026-09-26，拟回访时点（虚构示例）',
      tags: [{ dimension: 'cognition', value: '判断依据' }, { dimension: 'methods', value: '保留反例' }],
      scenarioId: 'demo-s01',
      anchorId: 'demo-a01',
      visibility: 'public',
      evidence: '演示用假说；尚不能当作事实',
      hypothesis: {
        claim: 'Zven 下次回看时，能从保留材料中找出原取舍的至少一项依据。',
        revisitAt: '2026-09-26（虚构示例）',
        falsifier: '回看时无法定位原依据，或把后来补写的解释误当成原依据。',
      },
      notes: ['观察者：回访需要对照原材料。只记“好像更清楚了”不足以判定。'],
      relatedIds: ['demo-n02'],
    }),
    demoNode({
      id: 'demo-n04',
      title: '一个暂时没有名字的方向',
      body: 'Zven 删去了示例项目介绍里关于“最终形态”的一段话。他保留了三个尚未解决的问题。这次删改没有留下新的方向词。',
      eventTime: '2026-09-20（虚构示例）',
      tags: [{ dimension: 'orientation', value: '方向未定' }, { dimension: 'projects', value: '示例项目' }],
      scenarioId: 'demo-s01',
      gaps: ['删改时的考虑尚未记录。'],
      relatedIds: ['demo-n02'],
    }),
    demoNode({
      id: 'demo-n05',
      title: '机器补全的半句话',
      body: '模型给一段未完成的笔记补上了原因。Zven 删除补写的半句话，留下原来的断句。现有材料没有记录那句原因从何而来。',
      eventTime: '2026-09-21（虚构示例）',
      tags: [{ dimension: 'era', value: '人机边界' }, { dimension: 'methods', value: '保留断句' }],
      scenarioId: 'demo-s02',
      gaps: ['原笔记所指事件的时间未记。'],
      notes: ['观察者：补全来自模型。它的语法完整，不增加事件证据。'],
      relatedIds: ['demo-n08'],
    }),
    demoNode({
      id: 'demo-n06',
      title: '只留下接触到的那一面',
      body: 'Zven 把一页方案交给“示例合作者”。对方圈出了两处含混表达，没有评价整个项目。记录止于这两处批注，未据此推测对方的态度。',
      eventTime: '2026-09-22（虚构示例）',
      tags: [{ dimension: 'relations', value: '示例合作者' }, { dimension: 'projects', value: '示例项目' }],
      scenarioId: 'demo-s02',
      notes: ['观察者：“示例合作者”仅为虚构演示代号，不是现实代号表的新增项。'],
      relatedIds: ['demo-n02'],
    }),
    demoNode({
      id: 'demo-n07',
      title: '回访：理由找到了，顺序没有',
      body: '回看时，Zven 找到了当时保留的两段材料，却不能确认结论写在材料之前还是之后。原假说需要区分原依据与后来补写的解释；现有记录还不足以判定。',
      eventTime: '2026-09-26（虚构示例）',
      tags: [{ dimension: 'cognition', value: '判断依据' }, { dimension: 'methods', value: '保留反例' }],
      scenarioId: 'demo-s01',
      anchorId: 'demo-a01',
      gaps: ['材料与结论的写入先后无法还原。'],
      revisitOf: 'demo-n03',
      revisitResult: '无法判定',
      relatedIds: ['demo-n03'],
    }),
    demoNode({
      id: 'demo-n08',
      title: '记下“没记住”',
      body: 'Zven 翻检旧记录，找不到那次改判的起点。留存的材料只有改判后的版本。这次归档把空缺保留下来，没有用后来的叙述填回过去。',
      tense: 'past',
      eventTime: '时间待补（虚构示例）',
      tags: [{ dimension: 'era', value: '记忆外包' }, { dimension: 'cognition', value: '未决' }],
      visibility: 'public',
      gaps: ['改判的事件时间未知；旧版材料缺失。'],
      notes: ['观察者：当前能确认的是材料缺失，而不是当时没有发生改变。'],
      relatedIds: ['demo-n01'],
    }),
  ],
  pending: [],
  drafts: [],
  scenarios: [
    { id: 'demo-s01', title: '一次判断的前后', description: '虚构示例场：把一页旧笔记、一次取舍与后续回访放在一起。', visibility: 'public' },
    { id: 'demo-s02', title: '材料经过谁的手', description: '虚构示例场：保留人、模型与记录之间的接触边界。', visibility: 'private' },
  ],
  anchors: [
    { id: 'demo-a01', title: '判断如何留下', description: '虚构示例锚点：溯源、现场与假说在同一处并置。' },
  ],
};

const clone = (value) => structuredClone(value);
const dimensionIds = new Set(DIMENSIONS.map(({ id }) => id));
const tenses = new Set(['past', 'present', 'future']);
const visibilities = new Set(['private', 'public']);
const revisitResults = new Set(['成立', '不成立', '无法判定']);

export function createState() {
  return clone(SEED);
}

/** Visibility is a reading projection, not authentication or access control. */
export function visibleNodes(state, publicOnly = false) {
  if (!publicOnly) return state.nodes.slice();
  const scenarios = new Map(state.scenarios.map((scenario) => [scenario.id, scenario]));
  return state.nodes.filter((node) => node.visibility === 'public'
    && (node.scenarioId == null || scenarios.get(node.scenarioId)?.visibility === 'public'));
}

export function queryNodes(state, {
  publicOnly = false, dimension = '', value = '', tense = '', scenarioId = '', search = '', filters = [],
} = {}) {
  const terms = [...filters];
  if (dimension) terms.push({ dimension, value });
  const needle = String(search).trim().toLocaleLowerCase();
  return visibleNodes(state, publicOnly).filter((node) => {
    if (tense && node.tense !== tense) return false;
    if (scenarioId && node.scenarioId !== scenarioId) return false;
    if (!terms.every((filter) => node.tags.some((tag) => tag.dimension === filter.dimension
      && (!filter.value || tag.value === filter.value)))) return false;
    if (!needle) return true;
    // Deliberately exclude revisions: their public scope is unresolved.
    const text = [node.title, node.body, node.excerpt?.text, node.evidence,
      ...node.tags.map((tag) => tag.value), ...node.gaps, ...node.notes,
      node.hypothesis?.claim, node.revisitResult].filter(Boolean).join('\n').toLocaleLowerCase();
    return text.includes(needle);
  });
}

const suggestionRules = [
  { dimension: 'cognition', pattern: /判断|依据|改判|结论|认为|证据|确定/u, value: '判断依据' },
  { dimension: 'projects', pattern: /项目|作品|方案|原型/u, value: '项目取值待确认' },
  { dimension: 'methods', pattern: /方法|步骤|做法|验证|反例|复核|流程/u, value: '方法取值待确认' },
  { dimension: 'era', pattern: /模型|人工智能|\bAI\b|人机|记忆|注意力/u, value: '时代取值待确认' },
  { dimension: 'orientation', pattern: /方向|取舍|意义|停留/u, value: '方向待确认' },
];

/** A deterministic, explainable helper. Returned fields remain unconfirmed. */
export function propose(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('先留下要整理的碎片。');
  const material = text.trim();
  const matched = suggestionRules.filter((rule) => rule.pattern.test(material));
  const tags = matched.map(({ dimension, value }) => ({ dimension, value }));
  const firstPerson = /我|我们|咱|\b(?:I|my|me|we|our)\b/iu.test(material);
  const tense = /假说|假设|将来|未来|下次|预计/u.test(material) ? 'future'
    : /当年|以前|过去|回忆|曾经|那年|小时候/u.test(material) ? 'past' : 'present';
  // Extract only literal complete date strings; never resolve relative dates.
  const date = material.match(/\b\d{4}-\d{2}-\d{2}\b/u)?.[0]
    || material.match(/\d{4}年\d{1,2}月\d{1,2}日/u)?.[0];
  const eventTime = date || '时间待补';
  const evidence = '来源待核';
  const notes = [matched.length
    ? `观察者：本地关键词整理命中了${matched.map(({ dimension }) => `“${DIMENSIONS.find((item) => item.id === dimension).label}”`).join('、')}；归属与取值仍需确认。`
    : '观察者：本地关键词未找到明确归属；可手动归维，或确认留在待归维队列。'];
  if (firstPerson) notes.push('观察者：原话已保留为摘录候选，正文留空，待你补写第三人称观察。');
  if (date) notes.push('观察者：时间来自原文中的日期字符串；它是否指事件时间仍需确认。');
  if (tense === 'future') notes.push('观察者：假说内容、回访时间点与不成立条件都需要补齐。');
  return {
    title: material.split(/[。！？\n]/u)[0].slice(0, 28),
    body: firstPerson ? '' : material,
    excerpt: firstPerson ? { text: material, time: eventTime, evidence } : null,
    tags,
    tense,
    eventTime,
    evidence,
    gaps: date ? [] : ['事件时间待补。'],
    notes,
    hypothesis: tense === 'future' ? { claim: '', revisitAt: '', falsifier: '' } : null,
  };
}

function nonempty(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}尚未确认。`);
  return value.trim();
}

function strings(value, label) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) throw new Error(`${label}格式不正确。`);
  return value.map((item) => item.trim()).filter(Boolean);
}

function nullableId(value, label) {
  if (value == null || value === '') return null;
  return nonempty(value, label);
}

function normalizeRecord(input, { pending, base, now, revisitOf }) {
  const title = nonempty(input.title, '标题');
  const body = nonempty(input.body, '观察者正文');
  if (!tenses.has(input.tense)) throw new Error('请确认溯源、现场或假说时态。');
  const eventTime = nonempty(input.eventTime, '事件时间或明确的时间缺口');
  const evidence = nonempty(input.evidence, '证据说明');
  if (!Array.isArray(input.tags)) throw new Error('内容维标记格式不正确。');
  const tags = input.tags.map((tag) => {
    if (!tag || !dimensionIds.has(tag.dimension)) throw new Error('内容维尚未确认；不能自动创建新维度。');
    return { dimension: tag.dimension, value: nonempty(tag.value, '内容维取值') };
  }).filter((tag, index, all) => all.findIndex((other) => other.dimension === tag.dimension && other.value === tag.value) === index);
  if (!pending && !tags.length) throw new Error('确认至少一个内容维，或留在待归维队列。');
  let excerpt = null;
  if (input.excerpt != null) {
    excerpt = {
      text: nonempty(input.excerpt.text, '摘录原话'),
      time: nonempty(input.excerpt.time, '摘录时间或明确的时间缺口'),
      evidence: nonempty(input.excerpt.evidence, '摘录证据说明'),
    };
  }
  let hypothesis = null;
  if (input.tense === 'future') {
    hypothesis = {
      claim: nonempty(input.hypothesis?.claim, '假说内容'),
      revisitAt: nonempty(input.hypothesis?.revisitAt, '假说回访时间点'),
      falsifier: nonempty(input.hypothesis?.falsifier, '假说不成立条件'),
    };
  } else if (input.hypothesis != null) {
    throw new Error('假说条件只附在假说态记录上；请确认时态。');
  }
  const result = nullableId(input.revisitResult, '回访结果');
  if (revisitOf && !revisitResults.has(result)) throw new Error('请确认回访结果：成立、不成立或无法判定。');
  if (!revisitOf && result) throw new Error('回访结果需要关联原假说。');
  return {
    id: base?.id || crypto.randomUUID(), title, body, excerpt,
    tense: input.tense, eventTime, archiveTime: now, evidence, tags,
    scenarioId: nullableId(input.scenarioId, '所属场'),
    anchorId: nullableId(input.anchorId, '主题锚点'),
    // Creating or editing never grants visibility. That is a separate explicit action.
    visibility: base?.visibility || 'private',
    gaps: strings(input.gaps, '缺口'), notes: strings(input.notes, '边注'), hypothesis,
    relatedIds: [...new Set([...strings(input.relatedIds, '关联记录'), ...(revisitOf ? [revisitOf] : [])])],
    revisitOf, revisitResult: result,
    revisions: base ? [...clone(base.revisions), { ...clone(base), revisions: [] }] : [],
  };
}

/** Call only after Human confirmation. Returns a new state without mutating inputs. */
export function commitRecord(state, input, { pending = false, mergeId = null, revisitOf = null } = {}) {
  if (!input || typeof input !== 'object') throw new Error('没有可确认的记录。');
  if (pending && mergeId) throw new Error('已落盘 Node 不能退回待归维队列。');
  if (mergeId && revisitOf) throw new Error('回访必须成为新记录，不能覆盖原记录。');
  const base = mergeId ? state.nodes.find((node) => node.id === mergeId) : null;
  if (mergeId && !base) throw new Error('找不到要修订的 Node。');
  const merged = base ? { ...base, ...input } : input;
  const origin = revisitOf || merged.revisitOf || null;
  if (origin) {
    const original = state.nodes.find((node) => node.id === origin);
    if (!original || original.tense !== 'future' || !original.hypothesis) throw new Error('回访需要关联一条已有假说。');
    if (mergeId === origin) throw new Error('回访不能修改原假说。');
    if (pending) throw new Error('回访结果需确认内容维后，成为新的 Node。');
  }
  const now = new Date().toISOString();
  const record = normalizeRecord(merged, { pending, base, now, revisitOf: origin });
  if (record.scenarioId && !state.scenarios.some((scenario) => scenario.id === record.scenarioId)) throw new Error('所选场不存在，请重新确认。');
  if (record.anchorId && !state.anchors.some((anchor) => anchor.id === record.anchorId)) throw new Error('所选锚点不存在，请重新确认。');
  if (record.relatedIds.some((id) => !state.nodes.some((node) => node.id === id))) throw new Error('关联的 Node 不存在，请重新确认。');
  const next = clone(state);
  if (base) next.nodes[next.nodes.findIndex((node) => node.id === base.id)] = record;
  else if (pending) next.pending.push(record);
  else next.nodes.push(record);
  // Original hypothesis stays byte-for-byte intact; reverse links derive from revisitOf.
  return next;
}

export function setVisibility(state, id, visibility) {
  if (!visibilities.has(visibility)) throw new Error('可见性只能是 private 或 public。');
  const index = state.nodes.findIndex((node) => node.id === id);
  if (index === -1) throw new Error('找不到可设置可见性的 Node。');
  const next = clone(state);
  next.nodes[index].visibility = visibility;
  return next;
}
