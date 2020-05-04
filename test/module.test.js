const { expect } = require('chai');

const { homedir } = require('os');
const { existsSync } = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

it('installs build-tools to the home directory', () => {
  const buildToolsDir = resolve(homedir(), '.electron_build_tools');
  expect(existsSync(buildToolsDir)).to.be.true;
});

it('adds e to the user PATH', () => {
  const path = execSync('which e');
  expect(path).to.not.be.empty;
});

it('can execute e', () => {
  const info = execSync('e');
  const helpMenuTitle = 'Electron build tool';

  expect(info.includes(helpMenuTitle)).to.be.true;
});
