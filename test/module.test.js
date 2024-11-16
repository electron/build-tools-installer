const assert = require('node:assert');
const { execSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const { resolve } = require('node:path');
const { homedir } = require('node:os');
const { it } = require('node:test');

it('installs build-tools to the home directory', () => {
  const buildToolsDir = resolve(homedir(), '.electron_build_tools');
  const dirExists = existsSync(buildToolsDir);
  assert.strictEqual(dirExists, true);
});

it('adds e to the user PATH', () => {
  const path = execSync('which e');
  assert.strictEqual(path.length === 0, false);
});

it('can execute e', () => {
  const info = execSync('e --help');
  assert.match(info.toString(), /Electron build tool/);
});
