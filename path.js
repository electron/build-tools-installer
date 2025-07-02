const { homedir } = require('os');

module.exports = process.env.ELECTRON_BUILD_TOOLS_ROOT || path.resolve(homedir(), '.electron_build_tools')