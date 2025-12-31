import { homedir } from 'os';
import { resolve } from 'path';

export default process.env.ELECTRON_BUILD_TOOLS_ROOT || resolve(homedir(), '.electron_build_tools');
