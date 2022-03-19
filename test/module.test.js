const assert = require('assert');
const { homedir } = require('os');
const { existsSync } = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

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
