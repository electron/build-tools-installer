#!/usr/bin/env node

const { homedir } = require('os');
const path = require('path');

const ePath = path.resolve(homedir(), '.electron_build_tools', 'src', 'e');
process.argv = process.argv.map(arg => arg === __filename ? ePath : arg);

require(ePath);
