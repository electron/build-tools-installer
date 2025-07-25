#!/usr/bin/env node

const { existsSync, realpathSync } = require('fs');
const { homedir } = require('os');
const { resolve } = require('path');

const installPath = require('./path');

const ePath = resolve(installPath, 'src', 'e');
process.argv = process.argv.map((arg) => {
  if (existsSync(arg)) {
    return realpathSync(arg) === realpathSync(__filename) ? ePath : arg;
  }
  return arg;
});

require(ePath);
