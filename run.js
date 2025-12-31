#!/usr/bin/env node

import { existsSync, realpathSync } from 'fs';
import { resolve } from 'path';

import installPath from './path.js';
import { pathToFileURL } from 'url';

const ePath = resolve(installPath, 'src', 'e');
process.argv = process.argv.map((arg) => {
  if (existsSync(arg)) {
    return realpathSync(arg) === realpathSync(import.meta.filename) ? ePath : arg;
  }
  return arg;
});

import(pathToFileURL(ePath)).catch((err) => {
  console.error(err);
  process.exit(1);
});
