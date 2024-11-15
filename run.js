#!/usr/bin/env node

const { existsSync, realpathSync } = require('fs');
const { homedir } = require('os');
const { resolve } = require('path');

const ePath = resolve(homedir(), '.electron_build_tools', 'src', 'e');
process.argv = process.argv.map((arg) => {
  if (existsSync(arg)) {
    return realpathSync(arg) === realpathSync(__filename) ? ePath : arg;
  }
  return arg;
});

require(ePath);
