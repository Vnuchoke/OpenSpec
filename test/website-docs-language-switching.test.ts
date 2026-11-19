import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

it('publishes the Russian installation page alongside the English page', () => {
  const repo = fileURLToPath(new URL('../', import.meta.url));
  const root = mkdtempSync(join(tmpdir(), 'openspec-docs-language-'));
  try {
    const website = join(root, 'website');
    const scripts = join(website, 'scripts');
    mkdirSync(scripts, { recursive: true });
    cpSync(join(repo, 'docs-lab'), join(root, 'docs-lab'), { recursive: true });
    cpSync(join(repo, 'website', 'docs.sync.config.mjs'), join(website, 'docs.sync.config.mjs'));
    cpSync(join(repo, 'website', 'scripts', 'sync-docs.mjs'), join(scripts, 'sync-docs.mjs'));

    execFileSync(process.execPath, [join(scripts, 'sync-docs.mjs')], { cwd: website });

    const docs = join(website, 'content', 'docs');
    const english = readFileSync(join(docs, 'installation.md'), 'utf8');
    const russian = readFileSync(join(docs, 'ru', 'installation.md'), 'utf8');
    const setup = readFileSync(join(docs, 'setup.md'), 'utf8');

    expect(english).toContain('alternateLanguage: {"language":"ru","label":"Русский","href":"/docs/ru/installation"}');
    expect(russian).toContain('title: "Установка"');
    expect(russian).toContain('language: "ru"');
    expect(russian).toContain('alternateLanguage: {"language":"en","label":"English","href":"/docs/installation"}');
    expect(russian).toContain('](/docs/setup)');
    expect(setup).not.toContain('alternateLanguage:');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
