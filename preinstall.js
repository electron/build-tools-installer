#!/usr/bin/env node

const { existsSync, rmdirSync } = require('fs');
const { spawnSync } = require('child_process');
const { homedir } = require('os');
const path = require('path');

function throwForBadSpawn(basicInfo, spawnSyncResult) {
  if (spawnSyncResult.status !== 0) {
    throw new Error(`Command "${basicInfo}" failed with exit code ${spawnSyncResult.status}`);
  }
}

function install() {
  const installPath = path.resolve(homedir(), '.electron_build_tools');
  const BUILD_TOOLS_URL = 'https://github.com/electron/build-tools';

  try {
    // Clone build-tools into user homedir
    if (existsSync(installPath)) {
      throwForBadSpawn(
        'git fetch',
        spawnSync('git', ['fetch'], { stdio: 'inherit', cwd: installPath }),
      );
      throwForBadSpawn(
        'git checkout master',
        spawnSync('git', ['checkout', 'master', '-f'], { stdio: 'inherit', cwd: installPath }),
      );
      throwForBadSpawn(
        'git reset',
        spawnSync('git', ['reset', '--hard', 'origin/master'], {
          stdio: 'inherit',
          cwd: installPath,
        }),
      );
    } else {
      throwForBadSpawn(
        'git clone',
        spawnSync('git', ['clone', '-q', BUILD_TOOLS_URL, installPath], { stdio: 'inherit' }),
      );
    }

    // Install build-tools deps.
    throwForBadSpawn(
      'yarn install',
      spawnSync(`npx${process.platform === 'win32' ? '.cmd' : ''}`, ['yarn', 'install'], {
        stdio: 'inherit',
        cwd: installPath,
      }),
    );
  } catch (err) {
    console.error('Failed to install build-tools: ', err);

    // Delete cloned repo to prevent retry failure.
    if (existsSync(installPath)) {
      rmdirSync(installPath, { recursive: true });
    }
  }
}

install();
