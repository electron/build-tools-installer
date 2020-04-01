#!/usr/bin/env node

const { existsSync} = require('fs') 
const { execSync } = require('child_process');
const { homedir } = require('os');
const path = require('path');

function install() {
  const installPath = path.resolve(homedir(), '.electron_build_tools');
  const BUILD_TOOLS_URL = 'https://github.com/electron/build-tools';

  try {
    // Clone build-tools into user homedir
    execSync(`git clone -q ${BUILD_TOOLS_URL} ${installPath}`, { stdio: 'inherit' });

    // Install build-tools deps.
    execSync('npx yarn install', { stdio: 'inherit', cwd: installPath });
  } catch (err) {
    console.error('Failed to install build-tools: ', err);

    // Delete cloned repo to prevent retry failure.
    if (existsSync(installPath)) {
      execSync(`rm -rf ${installPath}`, { stdio: 'inherit' });
    }
  }
}

install();
