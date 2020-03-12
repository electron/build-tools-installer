#!/usr/bin/env node

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
    execSync('yarn install', { stdio: 'inherit', cwd: installPath });
  } catch (err) {
    console.error('Failed to install build-tools: ', err);
  }
}

install();
