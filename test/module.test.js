import { strictEqual, match } from 'node:assert';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';
import { it } from 'node:test';

it('installs build-tools to the home directory', () => {
  const buildToolsDir = resolve(homedir(), '.electron_build_tools');
  const dirExists = existsSync(buildToolsDir);
  strictEqual(dirExists, true);
});

it('adds e to the user PATH', () => {
  const path = execSync('which e');
  strictEqual(path.length === 0, false);
});

it('can execute e', () => {
  const info = execSync('e --help');
  match(info.toString(), /Electron build tool/);
});
