#!/usr/bin/env node

import { existsSync, realpathSync } from 'fs';
import { resolve } from 'path';

import installPath from './path.js';

const ePath = resolve(installPath, 'src', 'e');
process.argv = process.argv.map((arg) => {
  if (existsSync(arg)) {
    return realpathSync(arg) === realpathSync(import.meta.filename) ? ePath : arg;
  }
  return arg;
});

import(ePath).catch((err) => {
  console.error(err);
  process.exit(1);
});
