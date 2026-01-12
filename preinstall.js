#!/usr/bin/env node

import { existsSync, readdirSync, rmSync } from 'fs';
import { spawnSync } from 'child_process';

import installPath from './path.js';
import path from 'path';

const isWin = process.platform === 'win32';

function throwForBadSpawn(basicInfo, spawnSyncResult) {
  if (spawnSyncResult.status !== 0) {
    throw new Error(`Command "${basicInfo}" failed with exit code ${spawnSyncResult.status}`);
  }
}

function install() {
  const BUILD_TOOLS_URL = 'https://github.com/electron/build-tools';

  try {
    // Clone build-tools into user homedir
    const alreadyCloned = existsSync(installPath);
    if (alreadyCloned) {
      throwForBadSpawn(
        'git fetch',
        spawnSync('git', ['fetch'], { stdio: 'inherit', cwd: installPath }),
      );
    } else {
      throwForBadSpawn(
        'git clone',
        spawnSync('git', ['clone', '-q', BUILD_TOOLS_URL, installPath], { stdio: 'inherit' }),
      );
    }

    const shouldCheckout = !alreadyCloned || !!process.env.BUILD_TOOLS_SHA;
    if (shouldCheckout) {
      const checkoutSha = process.env.BUILD_TOOLS_SHA ?? 'main';
      throwForBadSpawn(
        `git checkout ${checkoutSha}`,
        spawnSync('git', ['checkout', checkoutSha, '-f'], { stdio: 'inherit', cwd: installPath }),
      );
      throwForBadSpawn(
        'git reset',
        spawnSync(
          'git',
          ['reset', '--hard', `${checkoutSha === 'main' ? 'origin/main' : checkoutSha}`],
          {
            stdio: 'inherit',
            cwd: installPath,
          },
        ),
      );
    }

    // Install build-tools deps.
    const yarnReleasesDir = path.resolve(installPath, '.yarn', 'releases');
    const yarnToUse = readdirSync(yarnReleasesDir).find((f) => /^yarn-.+js/.test(f));
    const yarnPath = path.resolve(yarnReleasesDir, yarnToUse);

    throwForBadSpawn(
      'yarn install',
      spawnSync(process.execPath, [yarnPath, 'install'], {
        stdio: 'inherit',
        cwd: installPath,
      }),
    );
  } catch (err) {
    console.error('Failed to install build-tools: ', err);

    // Delete cloned repo to prevent retry failure.
    if (existsSync(installPath)) {
      rmSync(installPath, { recursive: true, force: true });
    }

    // Set the exit code to an error so npm will also show the error instead of failing silently.
    process.exitCode = 1;
  }
}

install();
