import { fork } from 'node:child_process';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files/script.js');

const spawnChildProcess = async (args) => {
  const child = fork(
    filePath,
    args,
    {
      stdio: [
        'pipe',
        'pipe',
        'inherit',
        'ipc',
      ]
    }
  );
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2']);
