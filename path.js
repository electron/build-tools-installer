const { homedir } = require('os');
const path = require('path');

module.exports = process.env.ELECTRON_BUILD_TOOLS_ROOT || path.resolve(homedir(), '.electron_build_tools')