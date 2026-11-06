import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const contentRoot = path.join(root, 'content');
const publicRoot = path.join(root, 'public');

const args = new Set(process.argv.slice(2));
const FIX = args.has('--fix');
const NET = !args.has('--no-net');

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|mp4)([?#]|$)/i;
const SECTION_LINK = /^\/(docs|guide|quest|recipe|changelog)(\/|\?|#|$)/;
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const LOCALE = /^[a-z]{2}_[a-z]{2}$/;
const DATASETS = new Set(['modern', 'vintage', 'dev']);
const MOVED_DEV = new Set([
  'datagen',
  'fruit_trees',
  'multiblock-script',
  'palm_trees',
]);

type Level = 'error' | 'warn' | 'info';
interface Finding {
  level: Level;
  file: string;
  line: number;
  msg: string;
}
const findings: Finding[] = [];
const report = (level: Level, file: string, line: number, msg: string) =>
  findings.push({ level, file, line, msg });

function* walk(dir: string): Generator<string> {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(md|mdx)$/.test(entry)) yield p;
  }
}

const rel = (p: string) => path.relative(root, p).replaceAll('\\', '/');

const IMG_RE =
  /!\[[^\]]*\]\(([^)\s]+)[^)]*\)|<img[^>]+src="([^"]+)"|::image\{[^}]*\bsrc="?([^"}\s]+)"?/g;
const LINK_RE =
  /(?<!!)\[[^\]]*\]\(([^)\s]+)[^)]*\)|\bhref="(\/[^"#?]+[^"#]*)"/g;

const kebab = (s: string) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

function legacyUrl(url: string): string | undefined {
  const m = url.match(
    /^https?:\/\/(?:www\.)?wiki\.terrafirmagreg\.team(\/[^?#]*)?([?#].*)?$/,
  );
  if (!m) return undefined;
  const p = (m[1] ?? '/').replace(/\/+$/, '') || '/';
  const seg = p.split('/').filter(Boolean);
  if (seg[0] !== 'modern') return p;
  if (seg[1] === 'field-guide') return '/guide';
  if (seg[1] === 'quest-book') return '/quest';
  if (seg[1] === 'recipe-book') return '/recipe';
  const loc = seg[1] && LOCALE.test(seg[1]) ? seg[1] : undefined;
  const rest = loc ? seg.slice(2) : seg.slice(1);
  if (rest[0] === 'developer') {
    if (rest[1] === 'wiki-components-showcase') return `/docs/dev/components`;
    if (rest[1] && MOVED_DEV.has(rest[1]))
      return `/docs/modern/mod/${rest.slice(1).join('/')}`;
    return `/docs/modern/developer/${rest.slice(1).join('/')}`;
  }
  return `/docs/modern${rest.length ? `/${rest.join('/')}` : ''}`;
}

function stripLang(url: string): string {
  const [base, frag] = url.split('#', 2);
  const [p, qs] = base.split('?', 2);
  if (!qs) return url;
  const params = qs.split('&').filter((q) => !q.startsWith('lang='));
  const out = params.length ? `${p}?${params.join('&')}` : p;
  return `${out}${frag ? `#${frag}` : ''}`;
}

async function headOk(url: string): Promise<boolean | undefined> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(8000),
      redirect: 'follow',
    });
    return res.ok;
  } catch {
    return undefined;
  }
}

interface Ctx {
  file: string;
  line: number;
  image: boolean;
  dataset?: string;
  group?: string;
  fixes: [string, string][];
}

const pendingHeads: { url: string; file: string; line: number }[] = [];

function checkUrl(url: string, ctx: Ctx) {
  const { file, line, image, dataset, group, fixes } = ctx;
  const legacy = legacyUrl(url);
  if (legacy !== undefined) {
    report('error', file, line, `absolute self-link → ${legacy}`);
    fixes.push([url, legacy]);
    url = legacy;
  }

  if (/^https?:\/\/github\.com\/TerraFirmaGreg-Team\//.test(url)) {
    if (image || IMAGE_EXT.test(url.split('?')[0]))
      report('error', file, line, 'org repo asset must be local: ' + url);
    return;
  }
  if (/^https?:\/\/github\.com\/user-attachments\//.test(url)) {
    if (image)
      report('warn', file, line, 'ephemeral user-attachments asset: ' + url);
    return;
  }
  if (/^https?:\/\/(cdn|media)\.discordapp\.com\//.test(url)) {
    pendingHeads.push({ url, file, line });
    return;
  }
  if (/^https?:/.test(url)) {
    if (image) report('warn', file, line, 'remote image: ' + url);
    return;
  }
  if (!url.startsWith('/')) return;

  if (image || IMAGE_EXT.test(url)) {
    const pathname = url.split(/[?#]/)[0];
    const parts = pathname.split('/').filter(Boolean);
    const base = parts.at(-1) ?? '';
    const ext = base.match(/\.[^.]+$/)?.[0] ?? '';
    const name = base.slice(0, base.length - ext.length);
    const conv =
      parts[0] === 'images' && DATASETS.has(parts[1]) && parts.length >= 4;
    const kebabOk = KEBAB.test(name);
    if (FIX && dataset && group && (!conv || !kebabOk)) {
      const target = `/images/${dataset}/${group}/${kebab(name) || 'image'}${ext.toLowerCase()}`;
      const from = path.join(publicRoot, pathname);
      const to = path.join(publicRoot, target);
      if (existsSync(from) && from !== to) {
        mkdirSync(path.dirname(to), { recursive: true });
        renameSync(from, to);
      }
      if (existsSync(to)) {
        report('info', file, line, `moved → ${target}`);
        fixes.push([pathname, target]);
        return;
      }
    }
    if (!existsSync(path.join(publicRoot, pathname))) {
      report('error', file, line, `missing file: ${pathname}`);
      return;
    }
    if (!kebabOk)
      report('error', file, line, `non-kebab filename: ${pathname}`);
    if (!conv)
      report(
        'error',
        file,
        line,
        `path outside images/<dataset>/<group>/: ${pathname}`,
      );
    return;
  }

  if (SECTION_LINK.test(url) && /[?&]lang=/.test(url)) {
    const fixed = stripLang(url);
    report('error', file, line, `locale resolves via cookie → ${fixed}`);
    fixes.push([url, fixed]);
  }
}

for (const file of walk(contentRoot)) {
  const relFile = rel(file);
  const segs = relFile.split('/');
  const datasetIdx = segs.findIndex((s) => DATASETS.has(s));
  const dataset = datasetIdx > 0 ? segs[datasetIdx] : undefined;
  const rest = segs.slice(datasetIdx + 2);
  const group = rest.length > 1 ? rest[0] : rest[0]?.replace(/\.mdx?$/, '');
  const text = readFileSync(file, 'utf8');
  const fixes: [string, string][] = [];

  text.split('\n').forEach((lineText, i) => {
    for (const m of lineText.matchAll(IMG_RE)) {
      const url = m[1] ?? m[2] ?? m[3];
      if (url)
        checkUrl(url, {
          file: relFile,
          line: i + 1,
          image: true,
          dataset,
          group,

          fixes,
        });
    }
    for (const m of lineText.matchAll(LINK_RE)) {
      const url = m[1] ?? m[2];
      if (url)
        checkUrl(url, {
          file: relFile,
          line: i + 1,
          image: false,
          dataset,
          group,

          fixes,
        });
    }
  });

  if (FIX && fixes.length) {
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let next = text;
    for (const [from, to] of fixes)
      next = next.replace(
        new RegExp(`${esc(from)}(?=[)"'\\s]|$)`, 'g'),
        () => to,
      );
    if (next !== text) writeFileSync(file, next);
  }
}

for (const section of ['docs', 'changelog'] as const) {
  const secDir = path.join(contentRoot, section);
  if (!existsSync(secDir)) continue;
  for (const dataset of readdirSync(secDir)) {
    const dsDir = path.join(secDir, dataset);
    if (!statSync(dsDir).isDirectory()) continue;
    const enDir = path.join(dsDir, 'en_us');
    if (!existsSync(enDir)) continue;
    const rels = (dir: string) =>
      [...walk(dir)].map((f) => path.relative(dir, f).replaceAll('\\', '/'));
    const enFiles = new Set(rels(enDir));
    for (const loc of readdirSync(dsDir)) {
      if (loc === 'en_us' || !LOCALE.test(loc)) continue;
      const locDir = path.join(dsDir, loc);
      if (!statSync(locDir).isDirectory()) continue;
      for (const f of rels(locDir))
        if (!enFiles.has(f))
          report(
            'error',
            `${section}/${dataset}/${loc}/${f}`,
            0,
            'no en_us source (orphan)',
          );
    }
  }
}

if (NET && pendingHeads.length) {
  const unique = [...new Map(pendingHeads.map((h) => [h.url, h])).values()];
  const results = await Promise.all(
    unique.map(async (h) => ({ h, ok: await headOk(h.url) })),
  );
  const byUrl = new Map(results.map((r) => [r.h.url, r.ok]));
  for (const h of pendingHeads) {
    const ok = byUrl.get(h.url);
    if (ok === false)
      report('error', h.file, h.line, 'dead discord cdn link: ' + h.url);
    else if (ok === true)
      report('warn', h.file, h.line, 'discord cdn link alive but expiring: ' + h.url);
    else report('warn', h.file, h.line, 'liveness unknown: ' + h.url);
  }
}

const icons: Record<Level, string> = {
  error: 'ERROR',
  warn: 'warn ',
  info: 'info ',
};
for (const f of findings)
  console.log(`${icons[f.level]} ${f.file}${f.line ? `:${f.line}` : ''}  ${f.msg}`);
const errors = findings.filter((f) => f.level === 'error').length;
const warns = findings.filter((f) => f.level === 'warn').length;
console.log(`\n${errors} errors, ${warns} warnings${FIX ? ' (fixes applied)' : ''}`);
process.exit(errors ? 1 : 0);
